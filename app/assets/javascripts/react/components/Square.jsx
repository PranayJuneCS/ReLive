class Square extends React.Component {

  constructor(props) {
    super(props);

    this.state = {messages: [], paid: false};

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
          console.log(errors);
          this.setState({messages: errors.map((error) => error.message)});
        } else {
          request('http://localhost:3000/card?nonce=' + nonce + '&amount=' + this.props.amount, function(error, response, body) {
            if (response.body && 'transaction' in response.body) {
              transaction = response.body.transaction;
              this.setState({messages: ["Transaction successful", "Created: " + transaction.created_at, "Amount: " + (transaction.tenders[0].amount_money.amount / 100).toFixed(2)], paid: true});
            } else {
              this.setState({messages: ["Transaction failed"]});
            }
          }.bind(this));
        }
      }.bind(this)
    }});
  }

  requestCardNonce(event) {
    event.preventDefault();
    this.paymentForm.requestCardNonce();
  }

  componentDidMount() {
    if (!this.state.paid) {
      this.paymentForm.build();
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col offset-s3 s6">
            <div className="card blue darken-1">
              <div className="card-content white-text">
                <span className="card-title">Square</span>
                <div className="row">
                  <div className="col s6">
                    <h6>Your total: ${(this.props.amount / 100).toFixed(2)}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12">
                    <ul>{this.state.messages.map((message) => <li key={message}>{message}</li>)}</ul>
                  </div>
                </div>
                {this.state.paid ? null :
                <form className="form" onSubmit={this.requestCardNonce.bind(this)}>
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
                </form>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
