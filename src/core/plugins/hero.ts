import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  fromEvent,
  map,
  tap,
} from 'rxjs';

import { GsiParser } from '../gsiParser.ts';
import { GsiResponse } from '../gsiStructure.ts';
import { getClosestPosition } from '../map.ts';

class Hero {
  readonly isAlive = new BehaviorSubject(false);
  readonly teamName = new BehaviorSubject<'dare' | 'radiant' | ''>('');
  readonly position = new BehaviorSubject<string>('');

  init(gsiParser: GsiParser) {
    combineLatest([
      fromEvent(gsiParser.emitter, 'hero:xpos'),
      fromEvent(gsiParser.emitter, 'hero:ypos'),
    ])
      .pipe(
        map(([x, y]) => {
          return getClosestPosition(x as number, y as number);
        }),
        distinctUntilKeyChanged('kind'),
        tap((value) => {
          console.log('Closest position:', value);
        }),
      )
      .subscribe((position) => this.position.next(position.kind));

    fromEvent(gsiParser.emitter, 'newdata')
      .pipe(
        map((data) => (data as GsiResponse)?.hero?.alive),
        filter((value) => !!value),
        distinctUntilChanged(),
        tap((value) => {
          console.log('Hero isAlive:', value);
        }),
      )
      .subscribe((value) => this.isAlive.next(value));

    fromEvent(gsiParser.emitter, 'newdata')
      .pipe(
        map((data) => (data as GsiResponse)?.player?.team_name),
        filter((value) => !!value),
        distinctUntilChanged(),
        tap((value) => {
          console.log('Team name:', value);
        }),
      )
      .subscribe((value) => this.teamName.next(value));
  }

  restart(): void {
    this.isAlive.next(false);
    this.teamName.next('');
    this.position.next('');
  }
}

const hero = new Hero();

export default hero;
