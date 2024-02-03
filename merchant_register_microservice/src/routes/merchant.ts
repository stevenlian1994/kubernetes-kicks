import express, { NextFunction, Request, Response, Router } from 'express';
import { merchantService } from '../services/MerchantService';

const router: Router = express.Router();

// Create new merchant
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {

    const {email, password, companyName} = req.body;

    const newMerchant = await merchantService.createMerchant(email, password, companyName);
    res.status(201).json(newMerchant);
  } catch (error) {
    next(error);
  }
});

// Get all merchants
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const merchants = await merchantService.getAllMerchants();
    res.json(merchants);
  } catch (error) {
    next(error);
  }
});

// Get user by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await merchantService.getMerchantById(Number.parseInt(req.params.id));
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Update user by ID
router.put('', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id, email, password, companyName} = req.body;
    const updatedUser = await merchantService.updateMerchant(id, email, password, companyName);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// Delete user by ID
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await merchantService.deleteMerchant(Number.parseInt(req.params.id));
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;