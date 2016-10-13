class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {page: "Home"}
  }

  render() {

    var content;
    if (this.state.page == "Home") {
      content = <Gallery />
    } else if (this.state.page == "Upload") {
      //content = <Uploader />
    }


    return (
      <div>
        <AppBar/>
        {content}
      </div>
    );
  }
}