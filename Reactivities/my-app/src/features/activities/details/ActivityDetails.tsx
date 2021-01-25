import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react'
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity';
import ActivityStore from '../../../app/stores/activityStore'


const ActivityDetails: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const {selectedActivity, openEditForm, cancelSelectedActivity} = activityStore
    return(
  <Card fluid>
    <Image src={`/assets/${selectedActivity!.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{selectedActivity!.title}</Card.Header>
      <Card.Meta>
        <span className='date'>{selectedActivity!.date}</span>
      </Card.Meta>
      <Card.Description>
        {selectedActivity!.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <ButtonGroup widths={2}>
          <Button onClick={()=> openEditForm(selectedActivity!.id)} basic color="blue" content="Edit" />
          <Button onClick={()=> cancelSelectedActivity} basic color="grey" content="Cancel" />
      </ButtonGroup>
    </Card.Content>
  </Card>
  );
}
export default observer(ActivityDetails);
