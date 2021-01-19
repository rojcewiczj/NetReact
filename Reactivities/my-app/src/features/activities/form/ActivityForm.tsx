import React from 'react'
import { Segment, Form, FormInput, FormTextArea, Button } from 'semantic-ui-react'
interface IProps {
    setEditMode: (editMode: boolean) => void;
}
const ActivityForm: React.FC<IProps> = ({setEditMode}) => {
    return(
  <Segment clearing>
      <Form>
          <FormInput placeholder='Title'/>
          <FormTextArea rows={2} placeholder='Description'/>
          <FormInput placeholder='Category'/>
          <FormInput type='date' placeholder='Date'/>
          <FormInput placeholder='City'/>
          <FormInput placeholder='Venue'/>
          <Button floated='right' positive type='submit' content='Submit' />
          <Button onClick={() => setEditMode(false)} floated='right' type='button' content='Cancel' />

      </Form>
  </Segment>
  );
}
export default ActivityForm;
