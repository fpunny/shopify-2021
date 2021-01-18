import { createPortal } from 'react-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { ClassNamesPropType } from '../../utils/propTypes';
import useAnimatedState from '../../utils/useAnimatedState';
import styles from './Popup.module.scss';

const portal = document.getElementById(`popup`);
export default function Popup({
  show,
  onBackground = () => {},
  children,
  className,
}) {
  const { isMounted, isShown } = useAnimatedState(show);
  const backdrop = useRef();

  return (
    isMounted &&
    createPortal(
      <div
        onClick={(event) => {
          if (event.target === backdrop.current) {
            onBackground(event);
          }
        }}
        className={classNames(
          !isShown && styles[`container--fade`],
          styles.container,
        )}
        ref={backdrop}
      >
        <div className={classNames(styles.content, className)}>{children}</div>
      </div>,
      portal,
    )
  );
}

Popup.propTypes = {
  show: PropTypes.bool,
  onBackground: PropTypes.func,
  children: PropTypes.node,
  className: ClassNamesPropType,
};
