import { useEffect } from 'react';

import stackCampImg from '../../assets/ancient_rock_golem.webp';
import stackCamp from '../../core/plugins/stackCamp.ts';
import { useWidgetsStore } from '../../store/widgets.ts';
import SoundQueue from '../../utils/soundQueue.ts';
import { useTimeBasedAction } from '../../utils/useTimeBasedAction.ts';
import WidgetContainer from '../WidgetContainer';
import styles from './styles.module.scss';

interface StackCampWidgetProps {
  isEditable?: boolean;
}

const StackCampWidget = (props: StackCampWidgetProps) => {
  const { isEditable } = props;

  const id = 'stackCamp';

  const showStackCampWidget = useWidgetsStore((store) => store.state[id].show);
  const [isTimeToShow, trigger] = useTimeBasedAction({
    time: 3000,
    callback: () => {
      SoundQueue.enqueue('/sounds/Pud_ability_hook_01_ru.mp3');
    },
  });

  const canShow = (showStackCampWidget && isTimeToShow) || isEditable;

  useEffect(() => {
    const subscription = stackCamp.trigger.subscribe(() => trigger());

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!canShow) {
    return null;
  }

  return (
    <WidgetContainer isEditable={isEditable} id={id}>
      <div className={styles.container}>
        <img
          draggable={false}
          className={styles.img}
          src={stackCampImg}
          alt="stack camp"
        />
      </div>
    </WidgetContainer>
  );
};

export default StackCampWidget;
