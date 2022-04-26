import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private publicKey  = "";
  private privateKey = "";

  private host = "http://gateway.marvel.com/";

  constructor(private http: HttpClient){}

  public getDados(url: string, parameters: string){
    let ts = this.generateTs();
    
    return new Promise((ret) => {
      this.http.get(this.host + url + '?ts=' 
      + ts + '&apikey=' + this.publicKey 
      + '&hash=' + this.getHash(ts) + parameters).subscribe((response) => {
        
        if(response){
          ret(response);

        } else {
          ret(false);
        }
      })          
    })

  }
  
  private generateTs(){
    return Math.floor(100000 + Math.random() * 900000);
  }

  private getHash(ts){
    return Md5.hashStr(ts + this.privateKey + this.publicKey);
  }

  private getKeys(){
    return new Promise((ret) => {
      this.http.get('assets/keys.json').subscribe((keys:any) => {
        this.publicKey  = keys.public;
        this.privateKey = keys.private;

        ret(true);
      })
    })
  }


}
