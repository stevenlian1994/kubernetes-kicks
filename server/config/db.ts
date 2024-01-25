import { Pool } from 'pg';
// Retrieve the DATABASE_URL from the environment variables
const databaseUrl = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: databaseUrl,
});

export default pool;