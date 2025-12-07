import { pool } from "../../config/db";

// postVehicle ----------------------------------------------------------------------
const postVehicle = async (payload: Record<string, any>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const vehicle = await pool.query(
    "INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  return vehicle.rows[0];
};

// getVehicles ----------------------------------------------------------------------
const getVehicles = async () => {
  const vehicle = await pool.query("SELECT * FROM vehicles");

  return vehicle.rows;
};

// getSpecificVehicle ---------------------------------------------------------------
const getSpecificVehicle = async (id: string) => {
  const vehicle = await pool.query("SELECT * FROM vehicles WHERE id = $1", [
    id,
  ]);

  return vehicle.rows[0];
};

// updateVehicle ----------------------------------------------------------------------
const updateVehicle = async (id: string, payload: Record<string, any>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const vehicle = await pool.query(
    "UPDATE vehicles SET vehicle_name = $1, type = $2, registration_number = $3, daily_rent_price = $4, availability_status = $5 WHERE id = $6 RETURNING *",
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id,
    ]
  );

  return vehicle.rows[0];
};

// deleteVehicle ----------------------------------------------------------------------
const deleteVehicle = async (id: string) => {
  const activeBookings = await pool.query(
    "SELECT * FROM bookings WHERE vehicle_id = $1 AND status = 'active'",
    [id]
  );

  if (activeBookings.rows.length > 0) {
    throw new Error("Vehicle cannot be deleted because it has active bookings");
  }

  const vehicle = await pool.query(
    "DELETE FROM vehicles WHERE id = $1 RETURNING *",
    [id]
  );

  return vehicle.rows[0];
};

export const vehicleService = {
  postVehicle,
  getVehicles,
  getSpecificVehicle,
  updateVehicle,
  deleteVehicle,
};
