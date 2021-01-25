import {action, computed, observable, runInAction} from 'mobx';
import { createContext } from 'react';
import agent from '../api/agent';
import { IActivity } from '../models/activity';

class ActivityStore{
    @observable activityRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable selectedActivity: IActivity | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;

    @computed get activitiesByDate(){
      return Array.from(this.activityRegistry.values())
      .sort((a,b)=> Date.parse(a.date) - Date.parse(b.date));
    }




    @action  loadActivites = async () => {
        this.loadingInitial = true;
        try {
          const activities = await agent.Activities.list();
          activities.forEach((activity) => {
          activity.date = activity.date.split('.')[0];
          this.activityRegistry.set(activity.id, activity)
          console.log(activity)
         })
         this.loadingInitial = false
        }catch(error){
          console.log(error)
          this.loadingInitial = false
        }
    };

    @action createActivity = async (activity: IActivity) => {
      this.submitting = true;
      try{
         await agent.Activities.create(activity);
         this.activityRegistry.set(activity.id,activity);
         this.editMode = false;
         this.submitting = false;
      }catch(error){
        this.submitting = false;
        console.log(error)
      }

    }
    
    @action openEditForm = (id: string) => {
      this.selectedActivity = this.activityRegistry.get(id);
      this.editMode = true;
    }
    
    @action cancelSelectedActivity = () => {
      this.selectedActivity = undefined;
    }
   
    @action cancelFormOpen = () => {
      this.editMode = false;
    }


    @action editActivity = async (activity: IActivity) => {
      this.submitting = true;
      try{
        await agent.Activities.update(activity);
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting = false;

      }catch(error){
        this.submitting = false;
        console.log(error);

      }
    }

    @action openCreateForm = () => {
      this.editMode = true;
      this.selectedActivity = undefined;
    }



    @action selectActivity = (id:string) => {
        this.selectedActivity = this.activityRegistry.get(id);
        this.editMode = false;
    } 
   

    @action loadActivity = async (id: string) => {
      let activity =this.getActivity(id);
      if(activity){
        this.selectedActivity = activity;
      } else{
        this.loadingInitial = true;
        try{
          activity = await agent.Activities.details(id);
          runInAction("getting activity", () => {
            this.selectedActivity = activity;
            this.loadingInitial = false;
          })
        } catch(error){
          runInAction('get activity error', () => {
            this.loadingInititial = false;
          })
           console.log(error)
        }
      }

    }
    
    getActivity = (id: string) => {
      return this.activityRegistry.get(id);
    }
   
  
}

export default createContext(new ActivityStore())