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

        <ul id="slide-out" className="side-nav">
          <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
          <li><a href="#!">Second Link</a></li>
          <li><div className="divider"></div></li>
          <li><a className="subheader">Subheader</a></li>
          <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
        </ul>


        
        <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
      </div>
    );
  }
}
