class Sidebar extends React.Component {
  render() {
    return (
      <ul id="slide-out" className="side-nav">
        <li className={["#"].includes(this.props.active) ? "active" : ""}><a href="#"><i className="material-icons">view_module</i>Gallery</a></li>
        <li className={["#upload"].includes(this.props.active) ? "active" : ""}><a href="#upload"><i className="material-icons">open_in_browser</i>Upload</a></li>
      </ul>
    );
  }
}

