import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import { seedDatabase, syncDatabase } from './config/db';
const bodyParser = require('body-parser');
const merchantRouter = require('./routes/merchant');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: '*',
};

// Then pass these options to cors:
app.use(cors(options));

// Routes
app.use('/merchants', merchantRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

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

