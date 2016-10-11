const CLOUDINARY_UPLOAD_PRESET = 'yd1pwftm';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/laucity/upload';

class Dropzone extends React.Component {

  onImageDrop(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      let cloudURL = response.body.secure_url;
      if (cloudURL !== '') {
        $.post("/image/new", { url: cloudURL }, (data, status) => {

          if (status === "success") {
            caption = data.captions[0]

            ReactDOM.render(
              <Image url={cloudURL} caption={caption.text} />,
              document.getElementById('picture')
            );
          }
        });
      }
    });
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
      addedfile: this.onImageDrop
    }

    return (
      <div className="center-flex">
        <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
      </div>
    );
  }
}

