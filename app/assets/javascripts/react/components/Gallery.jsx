const NEAREST_AIRPORT_URL = "https://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant";
const AMADEUS_KEY = "3nWhAi9MARcfnjux7wwghgixAjSuLJhe";

class Gallery extends React.Component {

  constructor(props) {
    super(props)
    this.state = {photos: [], latitude: '', longitude: '', src: '', dest: ''};

    this.getLocation();
  }

  componentWillMount() {
    this.setPhotos(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setPhotos(nextProps);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        this.getAirportFromCoords(true, this.state.latitude, this.state.longitude);
      });
    }
  }

  getAirportFromCoords(source, lat, longitude) {
    $.ajax({
      url: NEAREST_AIRPORT_URL,
      data: { apikey: AMADEUS_KEY,
              latitude: lat,
              longitude: longitude
            },
      type: "GET",
      success: (data) => {
        if (data.length > 0) {
          let code = data[0].airport;
          if (source) {
            this.setState({ src: code });
          } else {
            this.setState({ dest: code });
          }
        }
      }
    });
  }

  setPhotos(props) {
    let photos = [[], [], [], []];

    counter = 0;
    for (let photo of props.photos) {
      let caption = photo.captions[0].text;
      let card = <PhotoCard key={counter} url={photo.url} caption={caption} />;
      photos[counter % photos.length].push(card);
      counter += 1;
      if (photo.latitude == null || photo.longitude == null) {
        console.log("NULL LAT/LONG");
      } else {
        console.log(photo.latitude, photo.longitude);
      }
    }
    this.setState({ photos: photos });
  }

  renderColumn(index) {
    return (
      <div className="col s12 m4 l3 center">
        <div className="row">
          {this.state.photos[index]}
        </div>
      </div>
    );
  }

  render() {

    return (
      <div className="">
        <div className="container gallery">

          <div className="row">

            {this.renderColumn.call(this, 0)}
            {this.renderColumn.call(this, 1)}
            {this.renderColumn.call(this, 2)}
            {this.renderColumn.call(this, 3)}

          </div>

        </div>
      </div> 
    );
  }
}
