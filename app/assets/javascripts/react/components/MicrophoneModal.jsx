class MicrophoneModal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.modal-trigger-mic').leanModal({
      dismissible: false,
      complete: (event) => {
      }
    });
  }

  render() {
    return(
      <div>
        <div id="modal1" className="modal">
          <div className="modal-content microphone-modal">
            <div className="mic-visual">
              <div className="mic-bar">
                <div className="mic-bar-1"></div>
              </div>
              <div className="mic-bar">
                <div className="mic-bar-2"></div>
              </div>
              <div className="mic-bar">
                <div className="mic-bar-3"></div>
              </div>
              <div className="mic-bar">
                <div className="mic-bar-4"></div>
              </div>
              <div className="mic-bar">
                <div className="mic-bar-5"></div>
              </div>
              <div className="mic-bar">
                <div className="mic-bar-6"></div>
              </div>
            </div>
            <div className="mic-loader">
              <div className="atom">
                <div className="electron"></div>
                <div className="electron"></div>
                <div className="electron"></div>
                <div className="electron"></div>
              </div>
            </div>
            <p id="mic-output"></p>
          </div>
          <div className="modal-footer">
            <a href="#" className="hide mic-modal-close modal-action modal-close waves-effect waves-red btn-flat">Cancel</a>
          </div>
        </div>
      </div>
    )
  }
}