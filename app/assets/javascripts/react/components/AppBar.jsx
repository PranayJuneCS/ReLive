class AppBar extends React.Component {

  constructor(props) {
    super(props);

    $('body').on('click', 'a.upload', (event) => {
      $('a[href="#upload-photo"]').click(); // click tab
    });

  }

  componentDidMount() {
    $('ul.tabs#nav-tabs').tabs();
    $('.button-collapse').sideNav({ closeOnClick: true });


    $("#search").keypress((event) => {
      if (event.which == 13) {
       let searchText = $("#search").val();
       this.props.filterPictures.call(null, searchText);
      }
    });

    $("a.brand-logo").on('click', (event) => {
      let oldVal = $("#search").val();
      $("#search").val("");
      if (oldVal != "") {
        this.props.filterPictures.call(null, "");
      }
    });
  }

  render() {
    return (
      <div>

        {/* Navbar*/}
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper container">
              <div className="row">
                <div className="col s2">
                  <Gyroscope size={"small"}/>
                  <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
                  <a href="#" className="brand-logo">Relive {/*<em style={{fontSize: "14px"}}>CalHacks 3.0</em>*/}</a>
                </div>
                <div className="input-field col s6 center">
                  <input id="search" type="text" className="no-search-line" required placeholder="Search" />
                  <label htmlFor="search"><i className="search-appbar-icon material-icons">search</i></label>
                </div>
                <div className="col s1 center">
                  <a id="#modal1" href="#modal1" onClick={window.start} className="nav-anchor upload modal-trigger-mic"><i className="material-icons">mic</i></a>
                </div>
                <div className="row hide-on-med-and-down">
                  <div className="right col s3">
                    <ul id="nav-tabs" className="tabs">
                      <li id="#" className="tab col s1"><a id="#" href="#" className="nav-anchor page-link">Gallery</a></li>
                      <li id="#upload" className="tab col s1"><a id="#upload" href="#uploadModal" className="nav-anchor upload modal-trigger">Upload</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Sidebar */}
        <Sidebar active={this.props.active}/>
      </div>
    );
  }
}
