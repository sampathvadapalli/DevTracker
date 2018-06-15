{this.requests.map((item,i) =>{
    submitted_on_date = item.submitted_on.substring(0,10);
    placement_by_date = item.placement_by.substring(0,10);
    if(item.job_id==1)
    {
        if(item.placed==1){
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
                            {this.state.deptN}
                        </Card.Body>
                    }/>
                    <Table.Cell key="ROW_MANAGERNAME" content={
                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                            {this.state.userN}
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
                            {placement_by_date}
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
                            {this.state.deptN}
                        </Card.Body>
                    }/>
                    <Table.Cell key="ROW_MANAGERNAME" content={
                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                            {this.state.userN}
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
                            {placement_by_date}
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
    if(item.job_id==2)
    {
        if(item.placed==1){
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
                            {this.state.deptN}
                        </Card.Body>
                    }/>
                    <Table.Cell key="ROW_MANAGERNAME" content={
                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                            {this.state.userN}
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
                            {placement_by_date}
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
                            {this.state.deptN}
                        </Card.Body>
                    }/>
                    <Table.Cell key="ROW_MANAGERNAME" content={
                        <Card.Body isContentCentered={true} hasPaddingVertical={false} hasPaddingHorizontal={false}>
                            {this.state.userN}
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
                            {placement_by_date}
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
    else{return(null)}
})}
{this.rows()}