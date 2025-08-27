import bcrypt from 'bcrypt';
import pkg from 'pg';
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(process.cwd(), '../.env');
console.log('Loading env from:', envPath);

dotenv.config({ path: envPath });

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_NAME:', process.env.DB_NAME);

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

async function createUser({
  firstName,
  lastName,
  email,
  telephoneNumber,
  username,
  password,
}) {
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const insertQuery = `
      INSERT INTO users (first_name, last_name, email, telephone_number, username, password_hash)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING user_id, email
    `;

    const values = [
      firstName,
      lastName,
      email,
      telephoneNumber || null,
      username || null,
      passwordHash,
    ];

    const res = await pool.query(insertQuery, values);

    if (res.rows.length > 0) {
      console.log('User created successfully:', res.rows[0]);
    } else {
      console.log('No user created. Check input values.');
    }
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await pool.end();
  }
}

// Customize your new user details here:
const newUser = {
  firstName: 'Natuhereza',
  lastName: 'Godwin',
  email: 'natuhereza@example.com',
  telephoneNumber: '0700123456',
  username: 'natuhereza',
  password: 'YourSecurePassword123',
};

createUser(newUser);
