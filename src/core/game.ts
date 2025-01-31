import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  shareReplay,
  tap,
} from 'rxjs';

import { GsiParser } from './gsiParser.ts';
import { GsiResponse } from './gsiStructure.ts';
import creepsPulling from './plugins/creepsPulling.ts';
import hero from './plugins/hero.ts';
import stackCamp from './plugins/stackCamp.ts';
import wisdomRune from './plugins/wisdomRune.ts';

export class Game {
  private readonly gsiParser = new GsiParser();
  private readonly gameState = new BehaviorSubject('');
  private readonly clockTimeOfRunningGame = new BehaviorSubject(0);

  init() {
    this.gsiParser.init();

    const gameState$ = fromEvent(this.gsiParser.emitter, 'newdata').pipe(
      map((data) => (data as GsiResponse)?.map?.game_state),
      filter((value) => !!value),
      distinctUntilChanged(),
      tap((value) => {
        console.log('gameState:', value);
      }),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      }),
    );

    gameState$.subscribe((state) => this.gameState.next(state));

    fromEvent(this.gsiParser.emitter, 'newdata')
      .pipe(
        map((data) => (data as GsiResponse)?.map?.matchid),
        filter((value) => !!value),
        distinctUntilChanged(),
        tap((value) => {
          console.log('MatchId:', value);
        }),
        shareReplay({
          bufferSize: 1,
          refCount: true,
        }),
      )
      .subscribe(() => {
        // when mach id is changed restart the state to make clear start
        this.restart();
      });

    const inProgress$ = this.gameState.pipe(
      filter((state) => state === 'DOTA_GAMERULES_STATE_GAME_IN_PROGRESS'),
    );

    combineLatest([inProgress$, fromEvent(this.gsiParser.emitter, 'map:clock_time')])
      .pipe(
        tap(([_, time]) => {
          console.log('Game time:', time);
        }),
        shareReplay({
          bufferSize: 1,
          refCount: true,
        }),
      )
      .subscribe(([_, time]) => this.clockTimeOfRunningGame.next(time as number));

    wisdomRune.init(this.clockTimeOfRunningGame);
    stackCamp.init(this.clockTimeOfRunningGame);
    hero.init(this.gsiParser);
    creepsPulling.init(this.clockTimeOfRunningGame);
  }

  dispose() {
    this.gsiParser.dispose();
    this.gameState.next('');
    this.clockTimeOfRunningGame.next(0);
  }

  restart() {
    console.log('Restarting...');
    wisdomRune.restart();
    stackCamp.restart();
    hero.restart();
    creepsPulling.restart();
  }
}

const game = new Game();

export default game;
