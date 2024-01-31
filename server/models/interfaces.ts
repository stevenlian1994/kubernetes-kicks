import { Model } from "sequelize";
  
export interface UserAttributes {
    id: number;
    email: string;
    password: string;
  }

  // Define an interface for Customer attributes
export interface CustomerAttributes extends UserAttributes {
    firstName: string;
    lastName: string;
  }
  
  // Define an interface for Seller attributes
export interface MerchantAttributes extends UserAttributes {
    companyName: string;
  }

export class Merchant extends Model implements MerchantAttributes {
    id!: number;
    email!: string;
    password!: string;
    companyName!: string;
  }