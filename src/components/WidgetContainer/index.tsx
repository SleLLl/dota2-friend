import 'react-resizable/css/styles.css';

import classNames from 'classnames';
import { useRef, useState } from 'react';
import * as React from 'react';
import Draggable from 'react-draggable';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';

import { useWidgetsStore } from '../../store/widgets.ts';
import styles from './styles.module.scss';

interface WidgetContainerProps {
  id: string;
  isEditable?: boolean;
  children: React.ReactNode;
}

const WidgetContainer = (props: WidgetContainerProps) => {
  const { id, children, isEditable } = props;

  const nodeRef = useRef(null);
  const widgetData = useWidgetsStore((store) => store.state[id]);
  const setWidgetPosition = useWidgetsStore((store) => store.setWidgetPosition);
  const setWidgetSize = useWidgetsStore((store) => store.setWidgetSize);
  const [isResizing, setIsResizing] = useState(false);

  const onResizeStop = (_: React.SyntheticEvent, { size }: ResizeCallbackData) => {
    setIsResizing(false);
    setWidgetSize(id, size);
  };

  const onResizeStart = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
  };

  return (
    <Draggable
      bounds="parent"
      nodeRef={nodeRef}
      position={widgetData.position}
      disabled={isResizing || !isEditable}
      onStop={(_, data) => setWidgetPosition(id, { x: data.x, y: data.y })}>
      <div className={styles.wrapper} ref={nodeRef}>
        <ResizableBox
          handle={isEditable ? undefined : () => <div></div>}
          width={widgetData.size.width}
          height={widgetData.size.height}
          resizeHandles={['se']}
          onResizeStart={onResizeStart}
          onResizeStop={onResizeStop}>
          <div className={classNames(styles.container, isEditable && styles.editable)}>
            {children}
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default WidgetContainer;
