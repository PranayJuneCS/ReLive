import DropzoneComponent from 'react-dropzone-component';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'yd1pwftm';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/laucity/upload';

class App extends React.Component {

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
        $.post("/image/new", { url: response.body.secure_url }, (data, status) => {

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
      <div>
        <material.AppBar title="Title" iconClassNameRight="muidocs-icon-navigation-expand-more" />
        <br />
        <div>
          <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
        </div>

      </div>
    )
  }
}

$( () => {
  ReactDOM.render(<material.MuiThemeProvider>
        <App />
      </material.MuiThemeProvider>, document.getElementById('app'));

});