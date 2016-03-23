var React = require('react');

var Signup = React.createClass({
  getInitialState: function(){
    return {
      email: '',
      password: ''
    }
  },
  handleEmail: function(e){
    this.setState({'email': e.target.value });
  },
  handlePassword: function(e){
    this.setState({'password': e.target.value });
  },
  handleSubmit: function(e){
    e.preventDefault();
    this.props.createUser(this.state.email, this.state.password);
  },
  render: function(){
    return (
      <div className="col-sm-4">
        <h3>Create An Account</h3>
          <form id="signup" onSubmit={this.handleSubmit} >
            <input name="email" type="email"
              placeholder="Email Address" onChange={this.handleEmail} />
            <input name="password" type="password"
              placeholder="Password" onChange={this.handlePassword} />
            <button type="submit">Submit</button>
          </form>
      </div>
    );
  }
});

module.exports = Signup;
