import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ClassNamesPropType } from '../../utils/propTypes';
import Text from '../Text';
import styles from './Input.module.scss';

export default function Input({
  status = {},
  placeholder,
  icon: Icon,
  className,
  onChange,
  loading,
  readOnly,
  value,
  label,
  type,
  name,
}) {
  if (process.env.NODE_ENV !== `production`) {
    if (status.type && ![`error`, `success`].includes(status.type)) {
      throw new Error(`${status.type} is not a valid status`);
    }
  }

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={classNames(styles.container, className)}>
      <label htmlFor={name} className={styles.label}>
        <Text type='meta1' color='primary' weight='bold'>
          {label}
        </Text>
      </label>
      <div
        className={classNames(
          isFocused && styles[`input--active`],
          styles.input,
        )}
      >
        {Icon && (
          <span className={classNames(styles[`icon--left`], styles.icon)}>
            <Icon />
          </span>
        )}
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={styles.element}
          placeholder={placeholder}
          onChange={onChange}
          readOnly={readOnly}
          value={value}
          type={type}
          name={name}
        />
        {loading && (
          <span className={classNames(styles[`icon--right`], styles.icon)}>
            <FaSpinner className={styles.loading} />
          </span>
        )}
      </div>
      {status.text && (
        <Text className={styles.status} type='meta1' color={status.type}>
          {status.text}
        </Text>
      )}
    </div>
  );
}

Input.propTypes = {
  status: PropTypes.shape({
    type: PropTypes.oneOf([`success`, `error`]),
    text: PropTypes.string,
  }),
  placeholder: PropTypes.string,
  icon: PropTypes.elementType,
  className: ClassNamesPropType,
  onChange: PropTypes.func,
  loading: PropTypes.bool,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.node,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
};
