import { DataTypes, Sequelize } from 'sequelize';
import { Merchant } from '../models/interfaces';

let sequelize: Sequelize;
if(process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize({
        database: 'test_db',
        username: 'myuser',
        password: 'mypass',
        host: 'postgres',
        port: 5432, // Change to your database host if it's not running locally
        dialect: 'postgres', // Change to the appropriate dialect (e.g., mysql, sqlite) if using a different database
      });
} else {
    sequelize = new Sequelize({
        database: 'test_db',
        username: 'myuser',
        password: 'mypass',
        host: 'localhost',
        port: 5432, // Change to your database host if it's not running locally
        dialect: 'postgres', // Change to the appropriate dialect (e.g., mysql, sqlite) if using a different database
  });
}


Merchant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    password: {
      type: DataTypes.STRING(16),
    },
    companyName: {
      type: DataTypes.STRING(100),
    },
  },
  {
    sequelize,
    modelName: 'Merchant',
  }
);

// Synchronize the model with the database
async function syncDatabase() {
  try {
    // Syncing the model with the database will create the 'users' table if it doesn't exist
    await sequelize.sync();
    console.log('Database synchronization completed.');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

async function seedDatabase() {
    try {
      await Merchant.bulkCreate([
        { email: 'merchant1@example.com', password: 'foobar', companyName: 'foobar co. 1' },
        { email: 'merchant2@example.com', password: 'foobar', companyName: 'foobar co. 2' },
        { email: 'merchant3@example.com', password: 'foobar', companyName: 'foobar co. 3' },

      ], { ignoreDuplicates: true });
  
      console.log('Database seeded with 3 merchants.');
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  }

export { seedDatabase, syncDatabase, sequelize };
