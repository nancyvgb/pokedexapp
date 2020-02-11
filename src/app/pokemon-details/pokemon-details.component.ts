import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PokemonDetails} from './pokemon-details.service'
@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {
  private sub: any;
  pokemonDetail : any;
  pokemonName: string;

  constructor(private route: ActivatedRoute, private pokeDetailsService: PokemonDetails) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.pokemonName = params.name;
      this.pokeDetailsService.getSinglePokemon(params.name).subscribe(result => console.log(
        this.pokemonDetail = result
      ))
      // In a real app: dispatch action to load the details here.
   });
 }
  

}
