class AppBar extends React.Component {
  render() {
    return (
      <div className="navbar">
      	<material.MuiThemeProvider>
          <material.AppBar title="Filterz" iconClassNameRight="muidocs-icon-navigation-expand-more" />
        </material.MuiThemeProvider>
      </div> 
    );
  }
}
