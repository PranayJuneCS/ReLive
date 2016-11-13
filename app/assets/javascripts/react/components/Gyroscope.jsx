class Gyroscope extends React.Component {

  constructor(props) {
    super(props);

    this.state = {'style': {}};
  }

  componentDidMount() {
    this.state.style = {width: this.props.size, height: this.props.size};
  }

  render() {
    return(
      <div className="appbar-icon">
        <div className="atom small" style={this.state.style}>
          <div className="electron"></div>
          <div className="electron"></div>
          <div className="electron"></div>
          <div className="electron"></div>
        </div>
      </div>
    );
  }
}
