import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GameboyService } from '../../../core/services/gameboy.service';
import { Pokemon } from '../../../core/dtos/pokemon/pokemon-dto';
import { PokemonService } from '../../../core/services/pokemon.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  @ViewChild('pokemonDetail') pokemonDetail: ElementRef<HTMLDivElement>;
  pokemonName: string;
  pokemonData: Pokemon | null = null;

  private buttonSubscription!: Subscription;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private gameboyService: GameboyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.pokemonName = params['pokemon_name'];

      this.pokemonService
        .getPokemonDetail(this.pokemonName)
        .subscribe((apiResponse) => {
          this.pokemonData = apiResponse;
        });
    });

    this.buttonSubscription = this.gameboyService.buttonCommand$.subscribe(
      (command) => {
        switch (command) {
          case 'b':
            this.router.navigate(['/']);
            break;
          case 'down':
            this.gameboyService.scroll('down', 50);
            break;
          case 'up':
            this.gameboyService.scroll('up', 50);
            break;
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.buttonSubscription) {
      this.buttonSubscription.unsubscribe();
    }
  }
}
