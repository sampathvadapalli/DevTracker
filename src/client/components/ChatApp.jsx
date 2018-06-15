require('../styles/ChatApp.css');
import styles from '../styles/ChatApp1.css';

import React from 'react';
import Dialog from 'terra-dialog';
import io from 'socket.io-client';
import config from '../config';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import Messages from './Messages';
import ChatInput from './ChatInput';

class ChatApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],

     };
    this.sendHandler = this.sendHandler.bind(this);
    // Connect to the server
    this.socket = io(config.api, { query: `username=${props.username}` }).connect();
    // Listen for messages from server
    this.socket.on('server:message', message => {
      this.addMessage(message);
    });
  }
  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      message
    };
  // Emit the message to the server
    this.socket.emit('client:message', messageObject);
  // Here we want to render the main chat application components
    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }
  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  render() {
    const header = <div className={cx('dialog-header')}><h3>{this.props.username}</h3></div>;
    const footer = <ChatInput onSend={this.sendHandler} />;
    const body = <div className="MessageContainer"><Messages messages={this.state.messages} /></div>;

    return (
      <div style={{height: '400px', width: '375px', border: '1px #f4f4f4 solid', position: 'fixed', bottom: '0', right: '0', background: 'white'}}>
        <Dialog header={header} footer={footer} onClose={this.props.handleCloseDialog} isOpen={this.props.isDialogOpen} >
          {body}
        </Dialog>
      </div>
    );
  }

}
ChatApp.defaultProps = {
  username: 'Anonymous'
};

export default ChatApp;
