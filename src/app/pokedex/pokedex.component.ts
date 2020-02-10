import { Component, OnInit } from '@angular/core';
import { PokedeskService } from './pokedesk.service'
import { ThrowStmt } from '@angular/compiler';
import { mergeMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  subscription: Subscription;
  pokemonArray$: [];
  promiseResponseArray: Array<any> = [];
  obsevableResponseArray: Array<any> = [];
  constructor(private pokeService: PokedeskService, private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
      
     this.http.get<any>("https://pokeapi.co/api/v2/pokemon")
    .subscribe(async data => {
      await  data.results.forEach( async element => {
        this.http
        .get<any>(`https://pokeapi.co/api/v2/pokemon/${element.name}`)
        .toPromise()
        .then(async data => {
            this.promiseResponseArray.push(data);
         });
        
      });
    });
   

    console.log(this.promiseResponseArray)
    console.log(this.obsevableResponseArray)


  }

}
