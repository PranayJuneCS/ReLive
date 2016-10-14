const CLOUDINARY_UPLOAD_PRESET = 'yd1pwftm';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/laucity/upload';
const NEW_PHOTO_URL = '/photo/new'

const mapper = {
  "choose_photo": 0,
  "edit_captions": 1,
  "confirm": 2
};

class Upload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      uploading: 'before',
      pic_url: null
    };

    // $('body').on('click', '.collapsible-header', (event) => {
    //   if (event.target.className.includes("active")) {
    //     this.setState({ activeStep: mapper[event.target.id]});
    //   } else {
    //     this.setState({ activeStep: null })
    //   }
    //   console.log(this.state.activeStep);
    // });

  }

  componentDidMount() {
    $('.collapsible').collapsible();
    $('.carousel.carousel-slider').carousel({
      full_width: true,
      no_wrap: true,
      time_constant: 300,
      dist: 0
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
            caption = data.captions[0]

            this.setState({ upload: 'finished', pic_url: cloudURL });
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

  // <div className="container center-align">
  //       <h1>Upload a Photo</h1>

  //       <ul className="collapsible" data-collapsible="accordion">
  //         <li id="yo">
  //           <div id="choose_photo" className="collapsible-header active"><i className="material-icons">filter_drama</i>Choose a Photo</div>
  //           <div className="collapsible-body">
  //             <div className="center-items collapsible-elem">
  //               <DropZone uploadImage={this.onImageDrop.bind(this)} />
  //               {this.status()}
  //             </div>
  //           </div>
  //         </li>
  //         <li>
  //           <div id="edit_captions" className="collapsible-header"><i className="material-icons">place</i>Edit Caption</div>
  //           <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
  //         </li>
  //         <li>
  //           <div id="confirm" className="collapsible-header"><i className="material-icons">whatshot</i>Confirm</div>
  //           <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
  //         </li>
  //       </ul>


  //     </div>

  render() {
    return (
      <div className="carousel carousel-slider center custom-carousel" data-indicators="true">
        <div className="carousel-item red white-text" href="#one!">
          <h2>Choose a Photo</h2>
          <p className="white-text">Choose a Photo</p>
        </div>
        <div className="carousel-item amber white-text" href="#two!">
          <h2>Second Panel</h2>
          <p className="white-text">This is your second panel</p>
        </div>
        <div className="carousel-item green white-text" href="#three!">
          <h2>Third Panel</h2>
          <p className="white-text">This is your third panel</p>
        </div>
      </div>
    );
  }
}