import GameModeLayout from '../GameModeLayout';
import styles from './styles.module.scss';

const NotificationLayoutSettings = () => {
  return (
    <main className={styles.container}>
      <GameModeLayout isEditable />
    </main>
  );
};

export default NotificationLayoutSettings;
