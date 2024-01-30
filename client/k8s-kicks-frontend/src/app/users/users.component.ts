import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  apiUrl = 'http://localhost:3000'
  userForm = new FormGroup({
    username : new FormControl(''),
    email : new FormControl('')
  })
  
  constructor(private httpClient: HttpClient){
    httpClient.get('https://pokeapi.co/api/v2/pokemon/ditto').subscribe((res)=>{
      console.log(res);
    })
    console.log('testing server connection with: get users http req')
    this.getUsers().subscribe((res)=>{
      console.log(res);
    })
  }

  // post method
  addUser(): void{
    let json = {
      'email': this.userForm.controls.email.value,
      'username': this.userForm.controls.username.value
    }
    this.httpClient.post(`${this.apiUrl}/users`, json).subscribe((res)=>{
      console.log(res)
    })
  }

  // get all method
  getUsers(): Observable<User[]> {
    return this.httpClient.get(`${this.apiUrl}/users`).pipe(
      map((res: any) => {
        return res.map((userData: any) => new User(userData.name, userData.email))
      })
    )
  }
}
