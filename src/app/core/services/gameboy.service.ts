import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class GameboyService {
  private buttonCommandSource = new Subject<string>();
  private scrollCommandSource = new Subject<{
    direction: 'up' | 'down';
    amount: number;
  }>();

  constructor() {}

  buttonCommand$ = this.buttonCommandSource.asObservable();
  scrollCommand$ = this.scrollCommandSource.asObservable();

  pressButton(command: string) {
    this.buttonCommandSource.next(command);
  }

  scroll(direction: 'up' | 'down', amount: number = 50) {
    this.scrollCommandSource.next({ direction, amount });
  }
}
