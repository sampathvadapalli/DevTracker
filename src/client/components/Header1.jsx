import React, {Component} from 'react';
import Header from 'terra-clinical-header';
import Card from 'terra-card';
import Grid from 'terra-grid';
import Button from 'terra-button';
import Image from 'terra-image';
import IconSettings from 'terra-icon/lib/icon/IconSettings';

import styles from '../styles/Header1.css';
import axios from 'axios';

const url = 'http://127.0.0.1:8080/main/data';

class Header1 extends Component {
    constructor(props) {
        super(props);
        this.setButtonNode = this.setButtonNode.bind(this);
        this.getButtonNode = this.getButtonNode.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.state = {
            open: false,
            toggle1Selected: false,
            toggle2Selected: false,
            userN: ''
        };
    }

    componentDidMount() {
        var _this = this;
        axios.get(url, {
                headers: {
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type':'application/json'
                }
            }
        ).then((response)=>{
            _this.listItems = response.data;
            console.log(response.data);
            console.log(this.listItems.userName);
            this.setState({userN: this.listItems.userName});
        });
    }

    setButtonNode(node) {this.buttonNode = node;}
    getButtonNode() {return this.buttonNode;}
    handleButtonClick() {this.setState({ open: true });}
    handleRequestClose() {this.setState({ open: false });}

    render() {
        return(
            <Header title="" isSubheader={false} style={{width: '100%'}}
                    startContent={<Image className={styles.logoStyling} src = "./images/Cerner_Logo.svg" alt = "alt-text" isFluid = {true} variant = "default" />}
                    endContent={
                        <Grid.Row >
                            <div>
                                <Card.Body isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
                                    <Button isBlock={false} isCompact={false} icon={<IconSettings className={styles.settingsIconStyling}/>} isBidi={true} isSpin={true} text="" variant="utility" type="button"/>
                                </Card.Body>
                            </div>
                            <div>
                                <Card.Body isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
                                    <Image onMouseDown={()=> window.open("/logout", "_self")} style={{height: '40px', width: '30px', cursor: 'pointer'}} src = "./images/logout.svg" alt = "alt-text" isFluid = {true} variant = "default" />
                                </Card.Body>
                            </div>
                            <div>
                                <Card.Body isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
                                    <div className={styles.UsernamebuttonStyling}>{this.props.userName}</div>
                                </Card.Body>
                            </div>
                        </Grid.Row>
                    }
            />
        );
    }
}

export default Header1;
