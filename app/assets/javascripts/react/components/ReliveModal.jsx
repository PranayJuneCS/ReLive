const GET_FLIGHT_URL = "https://api.sandbox.amadeus.com/v1.2/flights/extensive-search";
const AMADEUS_KEY = "3nWhAi9MARcfnjux7wwghgixAjSuLJhe";

class ReliveModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      flightInfo: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.getFlights();
  }

  componentDidMount() {
    $('ul.tabs#relive-modal-tabs').tabs();
    $('body').on('click', '.selected-photo-options a.relive', () => {
      $("#reliveModal").openModal({
        dismissible: false,
        complete: (event) => {
          console.log("CLOSED");
          this.setState({ flightInfo: null })
        }
      });
      $('a[href="#flight-itinerary"]').click();
    });
  }

  getFlights() {
    if (window.userLocation && window.activePicture) {
      $.ajax({
        url: GET_FLIGHT_URL,
        data: {
          apikey: AMADEUS_KEY,
          origin: window.userLocation,
          destination: window.activePicture.airport,
          departure_date: "2017-01-01--2017-01-31"
        },
        type: "GET",
        success: (data) => {
          setTimeout(() => {
            this.setState({ flightInfo: data.results[0] });
          }, 2000);
        },
        error: (data) => {
          console.log("ERROR");
          console.log(data);
        }
      });
    } else {
      console.log("Invalid airports");
    }
  }

  flightInfo() {
    if (window.pictureActive) {
      if (this.state.flightInfo != null) {
        console.log(this.state.flightInfo);
        return (
          <p className="white-text">WE HAVE FLIGHT INFO</p>
        );
      } else {
        return (
          <div className="col s12">
            <h4 className="white-text">Retrieving Flight Info...</h4>
            <Gyroscope size={"large"} />
          </div>
        );
      }
    } else {
      return null;
    }
    
  } 

  render() {
    let url;
    if (window.pictureActive) {
      url = window.activePicture.url;
    } else {
      url = "";
    }
    console.log(this.state);
    return (
      <div id="reliveModal" className="modal modal-fixed-footer">
        <div className="modal-content">

          {/* Tabs */}
          <div className="row">
            <div className="col s12">
              <ul id="relive-modal-tabs" className="tabs">
                <li id="itinerary" className="tab col s1"><a href="#flight-itinerary">Flight Itinerary</a></li>
                <li id="payment" className="tab col s1 disabled"><a href="#square-payment">Book</a></li>
              </ul>
            </div>
          </div>

          <div id="flight-itinerary" className="upload-modal-height">
            <div className="row">
              <div className="col s7">
                <img className="full-width" src={url} />
              </div>
              <div className="col s5">
                {this.flightInfo.call(this)}
              </div>
            </div>
          </div>

          <div id="square-payment">
            <Gyroscope size={"large"} />
          </div>
        </div>
        <div className="modal-footer">
          <a id="finish-button" href="#" className="white-text modal-action modal-action waves-effect waves-green btn-flat hide">Next</a>
          <a id="cancel-button" href="#" className="white-text modal-action modal-close waves-effect waves-red btn-flat">Cancel</a>
        </div>
      </div>
    );
  }
}
