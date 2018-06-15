import React, {Component} from 'react';
import Header from 'terra-clinical-header';
import Button from 'terra-button';
import Card from 'terra-card';
import Grid from 'terra-grid';
import IconAdd from 'terra-icon/lib/icon/IconAdd';
import IconEdit from 'terra-icon/lib/icon/IconEdit';
import IconMinus from 'terra-icon/lib/icon/IconMinus';
import IconSave from 'terra-icon/lib/icon/IconSave';
import IconDownload from 'terra-icon/lib/icon/IconDownload';
import IconRefresh from 'terra-icon/lib/icon/IconRefresh';
import IconFunnel from 'terra-icon/lib/icon/IconFunnel';
import SearchField from 'terra-search-field';

import styles from '../styles/Header2.css';

class Header2 extends Component {

  render() {
    return(
      <Header title=""
        startContent={
          <Grid.Row >
            <Card.Body isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
              <Button isCompact={true} isIconOnly={true} icon={<IconAdd className={styles.ButtonIconStyling} onClick = {this.props.triggerParentaddRow} />} text="" variant="de-emphasis" type="button"/>
            </Card.Body>
            <Card.Body isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
              <Button isCompact={true} isIconOnly={true} icon={<IconEdit className={styles.ButtonIconStyling} />} text="" variant="de-emphasis" type="button"/>
            </Card.Body>
            <Card.Body isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
              <Button isCompact={true} isIconOnly={true} icon={<IconSave className={styles.ButtonIconStyling} />} text="Button" variant="de-emphasis" type="button"/>
            </Card.Body>
            <Card.Body isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
              <Button isCompact={true} isIconOnly={true} icon={<IconDownload className={styles.ButtonIconStyling} />} text="Button" variant="de-emphasis" type="button"/>
            </Card.Body>
          </Grid.Row>
        }
        endContent={
          <Grid.Row >
            <Card.Body isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
              <Button isCompact={true} isIconOnly={true} icon={<IconRefresh className={styles.ButtonIconStyling} />} text="Button" variant="de-emphasis" type="button"/>
            </Card.Body>
            <Card.Body isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
              <Button isCompact={true} isIconOnly={true} icon={<IconFunnel className={styles.ButtonIconStyling} />} text="" variant="de-emphasis" type="button"/>
            </Card.Body>
            <Card.Body hasPaddingVertical={true} hasPaddingHorizontal={true}>
              <SearchField isBlock={true} disableAutoSearch={false} placeholder="Search..." minimumSearchTextLength={15} searchDelay={250}/>
            </Card.Body>
          </Grid.Row>
        }
      />
    );
  }
}

export default Header2;
