class Gyroscope extends React.Component {

  render() {
    return(
      <div className="appbar-icon">
        <div className={"atom " + this.props.size}>
          <div className="electron"></div>
          <div className="electron"></div>
          <div className="electron"></div>
          <div className="electron"></div>
        </div>
      </div>
    );
  }
}
