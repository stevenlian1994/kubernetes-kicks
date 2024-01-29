import { User } from '../config/sequelize'; // Assuming you have the User model defined

class UserService {
  async createUser(username: string, email: string): Promise<any> {
    try {
      const user = await User.create({ username, email });
      return user.toJSON(); // Return the user data as an object
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; // Rethrow the error for handling at a higher level
    }
  }

  async getAllUsers(): Promise<any[]> {
    try {
      const users = await User.findAll();
      return users.map(user => user.toJSON()); // Return an array of user data objects
    } catch (error) {
      console.error('Error retrieving users:', error);
      throw error;
    }
  }

  async getUserById(id: string): Promise<any | null> {
    try {
      const user = await User.findByPk(id);
      return user ? user.toJSON() : null; // Return user data or null if not found
    } catch (error) {
      console.error('Error retrieving user by ID:', error);
      throw error;
    }
  }

  async updateUser(id: string, username: string, email: string): Promise<any | null> {
    try {
      const user = await User.findByPk(id);
      if (user) {
        await user.update({ username, email });
        return user.toJSON(); // Return updated user data
      }
      return null; // User not found
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const user = await User.findByPk(id);
      if (user) {
        await user.destroy();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}

export default new UserService();
