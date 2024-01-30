import { Model } from "sequelize";

export class User extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
  }