import { DataTypes, Model, Sequelize } from 'sequelize';
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

export { sequelize };
 
// Define the User model
class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
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
      await User.bulkCreate([
        { username: 'user1', email: 'user1@example.com' },
        { username: 'user2', email: 'user2@example.com' },
        { username: 'user3', email: 'user3@example.com' },
      ], { ignoreDuplicates: true });
  
      console.log('Database seeded with 3 users.');
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  }

export { seedDatabase, syncDatabase, User };
