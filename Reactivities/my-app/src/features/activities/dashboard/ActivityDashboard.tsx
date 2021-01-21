import React from 'react'
import { Grid, GridColumn} from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'
interface IProps {
    activities: IActivity[];
    selectActivity : (id:string) => void;
    selectedActivity : IActivity;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
    createActivity:(activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    deleteActivity:(id: string) => void;
  }

const ActivityDashboard: React.FC<IProps> = ({activities, selectActivity, selectedActivity, editMode, setEditMode, setSelectedActivity, createActivity, editActivity, deleteActivity}) => {
    return(
        <Grid>
            <GridColumn width={10}>
                <ActivityList 
                activities={activities} 
                selectActivity ={selectActivity} 
                deleteActivity={deleteActivity}
                />
            </GridColumn>
            <GridColumn width={6}>
                {selectedActivity && !editMode &&
                <ActivityDetails selectedActivity={selectedActivity} setEditMode={setEditMode} setSelectedActivity={setSelectedActivity}/>
                }
                {editMode && 
                <ActivityForm key={selectedActivity && selectedActivity.id || 0} setEditMode={setEditMode} activity={selectedActivity!} createActivity={createActivity} editActivity={editActivity}/>
                }
            </GridColumn>
        </Grid>
    )
}

export default ActivityDashboard