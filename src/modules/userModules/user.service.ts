import { pool } from "../../config/db";

// getAllUsers ----------------------------------------------------------------
const getAllUsers = async () => {
  const users = await pool.query(
    "SELECT id, name, email, phone, role FROM users"
  );

  return users.rows;
};

// updateUser ----------------------------------------------------------------
const updateUser = async (payload: Record<string, any>, id: string) => {
  const { name, email, phone, role } = payload;

  const users = await pool.query(
    `UPDATE users 
     SET 
       name = COALESCE($1, name),
       email = COALESCE($2, email),
       phone = COALESCE($3, phone),
       role = COALESCE($4, role)
     WHERE id = $5 
     RETURNING id, name, email, phone, role`,
    [name, email, phone, role, id]
  );

  return users.rows[0];
};

const deleteUser = async (id: string) => {

  const activeBookings = await pool.query(
    "SELECT * FROM bookings WHERE customer_id = $1 AND status = 'active'",
    [id]
  );

  if (activeBookings.rows.length > 0) {
    throw new Error("User cannot be deleted because they have active bookings");
  }

  const users = await pool.query(
    'DELETE FROM users WHERE id = $1',
    [id]
  );

  return users.rows[0];
}



export const userService = {
  getAllUsers,
  updateUser,
  deleteUser
};
