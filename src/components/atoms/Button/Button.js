import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.module.css';

/**
 * Primary UI component for user interaction
 */
const Button = ({ type, backgroundColor, size, children, ...props }) => {
  return (
    <button
      type="button"
      className={[styles.button, styles[`button-${size}`], styles[`button-${type}`]].join(' ')}
      style={backgroundColor && { backgroundColor }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  type: PropTypes.oneOf['primary', 'secondary',  'tertiary', 'quaternary', 'quinary'],
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  children: PropTypes.node.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  type: 'primary',
  size: 'medium',
  onClick: undefined
};
