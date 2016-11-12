class PhotoCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selected: false};
  }

  clicked() {
    this.setState({selected: true});
    $(".container.gallery").addClass("push-back");
    setTimeout(function(comp) {
          $(".selected-photo").removeClass("hide").addClass("fadeIn");
          $(".selected-photo img").attr('src', comp[0].props.url);
          $(".selected-photo img").css({"top": $('body').scrollTop() + (screen.height / 2) - 100, left: screen.width / 2});
    }, 150, [this])
  }

	render() {
    return (
      <div className="col small-padding s12 center" onClick={this.clicked.bind(this)}>
        <a>
          <div className={"card small-margin hoverable " + (this.state.selected ? "selected" : "")}>
            <div className="card-image">
              <img src={this.props.url} />
            </div>
          </div>
        </a>
      </div>
    );
  }

}