var React = require('react');

var Login = React.createClass({
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
    this.props.setUser(this.state.email, this.state.password);
  },
  render: function(){
    return(
      <div className="col-sm-4">
        <h3>Login</h3>
        <form id="login" onSubmit={this.handleSubmit}>
          <input name="email" type="email" value={this.state.email}
            placeholder="Email Address" onChange={this.handleEmail} />
          <input name="password" type="password" value={this.state.password}
            placeholder="Password" onChange={this.handlePassword} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
});

module.exports = Login;
