import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from '../../utils/propTypes';
import styles from './Section.module.scss';

export default function Section({
  backgroundColor = `background`,
  className,
  children,
}) {
  return (
    <section
      className={classNames(
        styles[`container--color-${backgroundColor}`],
        styles.container,
      )}
    >
      {/* Classname here to preserve rules that section has in parent */}
      <div className={classNames(styles.content, className)}>{children}</div>
    </section>
  );
}

Section.propTypes = {
  backgroundColor: PropTypes.oneOf([
    `background`,
    `background-alt`,
    `primary-alt`,
  ]),
  className: ClassNamesPropType,
  children: PropTypes.node,
};
