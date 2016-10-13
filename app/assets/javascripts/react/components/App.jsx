let ALL_PHOTOS_URL = "/photos"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      page: window.location.hash == "" ? "#" : window.location.hash,
      photos: [],
      loading: false
    };
    
    $('body').on('click', 'a', (event) => {
      this.setState({page: event.currentTarget.getAttribute("href")});
      this.requestContent(this.state.page);
    })

  }

  componentWillMount() {
    this.requestContent(this.state.page);
  }

  requestContent(page) {
    this.setState({ loading: true });
    if (page == "#home" || page == "#") {
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
    if (this.state.page == "#" || this.state.page == "#home") {
      content = <Gallery photos={this.state.photos}/>
    } else if (this.state.page == "#upload") {
      content = <Upload />
    }
    return content;
  }

  render() {
    return (
      <div>
        <AppBar active={this.state.page}/>
        {this.renderMainContent()}
      </div>
    );
  }
}