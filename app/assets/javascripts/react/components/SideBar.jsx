class SideBar extends React.Component {

  render() {
    return(
      <material.Drawer
        docked={false}
        width={300}
        open={this.props.open}
      >
        <material.MenuItem onTouchTap={this.props.toggleCallback}>Menu Item</material.MenuItem>
        <material.MenuItem onTouchTap={this.props.toggleCallback}>Menu Item 2</material.MenuItem>
      </material.Drawer>
    )
  }
}