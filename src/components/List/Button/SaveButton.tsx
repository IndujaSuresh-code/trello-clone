import React from 'react';
import './SaveButton.scss';

interface SaveButtonProps {
  onClick: (e: React.MouseEvent) => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => {
  return (
    <button className="save-button" onClick={onClick}>
      Save
    </button>
  );
};

export default SaveButton;