import * as React from 'react';
import './EditCardButton.scss';

interface EditCardButtonProps {
  onClick: (e: React.MouseEvent) => void;
}

const EditCardButton: React.FC<EditCardButtonProps> = ({ onClick }) => {
  return (
    <button className="button button--edit" onClick={onClick}>
      <img src="src/assets/icons/edit.png" alt="Edit Icon" className="button__icon" />
    </button>
  );
};

export default EditCardButton;
