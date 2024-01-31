export class Merchant {
    id!: number;
    email: string;
    password: string;
    companyName: string;
    
    constructor(email: string, password: string, companyName: string){
        this.email = email;
        this.password = password;
        this.companyName = companyName;
    }
}