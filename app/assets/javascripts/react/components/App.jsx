const ALL_PHOTOS_URL = "/photos"
const ADD_CURR_LOCATION_URL = "/user/update_location"

class App extends React.Component {

  constructor(props) {
    super(props);
    window.filterPictures = this.filterPictures.bind(this);
    window.userLocation = this.props.userLocation;

    this.state = {
      page: window.location.hash == "" ? "#" : window.location.hash,
      photos: [],
      loading: false,
      currentLocation: this.props.userLocation,
      activePicture: ""
    };

    console.log(this.state.currentLocation);

    $('body').on('click', 'a.page-link', (event) => {
      if (event.currentTarget.getAttribute("href") != this.state.page) {
        $('.content').fadeOut(100).delay(100).fadeIn(100);
        setTimeout(() => {
          this.setState({page: event.currentTarget.getAttribute("href")});
          this.requestContent(this.state.page, true);
          $('ul.tabs#nav-tabs').tabs('select_tab', this.state.page.slice(1));
        }, 100)
      }

      return false;
    })

    $('body').on('click', "a.selected-photo-close", (event) => {
      if (window.pictureActive) {
        this.setState({selected: false});
        $(".selected-photo").removeClass("fadeIn").addClass("fadeOut");
        setTimeout(function(comp) {
          $(".container.gallery").removeClass("push-back");
          $(".selected-photo").addClass('hide');
        }, 350, [this])
        window.pictureActive = false;
        window.activePicture = null;
      }
    });

    $('body').on('click', '.selected-photo-options a.similar', () => {
      let query = "https://www.bing.com/images/search?q=" + window.activePicture.captions[0].text;
      query += " " + window.activePicture.city;
      var win = window.open(query, '_blank');
      win.focus();
    });

    $('body').on('click', '.selected-photo-options a.relive', () => {
      this.forceUpdate();
    });

  }

  componentWillMount() {
    this.requestContent(this.state.page, true);
  }

  requestContent(page, refresh) {
    if (refresh) {
      this.setState({ loading: true });
    }

    if (page == "#") {
      request.get(ALL_PHOTOS_URL).end((error, response) => {
        this.setState({ photos: JSON.parse(response.text), loading: false });
      });
    } else {
      this.setState({ loading: false });
    }
  }

  renderMainContent() {
    if (this.state.loading) {
      return (
        <div>
        </div>
      );
    }

    let content;
    if (this.state.page === "#") {
      content =
        <div className="fade-bg">
          <Gallery userLocation={this.state.currentLocation} photos={this.state.isFiltering ? this.state.filterPictures : this.state.photos}/>
          <div className="selected-photo animated hide">
            <img className="" src={"https://res.cloudinary.com/laucity/image/upload/v1476385806/ozwp1icdh1cgztiidtfi.jpg"} />
            <a className="selected-photo-close" href="#"><i className="fa fa-times" aria-hidden="true"></i></a>
            <a data-position="right" data-delay="50" data-tooltip="I am tooltip" className="tooltipped selected-photo-info" href="#"><i className="fa fa-info-circle" aria-hidden="true"></i></a>
            <div className="row selected-photo-options">
              <div className="col s12">
                <a href="#" className="relive btn blue-grey darken-4">Relive This Moment</a>
                <a href="#" className="similar btn blue-grey darken-4">Similar Photos</a>
              </div>
            </div>
          </div>
        </div>
    }

    return content;
  }

  filterPictures(searchQuery, isEmotion) {
    if (searchQuery == "") {
      this.setState({isFiltering: false});
      return;
    }
    var keys;
    if (isEmotion) {
      keys = ["faces.emotion"];
    } else {
      keys = [
        "captions.text",
        "tags.text",
        "faces.emotion"
      ]
    }
    var options = {
      caseSensitive: true,
      shouldSort: true,
      tokenize: true,
      threshold: 0.25,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      keys: keys
    };
    var fuse = new Fuse(this.state.photos, options);
    var result = fuse.search(searchQuery);
    $("#search").val(searchQuery);

    this.setState({isFiltering: true, filterPictures: result});
  }

  render() {
    return (
      <div>
        <AppBar filterPictures={this.filterPictures.bind(this)} active={this.state.page}/>
        <div className="content">
          {this.renderMainContent()}
        </div>
        <UploadModal refresh={this.requestContent.bind(this)} />
        <MicrophoneModal />
        <ReliveModal />
      </div>
    );
  }
}
