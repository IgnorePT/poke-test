import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameboyComponent } from './components/gameboy/gameboy.component';
import { PokemonDetailComponent } from './components/pokemon/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './components/pokemon/pokemon-list/pokemon-list.component';

const routes: Routes = [
  {
    path: '',
    component: GameboyComponent,
    children: [
      { path: '', component: PokemonListComponent },
      { path: 'detail/:pokemon_name', component: PokemonDetailComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
