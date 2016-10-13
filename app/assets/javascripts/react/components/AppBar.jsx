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
      <div>

        {/* Navbar*/}
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper container">
              <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
              <a href="#" className="brand-logo"><i className="material-icons">filter</i>Filterz</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href="#home" className="nav-anchor">Gallery</a></li>
                <li><a href="#upload" className="nav-anchor">Upload</a></li>
              </ul>
            </div>
          </nav>
        </div>
        

        {/* Sidebar */}
        <ul id="slide-out" className="side-nav">
          <li><div className="userView">
              <img className="background" src="images/office.jpg" />
              <a href="#!user"><img className="circle" src="images/yuna.jpg" /></a>
              <a href="#!name"><span className="white-text name">John Doe</span></a>
              <a href="#!email"><span className="white-text email">jdandturk@gmail.com</span></a>
            </div></li>
          <li><a href="#"><i className="material-icons">cloud</i>First Link With Icon</a></li>
          <li><a href="#">Second Link</a></li>
          <li><div className="divider" /></li>
          <li><a className="subheader">Subheader</a></li>
          <li><a className="waves-effect" href="#">Third Link With Waves</a></li>
        </ul>

      </div>
    );
  }
}
