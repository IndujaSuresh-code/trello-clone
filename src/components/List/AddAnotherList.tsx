import React from 'react';
import './AddAnotherList.scss';

interface AddAnotherListProps {
  onAddList: () => void;
}

const AddAnotherList: React.FC<AddAnotherListProps> = ({ onAddList }) => {
  return (
    <div className="add-list" onClick={onAddList}>
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="add-list__icon">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      <p className="add-list__text">Add another list</p>
    </div>
  );
};

export default AddAnotherList;
