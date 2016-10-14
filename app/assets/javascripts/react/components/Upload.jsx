const CLOUDINARY_UPLOAD_PRESET = 'yd1pwftm';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/laucity/upload';
const NEW_PHOTO_URL = '/photo/new'

class Upload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      uploading: 'before'
    };
  }

  componentDidMount() {
    $('.collapsible').collapsible();  
  }

  onImageDrop(file) {
    this.setState({ upload: 'uploading' });
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      let cloudURL = response.body.secure_url;
      if (cloudURL !== '') {
        $.post(NEW_PHOTO_URL, { url: cloudURL }, (data, status) => {

          if (status === "success") {
            caption = data.captions[0]

            this.setState({ upload: 'finished' });
          }
        });
      }
    });
  }

  status() {
    if (this.state.upload == 'uploading') {
      return (
        <div>
          <p>Uploading...</p>
        </div>
      );
    } else if (this.state.upload == 'finished') {
      return (
        <div>
          <p>Finished!</p>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="container center-align">
        <h1>Upload a Photo</h1>


        <ul className="collapsible" data-collapsible="accordion">
          <li id="yo">
            <div id="choose_photo" className="collapsible-header active"><i className="material-icons">filter_drama</i>Choose a Photo</div>
            <div className="collapsible-body">
              <div className="center-items collapsible-elem">
                <DropZone uploadImage={this.onImageDrop.bind(this)} />
                {this.status()}
              </div>
            </div>
          </li>
          <li>
            <div id="edit_captions" className="collapsible-header"><i className="material-icons">place</i>Edit Caption</div>
            <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
          </li>
          <li>
            <div id="confirm" className="collapsible-header"><i className="material-icons">whatshot</i>Confirm</div>
            <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
          </li>
        </ul>


      </div>
    );
  }
}