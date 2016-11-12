$(() => {
  ReactDOM.render(
    <App />,
  document.getElementById('app'));

  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });

  // Prefer camera resolution nearest to 1280x720.
  // var constraints = { audio: true, video: false }; 
  // var audio = document.querySelector('audio');

  // navigator.mediaDevices.getUserMedia(constraints).then((stream) => {

  //   window.audioTracks = stream.getAudioTracks();
  //   // console.log('Got stream with constraints:', constraints);
  //   // console.log('Using audio device: ' + audioTracks[0].label);
  //   // stream.oninactive = function() {
  //   //   console.log('Stream ended');
  //   // };
  //   // window.stream = stream; // make variable available to browser console
  //   // audio.srcObject = stream;

  //   var options = {};
    // var speechEvents = hark(stream, options);

    // speechEvents.on('speaking', function() {
    //   console.log('speaking');
    // });

    // speechEvents.on('stopped_speaking', () => {
    //   console.log('stopped_speaking');
    // });

  // }).catch((err) => {
  //   console.log(err.name + ": " + err.message); 
  // });

});