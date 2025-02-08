import { useEffect } from 'react';
import { Subscription } from 'rxjs';

import creepsImg from '../../assets/creeps.webp';
import creepsPulling from '../../core/plugins/creepsPulling.ts';
import { useWidgetsStore } from '../../store/widgets.ts';
import SoundQueue from '../../utils/soundQueue.ts';
import { useTimeBasedAction } from '../../utils/useTimeBasedAction.ts';
import WidgetContainer from '../WidgetContainer';
import styles from './styles.module.scss';

interface CreepsPullingWidgetProps {
  isEditable?: boolean;
}

const CreepsPullingWidget = (props: CreepsPullingWidgetProps) => {
  const { isEditable } = props;

  const id = 'creepsPulling';

  const showCreepsPullingWidget = useWidgetsStore((store) => store.state[id].show);
  const isSoundWidgetDisabled = useWidgetsStore((store) => store.state[id].disableSound);
  const [isTimeToShow, trigger] = useTimeBasedAction({
    time: 3000,
    callback: () => {
      if (!isSoundWidgetDisabled) SoundQueue.enqueue('/sounds/creepsPulling.mp3');
    },
  });

  const canShow = (showCreepsPullingWidget && isTimeToShow) || isEditable;

  useEffect(() => {
    let subscription: Subscription | undefined;

    if (showCreepsPullingWidget) {
      subscription = creepsPulling.trigger.subscribe(() => trigger());
    }

    return () => {
      subscription?.unsubscribe?.();
    };
  }, [showCreepsPullingWidget]);

  if (!canShow) {
    return null;
  }

  return (
    <WidgetContainer isEditable={isEditable} id="creepsPulling">
      <div className={styles.container}>
        <img
          draggable={false}
          className={styles.img}
          src={creepsImg}
          alt="creeps pulling"
        />
      </div>
    </WidgetContainer>
  );
};

export default CreepsPullingWidget;
