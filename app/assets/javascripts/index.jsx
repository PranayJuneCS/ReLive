$(() => {
  ReactDOM.render(
    <App />,
  document.getElementById('app'));

  $('.photoCard').addClass('fadeInRight');

  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });

});