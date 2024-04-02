import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GameboyService } from '../../../core/services/gameboy.service';
import { PokemonResults } from '../../../core/dtos/pokemon/pokemon-dto';

//Service
import { PokemonService } from '../../../core/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('pokemonList') listPokemonElement: ElementRef<HTMLUListElement>;
  private keyboardEventsSubscription!: Subscription;
  pokemons: PokemonResults[] | null = null;
  currentPokemonIndexSelected: number = 0;
  private buttonSubscription!: Subscription;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private gameboyService: GameboyService
  ) {}

  ngOnInit() {
    const keyboardEvents$ = fromEvent<KeyboardEvent>(document, 'keydown');

    this.pokemonService.getPokemons().subscribe((apiResponse) => {
      this.pokemons = apiResponse.results;
    });

    this.keyboardEventsSubscription = keyboardEvents$
      .pipe(
        filter(
          (event) =>
            event.key === 'ArrowDown' ||
            event.key === 'ArrowUp' ||
            event.key === 'Enter'
        )
      )
      .subscribe((event) => {
        if (event.key === 'ArrowDown') {
          this.navigate(1);
        } else if (event.key === 'ArrowUp') {
          this.navigate(-1);
        } else if (event.key === 'Enter') {
          this.router.navigate(['/detail', this.currentPokemon.name]);
        }
      });

    this.buttonSubscription = this.gameboyService.buttonCommand$.subscribe(
      (command) => {
        switch (command) {
          case 'up':
            this.navigate(-1);
            break;
          case 'down':
            this.navigate(1);
            break;
          case 'a':
            this.router.navigate(['/detail', this.currentPokemon.name]);
            break;
        }
      }
    );
  }

  ngAfterViewInit() {
    this.listPokemonElement.nativeElement.focus();
  }

  ngOnDestroy(): void {
    if (this.keyboardEventsSubscription) {
      this.keyboardEventsSubscription.unsubscribe();
    }

    if (this.buttonSubscription) {
      this.buttonSubscription.unsubscribe();
    }
  }

  get currentPokemon() {
    return this.pokemons[this.currentPokemonIndexSelected];
  }

  navigate(direction: number) {
    this.currentPokemonIndexSelected += direction;
    if (this.currentPokemonIndexSelected >= this.pokemons.length) {
      this.currentPokemonIndexSelected = this.pokemons.length - 1;
    } else if (this.currentPokemonIndexSelected < 0) {
      this.currentPokemonIndexSelected = 0;
    }
    this.scrollToSelected();
  }

  scrollToSelected(): void {
    const selectedElement = this.listPokemonElement.nativeElement.querySelector(
      `[data-index="${this.currentPokemonIndexSelected}"]`
    );
    if (selectedElement) {
      selectedElement.scrollIntoView();
    }
  }
}
