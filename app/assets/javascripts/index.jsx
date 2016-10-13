$(() => {
  ReactDOM.render(
    <App />,
  document.getElementById('app'));

  $('.button-collapse').sideNav({ closeOnClick: true });
  $('.collapsible').collapsible();
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });
});