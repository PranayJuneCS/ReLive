const CLOUDINARY_UPLOAD_PRESET = 'yd1pwftm';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/laucity/upload';
const NEW_PHOTO_URL = '/photo/new'

class UploadModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      uploading: 'before',
      pic_url: null,
      caption: ""
    };

    $('body').on('click', 'a.modal-close', (event) => {
      $('ul.tabs#nav-tabs').tabs('select_tab', '');
    })

  }

  componentDidMount() {
    $('ul.tabs#upload-modal-tabs').tabs();
    $('.modal-trigger').leanModal({
      dismissible: false,
      complete: (event) => {
        this.props.refresh("#", false);
      }
    });
    $('.chips').material_chip();
    $('.chips-initial').material_chip({
      data: [{
        tag: 'Apple',
      }, {
        tag: 'Microsoft',
      }, {
        tag: 'Google',
      }],
    });
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
            let caption = data.captions[0].text;
            this.setState({ upload: 'finished', pic_url: cloudURL, caption: caption });
            Materialize.updateTextFields();
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
      $("#edit-confirm").removeClass('disabled');
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
      <div id="uploadModal" className="modal modal-fixed-footer">

        <div className="modal-content">

          {/* Tabs */}
          <div className="row">
            <div className="col s12">
              <ul id="upload-modal-tabs" className="tabs">
                <li className="tab col s1"><a href="#upload-photo">Import Photo</a></li>
                <li id="edit-confirm" className="tab col s1 disabled"><a href="#edit-photo">Edit & Confirm</a></li>
              </ul>
            </div>


          </div>

          <div id="upload-photo" className="upload-modal-height">
            <DropZone uploadImage={this.onImageDrop.bind(this)} />
            {this.status()}
          </div>

          <div id="edit-photo">
            <div className="row">
              <div className="col s7">
                <img className="full-width" src={this.state.pic_url} />
              </div>
              <div className="col s5">
                <div className="input-field col s12">
                  <input id="caption" type="text" value={this.state.caption} className="validate active" />
                  <label htmlFor="caption" className="active">Description</label>
                </div>
                <div className="chips chips-initial"></div>
              </div>
            </div>
          </div>



        </div>
        <div className="modal-footer">
          <a href="#" className="modal-action waves-effect waves-green btn-flat ">Next</a>
          <a href="#" className="modal-action modal-close waves-effect waves-red btn-flat">Cancel</a>
        </div>
      </div>
    );
  }
}