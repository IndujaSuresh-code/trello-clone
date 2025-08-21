import "./navStyles.scss";

function NavbarTop() {
  return (
    <nav className="navbar">
      <img src="src/assets/icons/menu1.png" alt="icon" className="navbar-icon" />
      <div className="navbar-logo">
        <img src="src/assets/images/logo.png" alt="logo" className="navbar-logo-img" />
      </div>
      <div className="search-container">
        <img src="src/assets/icons/search.png" alt="search" className="search-icon" />
        <input name="Search" placeholder="Search" />
      </div>
      <button className="create-button">Create</button>
      <svg fill="none" viewBox="0 0 16 16" role="presentation" className="share"><path fill="currentcolor" fill-rule="evenodd" d="M13.5 3.096a.5.5 0 0 0-.686-.464L7.5 4.758v4.734l5.314 2.126a.5.5 0 0 0 .686-.464zm-6 8.012 4.757 1.903A2 2 0 0 0 15 11.154V3.096a2 2 0 0 0-2.743-1.857L6.606 3.5H3a2 2 0 0 0-2 2v3.25a2 2 0 0 0 2 2h.5V13a2 2 0 0 0 2 2h1.25a.75.75 0 0 0 .75-.75zM6 9.25H3a.5.5 0 0 1-.5-.5V5.5A.5.5 0 0 1 3 5h3zm0 1.5v2.75h-.5A.5.5 0 0 1 5 13v-2.25z" clip-rule="evenodd"></path></svg>
      <svg fill="none" viewBox="-4 -4 24 24" role="presentation" className="bell"><path fill="currentcolor" fill-rule="evenodd" d="M3 5a5 5 0 0 1 10 0v3.535l1.788 2.861a1.375 1.375 0 0 1-1.166 2.104h-2.459a3.251 3.251 0 0 1-6.326 0h-2.46a1.375 1.375 0 0 1-1.165-2.104L3 8.535zm3.418 8.5a1.75 1.75 0 0 0 3.164 0zM8 1.5A3.5 3.5 0 0 0 4.5 5v3.636c0 .215-.06.426-.175.608L2.603 12h10.794l-1.723-2.756a1.15 1.15 0 0 1-.174-.608V5A3.5 3.5 0 0 0 8 1.5" clip-rule="evenodd"></path></svg>
      <img src="src/assets/icons/help.png" alt="help" className="navbar-help" />
      <img src="src/assets/images/30.png" alt="profile" className="navbar-profile" />
    </nav>
  );
}

export default NavbarTop;
