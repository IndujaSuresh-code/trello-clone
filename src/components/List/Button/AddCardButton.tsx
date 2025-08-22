import React, { useState } from 'react';
import './AddCardButton.scss';
import CloseButton from './CloseButton';
import SaveButton from './SaveButton';

interface AddCardButtonProps {
  onAddCard: (title: string) => void;
}

const AddCardButton: React.FC<AddCardButtonProps> = ({ onAddCard }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [cardTitle, setCardTitle] = useState('');

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleClose = () => {
    setIsAdding(false);
    setCardTitle('');
  };

  const handleSave = () => {
    if (cardTitle.trim() !== '') {
      onAddCard(cardTitle);
      handleClose();
    }
  };

  return (
    <div className="add-card-container">
      {isAdding ? (
        <div className="add-card-form">
          <textarea
            className="add-card-textarea"
            placeholder="Enter a title or paste a link"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            autoFocus
          ></textarea>
          <div className="add-card-actions">
            <SaveButton onClick={handleSave} />
<<<<<<< HEAD
            <CloseButton onClose={handleClose} />
=======
            <CloseButton onClick={handleClose} />
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
          </div>
        </div>
      ) : (
        <button className="add-card-button" onClick={handleAddClick}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="add-card-icon">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <p>Add a card</p>
        </button>
      )}
    </div>
  );
};

export default AddCardButton;