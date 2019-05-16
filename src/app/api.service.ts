import { User } from './user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string = 'https://gorest.co.in/public-api/users?_format=json&access-token=mT8JNMyWCG0D7waCHkyxo0Hm80YBqelv5SBL';
  constructor(private httpClient: HttpClient) { }

  getUsers():Observable<any>{
    
    return this.httpClient.get<User[]>(this.apiURL);
  }
}
