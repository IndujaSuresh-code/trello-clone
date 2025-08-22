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
    <div className="add-card">
      {isAdding ? (
        <div className="add-card__form">
          <textarea
            className="add-card__textarea"
            placeholder="Enter a title or paste a link"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            autoFocus
          ></textarea>
          <div className="add-card__actions">
            <SaveButton onClick={handleSave} />
            <CloseButton onClose={handleClose} />
          </div>
        </div>
      ) : (
        <button className="add-card__button" onClick={handleAddClick}>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="add-card__icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <p className="add-card__label">Add a card</p>
        </button>
      )}
    </div>
  );
};

export default AddCardButton;
