import { BehaviorSubject, Subject, tap } from 'rxjs';

import { useWidgetsStore } from '../../store/widgets.ts';

class WisdomRune {
  public readonly trigger = new Subject<void>();
  private readonly interval = 7 * 60;
  private readonly endTime = Infinity;
  private nextTrigger: number = NaN;

  init(clockTimeOfRunningGame: BehaviorSubject<number>) {
    clockTimeOfRunningGame
      .pipe(
        tap((seconds) => {
          if (seconds >= this.endTime) {
            return;
          }

          const leadTime = useWidgetsStore.getState().state['wisdom'].leadTime;

          // Calculate the next multiple of the interval
          const nextMultiple = Math.ceil(seconds / this.interval) * this.interval;

          // If nextTrigger is NaN or the current time has passed the nextTrigger time, calculate nextTrigger
          if (isNaN(this.nextTrigger) || seconds >= this.nextTrigger) {
            // Calculate the next time to trigger
            this.nextTrigger = nextMultiple;
          }

          // Check if the current time is within the leadTime margin of the next multiple
          const isTimeToTrigger =
            seconds >= this.nextTrigger - leadTime && seconds < this.nextTrigger;

          if (isTimeToTrigger) {
            console.log('WisdomRune');
            this.trigger.next();
            this.nextTrigger = nextMultiple + this.interval;
          }
        }),
      )
      .subscribe();
  }

  restart(): void {
    this.nextTrigger = NaN;
  }
}

const wisdomRune = new WisdomRune();

export default wisdomRune;
