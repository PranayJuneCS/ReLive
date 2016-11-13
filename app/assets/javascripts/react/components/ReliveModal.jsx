const GET_FLIGHT_URL = "https://api.sandbox.amadeus.com/v1.2/flights/extensive-search";
const AMADEUS_KEY = "3nWhAi9MARcfnjux7wwghgixAjSuLJhe";

class ReliveModal extends React.Component {

  constructor(props) {
    super(props);
    this.flightInfo = null;

    $("#reliveModal").leanModal();
  }

  componentWillReceiveProps(nextProps) {
    $("#action-button").addClass("hide");
    this.flightInfo = null;
    this.forceUpdate();
    this.getFlights();

  }

  componentDidMount() {
    $('ul.tabs#relive-modal-tabs').tabs();
    
    $('body').on('click', '.selected-photo-options a.relive', () => {
      $("#reliveModal").openModal({dismissible: false});
      $('a[href="#flight-itinerary"]').click();
    });

    $('body').on('click', '#action-button', () => {
      if ($("#action-button").text() == "Next") {
        $("#payment").removeClass("disabled");
        $('#relive-modal-tabs').tabs('select_tab', 'square-payment');
        $("#itinerary").addClass("disabled");
        $("#action-button").text("Finish");
        $("#action-button").addClass('modal-close');
      } else {
        $("#action-button").removeClass('modal-close');
        $("#action-button").text("Next");
        $("#itinerary").removeClass("disabled");
        $('#relive-modal-tabs').tabs('select_tab', 'itinerary');
        $("#payment").addClass("disabled");
        $("#action-button").addClass("hide");
        $("#reliveModal").closeModal();
        this.flightInfo = null;
      }
      
    });

    $('body').on('click', '#cancel-button', () => {
      if ($("#action-button").text() == "Next") {
        $('#relive-modal-tabs').tabs('select_tab', 'itinerary');
      } else {
        $("#action-button").removeClass('modal-close');
        $("#action-button").text("Next");
        $("#itinerary").removeClass("disabled");
        $('#relive-modal-tabs').tabs('select_tab', 'itinerary');
        $("#payment").addClass("disabled");
        $("#action-button").addClass("hide");
      }
      $("#reliveModal").closeModal();
      this.flightInfo = null;
      
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
          this.flightInfo = data.results[0];
          setTimeout(() => {
            this.forceUpdate();
          }, 2000);
        },
        error: (data) => {
          this.flightInfo = "error";
          setTimeout(() => {
            this.forceUpdate();
          }, 1000);
        }
      });
    } else {
      console.log("Invalid airports");
    }
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  renderFlightInfo() {
    if (window.pictureActive) {
      if (this.flightInfo != null) {
        if (typeof(this.flightInfo) === "string") {
          let string = "There is no flight data available for flights to " + this.toTitleCase(window.activePicture.city);
          string += " from " + window.userLocation + " right now.";
          return (
            <h4 className="center-align white-text">{string}</h4>
          );
        } else {
          $("#action-button").removeClass('hide');
          console.log(this.flightInfo);
          return (
            <div className="col s12">
              <div className="col s12">
                <h4 className="center-align white-text">We have found a flight for you!</h4>
              </div>
              <div className="row center-align white-text">
                <div className="col s6">
                  <p>Destination</p>
                </div>
                <div className="col s6">
                  <p>{this.flightInfo.destination}</p>
                </div>
              </div>
              <div className="row center-align white-text">
                <div className="col s6">
                  <p>Airline</p>
                </div>
                <div className="col s6">
                  <p>{this.flightInfo.airline}</p>
                </div>
              </div>
              <div className="row center-align white-text">
                <div className="col s6">
                  <p>Departure Date</p>
                </div>
                <div className="col s6">
                  <p>{this.flightInfo.departure_date}</p>
                </div>
              </div>
              <div className="row center-align white-text">
                <div className="col s6">
                  <p>Return Date</p>
                </div>
                <div className="col s6">
                  <p>{this.flightInfo.return_date}</p>
                </div>
              </div>
              <div className="row center-align white-text">
                <div className="col s6">
                  <p>Price</p>
                </div>
                <div className="col s6">
                  <p>{"$" + this.flightInfo.price}</p>
                </div>
              </div>
            </div>
          );
        }
        
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
                {this.renderFlightInfo.call(this)}
              </div>
            </div>
          </div>

          <div id="square-payment">
            <div className="row">
              <div className="col s7">
                <img className="full-width" src={url} />
              </div>
              <div className="col s5">
                <p className="white-text">Square Duh</p>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a id="action-button" href="#" className="white-text modal-action waves-effect waves-green btn-flat hide">Next</a>
          <a id="cancel-button" href="#" className="white-text modal-action modal-close waves-effect waves-red btn-flat">Cancel</a>
        </div>
      </div>
    );
  }
}
