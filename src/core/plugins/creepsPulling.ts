import { BehaviorSubject, Subject, tap } from 'rxjs';

import { useWidgetsStore } from '../../store/widgets.ts';
import hero from './hero.ts';

class CreepsPulling {
  public readonly trigger = new Subject<void>();
  private readonly startedAfter = 60;
  private readonly endTime = 60 * 20;
  private nextTrigger: [number, number] = [NaN, NaN];

  private readonly creepsPullingStrategy = {
    radiant: {
      'radiant-t1-top': [18, 48],
      'dare-t1-top': [18, 48],
      'top-lotus-fountain': [18, 48],
      'radiant-t1-bottom': [19, 49],
      'dare-t1-bottom': [19, 49],
      'bottom-lotus-fountain': [19, 49],
    },
    dare: {
      'radiant-t1-top': [15, 45],
      'dare-t1-top': [15, 45],
      'top-lotus-fountain': [15, 45],
      'radiant-t1-bottom': [18, 48],
      'dare-t1-bottom': [18, 48],
      'bottom-lotus-fountain': [18, 48],
    },
  };

  init(clockTimeOfRunningGame: BehaviorSubject<number>) {
    clockTimeOfRunningGame
      .pipe(
        tap((seconds) => {
          if (
            this.startedAfter >= seconds ||
            seconds >= this.endTime ||
            !hero.teamName.value || // not ready
            !hero.isAlive.value || // doest show if player is not alive
            !this.creepsPullingStrategy?.[hero.teamName.value]?.[
              hero.position.value as keyof typeof this.creepsPullingStrategy.dare
            ] // if not in the list then skip
          ) {
            return;
          }

          const leadTime = useWidgetsStore.getState().state['creepsPulling'].leadTime;
          const strategy =
            this.creepsPullingStrategy?.[hero.teamName.value]?.[
              hero.position.value as keyof typeof this.creepsPullingStrategy.dare
            ];

          strategy?.forEach((interval, index) => {
            // calculate current tic
            const tic = Math.round(((seconds / 60) % 1) * 60);

            // If nextTrigger is NaN
            if (isNaN(this.nextTrigger[index])) {
              // Calculate the next time to trigger
              this.nextTrigger[index] = seconds;
            }

            // if less then next trigger time then skip it
            if (seconds < this.nextTrigger[index]) {
              return;
            }

            // Check if the current time is within the leadTime margin of the next multiple
            const isTimeToTrigger = tic < interval && interval - leadTime <= tic;

            if (isTimeToTrigger) {
              console.log('CreepsPulling');
              this.trigger.next();
              this.nextTrigger[index] = seconds + 60;
            }
          });
        }),
      )
      .subscribe();
  }

  restart(): void {
    this.nextTrigger = [NaN, NaN];
  }
}

const creepsPulling = new CreepsPulling();

export default creepsPulling;
