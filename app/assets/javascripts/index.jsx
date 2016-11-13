const ADD_CURR_LOCATION_URL = "/user/update_location"

$(() => {

      splashTransition = function() {
        $('#app').removeClass('hide');
        setTimeout(() => {
          $('.splash').addClass('fadeOut');
        }, 500);
        setTimeout(() => {
          $('.splash').addClass('hide');
        }, 1500);
        ReactDOM.render(
          <App userLocation={currentLocation}/>,
        document.getElementById('app'));
        $('.photoCard').addClass('fadeInRight');
      }

      let currentLocation = "";
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          $.ajax({
            url: ADD_CURR_LOCATION_URL,
            data: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            headers: {
              'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            type: "POST",
            success: (data) => {
              currentLocation = data.airport;
              splashTransition();
            },
            error: (data) => {
              splashTransition();
            }
          });
        });
      }

});