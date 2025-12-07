import { pool } from "../../config/db";

// createBooking ----------------------------------------------------------------------
const createBooking = async (payload: Record<string, any>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  //first get vehicle details
  const vehicleId = await pool.query("SELECT * FROM vehicles WHERE id = $1", [
    vehicle_id,
  ]);
  const vehicle = vehicleId.rows[0];
  if (!vehicle || vehicle.availability_status === "booked") {
    throw new Error("Vehicle not found or booked");
  }
  //  calculate price
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);

  if (end <= start) {
    throw new Error("End date must be bigger than start date");
  }

  const number_of_days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  //   console.log(number_of_days);
  const total_price = vehicle.daily_rent_price * number_of_days;

  const newBook = await pool.query(
    "INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES ($1, $2, $3, $4, $5, 'active') RETURNING *",
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );
  await pool.query(
    "UPDATE vehicles SET availability_status = 'booked' WHERE id = $1",
    [vehicle_id]
  );
  return {
    ...newBook.rows[0],
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price,
    },
  };
};

// getBookings ----------------------------------------------------------------------
const getAllBookings = async (payload: Record<string, any>) => {
  await pool.query(`
  UPDATE bookings
  SET status = 'returned'
  WHERE rent_end_date < CURRENT_DATE
  AND status = 'active'
`);
  await pool.query(`
    UPDATE vehicles
    SET availability_status = 'available'
    WHERE id IN (
      SELECT vehicle_id FROM bookings
      WHERE rent_end_date < CURRENT_DATE
      AND status = 'returned'
    )
  `);

  // ADMIN -------------------------------
  if (payload.role === "admin") {
    const bookings = await pool.query(`
      SELECT 
        b.*, 
        u.name AS customer_name, 
        u.email AS customer_email,
        v.vehicle_name,
        v.registration_number
      FROM bookings b
      JOIN users u ON b.customer_id = u.id
      JOIN vehicles v ON b.vehicle_id = v.id
    `);

    return bookings.rows.map((b) => ({
      id: b.id,
      customer_id: b.customer_id,
      vehicle_id: b.vehicle_id,
      rent_start_date: b.rent_start_date,
      rent_end_date: b.rent_end_date,
      total_price: b.total_price,
      status: b.status,
      customer: {
        name: b.customer_name,
        email: b.customer_email,
      },
      vehicle: {
        vehicle_name: b.vehicle_name,
        registration_number: b.registration_number,
      },
    }));
  }

  // CUSTOMER -------------------------------
  const bookings = await pool.query(
    `
    SELECT 
      b.*, 
      v.vehicle_name,
      v.registration_number,
      v.type
    FROM bookings b
    JOIN vehicles v ON b.vehicle_id = v.id
    WHERE b.customer_id = $1
  `,
    [payload.id]
  );

  return bookings.rows.map((b) => ({
    id: b.id,
    vehicle_id: b.vehicle_id,
    rent_start_date: b.rent_start_date,
    rent_end_date: b.rent_end_date,
    total_price: b.total_price,
    status: b.status,
    vehicle: {
      vehicle_name: b.vehicle_name,
      registration_number: b.registration_number,
      type: b.type,
    },
  }));
};

// updateBooking ----------------------------------------------------------------------
const updateBooking = async (
  id: string,
  payload: Record<string, any>,
  status: Record<string, any>
) => {
  //   console.log('id', id);
  //   console.log('status', status);
  //   console.log('payload', payload);
  //   console.log('currentBooking', currentBooking);
  //    id 6
  //   status { status: 'cancelled' }
  // payload {
  //   id: 7,
  //   name: 'Meaw Mew',
  //   email: 'Meaw@example.com',
  //   role: 'customer',
  //   iat: 1765077684,
  //   exp: 1765682484
  // }
  // currentBooking {
  //   id: 6,
  //   customer_id: 7,
  //   vehicle_id: 4,
  //   rent_start_date: 2024-01-14T18:00:00.000Z,
  //   rent_end_date: 2024-01-19T18:00:00.000Z,
  //   total_price: 100,
  //   status: 'active'
  // }

  const existingBooking = await pool.query(
    "SELECT * FROM bookings WHERE id = $1",
    [id]
  );
  const currentBooking = existingBooking.rows[0];
  if (!currentBooking) {
    throw new Error("Booking not found");
  }

  // if user is customer-----------------------------
  if (payload.role === "customer") {
    if (currentBooking.customer_id !== payload.id) {
      throw new Error(
        "You are not allowed to modify this booking, Cause it's not Ur's"
      );
    }
    const result = await pool.query(
      "UPDATE bookings SET status = 'cancelled' WHERE id = $1 RETURNING *",
      [id]
    );
    await pool.query(
      "UPDATE vehicles SET availability_status = 'available' WHERE id = $1",
      [result.rows[0].vehicle_id]
    );

    return result.rows[0];
  }

  // if user is admin-----------------------------
  if (payload.role === "admin") {
    if (status.status === "returned") {
      const result = await pool.query(
        "UPDATE bookings SET status = 'returned' WHERE id = $1 RETURNING *",
        [id]
      );
      await pool.query(
        "UPDATE vehicles SET availability_status = 'available' WHERE id = $1",
        [result.rows[0].vehicle_id]
      );

      return {
        ...result.rows[0],
        vehicle: {
          availability_status: "available",
        },
      };
    }
  }
  // Default cancel
  const result = await pool.query(
    "UPDATE bookings SET status = 'cancelled' WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

export const bookingService = {
  createBooking,
  getAllBookings,
  updateBooking,
};
