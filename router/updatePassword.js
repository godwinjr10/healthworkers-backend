import bcrypt from 'bcrypt';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

async function updateUserPassword(email, plainPassword) {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    console.log(`Generated hash: ${hash}`);

    const updateQuery = `
      UPDATE users
      SET password_hash = $1
      WHERE email = $2
    `;

    const res = await pool.query(updateQuery, [hash, email]);

    if (res.rowCount === 0) {
      console.log(`No user found with email: ${email}`);
    } else {
      console.log(`Password updated successfully for user with email: ${email}`);
    }
  } catch (err) {
    console.error('Error updating password:', err);
  } finally {
    await pool.end();
  }
}

// Replace these values with the target email and new plaintext password
const userEmail = 'itambajr10@gmail.com';
const newPassword = '1011@itambajr';

updateUserPassword(userEmail, newPassword);
