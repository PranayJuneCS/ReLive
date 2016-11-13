$(() => {
      setTimeout(function() {
        $('#app').removeClass('hide');
        setTimeout(() => {
			$('.splash').addClass('fadeOut');
        }, 500)
        setTimeout(() => {
        	$('.splash').addClass('hide')
        }, 1500);
        ReactDOM.render(
          <App />,
        document.getElementById('app'));
      }, 1500);

  $('.photoCard').addClass('fadeInRight');

});