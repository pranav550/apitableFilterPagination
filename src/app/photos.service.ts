import { Photos } from './photos';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  apiURL: string = 'https://gorest.co.in/public-api/photos?_format=json&access-token=mT8JNMyWCG0D7waCHkyxo0Hm80YBqelv5SBL';
  constructor(private httpClient: HttpClient) { }

  getPhotos():Observable<any>{
    
    return this.httpClient.get<Photos[]>(this.apiURL);
  }
}
