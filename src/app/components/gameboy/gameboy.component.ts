import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GameboyService } from '../../core/services/gameboy.service';

@Component({
  selector: 'app-gameboy',
  templateUrl: './gameboy.component.html',
  styleUrls: ['./gameboy.component.scss'],
})
export class GameboyComponent implements OnInit {
  @ViewChild('innerScreen') innerScreen!: ElementRef<HTMLDivElement>;
  private routerSubscription!: Subscription;
  private scrollSubscription!: Subscription;

  constructor(private router: Router, private gameboyService: GameboyService) {}

  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.resetScrollPosition();
      });

    this.scrollSubscription = this.gameboyService.scrollCommand$.subscribe(
      ({ direction, amount }) => {
        this.scrollTo(direction, amount);
      }
    );
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }

    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  scrollTo(direction: 'up' | 'down', amount: number) {
    const currentScrollPosition = this.innerScreen.nativeElement.scrollTop;
    if (direction === 'up') {
      this.innerScreen.nativeElement.scrollTop = currentScrollPosition - amount;
    } else if (direction === 'down') {
      this.innerScreen.nativeElement.scrollTop = currentScrollPosition + amount;
    }
  }

  resetScrollPosition() {
    if (this.innerScreen && this.innerScreen.nativeElement) {
      this.innerScreen.nativeElement.scrollTop = 0;
    }
  }

  handleUp() {
    this.gameboyService.pressButton('up');
  }

  handleDown() {
    this.gameboyService.pressButton('down');
  }

  handleRight() {
    this.gameboyService.pressButton('right');
  }

  handleLeft() {
    this.gameboyService.pressButton('left');
  }

  handleButtonA() {
    this.gameboyService.pressButton('a');
  }

  handleButtonB() {
    this.gameboyService.pressButton('b');
  }
}
