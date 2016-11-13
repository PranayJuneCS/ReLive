class Gallery extends React.Component {

  constructor(props) {
    super(props)
    this.state = {photos: []};

  }

  componentWillMount() {
    this.setPhotos(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setPhotos(nextProps);
  }

  setPhotos(props) {
    let photos = [[], [], [], []];

    counter = 0;
    for (let photo of props.photos) {
      let caption = photo.captions[0] ? photo.captions[0].text : "";
      let card = <PhotoCard
                    key={counter}
                    userLocation={props.userLocation}
                    url={photo.url} airport={photo.airport}
                    caption={caption}
                    tags={photo.tags}
                  />;
      photos[counter % photos.length].push(card);
      counter += 1;
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
