import React from 'react';
import './SaveButton.scss';

interface SaveButtonProps {
  // onclick is sent as a prop to the SaveButton component
  onClick: (e: React.MouseEvent) => void; // return type void
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => {
  return (
    <button className="button button--save" onClick={onClick}>
      Save
    </button>
  );
};

export default SaveButton;
