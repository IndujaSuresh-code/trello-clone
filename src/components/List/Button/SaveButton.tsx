import React from 'react';
import './SaveButton.scss';

interface SaveButtonProps {
<<<<<<< HEAD
  //onclick is sent as a prop to the SaveButton component
  onClick: (e: React.MouseEvent) => void; //return type void
=======
  onClick: (e: React.MouseEvent) => void;
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => {
  return (
    <button className="save-button" onClick={onClick}>
      Save
    </button>
  );
};

export default SaveButton;