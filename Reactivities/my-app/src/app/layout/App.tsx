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
import { Route } from 'react-router-dom';
import HomgePage from '../../features/home/HomePage';
import ActivityList from '../../features/activities/dashboard/ActivityList';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';


const App = () => {
  const activityStore = useContext(ActivityStore);
  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');
    
  

  const handleDeleteActivity =(event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name)
    agent.Activities.delete(id).then(()=> {
    setActivities([...activities.filter(a => a.id !== id)])
  }).then(() => setSubmitting(false));
  }
 
  useEffect(() =>{
      activityStore.loadActivites()
   }, []);

   if(activityStore.loadingInitial) return <LoadingComponent content='Loading Activities' />

  return (
    <Fragment>
   <NavBar/>
   <Container style={{marginTop: '7em'}}>
     <Route exact path='/' component={HomgePage}/>
     <Route path='/activities' component={ActivityDashboard}/>
     <Route path='/createActivities' component ={ActivityForm} />
     <Route path ='/activities/:id' component={ActivityDetails} />
    </Container>
    </Fragment>
  );
}

export default observer(App);
