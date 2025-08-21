import React from 'react';
import './ArchiveAllCardsModal.scss';

interface ArchiveAllCardsModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const ArchiveAllCardsModal: React.FC<ArchiveAllCardsModalProps> = ({ onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="archive-all-cards-modal">
        <div className="modal-header">
          <button className="back-button" onClick={onClose}>
            <img src="src/assets/icons/ab.png" alt="Back" />
          </button>
          <span className="modal-title">Are you sure?</span>
          <button className="close-button" onClick={onClose}>
            <img src="src/assets/icons/close.png" alt="Close" />
          </button>
        </div>
        <div className="modal-content">
          <p>All cards in this list will be archived.</p>
          <button className="confirm-button" onClick={onConfirm}>
            Archive cards
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArchiveAllCardsModal;