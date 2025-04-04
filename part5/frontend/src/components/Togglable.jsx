import React, { useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef((props, ref) => {
   const [visible, setVisible] = useState(false);

   const hideWhenVisible = { display: visible ? 'none' : '' };
   const showWhenVisible = { display: visible ? '' : 'none' };

   const toggleVisibility = () => {
      setVisible(!visible);
   };

   Togglable.propTypes = {
      buttonLabel: PropTypes.string.isRequired
   };
   
   Togglable.displayName = 'Togglable';

   useImperativeHandle(ref, () => {
      return {
         toggleVisibility
      };
   });

   return (
      <div>
         <div style={hideWhenVisible}>
            <button data-testid="add-blog-button" onClick={toggleVisibility}>{props.buttonLabel}</button>
         </div>
         <div style={showWhenVisible}>
            {props.children}
            <button onClick={toggleVisibility}>cancel</button>
         </div>
      </div>
   );
});

export default Togglable;