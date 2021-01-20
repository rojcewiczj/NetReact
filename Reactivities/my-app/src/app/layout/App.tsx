import React, {useState, useEffect, Fragment} from 'react';
import 'semantic-ui-css/semantic.min.css'
import {Container} from 'semantic-ui-react'
import axios from 'axios';
import { timeStamp } from 'console';
import { ImportsNotUsedAsValues } from 'typescript';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';



const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);


  const handleSelectActivity =(id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0])
  }
  
  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }
 
  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity])
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity])
    setSelectedActivity(activity);
    setEditMode(false);
    
  }
  useEffect(() =>{
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then((response) => {
        setActivities(response.data)
      })

   }, []);
    
  return (
    <Fragment>
   <NavBar openCreateForm={handleOpenCreateForm}/>
   <Container style={{marginTop: '7em'}}>
    <ActivityDashboard createActivity ={handleCreateActivity} editActivity={handleEditActivity} activities={activities} selectActivity={handleSelectActivity} selectedActivity={selectedActivity!} setSelectedActivity = {setSelectedActivity} editMode={editMode} setEditMode={setEditMode}/>
    </Container>
    </Fragment>
  );
}

export default App;
