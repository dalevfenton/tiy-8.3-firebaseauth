var React = require('react');

var InterfaceComponent = React.createClass({
  getInitialState: function(){
    return {
      router: this.props.router
    }
  },
  componentWillMount: function(){
    this.callback = (function(){
      this.forceUpdate();
    }.bind(this));
    this.state.router.on( 'route', this.callback );
  },
  componentWillUnmount: function(){
    this.state.router.off( 'route', this.callback );
  },
  render: function(){
    if(this.props.router.current == 'index'){
      return (
        <div className="container">
          <h1>Index</h1>
          <a href="#messages">Go To Messages</a>
        </div>
      );
    }
    if(this.props.router.current == 'messages'){
      return (
        <div className="container">
          <h1>Messages</h1>
          <a href="#">Go To Index</a>
        </div>
      );
    }
  }
});

module.exports = InterfaceComponent;
