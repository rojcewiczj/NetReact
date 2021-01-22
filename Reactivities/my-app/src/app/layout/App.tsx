import React, {useState, useEffect, Fragment, SyntheticEvent, useContext} from 'react';
import 'semantic-ui-css/semantic.min.css'
import {Container,  } from 'semantic-ui-react'
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import ActivityStore from '../stores/activityStore';
import { Observer, observer } from 'mobx-react-lite';


const App = () => {
  const activityStore = useContext(ActivityStore);
  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');


  const handleSelectActivity =(id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0])
    setEditMode(false);
  }
  
  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }
 
  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(()=>{
    setActivities([...activities, activity])
    setSelectedActivity(activity);
    setEditMode(false);
  }).then(() => setSubmitting(false));
  }

  const handleEditActivity = (activity: IActivity) => {
    agent.Activities.update(activity).then(()=>{
    setActivities([...activities.filter(a => a.id !== activity.id), activity])
    setSelectedActivity(activity);
    setEditMode(false);
  })
    
  }

  const handleDeleteActivity =(event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name)
    agent.Activities.delete(id).then(()=> {
    setActivities([...activities.filter(a => a.id !== id)])
  }).then(() => setSubmitting(false));
  }
 
  useEffect(() =>{
      activityStore.loadActivites();
   }, []);

   if(activityStore.loadingInitial) return <LoadingComponent content='Loading Activities' />
  activityStore.activities.map(a => console.log(a))
  return (
    <Fragment>
   <NavBar openCreateForm={handleOpenCreateForm}/>
   <Container style={{marginTop: '7em'}}>
    <ActivityDashboard 

    activities={activityStore.activities} 
    createActivity ={handleCreateActivity} 
    editActivity={handleEditActivity} 
    selectActivity={handleSelectActivity} 
    setSelectedActivity = {setSelectedActivity} 
    setEditMode={setEditMode}
    deleteActivity={handleDeleteActivity}
    submitting = {submitting}
    target = {target}
    />
    </Container>
    </Fragment>
  );
}

export default observer(App);
