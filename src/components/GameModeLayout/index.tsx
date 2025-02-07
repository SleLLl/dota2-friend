import { useAppStore } from '../../store/app.ts';
import CreepsPullingWidget from '../CreepsPullingWidget';
import StackCampWidget from '../StackCampWidget';
import WisdomRuneWidget from '../WisdomRuneWidget';
import styles from './styles.module.scss';

interface GameModeLayoutProps {
  isEditable?: boolean;
}

const GameModeLayout = (props: GameModeLayoutProps) => {
  const disableNotifications = useAppStore((store) => store.disableNotifications);
  const { isEditable } = props;

  return (
    <div className={styles.container}>
      {(!disableNotifications || isEditable) && (
        <>
          <WisdomRuneWidget isEditable={isEditable} />
          <StackCampWidget isEditable={isEditable} />
          <CreepsPullingWidget isEditable={isEditable} />
        </>
      )}
    </div>
  );
};

export default GameModeLayout;
