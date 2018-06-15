import React from 'react';
import Textarea from 'terra-form-textarea';
import Button from 'terra-button';
import IconSend from 'terra-icon/lib/icon/IconSend';
import Arrange from 'terra-arrange';

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatInput: '',
     };
    this.submitHandler = this.submitHandler.bind(this);
    this.textChangeHandler = this.textChangeHandler.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }
  textChangeHandler(event)  {
    this.setState({ chatInput: event.target.value });
  }
  submitHandler(event) {
    if(this.state.chatInput !== '') {
      event.preventDefault();
      this.props.onSend(this.state.chatInput);
      this.setState({ chatInput: '' });
    }
  }
  onKeyPress(event) {
    var code = event.keyCode || event.which;
    if(code === 13) {
      console.log('enter pressed');
      this.submitHandler;
    }
  }
  render() {
    return (
            <Arrange className="chat-input"
              fitStart={''}
              fill={
                <Textarea type="text"
                rowSpan="2"
                size="full"
                onChange={this.textChangeHandler}
                value={this.state.chatInput}
                placeholder="Write a comment..."
                onKeyPress={this.onKeyPress}
                required/>
              }
              fitEnd={<Button className="sendStyling" isIconOnly={true} onClick={this.submitHandler} icon={<IconSend className="sendButton" height="1em" width="1em" />} text="Button" variant="action" type="submit"/>}
              alignFitStart="default"
              alignFill="stretch"
              alignFitEnd="center"
            />
    );
  }
}

ChatInput.defaultProps = {
};

export default ChatInput;
