import React from 'react';
import './CloseButton.scss';

interface CloseButtonProps {
  onClose: (e: React.MouseEvent) => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <button className="button button--close" onClick={onClose}>
      &times;
    </button>
  );
};

export default CloseButton;
