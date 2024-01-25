import express, { NextFunction, Request, Response, Router } from 'express';
import userService from '../services/UserService';

const router: Router = express.Router();

// Create a new user
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {

    const {username, email} = req.body;

    const newUser = await userService.createUser(username, email);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// Get all users
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Get user by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Update user by ID
router.put('', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id, username, email} = req.body;
    const updatedUser = await userService.updateUser(id, username, email);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// Delete user by ID
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userService.deleteUser(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;