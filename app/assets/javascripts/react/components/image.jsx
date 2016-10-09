class Image extends React.Component {
  static propTypes: {
    url: React.PropTypes.string,
    caption: React.PropTypes.string
  };

  render() {
    return (
      <div>
        <img src={this.props.url} />
        <div className="center-text">{this.props.caption}</div>
      </div>
    );
  }
}