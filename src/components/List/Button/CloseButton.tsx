<<<<<<< HEAD
=======
// src/components/Button/CloseButton.tsx
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd

import React from 'react';
import './CloseButton.scss';

<<<<<<< HEAD
=======
// Define the props for the CloseButton component
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
interface CloseButtonProps {
  onClose: (e: React.MouseEvent) => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <button className="close-button" onClick={onClose}>
      &times;
    </button>
  );
};

export default CloseButton;