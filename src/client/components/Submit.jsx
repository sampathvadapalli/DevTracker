import React, {Component} from 'react';
import Card from 'terra-card';
import Button from 'terra-button';

class Submit extends Component {
  render() {
    return(
      <Card>
        <Card.Body isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
          <Button onClick={this.props.cardRequestInParent} isCompact={false} isIconOnly={false} text="Submit" variant="action" type="submit" width={200}/>
        </Card.Body>
      </Card>
    );
  }
}

export default Submit;
