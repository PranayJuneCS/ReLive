class AppBar extends React.Component {

  render() {
    return (
      <div>

        {/* Navbar*/}
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper container">
              <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
              <a href="#" className="brand-logo"><i className="material-icons">filter</i>Filterz <em style={{fontSize: "14px"}}>CalHacks 3.0</em></a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li className={["#home", "#"].includes(this.props.active) ? "active" : ""}><a href="#home" className="nav-anchor">Gallery</a></li>
                <li className={this.props.active == "#upload" ? "active" : ""}><a href="#upload" className="nav-anchor">Upload</a></li>
              </ul>
            </div>
          </nav>
        </div>
        

        {/* Sidebar */}
        <Sidebar active={this.props.active}/>
      </div>
    );
  }
}
