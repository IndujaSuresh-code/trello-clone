import React, { useState } from 'react';
import './ListAction.scss';

interface ListActionProps {
  onAddCard: () => void;
  onCopyList: () => void;
  onArchiveList: () => void;
  onArchiveAllCards: () => void;
}

const ListAction: React.FC<ListActionProps> = ({ 
  onAddCard, 
  onCopyList, 
  onArchiveList, 
  onArchiveAllCards 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  
<<<<<<< HEAD
=======
  // The handleArchiveAllCards function is simplified to just call the prop
  // The parent component will handle the confirmation modal.
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
  const handleArchiveAllCards = () => {
    onArchiveAllCards();
    setIsOpen(false);
  };

  return (
    <div className="list-action-dropdown">
<<<<<<< HEAD
=======
      {/* 3-dot menu icon */}
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
      <svg onClick={toggleDropdown} width="24" height="24" viewBox="0 0 24 24" className="list-action-icon">
        <path fill="currentColor" d="M5 14c1.1 0 2-.9 2-2s-.9-2-2-2 .9-2-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7-2c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z"/>
      </svg>

      {isOpen && (
        <div className="list-action-menu">
          <div className="list-action-title">List actions</div>
          
<<<<<<< HEAD
=======
          {/* Functional items */}
>>>>>>> 143a83e1a447e8591d20c1bbeb09dedd66a92cfd
          <a onClick={onAddCard}>Add card</a>
          <a onClick={onCopyList}>Copy list</a>
          <a>Move list</a>
          <a>Move all cards in this list</a>
          <a>Sort by...</a>
          <a>Watch</a>

          <div className="list-divider"></div>

          <div className="list-action-subtitle">Automation</div>
          <a>When a card is added to the list...</a>
          <a>Every day, sort list by...</a>
          <a>Every Monday, sort list by...</a>
          <a>Create a rule</a>

          <div className="list-divider"></div>

          <a onClick={onArchiveList}>Archive this list</a>
          <a onClick={handleArchiveAllCards}>Archive all cards in this list</a>
        </div>
      )}
    </div>
  );
};

export default ListAction;