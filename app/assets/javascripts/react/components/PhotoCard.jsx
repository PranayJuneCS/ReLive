class PhotoCard extends React.Component {

	render() {
    return (
      <div className="col s12 center">
        <a>
          <div className="card hoverable">
            <div className="card-image">
              <img src={this.props.url} />
            </div>
            <div className="card-content">
              <span className="item-card-title">{this.props.caption}</span>
            </div>
          </div>
        </a>
      </div>
    );
  }

}