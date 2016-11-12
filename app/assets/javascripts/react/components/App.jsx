const ALL_PHOTOS_URL = "/photos"
const ADD_CURR_LOCATION_URL = "/user/update_location"

class App extends React.Component {

  constructor(props) {
    super(props);
    window.filterPictures = this.filterPictures.bind(this);

    this.state = {
      page: window.location.hash == "" ? "#" : window.location.hash,
      photos: [],
      loading: false,
      currentLocation: ''
    };

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
      }
    });

  }

  componentWillMount() {
    this.getLocation();
    this.requestContent(this.state.page, true);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        $.ajax({
          url: ADD_CURR_LOCATION_URL,
          data: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
          },
          async: false,
          type: "POST",
          success: (data) => {
            this.setState({ currentLocation: data.airport });
          }
        });
      });
    }
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
          <h1 className="center-align">Loading...</h1>
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
          </div>
        </div>
    }

    return content;
  }

  filterPictures(searchQuery) {
    if (searchQuery == "") {
      this.setState({isFiltering: false});
      return;
    }
    var options = {
      caseSensitive: true,
      shouldSort: true,
      tokenize: true,
      threshold: 0.25,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      keys: [
        "captions.text",
        "tags.text"
      ]
    };
    var fuse = new Fuse(this.state.photos, options)
    var result = fuse.search(searchQuery);

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
      </div>
    );
  }
}
