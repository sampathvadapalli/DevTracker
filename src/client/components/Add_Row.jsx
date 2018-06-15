require('../styles/Add_Row.css');

import React, {Component} from 'react';
import Card from 'terra-card';
import Badge from 'terra-badge';
import Table from 'terra-table';
import DatePicker from 'terra-date-picker';
import Checkbox from 'terra-form-checkbox';
import Input from 'terra-form-input';
import IconComment from 'terra-icon/lib/icon/IconComment';
import axios from 'axios';

const url1 = 'http://127.0.0.1:8080/main/data';
const ts = new Date();
const timestamp = ts.toLocaleDateString();
const minimum_date = ts.toISOString();

class Add_Row extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            card_no: '',
            mentor: '',
            hr: '',
            selectedOption: '',
            date: '',
            card_no_entered: true,
            listItems: [],
            allReq: [],
            userN: '',
            execN: '',
            deptN: '',
            selectedDate: this.props.selectedDate,
            selectedDateError: '',
            //value:false
        };
        this.onChange = this.onChange.bind(this);
        this.handleChangeCardno = this.handleChangeCardno.bind(this);
        this.handleChangeMentor = this.handleChangeMentor.bind(this);
        this.handleChangeHR = this.handleChangeHR.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    componentDidMount() {
        var _this = this;
        axios.get(url1, {
                headers: {
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type':'application/json'
                }
            }
        ).then((response)=>{
            _this.listItems = response.data;
            this.setState({userN : this.listItems.userName});
            this.setState({execN : this.listItems.executiveName});
            this.setState({deptN : this.listItems.dept});

        })
    }

    onChange(e) {
        this.setState({ selectedOption: e.target.value }, ()=> { this.props.JobtoApp(this.state.selectedOption); } );
    }

    handleChangeCardno(event) {this.setState({card_no: event.target.value}); this.setState({card_no_entered: false}, ()=> { this.props.cardNotoApp(this.state.card_no); } );}
    handleChangeMentor(event) {
        if(this.state.card_no === '')
            alert('Enter card number');
        else
            this.setState({mentor: event.target.value}, ()=> { this.props.MentortoApp(this.state.mentor); });
    }

    handleCheck() {
        this.setState({checked : !this.state.checked}, ()=> {
            if (this.state.checked) {
                this.props.PlacementStatustoApp('Yes');
            }
            else{this.props.PlacementStatustoApp('No');}
        });
    }

    handleChangeHR(event) {
        if(this.state.card_no === '')
            alert('Enter card number');
        else
            this.setState({hr: event.target.value}, ()=> { this.props.HrtoApp(this.state.hr); });
    }

    handleInputChange(event) {
        if(this.state.card_no === '')
            alert('Enter card number');
        else {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
            this.setState({[name]: value});
        }
    }

    handleChangeDate(event, value) {
        const selectedDateError = this.state.selectedDateError;
        const selectedDate = value;
        if(this.state.card_no === '') {
            alert('Enter card number');
        }
        else {
            if(value !== '') {
                this.setState({selectedDateError, selectedDate}, ()=> { this.props.DatetoApp(this.state.selectedDate); });
            }
            else {
                this.setState({selectedDateError: '', selectedDate});
            }
        }
    }


    render() {
        const isWeekday = (date) => {
            const day = date.day();
            return day !== 0 && day !== 6;
        };

        if (this.state.userN.includes("Sangeetha")) {

            return (

                <Table.Row>
                    <Table.Cell key="ROW_CARDNO" content={
                        <Card.Body isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
                            <Input name="description" value={this.state.card_no} required
                                   onChange={this.handleChangeCardno.bind(this)}/>
                        </Card.Body>
                    }
                    />
                    <Table.Cell key="ROW_JOB" content={
                        <Card.Body isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
                            <select value={this.state.selectedOption} onChange={this.onChange.bind(this)}>
                                <option value="select">Select</option>
                                <option value="software engineer">Software Engineer</option>
                                <option value="associate senior software engineer">Associate Senior Software Engineer
                                </option>
                            </select>
                        </Card.Body>
                    }
                    />
                    <Table.Cell key="ROW_MENTORNAME" content={
                        <Card.Body isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
                            <Input name="description" value={this.state.mentor} required
                                   onChange={this.handleChangeMentor.bind(this)}/>
                        </Card.Body>
                    }
                    />
                    <Table.Cell key="ROW_HR_PARTNER" content={
                        <Card.Body isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
                            <Input name="description" value={this.state.hr} required
                                   onChange={this.handleChangeHR.bind(this)}/>
                        </Card.Body>
                    }
                    />
                    <Table.Cell content={
                        <Card.Body isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
                            <Badge onClick={this.props.handleOpenModal} icon={<IconComment height="1em" width="1em"/>}
                                   text="comment" intent="default" size="medium"/>
                        </Card.Body>
                    }
                    />
                    <Table.Cell key="ROW_TEAMNAME" content={this.state.deptN}/>
                    <Table.Cell key="ROW_MANAGERNAME" content={this.state.userN}/>
                    <Table.Cell key="ROW_EXECNAME" content={this.state.execN}/>
                    <Table.Cell key="ROW_SUMITTED_ON" content={timestamp}/>
                    <Table.Cell key="ROW_STATUS" content={'Tracker Request'}/>
                    <Table.Cell key="ROW_PLACEMENT_BY"
                                content={
                                    <Card.Body error={this.state.selectedDateError} isContentCentered={true}
                                               hasPaddingVertical={true} hasPaddingHorizontal={true}>
                                        <DatePicker onChange={this.handleChangeDate} minDate={minimum_date}
                                                    disabled={this.state.card_no_entered}
                                                    selectedDate={this.state.selectedDate} name="placement-date"
                                                    filterDate={isWeekday}/>
                                    </Card.Body>
                                }/>
                    <Table.Cell key="ROW_PLACED" content={<input type="checkbox" disabled={this.state.card_no_entered}
                                                                 onChange={this.handleCheck}
                                                                 defaultChecked={this.state.checked}/>}/>
                    <Table.Cell key="ROW_CANCEL_REQUEST" content={<Checkbox labelText=""/>}/>
                </Table.Row>

            );
        }
        else {

            return (

                <Table.Row>
                    <Table.Cell key="ROW_CARDNO" content={
                        <Card.Body isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
                            <Input name="description" value={this.state.card_no} required
                                   onChange={this.handleChangeCardno.bind(this)}/>
                        </Card.Body>
                    }
                    />
                    <Table.Cell key="ROW_JOB" content={
                        <Card.Body isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
                            <select value={this.state.selectedOption} onChange={this.onChange.bind(this)}>
                                <option value="select">Select</option>
                                <option value="software engineer">Software Engineer</option>
                                <option value="associate senior software engineer">Associate Senior Software Engineer
                                </option>
                            </select>
                        </Card.Body>
                    }
                    />
                    <Table.Cell key="ROW_MENTORNAME" content={
                        <Card.Body isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
                            <Input name="description" value={this.state.mentor} required
                                   onChange={this.handleChangeMentor.bind(this)}/>
                        </Card.Body>
                    }
                    />
                    <Table.Cell key="ROW_HR_PARTNER" content={
                        <Card.Body isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
                            <Input name="description" value={this.state.hr} required
                                   onChange={this.handleChangeHR.bind(this)}/>
                        </Card.Body>
                    }
                    />
                    <Table.Cell content={
                        <Card.Body isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
                            <Badge onClick={this.props.handleOpenModal} icon={<IconComment height="1em" width="1em"/>}
                                   text="comment" intent="default" size="medium"/>
                        </Card.Body>
                    }
                    />
                    <Table.Cell key="ROW_TEAMNAME" content={this.state.deptN}/>
                    <Table.Cell key="ROW_MANAGERNAME" content={this.state.userN}/>
                    <Table.Cell key="ROW_EXECNAME" content={this.state.execN}/>
                    <Table.Cell key="ROW_SUMITTED_ON" content={timestamp}/>
                    <Table.Cell key="ROW_STATUS" content={'Tracker Request'}/>
                    <Table.Cell key="ROW_PLACEMENT_BY"
                                content={
                                    "TBD"
                                }/>
                    <Table.Cell key="ROW_PLACED" content={<input type="checkbox" disabled={this.state.card_no_entered}
                                                                 onChange={this.handleCheck}
                                                                 defaultChecked={this.state.checked}/>}/>
                    <Table.Cell key="ROW_CANCEL_REQUEST" content={<Checkbox labelText=""/>}/>
                </Table.Row>

            );
        }
    }
}
export default Add_Row;
