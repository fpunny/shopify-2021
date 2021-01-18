import { FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import useAnimatedState from '../../utils/useAnimatedState';
import { ClassNamesPropType } from '../../utils/propTypes';
import Text from '../Text';
import styles from './Button.module.scss';

export default function Button({
  rightIcon: RightIcon,
  leftIcon: LeftIcon,
  color = `primary`,
  linkProps = {},
  type = `solid`,
  className,
  children,
  disabled,
  onClick,
  loading,
}) {
  const { isMounted, isShown } = useAnimatedState(loading, `page`);
  let Component = `button`;

  if (linkProps.to) {
    Component = Link;
  } else if (linkProps.href) {
    Component = `a`;
  }

  return (
    <Component
      {...linkProps}
      className={classNames(
        (Component === `a` || Component === Link) && styles[`button--link`],
        Component === `button` && styles[`button--button`],
        styles[`button--color-${color}`],
        styles[`button--style-${type}`],
        styles.button,
        className,
      )}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {isMounted && (
        <span
          className={classNames(
            !isShown && styles[`pane--loading-hide`],
            styles[`pane--loading`],
            styles.pane,
          )}
        >
          <FaSpinner className={styles.loader} />
        </span>
      )}
      <Text
        color={type === `solid` ? `background` : color}
        className={classNames(
          isShown && styles[`pane--content-hide`],
          styles[`pane--content`],
          styles.pane,
        )}
        align='center'
        type='meta1'
        tag='span'
      >
        {LeftIcon && (
          <span className={classNames(styles.icon, styles[`icon--left`])}>
            <LeftIcon />
          </span>
        )}
        <span className={styles.text}>
          {children}
        </span>
        {RightIcon && (
          <span className={classNames(styles.icon, styles[`icon--right`])}>
            <RightIcon />
          </span>
        )}
      </Text>
    </Component>
  );
}

Button.propTypes = {
  rightIcon: PropTypes.elementType,
  leftIcon: PropTypes.elementType,
  color: PropTypes.string,
  linkProps: PropTypes.oneOfType([
    PropTypes.shape({
      href: PropTypes.string,
    }),
    PropTypes.shape({
      to: PropTypes.string,
    }),
  ]),
  type: PropTypes.oneOf([`solid`, `outline`, `ghost`]),
  className: ClassNamesPropType,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
};
