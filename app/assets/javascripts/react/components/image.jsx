class Image extends React.Component {
  static propTypes: {
    url: React.PropTypes.string,
    caption: React.PropTypes.string
  };

  render() {
    return (
      <div className="center-flex column">
        <img src={this.props.url} />
        <div>{this.props.caption}</div>
      </div>
    );
  }
}