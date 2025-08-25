import * as React from 'react';
import './CheckBox.scss';

//prop object
interface CheckBoxProps {
  //properties
  onClick: (e: React.MouseEvent) => void;
  isCompleted: boolean;
}
//it adds children by default
//instead use  [function CheckBox({ onClick, isCompleted }: CheckBoxProps)]
const CheckBox: React.FC<CheckBoxProps> = ({ onClick, isCompleted }) => {
  return (
    <div
      //to change the checkbox style based on completion status
      className={`checkbox-container ${isCompleted ? 'completed' : ''}`}
      onClick={onClick}
    >
      {isCompleted && (
        <svg
          className="checkbox-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </div>
  );
};

export default CheckBox;