import { useEffect } from 'react';

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
  const [isTimeToShow, trigger] = useTimeBasedAction({
    time: 3000,
    callback: () => {
      SoundQueue.enqueue('/sounds/Pud_ability_hook_miss_03_ru.mp3');
    },
  });

  const canShow = (showCreepsPullingWidget && isTimeToShow) || isEditable;

  useEffect(() => {
    const subscription = creepsPulling.trigger.subscribe(() => trigger());

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
