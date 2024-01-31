import { MerchantDTO } from "../models/MerchantDTO";
import { Merchant } from "../models/interfaces";

class MerchantService {
  // Transform user to UserDTO
  transformUserToDTO(merchant: Merchant): MerchantDTO {
    return {
      id: merchant.id,
      email: merchant.email,
      password: merchant.password,
      companyName: merchant.companyName
    };
  }

  async getAllMerchants(): Promise<MerchantDTO[]> {
    try{
      const merchants = await Merchant.findAll();
      return merchants.map(merchant => this.transformUserToDTO(merchant));
    } catch(error){
        console.error('Error retrieving users:', error);
        throw error;
    }
  }

  async getMerchantById(id: number): Promise<MerchantDTO | null> {
    try {
      let merchant = await Merchant.findByPk(id);
      if(merchant){
        return this.transformUserToDTO(merchant)
      } else {
        throw new Error;
      }
    } catch(error) {
      console.error('Error retrieving user by ID:', error);
      throw error;
    }
  }

  async createMerchant(email: string, password: string, companyName: string): Promise<Merchant> {
    try {
      const merchant = await Merchant.create({ email, password, companyName});
      return merchant.toJSON(); // Return the user data as an object
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; // Rethrow the error for handling at a higher level
    }
  }

  async updateMerchant(id: number, email: string, password: string, companyName: string): Promise<any | null> {
    try {
      const merchant = await Merchant.findByPk(id);
      if (merchant) {
        await merchant.update({ email, password, companyName });
        return merchant.toJSON(); // Return updated user data
      }
      return null; // User not found
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteMerchant(id: number): Promise<number> {
    try {
      return await Merchant.destroy({
        where: { id },
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    } 
  }
}

const merchantService = new MerchantService();
export { merchantService };
