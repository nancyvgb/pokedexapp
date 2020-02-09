import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import {AuthService} from './auth/auth.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokedexapp';
  private userSub: Subscription;
  authName: String;
  isAuthenticated = false;
  @Output() sendUser = new EventEmitter<string>();


  constructor(
    // private dataStorageService: DataStorageService,
     private authService: AuthService
   ) { }
   ngOnInit() {
    
  }
  ngOnDestroy() {
    
  }
}

