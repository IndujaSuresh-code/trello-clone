import './DownTab.scss'

function DownTab() {
  return (
    <div className="down-tab">
      <div className="tab-item">
        <img src="src/assets/icons/t1.png" alt="Inbox icon" />
        <p>Inbox</p>
      </div>
      <div className="tab-item">
        <img src="src/assets/icons/t2.png" alt="Planner icon" />
        <p>Planner</p>
      </div>
      <div className="tab-item">
        <img src="src/assets/icons/t3.png" alt="Boards icon" />
        <p>Board</p>
      </div>
      <div className="tab-item">
        <svg fill="none" viewBox="0 0 16 16" role="presentation" className="switch-tabs">
          <path fill="currentcolor" fill-rule="evenodd" d="M2 3.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h1.833v-7zm3.333 0v7h2.334v-7zm3.834 0v7H11a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5zM0 4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm14.5 7.75V7H16v4.75A3.25 3.25 0 0 1 12.75 15H5v-1.5h7.75a1.75 1.75 0 0 0 1.75-1.75" clip-rule="evenodd"></path>
        </svg>
        <p>Switch Boards</p>
      </div>
    </div>
  )
}

export default DownTab