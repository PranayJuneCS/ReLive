class Gallery extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    photos = [[], [], []]

    counter = 0
    for (let photo of this.props.photos) {
      let card =  <div className="col s12 center">
                    <div className="card">
                      <div className="card-image">
                        <img src={photo.url} />
                      </div>
                      <div className="card-content">
                        <span className="item-card-title">{photo.captions[0].text}</span>
                      </div>
                    </div>
                  </div>

      photos[counter % 3].push(card)
      counter += 1;
    }

    return (
      <div className="">
        <div className="container">

          <div className="row">

            <div className="col s12 m6 l4 center">
              <div className="row">
                {photos[0]}
              </div>
            </div>

            <div className="col s12 m6 l4 center">
              <div className="row">
                {photos[1]}
              </div>
            </div>

            <div className="col s12 m6 l4 center">
              <div className="row">
                {photos[2]}
              </div>
            </div>

          </div>

        </div>
      </div> 
    );
  }
}
