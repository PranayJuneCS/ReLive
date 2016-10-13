const CLOUDINARY_UPLOAD_PRESET = 'yd1pwftm';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/laucity/upload';
const NEW_PHOTO_URL = '/photo/new'

class DropZone extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      upload: 'before'
    };
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
    const config = {
      iconFiletypes: ['.jpg', '.png', '.jpeg'],
      showFiletypeIcon: false,
      postUrl: 'no-url'
    };

    const djsConfig = {
      acceptedFiles: "image/jpeg, image/png, image/jpg",
      autoProcessQueue: false,
    };

    const eventHandlers = {
      addedfile: this.onImageDrop.bind(this)
    }

    return (
      <div>
        <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
        {this.status()}
      </div>
    );
  }
}

