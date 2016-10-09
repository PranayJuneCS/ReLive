console.log("index.js loaded");

$(function() {
    $('#submitImage').on('click', function() {
      $.post("/image/new", {url: $('#imageURL').val()}, function(data, status) {
        if (status === "success") {
          caption = data.captions[0]

          ReactDOM.render(
          <Image url={$('#imageURL').val()} caption={caption.text} />,
          document.getElementById('app')
        );
        }
      } );
    });
});

var App = React.createClass({
  render: function() {
    return(
      <material.MuiThemeProvider>
        <material.AppBar title="Title" iconClassNameRight="muidocs-icon-navigation-expand-more" />
      </material.MuiThemeProvider>
    )
  }
});

$(function() {

  ReactDOM.render(<App />, document.getElementById('app'));

})