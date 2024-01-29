import express, {Request, Response, NextFunction} from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import { seedDatabase, syncDatabase } from './config/sequelize';
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:8080'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options));

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

syncDatabase()
  .then(() => {
    // Start your Express app or other operations
    seedDatabase();
    console.log('Database seeding successful');
  })
  .catch((error) => {
    console.error('Error seeding database:', error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

