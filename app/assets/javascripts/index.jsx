class App extends React.Component {
  render() {
    return (
      <material.MuiThemeProvider>
        <material.AppBar title="Title" iconClassNameRight="muidocs-icon-navigation-expand-more" />
      </material.MuiThemeProvider>
    )
  }
}

$( () => {
  ReactDOM.render(<App />, document.getElementById('app'));

  $('#submitImage').on('click', () => {
    $.post("/image/new", {url: $('#imageURL').val()}, (data, status) => {

      if (status === "success") {
        caption = data.captions[0]

        ReactDOM.render(
          <Image url={$('#imageURL').val()} caption={caption.text} />,
          document.getElementById('app')
        );
      }
    });

  });
});