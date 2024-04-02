import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Custom Modules
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Components
import { PokemonListComponent } from './components/pokemon/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './components/pokemon/pokemon-detail/pokemon-detail.component';
import { PokemonService } from './core/services/pokemon.service';
import { GameboyComponent } from './components/gameboy/gameboy.component';

// Services
import { ApiService } from './core/services/api.service';
import { GameboyService } from './core/services/gameboy.service';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  declarations: [
    AppComponent,
    PokemonListComponent,
    GameboyComponent,
    PokemonDetailComponent,
  ],
  providers: [ApiService, PokemonService, GameboyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
