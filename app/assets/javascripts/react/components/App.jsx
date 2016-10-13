class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {page: window.location.hash == "" ? "#" : window.location.hash};

    $('body').on('click', 'a', (event) => {
      this.setState({page: event.currentTarget.getAttribute("href")});
    })

  }

  render() {

    var content;
    if (this.state.page == "#" || this.state.page == "#home") {
      content = <Gallery />
    } else if (this.state.page == "#upload") {
      content = <p>Hello</p>
    }

    return (
      <div>
        <AppBar />
        {content}
      </div>

    );
  }
}