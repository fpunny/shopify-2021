import PropTypes from 'prop-types';

const _ClassNamesPropType = PropTypes.oneOfType([
  PropTypes.objectOf(PropTypes.bool),
  PropTypes.string,
  PropTypes.bool,
]);

export const ClassNamesPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(_ClassNamesPropType),
  _ClassNamesPropType,
]);
