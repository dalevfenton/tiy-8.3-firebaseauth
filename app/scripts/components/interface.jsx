var React = require('react');
var Backbone = require('backbone');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');

var Login = require('./login.jsx');
var Signup = require('./signup.jsx');
var Messages = require('./messages.jsx');

var InterfaceComponent = React.createClass({
  mixins: [ ReactFireMixin ],
  getInitialState: function(){
    return {
      router: this.props.router,
      loggedin: false,
      user: null
    }
  },
  componentWillMount: function(){
    //hookup Backbone Router to state
    this.callback = (function(){
      this.forceUpdate();
    }.bind(this));
    this.state.router.on( 'route', this.callback );
    //instantiate Firebase ref object to communicate with Firebase
    this.firebaseRef = new Firebase("https://luminous-inferno-8263.firebaseio.com/");
    //set items endpoint to array in our state
    this.bindAsArray(new Firebase("https://luminous-inferno-8263.firebaseio.com/stuff/"), "items");
  },
  componentWillUnmount: function(){
    this.state.router.off( 'route', this.callback );
  },
  handleMessageSubmit: function(text) {
    this.firebaseRefs["items"].push({
      text: text
    });
    this.setState({text: ""});
  },
  setUser: function(email, pass){
    this.firebaseRef.authWithPassword({'email': email, 'password': pass},
      function(error, authData){
        if(error){
          // console.log('Login Failed!', error );
          this.setState({'alert': 'Login Failed!', 'alertClass': 'alert-danger'});
        }else{
          // console.log('Authenticated Successfully with payload', authData );
          this.setState({'auth': authData});
          Backbone.history.navigate('messages', {trigger: true});
        }
      }.bind(this));
  },
  createUser: function(email, pass){
    this.firebaseRef.createUser({'email': email, 'password': pass},
    function(error, userData){
      if(error){
        switch (error.code) {
          case "EMAIL_TAKEN":
            // console.log("The new user account cannot be created because the email is already in use.");
            this.setState({'alert': 'Email Already In Use!', 'alertClass': 'alert-danger'});
            break;
          case "INVALID_EMAIL":
            // console.log("The specified email is not a valid email");
            this.setState({'alert': 'Not a Valid Email!', 'alertClass': 'alert-danger'});
            break;
          default:
            this.setState({'alert': 'Account Creation Failed! Please Try Again!', 'alertClass': 'alert-danger'});
            // console.log("Error creating user:", error);
        }
      }else{
        // console.log("Successfully created user account with user data:", userData);
        this.setState({'alert': 'Account Created Successfully! Go Login Now', 'alertClass': 'alert-success'});
      }
    }.bind(this));
  },
  render: function(){
    //login page
    var alert, alertClass;
    if(this.state.alert){
      alert = this.state.alert;
      alertClass = "alert " + this.state.alertClass;
    }

    if(this.props.router.current == 'index'){
      return (
        <div className="container">
          <div className="row">

            <Login setUser={this.setUser} />

            <div className="col-sm-2">
              <h6>or</h6>
            </div>

            <Signup createUser={this.createUser}/>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className={alertClass} role="alert">
                {alert}
              </div>
            </div>
          </div>
        </div>
      );
    }
    //page with messages
    if(this.props.router.current == 'messages'){
      return (
        <div className="container">
          <div className="row">
            <Messages handleMessageSubmit={this.handleMessageSubmit} messages={this.state.items}/>
          </div>
        </div>
      );
    }
  }
});

module.exports = InterfaceComponent;
