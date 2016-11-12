const GET_USER_AIRPORT_URL = "/user/airport";
const GET_FLIGHT_URL = "https://api.sandbox.amadeus.com/v1.2/flights/extensive-search";
const AMADEUS_KEY = "3nWhAi9MARcfnjux7wwghgixAjSuLJhe";

class PhotoCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selected: false, userAirport: this.props.userLocation, pictureAirport: this.props.airport };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      userAirport: nextProps.userLocation,
      pictureAirport: nextProps.airport
    });
  }

  getFlights() {
    if (this.state.userAirport != null && this.state.pictureAirport != null) {
      $.ajax({
        url: GET_FLIGHT_URL,
        data: {
          apikey: AMADEUS_KEY,
          origin: this.state.userAirport,
          destination: this.state.pictureAirport,
          departure_date: "2017-01-01--2017-01-31"
        },
        type: "GET",
        success: (data) => {
          console.log(data.results[0]);
        }
      });
    }
  }

  clicked() {
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
    this.getFlights();
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