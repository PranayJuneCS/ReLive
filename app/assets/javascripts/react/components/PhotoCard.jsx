class PhotoCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selected: false, mounted: false};
  }

  clicked() {
    this.setState({selected: true});
    $('.fade-bg').addClass('active');
    $(".container.gallery").addClass("push-back");
    setTimeout(function(comp) {
          $(".selected-photo").removeClass("hide").removeClass("fadeOut").addClass("fadeIn");
          $(".selected-photo img").attr('src', comp[0].props.url);
          $(".selected-photo img").css({"top": $('body').scrollTop() + (screen.height / 2) - 100, left: screen.width / 2});
          $(".selected-photo-close").css({"top": $('body').scrollTop() - ($(".selected-photo img").height() / 2) + (screen.height / 2) - 100, left: screen.width / 2 - ($(".selected-photo img").width() / 2)});
    }, 150, [this])
    window.pictureActive = true;
  }

  componentDidMount() {
    setInterval(() => {
      var card = $('.photoCard.' + this.props.id);
      if (card.hasClass('hide')) {
        card.removeClass('hide').addClass('fadeInUp');
        setTimeout(() => {
          card.removeClass('fadeInUp');
        }, 1000);
      }
    }, 500)
  }

	render() {
    return (
      <div className={"photoCard col small-padding s12 center " + this.props.id + " animated hide"} onClick={this.clicked.bind(this)}>
        <a href="#">
          <div className={"card small-margin hoverable " + (this.state.selected ? "selected" : "")}>
            <div className="card-image">
              <img src={this.props.url} />
            </div>
          </div>
        </a>
      </div>
    );
  }

}