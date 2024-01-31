import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Merchant } from '../models/merchant.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-merchant-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './merchant-signin.component.html',
  styleUrl: './merchant-signin.component.css'
})
export class MerchantSigninComponent {
  title = 'Merchant Sign-in'
  apiUrl = 'http://localhost:3000'
  merchantForm = new FormGroup({
    email : new FormControl(''),
    password : new FormControl(''),
    companyName : new FormControl(''),
  })
  
  constructor(private httpClient: HttpClient){
    httpClient.get('https://pokeapi.co/api/v2/pokemon/ditto').subscribe((res)=>{
      console.log(res);
    })
    console.log('testing server connection with: get users http req')
    this.getMerchants().subscribe((res)=>{
      console.log(res);
    })
  }

  // post method
  addMerchant(): void{
    let json = {
      'email': this.merchantForm.controls.email.value,
      'password': this.merchantForm.controls.password.value,
      'companyName': this.merchantForm.controls.companyName.value,
    }
    this.httpClient.post(`${this.apiUrl}/merchants`, json).subscribe((res)=>{
      console.log(res)
    })
  }

  // get all method
  getMerchants(): Observable<Merchant[]> {
    return this.httpClient.get(`${this.apiUrl}/merchants`).pipe(
      map((res: any) => {
        return res.map((merchantData: any) => new Merchant(merchantData.email,merchantData.companyName))
      })
    )
  }
}
