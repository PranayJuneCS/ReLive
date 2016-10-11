class App extends React.Component {
  render() {
    return (
      <div>
        <material.AppBar title="Filterz" iconClassNameRight="muidocs-icon-navigation-expand-more" />
        <br />
        <Dropzone />
      </div>
    )
  }
}

$( () => {
  ReactDOM.render(<material.MuiThemeProvider>
        <App />
      </material.MuiThemeProvider>, document.getElementById('app'));
});