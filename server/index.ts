import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
const bodyParser = require('body-parser');
const merchantMSI = require('./routes/merchantMSI');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
// const allowedOrigins = ['http://localhost:8080'];
const options: cors.CorsOptions = {
  origin: '*',
};

// Then pass these options to cors:
app.use(cors(options));

// Routes
app.use('/merchants', merchantMSI)

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

