import React, {Component} from 'react';
import ContentContainer from 'terra-content-container';
import {injectIntl} from 'react-intl';
import Table from 'terra-table';
import Card from 'terra-card';
import Button from 'terra-button';
import Badge from 'terra-badge';
import Checkbox from 'terra-form-checkbox';
import IconComment from 'terra-icon/lib/icon/IconComment';
import axios from 'axios';
import DatePicker from 'terra-date-picker';

import Heading from './Heading.jsx'
import Header1 from './Header1.jsx';
import Header2 from './Header2.jsx';
import Add_Row from './Add_Row.jsx';
import ChatApp from './ChatApp.jsx';


const url1 = 'http://127.0.0.1:8080/main/data';
const url2 = 'http://127.0.0.1:8080/db';
const url3 = 'http://127.0.0.1:8080/allRequests';


const ts = new Date();
const timestamp = ts.toLocaleDateString();
const minimum_date = ts.toISOString();

var requests;
var submitted_on_date;
var placement_by_date;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tablerows:[],
            addRequest: [],
            listItems: [],
            submit_state: false,
            userN: '',
            userId: '',
            deptN: '',
            execN: '',
            cardNo:'',
            Job:'',
            Mentor:'',
            Hr:'',
            PlacementDate:'',
            teamID:'',
            latestReqId: '',
            Placement_Status: '',
            selectedDate: this.props.selectedDate,
            selectedDateError: '',
            allReqLen: '',
            getReqLen: ''
        };
        this.addRequest = this.addRequest.bind(this);
        this.getRequests = this.getRequests.bind(this);
        this.idleLogout = this.idleLogout.bind(this);
        this.addRow = this.addRow.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handlecardNofromAdd_Row = this.handlecardNofromAdd_Row.bind(this);
        this.handleJobfromAdd_Row = this.handleJobfromAdd_Row.bind(this);
        this.handleMentorfromAdd_Row = this.handleMentorfromAdd_Row.bind(this);
        this.handleHrfromAdd_Row = this.handleHrfromAdd_Row.bind(this);
        this.handlePlacementDatefromAdd_Row = this.handlePlacementDatefromAdd_Row.bind(this);
        this.handlePlacementStatusfromAdd_Row = this.handlePlacementStatusfromAdd_Row.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);

        this.something = [];
        this.requests=[];
    }
    handleOpenModal() {this.setState({isModalOpen: true});}
    handleCloseModal() {this.setState({isModalOpen: false}); console.log('dialog closed');}
    handlecardNofromAdd_Row(data) {this.setState({cardNo: data});}
    handleJobfromAdd_Row(data) {this.setState({Job: data});}
    handleMentorfromAdd_Row(data) {this.setState({Mentor: data});}
    handleHrfromAdd_Row(data) {this.setState({Hr: data});}
    handlePlacementDatefromAdd_Row(data) {this.setState({PlacementDate: data});}
    handlePlacementStatusfromAdd_Row(data) {this.setState({Placement_Status: data});}

    componentDidMount() {
        axios.get(url1, {
                headers: {
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type':'application/json'
                }
            }
        ).then((response)=>{
            //_this.listItems = response.data;
            console.log('data in response data:' ,response.data);
            //console.log(this.listItems.userName);
            this.setState({respLength: response.data.length});
            this.setState({userN: response.data.userName});
            this.setState({deptN: response.data.dept});
            this.setState({execN: response.data.executiveName});
            this.setState({team_ID: response.data.teamId});
            this.setState({userId: response.data.givenId});
            this.getRequests();
        });
        axios.get(url3, {
                headers: {
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type':'application/json'
                }
            }
        ).then((response)=>{
            //_this.listItems = response.data;
            console.log('length of response data:' ,response.data.length);
            this.setState({latestReqId: response.data[response.data.length-1].id});
            this.setState({allReqLen: response.data.length});

        });
    }

    addRequest(){
        console.log('cradNo in render: ',this.state.cardNo);
        console.log('cradNo in render: ',this.state.Job);
        console.log('cradNo in render: ',this.state.Mentor);
        console.log('cradNo in render: ',this.state.Hr);
        console.log('cradNo in render: ',this.state.PlacementDate);
        console.log("Placement Status ", this.state.Placement_Status );
        if(this.state.Job.includes("associate"))
        {
            var job_id = 2;
        }
        else {
            var job_id = 1;
        }
        console.log("::"+this.state.Placement_Status);
        if(this.state.Placement_Status.includes("e")){
            var placed = 1;
        }
        else {
            var placed = 0;
        }
        var newRequest = {
            request_id: this.state.latestReqId + 1,
            team_id: this.state.team_ID,
            card_no: this.state.cardNo,
            job_Id: job_id,
            mentor_name: this.state.Mentor,
            hr: this.state.Hr,
            placement_by: this.state.PlacementDate,
            placed: placed,
            manager_id: this.state.userId,
            submitted_on: timestamp
        };
        var placement_by = convertDate(newRequest.placement_by.substr(0,10));
        if(placement_by ==="//")
        {
            placement_by = "TBD";
        }
        if((newRequest.card_no!=="")){
            axios.get('http://127.0.0.1:8080/addRequest?id='+newRequest.request_id+'&team_id='+newRequest.team_id+'&manager_id='+"'"+newRequest.manager_id+"'"+'&job_id='+newRequest.job_Id+'&card_number='+"'"+newRequest.card_no+"'"+'&submitted_on='+"'"+newRequest.submitted_on+"'"+'&status="Tracker Request"&placement_by='+"'"+placement_by+"'"+'&placed='+"'"+placed+"'"+'&mentor_name='+"'"+newRequest.mentor_name+"'"+'')
            this.componentDidMount();
        }
        else {
            this.componentDidMount();
        }
        function convertDate(dateString) {
            var p = dateString.split(/\D/g);
            return [p[2], p[1], p[0]].join("/");
        };
    }

    getRequests() {
        let _this = this;
        axios.get(url2, {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json'
            }
        })
            .then((response)=>{
                _this.requestItems = response.data;
                _this.requests = response.data;
                _this.setState({Requests: response.data});
                _this.setState({getReqLen: response.data.length});
            })
    }


    idleLogout() {
        var t;
        window.onload = resetTimer;
        window.onmousemove = resetTimer;
        window.onmousedown = resetTimer;  // catches touchscreen presses as well
        window.ontouchstart = resetTimer; // catches touchscreen swipes as well
        window.onclick = resetTimer;      // catches touchpad clicks as well
        window.onkeypress = resetTimer;
        window.addEventListener('scroll', resetTimer, true);

        function yourFunction() {
            alert('Logged out');
            window.open("/logout", "_self");
        }

        function resetTimer() {
            clearTimeout(t);
            t = setTimeout(yourFunction, 600000);  // time is in milliseconds
        }
    }

    addRow() {
        // add new data from here
        var newdata = {}
        //take the existing state and concat the new data and set the state again
        this.setState({tablerows: this.state.tablerows.concat(newdata)});
    }
    rows() {
        return (this.state.tablerows.map( row_add => {
            return (<Add_Row cardNotoApp={this.handlecardNofromAdd_Row} JobtoApp={this.handleJobfromAdd_Row} MentortoApp={this.handleMentorfromAdd_Row} HrtoApp={this.handleHrfromAdd_Row} DatetoApp={this.handlePlacementDatefromAdd_Row} PlacementStatustoApp={this.handlePlacementStatusfromAdd_Row} handleOpenModal={this.handleOpenModal} isModalOpen={this.state.isModalOpen}/>);}
        ))
    }
    handleChangeDate(event, value) {
        const selectedDateError = this.state.selectedDateError;
        const selectedDate = value;
        if(value !== '') {
            this.setState({selectedDateError, selectedDate});
        }
        else {
            this.setState({selectedDateError: '', selectedDate});
        }
    }

    render() {
        const isWeekday = (date) => {
            const day = date.day();
            return day !== 0 && day !== 6;
        };
        const modalDialog = !this.state.isModalOpen ? null
            : (
                <div style={{background: 'white'}}>
                    <ChatApp username={this.state.userN} cardNo={this.state.cardNo} isDialogOpen={this.state.isModalOpen} handleCloseDialog={this.handleCloseModal} />
                </div>
            );

        return(
            <ContentContainer
                header={
                    <div style={{width :'100%'}}>
                        <Heading />
                        <Header1 userName={this.state.userN}/>
                        <Header2 triggerParentaddRow={this.addRow} />
                    </div>
                }
                footer={
                    <div>
                        <Card>
                            <Card.Body isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
                                <Button onClick={this.addRequest} isCompact={false} isIconOnly={false} text="Submit" variant="action" type="submit" width={200}/>
                            </Card.Body>
                        </Card>

                    </div>
                }
            >
                <Table className="table" isStriped={true} isPadded={true}>
                    <Table.Header>
                        <Table.HeaderCell key="CARD_NO" content={<Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {true}>Card Number</Card.Body>}/>
                        <Table.HeaderCell key="JOB" content={<Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {true}>Job</Card.Body>}/>
                        <Table.HeaderCell key="MENTOR" content={<Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {true}>Mentor</Card.Body>}/>
                        <Table.HeaderCell key="HR_PARTNER" content={<Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {true}>HR Partner</Card.Body>}/>
                        <Table.HeaderCell key="COMMENT" content={<Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {true}>Comment</Card.Body>}/>
                        <Table.HeaderCell key="DEPT" content={<Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {true}>Dept/Org</Card.Body>}/>
                        <Table.HeaderCell key="MANAGER" content={<Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {true}>Manager</Card.Body>}/>
                        <Table.HeaderCell key="EXECUTIVE" content={<Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {true}>Executive</Card.Body>}/>
                        <Table.HeaderCell key="SUBMITTED_ON" content={<Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {true}>Submitted on</Card.Body>}/>
                        <Table.HeaderCell key="STATUS" content={<Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {true}>Status</Card.Body>}/>
                        <Table.HeaderCell key="PLACEMENT_BY" content={<Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {true}>Placement by</Card.Body>}/>
                        <Table.HeaderCell key="PLACED" content={<Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {true}>Placed</Card.Body>}/>
                        <Table.HeaderCell key="CANCEL_REQUEST" content={<Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {true}>Cancel Request</Card.Body>}/>
                    </Table.Header>
                    <Table.Rows>
                        {this.requests.map((item,i) =>{
                            submitted_on_date = item.submitted_on.substring(0,10);
                            //placement_by_date = item.placement_by.substring(0,10);
                            {
                                console.log('get req: ', this.state.getReqLen);
                                console.log('all req: ', this.state.allReqLen);
                            }

                            if(this.state.getReqLen === this.state.allReqLen && item.placement_by == "TBD")
                            {
                                if(item.placement_by.includes("TBD"))
                                {
                                    //full code with date picker
                                    if(item.job_id===1)
                                    {
                                        if(item.placed===1){
                                            return(
                                                <Table.Row key={i}>
                                                    <Table.Cell key="ROW_CARDNO"content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.card_number}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_JOB" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {'Software Engineer'}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_MENTORNAME"content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.mentor_name}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_HR_PARTNER"content={'hr'}/>
                                                    <Table.Cell content={
                                                        <Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {false}>
                                                            <Badge style={{cursor: 'pointer'}} onClick={ this.handleOpenModal} icon={<IconComment height = "1em" width = "1em" />} text="comment" intent="default" size="medium"/>
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_TEAMNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.name.toLowerCase()}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_MANAGERNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.full_name}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_EXECNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {this.state.execN}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_SUMITTED_ON" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {submitted_on_date}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_STATUS" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.status}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_PLACEMENT_BY" content={
                                                        <Card.Body error={this.state.selectedDateError} isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
                                                            <DatePicker onChange={this.handleChangeDate} minDate={minimum_date} disabled={this.state.card_no_entered} selectedDate={this.state.selectedDate} name = "placement-date" filterDate={isWeekday} />
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_PLACED" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {'Yes'}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_CANCEL_REQUEST" content={<Checkbox labelText = "" />}/>
                                                </Table.Row>
                                            )
                                        }
                                        else {
                                            return(
                                                <Table.Row key={i}>
                                                    <Table.Cell key="ROW_CARDNO"content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.card_number}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_JOB" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {'Software Engineer'}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_MENTORNAME"content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.mentor_name}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_HR_PARTNER"content={'hr'}/>
                                                    <Table.Cell content={
                                                        <Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {false}>
                                                            <Badge style={{cursor: 'pointer'}} onClick={ this.handleOpenModal} icon={<IconComment height = "1em" width = "1em" />} text="comment" intent="default" size="medium"/>
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_TEAMNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.name.toLowerCase()}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_MANAGERNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.full_name}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_EXECNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {this.state.execN}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_SUMITTED_ON" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {submitted_on_date}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_STATUS" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.status}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_PLACEMENT_BY" content={
                                                        <Card.Body error={this.state.selectedDateError} isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
                                                            <DatePicker onChange={this.handleChangeDate} minDate={minimum_date} disabled={this.state.card_no_entered} selectedDate={this.state.selectedDate} name = "placement-date" filterDate={isWeekday} />
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_PLACED" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {'No'}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_CANCEL_REQUEST" content={<Checkbox labelText = "" />}/>
                                                </Table.Row>
                                            )
                                        }
                                    }
                                    if(item.job_id===2)
                                    {
                                        if(item.placed===1){
                                            return(
                                                <Table.Row key={i}>
                                                    <Table.Cell key="ROW_CARDNO"content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.card_number}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_JOB" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {'Associate Senior Software Engineer'}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_MENTORNAME"content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.mentor_name}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_HR_PARTNER"content={'hr'}/>
                                                    <Table.Cell content={
                                                        <Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {false}>
                                                            <Badge style={{cursor: 'pointer'}} onClick={ this.handleOpenModal} icon={<IconComment height = "1em" width = "1em" />} text="comment" intent="default" size="medium"/>
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_TEAMNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.name.toLowerCase()}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_MANAGERNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.full_name}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_EXECNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {this.state.execN}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_SUMITTED_ON" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {submitted_on_date}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_STATUS" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.status}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_PLACEMENT_BY" content={
                                                        <Card.Body error={this.state.selectedDateError} isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
                                                            <DatePicker onChange={this.handleChangeDate} minDate={minimum_date} disabled={this.state.card_no_entered} selectedDate={this.state.selectedDate} name = "placement-date" filterDate={isWeekday} />
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_PLACED" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {'Yes'}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_CANCEL_REQUEST" content={<Checkbox labelText = "" />}/>
                                                </Table.Row>
                                            )}
                                        else {
                                            return(
                                                <Table.Row key={i}>
                                                    <Table.Cell key="ROW_CARDNO"content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.card_number}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_JOB" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {'Associate Senior Software Engineer'}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_MENTORNAME"content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.mentor_name}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_HR_PARTNER"content={'hr'}/>
                                                    <Table.Cell content={
                                                        <Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {false}>
                                                            <Badge style={{cursor: 'pointer'}} onClick={ this.handleOpenModal} icon={<IconComment height = "1em" width = "1em" />} text="comment" intent="default" size="medium"/>
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_TEAMNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.name.toLowerCase()}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_MANAGERNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.full_name}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_EXECNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {this.state.execN}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_SUMITTED_ON" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {submitted_on_date}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_STATUS" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.status}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_PLACEMENT_BY" content={
                                                        <Card.Body error={this.state.selectedDateError} isContentCentered={true} hasPaddingVertical={true} hasPaddingHorizontal={true}>
                                                            <DatePicker onChange={this.handleChangeDate} minDate={minimum_date} disabled={this.state.card_no_entered} selectedDate={this.state.selectedDate} name = "placement-date" filterDate={isWeekday} />
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_PLACED" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {'No'}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_CANCEL_REQUEST" content={<Checkbox labelText = "" />}/>
                                                </Table.Row>
                                            )
                                        }
                                    }
                                }
                                else if (item.placement_by != '')
                                {
                                    //full code with   item.placement_by

                                    if(item.job_id===1)
                                    {
                                        if(item.placed===1){
                                            return(
                                                <Table.Row key={i}>
                                                    <Table.Cell key="ROW_CARDNO"content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.card_number}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_JOB" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {'Software Engineer'}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_MENTORNAME"content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.mentor_name}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_HR_PARTNER"content={'hr'}/>
                                                    <Table.Cell content={
                                                        <Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {false}>
                                                            <Badge style={{cursor: 'pointer'}} onClick={ this.handleOpenModal} icon={<IconComment height = "1em" width = "1em" />} text="comment" intent="default" size="medium"/>
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_TEAMNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.name.toLowerCase()}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_MANAGERNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.full_name}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_EXECNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {this.state.execN}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_SUMITTED_ON" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {submitted_on_date}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_STATUS" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.status}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_PLACEMENT_BY" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.placement_by}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_PLACED" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {'Yes'}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_CANCEL_REQUEST" content={<Checkbox labelText = "" />}/>
                                                </Table.Row>
                                            )
                                        }
                                        else {
                                            return(
                                                <Table.Row key={i}>
                                                    <Table.Cell key="ROW_CARDNO"content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.card_number}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_JOB" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {'Software Engineer'}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_MENTORNAME"content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.mentor_name}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_HR_PARTNER"content={'hr'}/>
                                                    <Table.Cell content={
                                                        <Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {false}>
                                                            <Badge style={{cursor: 'pointer'}} onClick={ this.handleOpenModal} icon={<IconComment height = "1em" width = "1em" />} text="comment" intent="default" size="medium"/>
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_TEAMNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.name.toLowerCase()}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_MANAGERNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.full_name}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_EXECNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {this.state.execN}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_SUMITTED_ON" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {submitted_on_date}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_STATUS" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.status}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_PLACEMENT_BY" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.placement_by}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_PLACED" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {'No'}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_CANCEL_REQUEST" content={<Checkbox labelText = "" />}/>
                                                </Table.Row>
                                            )
                                        }
                                    }
                                    if(item.job_id===2)
                                    {
                                        if(item.placed===1){
                                            return(
                                                <Table.Row key={i}>
                                                    <Table.Cell key="ROW_CARDNO"content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.card_number}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_JOB" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {'Associate Senior Software Engineer'}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_MENTORNAME"content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.mentor_name}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_HR_PARTNER"content={'hr'}/>
                                                    <Table.Cell content={
                                                        <Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {false}>
                                                            <Badge style={{cursor: 'pointer'}} onClick={ this.handleOpenModal} icon={<IconComment height = "1em" width = "1em" />} text="comment" intent="default" size="medium"/>
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_TEAMNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.name.toLowerCase()}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_MANAGERNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.full_name}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_EXECNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {this.state.execN}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_SUMITTED_ON" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {submitted_on_date}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_STATUS" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.status}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_PLACEMENT_BY" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.placement_by}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_PLACED" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {'Yes'}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_CANCEL_REQUEST" content={<Checkbox labelText = "" />}/>
                                                </Table.Row>
                                            )}
                                        else {
                                            return(
                                                <Table.Row key={i}>
                                                    <Table.Cell key="ROW_CARDNO"content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.card_number}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_JOB" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {'Associate Senior Software Engineer'}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_MENTORNAME"content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.mentor_name}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_HR_PARTNER"content={'hr'}/>
                                                    <Table.Cell content={
                                                        <Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {false}>
                                                            <Badge style={{cursor: 'pointer'}} onClick={ this.handleOpenModal} icon={<IconComment height = "1em" width = "1em" />} text="comment" intent="default" size="medium"/>
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_TEAMNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.name.toLowerCase()}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_MANAGERNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.full_name}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_EXECNAME" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {this.state.execN}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_SUMITTED_ON" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {submitted_on_date}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_STATUS" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.status}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_PLACEMENT_BY" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {item.placement_by}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_PLACED" content={
                                                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                            {'No'}
                                                        </Card.Body>
                                                    }/>
                                                    <Table.Cell key="ROW_CANCEL_REQUEST" content={<Checkbox labelText = "" />}/>
                                                </Table.Row>
                                            )
                                        }
                                    }

                                }
                            }
                            else
                            {
                                if(item.job_id===1)
                                {
                                    if(item.placed===1){
                                        return(
                                            <Table.Row key={i}>
                                                <Table.Cell key="ROW_CARDNO"content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.card_number}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_JOB" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {'Software Engineer'}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_MENTORNAME"content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.mentor_name}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_HR_PARTNER"content={'hr'}/>
                                                <Table.Cell content={
                                                    <Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {false}>
                                                        <Badge style={{cursor: 'pointer'}} onClick={ this.handleOpenModal} icon={<IconComment height = "1em" width = "1em" />} text="comment" intent="default" size="medium"/>
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_TEAMNAME" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.name.toLowerCase()}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_MANAGERNAME" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.full_name}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_EXECNAME" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {this.state.execN}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_SUMITTED_ON" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {submitted_on_date}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_STATUS" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.status}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_PLACEMENT_BY" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.placement_by}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_PLACED" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {'Yes'}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_CANCEL_REQUEST" content={<Checkbox labelText = "" />}/>
                                            </Table.Row>
                                        )
                                    }
                                    else {
                                        return(
                                            <Table.Row key={i}>
                                                <Table.Cell key="ROW_CARDNO"content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.card_number}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_JOB" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {'Software Engineer'}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_MENTORNAME"content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.mentor_name}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_HR_PARTNER"content={'hr'}/>
                                                <Table.Cell content={
                                                    <Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {false}>
                                                        <Badge style={{cursor: 'pointer'}} onClick={ this.handleOpenModal} icon={<IconComment height = "1em" width = "1em" />} text="comment" intent="default" size="medium"/>
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_TEAMNAME" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.name.toLowerCase()}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_MANAGERNAME" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.full_name}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_EXECNAME" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {this.state.execN}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_SUMITTED_ON" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {submitted_on_date}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_STATUS" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.status}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_PLACEMENT_BY" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.placement_by}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_PLACED" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {'No'}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_CANCEL_REQUEST" content={<Checkbox labelText = "" />}/>
                                            </Table.Row>
                                        )
                                    }
                                }
                                if(item.job_id===2)
                                {
                                    if(item.placed===1){
                                        return(
                                            <Table.Row key={i}>
                                                <Table.Cell key="ROW_CARDNO"content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.card_number}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_JOB" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {'Associate Senior Software Engineer'}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_MENTORNAME"content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.mentor_name}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_HR_PARTNER"content={'hr'}/>
                                                <Table.Cell content={
                                                    <Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {false}>
                                                        <Badge style={{cursor: 'pointer'}} onClick={ this.handleOpenModal} icon={<IconComment height = "1em" width = "1em" />} text="comment" intent="default" size="medium"/>
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_TEAMNAME" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.name.toLowerCase()}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_MANAGERNAME" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.full_name}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_EXECNAME" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {this.state.execN}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_SUMITTED_ON" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {submitted_on_date}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_STATUS" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.status}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_PLACEMENT_BY" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.placement_by}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_PLACED" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {'Yes'}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_CANCEL_REQUEST" content={<Checkbox labelText = "" />}/>
                                            </Table.Row>
                                        )}
                                    else {
                                        return(
                                            <Table.Row key={i}>
                                                <Table.Cell key="ROW_CARDNO"content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.card_number}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_JOB" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {'Associate Senior Software Engineer'}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_MENTORNAME"content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.mentor_name}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_HR_PARTNER"content={'hr'}/>
                                                <Table.Cell content={
                                                    <Card.Body isContentCentered = {true} hasPaddingVertical = {true} hasPaddingHorizontal = {false}>
                                                        <Badge style={{cursor: 'pointer'}} onClick={ this.handleOpenModal} icon={<IconComment height = "1em" width = "1em" />} text="comment" intent="default" size="medium"/>
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_TEAMNAME" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.name.toLowerCase()}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_MANAGERNAME" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.full_name}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_EXECNAME" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {this.state.execN}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_SUMITTED_ON" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {submitted_on_date}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_STATUS" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.status}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_PLACEMENT_BY" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {item.placement_by}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_PLACED" content={
                                                    <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                                                        {'No'}
                                                    </Card.Body>
                                                }/>
                                                <Table.Cell key="ROW_CANCEL_REQUEST" content={<Checkbox labelText = "" />}/>
                                            </Table.Row>
                                        )
                                    }
                                }
                            }

                        })}
                        {this.rows()}
                    </Table.Rows>
                </Table>
                {modalDialog}
                {this.idleLogout()}
            </ContentContainer>
        );
    }
}

export default injectIntl(App);
