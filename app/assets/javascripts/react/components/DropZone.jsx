const CLOUDINARY_UPLOAD_PRESET = 'yd1pwftm';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/laucity/upload';
const NEW_PHOTO_URL = '/photo/new'

class DropZone extends React.Component {

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
      addedfile: this.props.uploadImage
    }

    return (
      <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
    );
  }
}

