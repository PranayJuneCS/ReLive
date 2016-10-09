var Image = React.createClass({
  propTypes: {
    url: React.PropTypes.string,
    caption: React.PropTypes.string
  },

  render: function() {
    return (
      <div>
        <img src={this.props.url} />
        <div className="center-text">{this.props.caption}</div>
      </div>
    );
  }
});