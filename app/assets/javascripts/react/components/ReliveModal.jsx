const GET_FLIGHT_URL = "https://api.sandbox.amadeus.com/v1.2/flights/extensive-search";
const AMADEUS_KEY = "3nWhAi9MARcfnjux7wwghgixAjSuLJhe";

class ReliveModal extends React.Component {

  constructor(props) {
    super(props);
    this.flightInfo = null;
    this.getAirlines();
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
        Materialize.toast('Flight Booked!', 3000);
        $.ajax({
          url: "/send_text",
          data: {
            number: "+1" + $("#phone_number").val(),
            destination: this.flightInfo.destination,
            airline: this.airlines[this.flightInfo.airline].name,
            price: "$" + this.flightInfo.price,
            departure_date: this.flightInfo.departure_date,
            return_date: this.flightInfo.return_date,
            source: window.userLocation
          },
          success: (data) => {
            console.log("SUCCESSFUL TEXT SENT");
          },
          error: (data) => {
            console.log("UNSUCCESSFUL TEXT SENT");
          }
        })
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

  getAirlines() {
    $.ajax({
      url: "/airlines",
      type: "GET",
      success: (data) => {
        this.airlines = data;
      }
    })
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
            <h5 className="center-align white-text">{string}</h5>
          );
        } else {
          $("#action-button").removeClass('hide');
          return (
            <div className="col s12">
              <div className="col s12">
                <h5 className="center-align white-text">We found a flight for you!</h5>
              </div>
              <table className="white-text col s12 bordered">
                <tbody>
                  <tr>
                    <td>Destination</td>
                    <td>{this.flightInfo.destination + "/" + this.toTitleCase(window.activePicture.city)}</td>
                  </tr>
                  <tr>
                    <td>Airline</td>
                    <td>{this.airlines[this.flightInfo.airline].name}</td>
                  </tr>
                  <tr>
                    <td>Departure Date</td>
                    <td>{this.flightInfo.departure_date}</td>
                  </tr>
                  <tr>
                    <td>Return Date</td>
                    <td>{this.flightInfo.return_date}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>{"$" + this.flightInfo.price}</td>
                  </tr>
                </tbody>
              </table>
              <div className="input-field col s12 white-text">
                <i className="material-icons prefix">phone</i>
                <input id="phone_number" type="tel" className="validate" />
                <label htmlFor="phone_number">Phone Number to Send Flight Details</label>
              </div>
            </div>
          );
        }

      } else {
        return (
          <div className="col s12">
            <h5 className="white-text center-align">Retrieving Flight Info...</h5>
            <div className="margin-left-15">
              <Gyroscope size={"large"} />
            </div>
          </div>
        );
      }
    } else {
      return null;
    }

  }

  renderSquare() {
    if (this.flightInfo) {
      return (
        <Square amount={this.flightInfo.price * 100} />
      );
    } else {
      return <p className="white-text">No Square :(</p>
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
                {this.renderSquare.call(this)}
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
