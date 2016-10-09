class App extends React.Component {
  render() {
    return (
      <div>
        <material.AppBar title="Title" iconClassNameRight="muidocs-icon-navigation-expand-more" />
        <br />
        <input type='text'></input>
      </div>
    )
  }
}

$( () => {
  ReactDOM.render(<material.MuiThemeProvider>
        <App />
      </material.MuiThemeProvider>, document.getElementById('app'));

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