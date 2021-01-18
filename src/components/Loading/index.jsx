import classNames from 'classnames';
import { FaSpinner } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from '../../utils/propTypes';
import Text from '../Text';
import styles from './Loading.module.scss';

const config = {
  normal: {
    type: `body1`,
  },
  large: {
    type: `heading2`,
  },
};

export default function Loading({ className, size = `normal` }) {
  const _config = config[size] || config.normal;
  return (
    <div className={classNames(styles.container, className)}>
      <FaSpinner
        className={classNames(styles[`spinner--size-${size}`], styles.spinner)}
      />
      <Text
        className={classNames(styles[`text--size-${size}`], styles.text)}
        weight='normal'
        tag='span'
        type={_config.type}
        color='text-alt'
      >
        Loading
      </Text>
    </div>
  );
}

Loading.propTypes = {
  className: ClassNamesPropType,
  size: PropTypes.oneOf([`normal`, `large`]),
};
