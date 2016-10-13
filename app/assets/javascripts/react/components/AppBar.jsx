class AppBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {sidebar: false}
  }

  hamburger(event) {
    this.setState({sidebar: !this.state.sidebar});
  }

  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper container">
            <a href="#" className="brand-logo"><material.Icon>filter</material.Icon>Filterz</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="#home" className="nav-anchor">Gallery</a></li>
              <li><a href="#upload" className="nav-anchor">Upload</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
