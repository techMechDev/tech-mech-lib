import React from 'react';
import PropTypes from 'prop-types';
import styles from './Component.module.css';

/**
 * UI component for user interaction
 */
const Component = ({ children }) => {
  return (
    <section
      className={styles.Component}
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

Component.defaultProps = {

};
