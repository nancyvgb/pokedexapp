import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import 'rxjs/Rx';
import { map } from "rxjs/operators";
import { Subject, throwError, Observable, forkJoin} from 'rxjs'
import { strict } from 'assert';


const results = []

@Injectable({
  providedIn: 'root'
})

export class PokedeskService {

  constructor(private http: HttpClient) { }

  getPokemon(): Observable<any> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon')
      
  }

  getSinglePokemon(name): Observable<any>{
    return  this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  
  }

  

 
}
