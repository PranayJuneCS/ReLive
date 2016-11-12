$(() => {
  ReactDOM.render(
    <App />,
  document.getElementById('app'));

  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });

});