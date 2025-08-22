import './DownTab.scss'

function DownTab() {
  return (
    <div className="down-tab">
      <div className="down-tab__item">
        <img src="src/assets/icons/t1.png" alt="Inbox icon" className="down-tab__icon" />
        <p className="down-tab__label">Inbox</p>
      </div>

      <div className="down-tab__item">
        <img src="src/assets/icons/t2.png" alt="Planner icon" className="down-tab__icon" />
        <p className="down-tab__label">Planner</p>
      </div>

      <div className="down-tab__item down-tab__item--active">
        <img src="src/assets/icons/t3.png" alt="Boards icon" className="down-tab__icon" />
        <p className="down-tab__label">Board</p>
      </div>

      <div className="down-tab__item">
        <svg fill="none" viewBox="0 0 16 16" role="presentation" className="down-tab__icon down-tab__icon--switch">
          <path 
            fill="currentcolor" 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M2 3.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h1.833v-7zm3.333 0v7h2.334v-7zm3.834 0v7H11a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5zM0 4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm14.5 7.75V7H16v4.75A3.25 3.25 0 0 1 12.75 15H5v-1.5h7.75a1.75 1.75 0 0 0 1.75-1.75"
          />
        </svg>
        <p className="down-tab__label">Switch Boards</p>
      </div>
    </div>
  )
}

export default DownTab
