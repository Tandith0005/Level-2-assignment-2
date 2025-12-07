import { pool } from "../../config/db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "../../config/config";

const signin = async (payload : Record<string, any>) => {
    const {email, password} = payload;
    
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const comparePassword = await bcrypt.compare(password, user.rows[0].password);

    if (user.rows.length === 0) {
        throw new Error('User not found');
    }
    if (comparePassword === false) {
        throw new Error('Invalid password, Make sure you entered the correct password');
    }

    // jwt things -----------------
    const jwtPayload = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        role: user.rows[0].role
    }
    const jwtSecret = config.jwtSecret;
    const token = jwt.sign(jwtPayload, jwtSecret as string, {expiresIn: '7d'});

    return {token, user: { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email, phone: user.rows[0].phone, role: user.rows[0].role}};
}







export const signinService = {
    signin
}