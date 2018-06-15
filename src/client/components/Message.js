import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageTimestamp: (new Date()).toLocaleTimeString()
     };
  }
  render() {
    const fromMe = this.props.fromMe ? 'from-me' : '';
    return (
      <div className={`message ${fromMe}`}>
        <div className='username'>
          {this.props.username}
          ,
          {this.state.messageTimestamp}
        </div>
        <div className='message-body'>
          { this.props.message }
        </div>
      </div>
    );
  }
}

Message.defaultProps = {
};

export default Message;
