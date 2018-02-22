import React from 'react';

export default (props) => (
  <div
    onClick={() => 
      props.music ?
      props.onPlay() : null
    }
    style={{
      position: 'relative', 
      zIndex: 99,
      width: window.innerWidth,
      height: window.innerWidth * 9/16,
      cursor: props.music ? 'pointer' : 'auto'
    }}
    ref={props.setRef}
  >
  </div>
);