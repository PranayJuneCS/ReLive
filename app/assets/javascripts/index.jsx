import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'yd1pwftm';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/laucity/upload';

class App extends React.Component {

  onImageDrop(files) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', files[0]);

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
    return (
      <div>
        <material.AppBar title="Title" iconClassNameRight="muidocs-icon-navigation-expand-more" />
        <br />
        <div>
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop.bind(this)}
          >
          <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>
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