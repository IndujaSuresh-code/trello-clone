import * as React from 'react';
import { useState, useEffect } from 'react';
import './MoveCardModal.scss';
import { List as ListModel } from '../../models/List';

interface MoveCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMove: (targetListId: string, position: number) => void;
  currentListId: string;
  currentListTitle: string;
  currentPosition: number;
  lists: ListModel[];
  boardTitle: string;
}

const MoveCardModal: React.FC<MoveCardModalProps> = ({
  isOpen,
  onClose,
  onMove,
  currentListId,
  currentPosition,
  lists,
  boardTitle,
}) => {
  const [selectedBoard, setSelectedBoard] = useState(boardTitle);
  const [selectedListId, setSelectedListId] = useState(currentListId);
  const [selectedPosition, setSelectedPosition] = useState(currentPosition);

  useEffect(() => {
    const targetList = lists.find((list) => list.id === selectedListId);
    const maxPosition = targetList ? targetList.cards.length : 0;
    if (selectedPosition > maxPosition + 1) setSelectedPosition(maxPosition + 1);
  }, [selectedListId, selectedPosition, lists]);

  if (!isOpen) return null;

  const selectedList = lists.find((list) => list.id === selectedListId);
  const maxPosition = selectedList ? selectedList.cards.length + 1 : 1;

  const positionOptions = Array.from({ length: maxPosition }, (_, i) => i + 1);

  const handleMove = () => {
    onMove(selectedListId, selectedPosition - 1); // 0-based index
    onClose();
  };

  const handleListChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const listId = e.target.value;
    setSelectedListId(listId);
    const targetList = lists.find((list) => list.id === listId);
    setSelectedPosition(targetList ? targetList.cards.length + 1 : 1);
  };

  return (
    <div className="move-card-overlay">
      <div className="move-card-modal">
        <div className="move-card-header">
          <h3>Move card</h3>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="move-card-body">
          <div className="destination-tabs">
            <button className="tab active">Inbox</button>
            <button className="tab">Board</button>
          </div>

          <div className="suggested-section">
            <h4>Suggested</h4>
            <div className="suggested-option">
              <span className="arrow">→</span>
              <span>This Week</span>
            </div>
          </div>

          <div className="destination-section">
            <h4>Select destination</h4>
            
            <div className="form-group">
              <label>Board</label>
              <div className="custom-select">
                <select
                  value={selectedBoard}
                  onChange={(e) => setSelectedBoard(e.target.value)}
                  className="select-input"
                >
                  <option value={boardTitle}>{boardTitle}</option>
                </select>
                <img src="src/assets/icons/down.png" alt="dropdown" className="dropdown-icon" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>List</label>
                <div className="custom-select">
                  <select
                    value={selectedListId}
                    onChange={handleListChange}
                    className="select-input"
                  >
                    {lists.map((list) => (
                      <option key={list.id} value={list.id}>
                        {list.title}
                      </option>
                    ))}
                  </select>
                  <img src="src/assets/icons/down.png" alt="dropdown" className="dropdown-icon" />
                </div>
              </div>

              <div className="form-group">
                <label>Position</label>
                <div className="custom-select">
                  <select
                    value={selectedPosition}
                    onChange={(e) => setSelectedPosition(Number(e.target.value))}
                    className="select-input"
                  >
                    {positionOptions.map((position) => (
                      <option key={position} value={position}>
                        {position}
                      </option>
                    ))}
                  </select>
                  <img src="src/assets/icons/down.png" alt="dropdown" className="dropdown-icon" />
                </div>
              </div>
            </div>
          </div>

          <button className="move-button" onClick={handleMove}>Move</button>
        </div>
      </div>
    </div>
  );
};

export default MoveCardModal;
