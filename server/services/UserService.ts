import pool from '../config/db';

class UserService {
  async createUser(username: String, email: String): Promise<any> {
    const result = await pool.query('INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *', [username, email]);
    return result.rows[0];
  }

  async getAllUsers(): Promise<any[]> {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  }

  async getUserById(id: string): Promise<any | null> {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async updateUser(id: string, username: String, email: String): Promise<any | null> {
    const result = await pool.query('UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *', [username, email, id]);
    return result.rows[0] || null;
  }

  async deleteUser(id: string): Promise<void> {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
  }
}

export default new UserService();
