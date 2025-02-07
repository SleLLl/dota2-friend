import type { TourProps } from 'antd';
import { Tour } from 'antd';

import { useAppStore } from '../../store/app.ts';
import GameModeLayout from '../GameModeLayout';
import notificationPositionGif from './notification-position.gif';
import settingsGif from './settings.gif';
import styles from './styles.module.scss';
import systemTrayGif from './system-tray.gif';

const NotificationLayoutSettings = () => {
  const openTour = useAppStore((store) => !store.isNotificationLayoutTourWasShown);
  const closeTour = useAppStore((store) => store.setIsNotificationLayoutTourWasShown);

  const steps: TourProps['steps'] = [
    {
      title: 'Wisdom rune',
      description:
        'The wisdom rune notification will appear 15 seconds before it appears, you can change this time in the settings.',
      target: () => window.document.getElementById('wisdom')!,
    },
    {
      title: 'Stack camp',
      description:
        'The notification will appear 10 seconds before every chance to stack, you can change this time in the settings.',
      target: () => window.document.getElementById('stackCamp')!,
    },
    {
      title: 'Creeps pulling',
      description:
        'The notification will appear 10 seconds before you should hit the local camps, you can change this time in the settings.',
      target: () => window.document.getElementById('creepsPulling')!,
    },
    {
      title: 'Notification Layout',
      description: 'You can change the position of notifications by dragging them.',
      cover: <img alt="notification position" src={notificationPositionGif} />,
      target: () => window.document.getElementById('tour-general')!,
    },
    {
      title: 'Notification Layout',
      description:
        'When you are done with the customisation just close the app and it will minimise to the system menu and will be waiting for a game.',
      cover: <img alt="system tray" src={systemTrayGif} />,
      target: () => window.document.getElementById('tour-general')!,
    },
    {
      title: 'Notification Settings',
      description:
        'For notification settings, go to settings via the system tray, then you can configure each widget.',
      cover: <img alt="app settings" src={settingsGif} />,
      target: () => window.document.getElementById('tour-general')!,
    },
  ];

  return (
    <main className={styles.container}>
      <div className={styles.overlay}>
        <GameModeLayout isEditable />
        <Tour open={openTour} onClose={() => closeTour(true)} steps={steps} />
        <div className={styles.tour_container} id="tour-general" />
      </div>
    </main>
  );
};

export default NotificationLayoutSettings;
