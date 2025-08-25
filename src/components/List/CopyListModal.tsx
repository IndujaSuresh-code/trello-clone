import * as React from 'react';
import { useState } from 'react';
import './CopyListModal.scss';

interface CopyListModalProps {
  title: string;
  onClose: () => void;
  onCopy: (newName: string) => void;
}

//React Hooks (useState, useEffect, useContext, etc.) 
// give functional components state and lifecycle abilities that previously only class components had.
const CopyListModal: React.FC<CopyListModalProps> = ({ title, onClose, onCopy }) => {
  const [newName, setNewName] = useState(`${title} (Copy)`);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleCreateList = () => {
    if (newName.trim()) {
      onCopy(newName.trim());
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="copy-list-modal">
        <div className="modal-header">
          <button className="back-button" onClick={onClose}>
            <img src="src/assets/icons/ab.png" alt="Back" />
          </button>
          <span className="modal-title">Copy list</span>
          <button className="close-button" onClick={onClose}>
            <img src="src/assets/icons/close.png" alt="Close" />
          </button>
        </div>
        <div className="modal-content">
          <label htmlFor="list-name">Name</label>
          <input
            id="list-name"
            type="text"
            value={newName}
            onChange={handleInputChange}
          />
          <button className="create-button" onClick={handleCreateList}>
            Create list
          </button>
        </div>
      </div>
    </div>
  );
};

export default CopyListModal;