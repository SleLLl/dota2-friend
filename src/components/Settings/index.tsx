import { Divider, Flex } from 'antd';

import styles from './styles.module.scss';

const Settings = () => {
  return (
    <main className={styles.container}>
      <Flex className={styles.overlay} align="flex-start">
        <Divider orientation="center">
          <h1>Settings</h1>
        </Divider>
      </Flex>
    </main>
  );
};

export default Settings;
