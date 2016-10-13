$(() => {
  ReactDOM.render(
    <App />,
  document.getElementById('app'));

  $('.button-collapse').sideNav({ closeOnClick: true });
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });
});