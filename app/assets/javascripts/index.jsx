$(() => {
  ReactDOM.render(<AppBar />, document.getElementById('appbar'));
  ReactDOM.render(<DropZone />, document.getElementById('content'));
});