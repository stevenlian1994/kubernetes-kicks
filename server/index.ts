import express, {Request, Response, NextFunction} from 'express';
import { Pool } from 'pg';
import pool from './config/db';

const bodyParser = require('body-parser');
const userRouter = require('./routes/user');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/users', userRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

async function initializeDatabase(pool: Pool): Promise<void> {
  try {
    // Create user table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE,
        email VARCHAR(100) UNIQUE
      );
    `);

    // Insert sample users if not exists
    await pool.query(`
      INSERT INTO users (username, email) VALUES
        ('user1', 'user1@example.com'),
        ('user2', 'user2@example.com'),
        ('user3', 'user3@example.com')
      ON CONFLICT (username) DO NOTHING;
    `);

    console.log('Database initialization completed.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Call the function to initialize the database
initializeDatabase(pool)
  .then(() => {
    // Start your Express app or other operations
    console.log('Database seeding successful');
  })
  .catch((error) => {
    console.error('Error seeding database:', error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
