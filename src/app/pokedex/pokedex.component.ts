import { Component, OnInit } from '@angular/core';
import { PokedeskService } from './pokedesk.service'
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
  pokemonArray: Array<any>
  query: string;
 
  constructor(private pokeService: PokedeskService, private http: HttpClient) { }

   ngOnInit() {
     const pokemonList = `https://pokeapi.co/api/v2/pokemon`
     const singlePokemon = name =>`https://pokeapi.co/api/v2/pokemon/${name}`
     Observable.ajax(pokemonList).map(e => e.response.results)
     .switchMap(names => Observable.forkJoin(names.map(name => {
       const url = singlePokemon(name.name)
       return Observable.ajax(url).map(e => e.response)
     })))
     .subscribe(result => console.log(
       this.pokemonArray = result
     ))


  }

}
