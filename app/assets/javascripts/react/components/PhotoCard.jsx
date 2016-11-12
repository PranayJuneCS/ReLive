const GET_USER_AIRPORT_URL = "/user/airport";

class PhotoCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selected: false, userAirport: '', pictureAirport: this.props.airport };
  }

  getLocation() {
    $.ajax({
      url: GET_USER_AIRPORT_URL,
      type: "GET",
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      success: (data) => {
        this.setState({ userAirport: data.airport })
      }
    });
  }

  clicked() {
    this.getLocation();
    this.setState({selected: true});
    $('.fade-bg').addClass('active');
    $(".container.gallery").addClass("push-back");
    setTimeout(function(comp) {
          $(".selected-photo").removeClass("hide").removeClass("fadeOut").addClass("fadeIn");
          $(".selected-photo img").attr('src', comp[0].props.url);
          $(".selected-photo img").css({"top": $('body').scrollTop() + (screen.height / 2) - 100, left: screen.width / 2});
          $(".selected-photo-close").css({"top": $('body').scrollTop() - ($(".selected-photo img").height() / 2) + (screen.height / 2) - 100, left: screen.width / 2 - ($(".selected-photo img").width() / 2)});
    }, 150, [this])
    window.pictureActive = true;
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