import { BankOutlined, LinkOutlined, NotificationOutlined } from '@ant-design/icons';
import {
  Divider,
  Flex,
  Form,
  InputNumber,
  Layout,
  Menu,
  MenuProps,
  Switch,
  Typography,
} from 'antd';
import { useState } from 'react';

import { useAppStore } from '../../store/app.ts';
import { useWidgetsStore } from '../../store/widgets.ts';
import styles from './styles.module.scss';

const { Content } = Layout;
const { Title, Text } = Typography;

const items = [
  {
    key: 'general',
    icon: <BankOutlined />,
    label: 'General',
  } as const,
  {
    key: 'notifications',
    icon: <NotificationOutlined />,
    label: 'Notifications',
  } as const,
  {
    key: 'link',
    icon: <LinkOutlined />,
    label: (
      <a
        href="https://github.com/SleLLl/dota2-friend"
        target="_blank"
        rel="noopener noreferrer">
        Source code
      </a>
    ),
  } as const,
];

type MenuKey = (typeof items)[number]['key'];

const Settings = () => {
  const [current, setCurrent] = useState<MenuKey>('general');
  const disableNotifications = useAppStore((store) => store.disableNotifications);
  const setDisableNotifications = useAppStore((store) => store.setDisableNotifications);

  const disableSounds = useAppStore((store) => store.disableSounds);
  const setDisableSounds = useAppStore((store) => store.setDisableSounds);

  const widgetStore = useWidgetsStore((store) => store.state);
  const setShowWidget = useWidgetsStore((store) => store.setShowWidget);
  const setWidgetDisableSound = useWidgetsStore((store) => store.setWidgetDisableSound);
  const setWidgetLeadTime = useWidgetsStore((store) => store.setWidgetLeadTime);

  const onDisableSound = (id: string) => {
    return (value: boolean) => {
      setWidgetDisableSound(id, value);
    };
  };

  const onShowChange = (id: string) => {
    return (value: boolean) => {
      setShowWidget(id, value);
    };
  };

  const onLeadTimeChange = (id: string) => {
    return (value: number | null) => {
      if (value === null || value === undefined) {
        return;
      }

      setWidgetLeadTime(id, value);
    };
  };

  const onMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'link') {
      return;
    }

    setCurrent(e.key as MenuKey);
  };

  return (
    <main className={styles.container}>
      <Flex className={styles.overlay} align="flex-start" vertical>
        <Divider orientation="center">
          <Title level={1}>Settings</Title>
        </Divider>
        <Flex className={styles.wrapper}>
          <Menu
            theme="dark"
            className={styles.sider}
            mode="inline"
            items={items}
            onClick={onMenuClick}
            selectedKeys={[current]}
          />
          <Content>
            {current === 'general' && (
              <>
                <Flex justify="space-between">
                  <Title level={4}>Disable sounds</Title>
                  <Switch value={disableSounds} onChange={setDisableSounds} />
                </Flex>
                <Flex justify="space-between">
                  <Title level={4}>Disable notifications</Title>
                  <Switch
                    value={disableNotifications}
                    onChange={setDisableNotifications}
                  />
                </Flex>
              </>
            )}

            {current === 'notifications' && (
              <>
                <Divider orientation="left">
                  <Text>Creeps pulling</Text>
                </Divider>
                <Flex justify="space-between" gap={20}>
                  <Form.Item label="Notify before:">
                    <InputNumber
                      min={0}
                      max={15}
                      addonAfter="seconds"
                      value={widgetStore['creepsPulling'].leadTime}
                      onChange={onLeadTimeChange('creepsPulling')}
                      defaultValue={10}
                    />
                  </Form.Item>
                  <Form.Item label="Disable sound">
                    <Switch
                      value={widgetStore['creepsPulling'].disableSound}
                      onChange={onDisableSound('creepsPulling')}
                    />
                  </Form.Item>
                  <Form.Item label="Enabled">
                    <Switch
                      value={widgetStore['creepsPulling'].show}
                      onChange={onShowChange('creepsPulling')}
                    />
                  </Form.Item>
                </Flex>
                <Divider orientation="left">
                  <Text>Stack camp</Text>
                </Divider>
                <Flex justify="space-between" gap={20}>
                  <Form.Item label="Notify before:">
                    <InputNumber
                      min={4}
                      max={15}
                      addonAfter="seconds"
                      value={widgetStore['stackCamp'].leadTime}
                      onChange={onLeadTimeChange('stackCamp')}
                      defaultValue={10}
                    />
                  </Form.Item>
                  <Form.Item label="Disable sound">
                    <Switch
                      value={widgetStore['stackCamp'].disableSound}
                      onChange={onDisableSound('stackCamp')}
                    />
                  </Form.Item>
                  <Form.Item label="Enabled">
                    <Switch
                      value={widgetStore['stackCamp'].show}
                      onChange={onShowChange('stackCamp')}
                    />
                  </Form.Item>
                </Flex>
                <Divider orientation="left">
                  <Text>Wisdom rune</Text>
                </Divider>
                <Flex justify="space-between" gap={20}>
                  <Form.Item label="Notify before:">
                    <InputNumber
                      min={0}
                      max={30}
                      addonAfter="seconds"
                      value={widgetStore['wisdom'].leadTime}
                      onChange={onLeadTimeChange('wisdom')}
                      defaultValue={15}
                    />
                  </Form.Item>
                  <Form.Item label="Disable sound">
                    <Switch
                      value={widgetStore['wisdom'].disableSound}
                      onChange={onDisableSound('wisdom')}
                    />
                  </Form.Item>
                  <Form.Item label="Enabled">
                    <Switch
                      value={widgetStore['wisdom'].show}
                      onChange={onShowChange('wisdom')}
                    />
                  </Form.Item>
                </Flex>
              </>
            )}
          </Content>
        </Flex>
      </Flex>
    </main>
  );
};

export default Settings;
