import React from 'react';
import './EditCardButton.scss';

interface EditCardButtonProps {
  onClick: (e: React.MouseEvent) => void;
}

const EditCardButton: React.FC<EditCardButtonProps> = ({ onClick }) => {
  return (
    <button className="edit-card-button" onClick={onClick}>
      <img src="src/assets/icons/edit.png" alt="Edit Icon" />
    </button>
  );
};

export default EditCardButton;