import React from 'react';
import PropTypes from 'prop-types';
import styles from './component.module.css';

/**
 * UI component for user interaction
 */
const Component = ({ children }) => {
  return (
    <section
      className={styles.component}
    >
      {children}
    </section>
  );
};

export default Component;

Component.propTypes = {
  /**
   * Component contents
   */
  children: PropTypes.node.isRequired
};

Button.defaultProps = {
    
};
