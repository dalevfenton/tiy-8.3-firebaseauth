var Backbone = require('backbone');

var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'messages': 'messages'
  },
  index: function(){
    this.current = 'index';
  },
  messages: function(){
    this.current = 'messages'
  }
});


module.exports = new Router();
