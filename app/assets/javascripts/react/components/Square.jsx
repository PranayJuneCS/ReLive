class Square extends React.Component {

  constructor(props) {
    super(props);

    this.amount = props.amount;

    this.paymentForm = new SqPaymentForm({applicationId: "sandbox-sq0idp-3ztn06WED43NRGMH0pAs4w",
    inputClass: 'sq-input',
    cardNumber: {
      elementId: 'sq-card-number',
      placeholder: '•••• •••• •••• ••••'
    },
    cvv: {
      elementId: 'sq-cvv',
      placeholder: 'CVV'
    },
    expirationDate: {
      elementId: 'sq-expiration-date',
      placeholder: 'MM/YY'
    },
    postalCode: {
      elementId: 'sq-postal-code'
    },
    callbacks: {
      cardNonceResponseReceived: function(errors, nonce, cardData) {
        if (errors) {
          message = "";
          console.log(errors);
          for (error in errors) {
            message = message + errors[error].message + "\n";
          }
          alert(message);
        } else {
          request('http://localhost:3000/card?nonce=' + nonce + '&amount=' + this.amount, function(error, response, body) {
            if ('transaction' in response.body) {
              alert("Transaction Successful: Transaction ID = " + response.body.transaction.id);
            } else {
              alert("Transaction Failure, please try again");
            }
          });
        }
      }.bind(this)
    }});
  }

  requestCardNonce(event) {
    event.preventDefault();
    this.paymentForm.requestCardNonce();
  }

  componentDidMount() {
    this.paymentForm.build();
  }

  render() {
    return (
      <div className="container">
        <form className="row" onSubmit={this.requestCardNonce.bind(this)}>
          <div className="col offset-s3 s6">
            <div className="card blue darken-1">
              <div className="card-content white-text">
                <span className="card-title">Square</span>
                <div className="row">
                  <div className="col s6">
                    <h6>Your total: ${(this.amount / 100).toFixed(2)}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s8">
                    <label htmlFor="sq-card-number">Card</label>
                    <input id="sq-card-number" type="text"></input>
                  </div>
                  <div className="input-field col s4">
                    <label htmlFor="sq-cvv">CVV</label>
                    <input id="sq-cvv" type="text"></input>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <label htmlFor="sq-expiration-date">Expiration</label>
                    <input id="sq-expiration-date" type="text"></input>
                  </div>
                  <div className="input-field col s6">
                    <label htmlFor="sq-postal-code">Postal Code</label>
                    <input id="sq-postal-code" type="text"></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col offset-s3 s6">
                    <input className="btn" type="submit"></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
