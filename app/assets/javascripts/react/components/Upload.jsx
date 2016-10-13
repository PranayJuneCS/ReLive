const mapper = {
  "choose_photo": 0,
  "edit_captions": 1,
  "confirm": 2
};

class Upload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0
    };
  }

  componentDidMount() {
    $('.collapsible').collapsible();  
  }

  render() {
    return (
      <div className="container center-align">
        <h1>Upload a Photo</h1>


        <ul className="collapsible" data-collapsible="accordion">
          <li id="yo">
            <div id="choose_photo" className="collapsible-header active"><i className="material-icons">filter_drama</i>Choose a Photo</div>
            <div className="collapsible-body">
              <DropZone />
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