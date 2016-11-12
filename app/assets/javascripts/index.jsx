$(() => {
  ReactDOM.render(
    <App />,
  document.getElementById('app'));

<<<<<<< HEAD
  $('.photoCard').addClass('fadeInRight');

  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });
=======
  
>>>>>>> 4e4eed553290fefd57cf714edc5437cbc75d65c1

});