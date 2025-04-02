import { Box, Button, Group, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useContext } from 'react'
import UserDetailContext from '../../context/UserDetailContext'
import useProperties from '../../hooks/useProperties'
import { useMutation } from 'react-query';
import { createResidency } from '../../utils/api';
import { useAuth0 } from '@auth0/auth0-react'
import { Form } from 'react-router-dom';

const Facilities = ({prevStep,setOpened,setActiveStep,propertyDetails,setPropertyDetails}) => {

    const form = useForm({
        initialValues:{
            bedrooms: propertyDetails.facilities.bedrooms,
            parkings: propertyDetails.facilities.parkings,
            bathrooms: propertyDetails.facilities.bathrooms,
    
        },
        validate:{
            bedrooms:(value)=>(value < 1 ? "Must have atleast 1 bedroom" : null),
            bathrooms:(value)=>
                value < 1 ? "Must have atleast 1 bathroom" : null,
        },
      });

      const {bedrooms , parkings , bathrooms} = form.values;

      const handleSubmit =()=>{
        const {hasError} = form.validate()
      if(!hasError) {
        setPropertyDetails((prev)=> ({...prev , 
            facilities:{bedrooms , parkings , bathrooms},
            }));
         mutate()
      } 
    }

//////////////////////////=====================Upload logic===================///////////////////////////


// const {user} = useAuth0()
// const {
//     userDetails:{token},
// } = useContext(UserDetailContext);

//chatgpt
const userContext = useContext(UserDetailContext);
const token = userContext?.userDetails?.token || ""; // ✅ Safe fallback


const {refetch : refetchProperties } = useProperties()

const {mutate , isLoading} = useMutation({
    mutationFn:()=>createResidency({
        ...propertyDetails , facilities:{bedrooms , parkings , bathrooms},
    },token),
    onError:({response}) => toast.error(response.data.message , {position:"bottom-right"}),
    onSettled:()=>{
        toast.success("Added Successfully" , {position:"bottom-right"});
        setPropertyDetails({
            title: "",
            description: "",
            price:0,
            address: "",
            city: "",
            country: "",
            image:null,
            facilities:{
                bedrooms:0,
                bathrooms:0,
                parkings:0,
            },
            userEmail:user?.email,
        })
        setOpened(false)
        setActiveStep(0)
        refetchProperties()
    }
})



  return (
     <Box maw="30%" mx="auto" my="sm">
        <form
        onSubmit={(e)=>{
            e.preventDefault();
            handleSubmit()
        }}>
        
        <NumberInput
        withAsterisk
        label="No. of Bedrooms"
        min={0}
        {
         ...form.getInputProps("bedrooms")
       }
        />

        <NumberInput
        withAsterisk
        label="No. of Parkings"
        min={0}
        {
         ...form.getInputProps("parkings")
       }
        />

        <NumberInput
        withAsterisk
        label="No. of Bathrooms"
        min={0}
        {
         ...form.getInputProps("bathrooms")
       }
        />
    
        <Group position="center" mt={"xl"}>
                <Button variant='default' onClick={prevStep }>
                     Back
                </Button>
                <Button type="submit" color="green" disabled={isLoading}>
                     {isLoading ? "Submitting" : "Add property"}
                     
                </Button>
        
        </Group>
        
       </form>
    
     </Box>
  )
    
  
}

export default Facilities