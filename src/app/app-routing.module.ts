import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { PokedexComponent } from './pokedex/pokedex.component';


const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: 'pokedex', component: PokedexComponent},
  { path: '',   redirectTo: '/auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
