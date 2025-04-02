import { useForm } from '@mantine/form'
import React from 'react'
import { validateString } from '../../utils/Common'
import { Box, Button, Group, NumberInput, Textarea, TextInput } from '@mantine/core';

const BasicDetails = ({prevStep,nextStep,propertyDetails,setPropertyDetails}) => {
  const form = useForm({
    initialValues:{
        title:propertyDetails.title,
        description:propertyDetails.description,
        price:propertyDetails.price,

    },
    validate:{
        title:(value)=>validateString(value),
        description:(value)=>validateString(value),
        price:(value)=>
            value <1000 ? "Must be greater than 999 ruppes" : null,
    },
  });

  const  {title , description , price} = form.values
  const handleSubmit =()=>{
    const {hasError} = form.validate()
  if(!hasError) {
    setPropertyDetails((prev)=> ({...prev , title , description,price}))
    nextStep()
  } 
}

return (
    <Box maw="50%" mx="auto" my="md">
        <form
    onSubmit={(e)=>{
        e.preventDefault();
        handleSubmit()
    }}>
    
    <TextInput
     withAsterisk
     label="Title"
     placeholder="Property Name"
     {
      ...form.getInputProps("title")
    }
    />
    <Textarea
    withAsterisk
    label="Description"
    placeholder="Description"
    {
     ...form.getInputProps("Description")
   }
    />
    <NumberInput
    withAsterisk
    label="Price"
    placeholder="1000"
    min={0}
    {
     ...form.getInputProps("price")
   }
    />

    <Group position="center" mt={"xl"}>
            <Button variant='default' onClick={prevStep }>
                 Back
            </Button>
            <Button type="submit">
                 Next 
            </Button>
    
    </Group>
    
   </form>

 </Box>
)
}

export default BasicDetails
