const CLOUDINARY_UPLOAD_PRESET = 'yd1pwftm';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/laucity/upload';
const NEW_PHOTO_URL = '/photo/new';
const UPDATE_PHOTO_URL = '/photo/update';

class UploadModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      upload: 'before',
      pic_url: null,
      caption: "",
      tags: []
    };
  }

  componentDidMount() {
    $('ul.tabs#upload-modal-tabs').tabs();
    $('.modal-trigger').leanModal({
      dismissible: false,
      complete: (event) => {
        if ($("#finish-button").text() == "Finish") {
          this.sendInfoToServer();
        } else {
          $('ul.tabs#nav-tabs').tabs('select_tab', '');
          this.props.refresh("#", false);
        }
      }
    });
  }

  sendInfoToServer() {
    let tagStrings = this.getTagNames();
    let caption = $("#caption").val();
    let city = $("#city").val();
    $.ajax({
      type: "POST",
      url: UPDATE_PHOTO_URL,
      data: {
        url: this.state.pic_url,
        caption: caption,
        tags: JSON.stringify(tagStrings),
        city: city
      },
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      success: (data) => {
        console.log("successfully updated tags and caption");
        this.clearInfo();
        $('ul.tabs#nav-tabs').tabs('select_tab', '');
        this.props.refresh("#", false);
      }
    });
  }

  clearInfo() {
    this.setState({
      upload: 'before',
      pic_url: null,
      caption: "",
      tags: []
    });

    $("#import-photo").removeClass("disabled");
    $('ul.tabs#upload-modal-tabs').tabs('select_tab', 'import-photo');

    $("#edit-confirm").addClass('disabled');
    Materialize.updateTextFields();

    $('#finish-button').text("Cancel");
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
        $.ajax({
          url: NEW_PHOTO_URL,
          data: {
            url: cloudURL
          },
          headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
          },
          type: "POST",
          success: (data) => {
            let tags = data.tags;
            let caption = data.captions[0].text;
            let actualTags = [];
            for (var tag of tags) {
              let obj = {};
              obj.tag = tag.text;
              actualTags.push(obj);
            }
            this.setState({
              upload: 'finished',
              pic_url: cloudURL,
              caption: caption,
              tags: actualTags });
            Materialize.updateTextFields();
          }
        });
      }
    });
  }

  getTagNames() {
    let list = [];
    for (var object of $('.chips-initial').material_chip('data')) {
      list.push(object.tag);
    }
    return list;
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

      $('ul.tabs#upload-modal-tabs').tabs('select_tab', 'edit-photo');
      Materialize.updateTextFields();
      $("#import-photo").addClass("disabled");

      $("#finish-button").text("Finish");
      
      $('.chips-initial').material_chip({
        placeholder: 'Enter a tag',
        secondaryPlaceholder: '+Tag',
        data: this.state.tags,
      });
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
                <li id="import-photo" className="tab col s1"><a href="#upload-photo">Import Photo</a></li>
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
                  <input id="caption" type="text" value={this.state.caption} className="validate active white-text" />
                  <label htmlFor="caption" className="active">Description</label>
                </div>
                <div className="chips chips-initial chip-container white-text"></div>
                <div className="input-field col s12">
                  <input id="city" type="text" className="validate white-text" />
                  <label htmlFor="city" className="active">City</label>
                </div>
              </div>
            </div>
          </div>



        </div>
        <div className="modal-footer">
          <a id="finish-button" href="#" className="white-text modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
        </div>
      </div>
    );
  }
}