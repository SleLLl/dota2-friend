import { BehaviorSubject, Subject, tap } from 'rxjs';

import { useWidgetsStore } from '../../store/widgets.ts';

class StackCamp {
  public readonly trigger = new Subject<void>();
  private readonly startedAfter = 60;
  private readonly interval = 60;
  private readonly endTime = 60 * 20;
  private nextTrigger: number = NaN;

  init(clockTimeOfRunningGame: BehaviorSubject<number>) {
    clockTimeOfRunningGame
      .pipe(
        tap((seconds) => {
          if (seconds >= this.endTime || this.startedAfter >= seconds) {
            return;
          }

          const leadTime = useWidgetsStore.getState().state['stackCamp'].leadTime;

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
            console.log('StackCamp');
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

const stackCamp = new StackCamp();

export default stackCamp;
