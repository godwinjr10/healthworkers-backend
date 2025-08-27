import pkg from 'pg';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

// PostgreSQL native pool (optional)
export const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'healthworkersregistry',
  user: 'postgres',
  password: '1011@itambajr',
});

// Sequelize instance — DO NOT sync or alter tables
export const sequelize = new Sequelize('healthworkersregistry', 'postgres', '1011@itambajr', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false,  // optional: disable SQL query logging
});

// Optional: test connection function
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Sequelize connection established.');
  } catch (error) {
    console.error('❌ Sequelize connection error:', error);
  }
};
