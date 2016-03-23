var React = require('react');

var Messages = React.createClass({
  getInitialState: function(){
    return {
      text: ''
    }
  },
  handleText: function(e){
    e.preventDefault();
    this.setState({text: e.target.value});
  },
  handleMessageSubmit: function(e){
    e.preventDefault();
    var text = this.state.text;
    this.props.handleMessageSubmit(text);
    this.setState({'text': ''});
  },
  render: function(){
    console.log(this.props.messages);
    var messages = this.props.messages.map(function(message){
      return ( <div key={message.key}>{message.text}</div>);
      console.log(message.text);
    });
    return (
      <div>
        <h1>Messages</h1>
        <div>
          {messages}
        </div>
        <form onSubmit={this.handleMessageSubmit}>
          <input type="text" placeholder="Type A Message"
            onChange={this.handleText} value={this.state.text} />
          <button type="submit">Send Message</button>
        </form>
      </div>
    );
  }
})

module.exports = Messages;
