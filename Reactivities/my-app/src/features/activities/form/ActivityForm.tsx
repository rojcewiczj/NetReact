import React, {ChangeEvent, FormEvent, useState} from 'react'
import { Segment, Form, FormInput, FormTextArea, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity';
import {v4 as uuid} from 'uuid';
interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity
    createActivity:(activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
}
const ActivityForm: React.FC<IProps> = ({setEditMode, activity: initialFormState, createActivity, editActivity}) => {
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
          <FormInput onChange={handleInputChange} name="date" type='date' placeholder='Date' value={activity.date}/>
          <FormInput onChange={handleInputChange} name="city" placeholder='City'value={activity.city}/>
          <FormInput onChange={handleInputChange} name="venue" placeholder='Venue' value={activity.venue}/>
          <Button floated='right' positive type='submit' content='Submit' />
          <Button onClick={() => setEditMode(false)} floated='right' type='button' content='Cancel' />

      </Form>
  </Segment>
  );
}
export default ActivityForm;
