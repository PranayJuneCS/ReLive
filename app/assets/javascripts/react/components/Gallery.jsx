class Gallery extends React.Component {

  componentWillMount() {
    let pictures = [[], [], []];

    counter = 0;
    for (let photo of this.props.photos) {
      let caption = photo.captions[0].text;
      let card =  <PhotoCard key={counter} url={photo.url} caption={caption} />;
      pictures[counter % 3].push(card);
      counter += 1;
    }
    this.photos = pictures;
  }

  renderColumn(index) {
    return (
      <div className="col s12 m6 l4 center">
        <div className="row">
          {this.photos[index]}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="">
        <div className="container">

          <div className="row">

            {this.renderColumn.call(this, 0)}
            {this.renderColumn.call(this, 1)}
            {this.renderColumn.call(this, 2)}

          </div>

        </div>
      </div> 
    );
  }
}
