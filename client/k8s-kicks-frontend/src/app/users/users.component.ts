import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  // apiUrl = 'http://web:3000'
  apiUrl = 'http://localhost:3000'


  constructor(private httpClient: HttpClient){
    httpClient.get('https://pokeapi.co/api/v2/pokemon/ditto').subscribe((res)=>{
      console.log(res);
    })
    console.log('new update')
    httpClient.get(`${this.apiUrl}/users`).subscribe((res)=>{
      console.log(res);
    })
    
  }
}
