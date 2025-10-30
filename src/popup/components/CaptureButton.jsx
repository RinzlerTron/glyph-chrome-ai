import React from 'react';

function CaptureButton({ onClick, disabled }) {
  return (
    <button
      className="capture-button"
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? 'Processing...' : 'Capture Article'}
    </button>
  );
}

export default CaptureButton;
