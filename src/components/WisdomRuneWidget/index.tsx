import { useEffect } from 'react';

import wisdomRuneImg from '../../assets/rune_of_wisdom.webp';
import wisdomRune from '../../core/plugins/wisdomRune.ts';
import { useWidgetsStore } from '../../store/widgets.ts';
import SoundQueue from '../../utils/soundQueue.ts';
import { useTimeBasedAction } from '../../utils/useTimeBasedAction.ts';
import WidgetContainer from '../WidgetContainer';
import styles from './styles.module.scss';

interface WisdomRuneWidgetProps {
  isEditable?: boolean;
}

const WisdomRuneWidget = (props: WisdomRuneWidgetProps) => {
  const { isEditable } = props;

  const id = 'wisdom';

  const showWisdomRuneWidget = useWidgetsStore((store) => store.state[id].show);
  const [isTimeToShow, trigger] = useTimeBasedAction({
    time: 3000,
    callback: () => {
      SoundQueue.enqueue('/sounds/Pud_ability_hook_06_ru.mp3');
    },
  });

  const canShow = (showWisdomRuneWidget && isTimeToShow) || isEditable;

  useEffect(() => {
    const subscription = wisdomRune.trigger.subscribe(() => trigger());

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
          src={wisdomRuneImg}
          alt="wisdom rune"
        />
      </div>
    </WidgetContainer>
  );
};

export default WisdomRuneWidget;
