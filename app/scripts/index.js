var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var router = require('./router');

var InterfaceComponent = require('./components/interface.jsx');

Backbone.history.start();

ReactDOM.render(
  React.createElement(
    InterfaceComponent,
    {
      router: router
    }
  ),
  document.getElementById('app')
);
