import React, { FormEvent, useContext, useState} from 'react'
import { Segment, Form, FormInput, FormTextArea, Button } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore';
import { IActivity } from '../../../app/models/activity';
import {v4 as uuid} from 'uuid';


interface IProps {
  
    activity: IActivity;
    submitting: boolean;
}
const ActivityForm: React.FC<IProps> = ({ activity: initialFormState, submitting}) => {
    const activtiyStore = useContext(ActivityStore)
    const {createActivity, editActivity, cancelFormOpen} = activtiyStore
    const initializeForm = () => {
        if(initialFormState) {
            return initialFormState;
        
         } else{
            return{
                id: '',
                title:"",
                category:"",
                description:"",
                date:"",
                city:"",
                venue:""
            }
        }
    };


    const[activity, setActivity] = useState<IActivity>(initializeForm);
    
    const handleSubmit = () => {
        console.log(activity);
        if(activity.id.length === 0){
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity)
        }else{
            editActivity(activity)
        }
    }
    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget
        setActivity({...activity, [name]: value})
    }
    return(
  <Segment clearing>
      <Form onSubmit={handleSubmit}>
          <FormInput onChange={handleInputChange} name="title" placeholder='Title' value={activity.title}/>
          <FormTextArea onChange={handleInputChange} name="description" rows={2} placeholder='Description'value={activity.description}/>
          <FormInput onChange={handleInputChange} name="category" placeholder='Category' value={activity.category}/>
          <FormInput onChange={handleInputChange} name="date" type='datetime-local' placeholder='Date' value={activity.date}/>
          <FormInput onChange={handleInputChange} name="city" placeholder='City'value={activity.city}/>
          <FormInput onChange={handleInputChange} name="venue" placeholder='Venue' value={activity.venue}/>
          <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
          <Button onClick={() => cancelFormOpen} floated='right' type='button' content='Cancel' />

      </Form>
  </Segment>
  );
}
export default ActivityForm;
