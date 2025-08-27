// backend/router/users.js
import express from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../config/db.js'; // your pg Pool

const router = express.Router();

// GET /api/users - fetch all users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT user_id, first_name, last_name, email, telephone_number, username, created_at
      FROM users
      ORDER BY user_id ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// POST /api/users - create a new user
router.post('/', async (req, res) => {
  const { first_name, last_name, email, telephone_number, username, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: 'First name, last name, email, and password are required' });
  }

  try {
    const existing = await pool.query('SELECT user_id FROM users WHERE email=$1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, telephone_number, username, password_hash)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING user_id, first_name, last_name, email, telephone_number, username, created_at`,
      [first_name, last_name, email, telephone_number, username, hashedPassword]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

// PUT /api/users/:id - update user info (without password)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, telephone_number, username } = req.body;

  if (!first_name || !last_name || !email) {
    return res.status(400).json({ message: 'First name, last name, and email are required' });
  }

  try {
    await pool.query(
      `UPDATE users
       SET first_name=$1, last_name=$2, email=$3, telephone_number=$4, username=$5
       WHERE user_id=$6`,
      [first_name, last_name, email, telephone_number, username, id]
    );
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update user' });
  }
});

// PUT /api/users/:id/password - update password
router.put('/:id/password', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password) return res.status(400).json({ message: 'Password is required' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('UPDATE users SET password_hash=$1 WHERE user_id=$2', [hashedPassword, id]);
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update password' });
  }
});

// DELETE /api/users/:id - delete user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE user_id=$1', [id]);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

export default router;
