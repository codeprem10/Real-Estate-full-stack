import axios from 'axios'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

 export const api = axios.create({
    baseURL:"http://localhost:8000/api",
 });

 export const getAllProperties = async()=>{

    try {

        const response = await api.get("/residency/allresd" , {
            timeout :10*1000,
        });

        if(response.status === 400 || response.status===500){
            throw response.data
        }

        return response.data
        
    } catch (err) {
        toast.error("something went wrong")
        throw err
    }
 };

 export const getProperty = async(id)=>{
    try {

        const response = await api.get(`/residency/${id}`, {
            timeout :10*1000,
        });

        if(response.status === 400 || response.status===500){
            throw response.data
        }

        return response.data
        
    } catch (err) {
        toast.error("something went wrong")
        throw err
    }
 }

 //create new user if user already does not exist , at time of logging in
 export const createUser = async (email , token) =>{
    try {
        await api.post(`/user/register`,{email} , {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )
        
    } catch (error) {
        toast.error("Something went wrong , Please try again")
        throw error
        
    }
 }

//  function of bookVisit
//  export const bookVisit= async(date, propertyId , email , token)=>{
//     try {
//         await api.post(
//             `/user/bookVisit/${propertyId}`,
//             {
//                 email,
//                 id: propertyId,
//                 date:dayjs(date).format("DD/MM/YYYY")

//             },
//             {
//                 headers:{
//                     Authorization: `Bearer ${token}`,
                    
//                 }
//             }
//         )
//     } catch (error) {
//         toast.error("Something went wrong , Please try again");
//         throw error
        
//     }
//  }




//chatgpt

 export const bookVisit = async (date, propertyId, email, token) => {
    try {
        const formattedDate = dayjs(date).format("YYYY-MM-DD"); // Changed format
        console.log("Booking Visit API Request:", { email, id: propertyId, date: formattedDate, token });

        const response = await api.post(
            `/user/bookVisit/${propertyId}`,
            {
                email,
                id: propertyId,
                date: formattedDate
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );

        console.log("Booking Visit API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Booking Visit API Error:", error.response?.data || error);
        toast.error(error.response?.data?.message || "Something went wrong, Please try again");
        throw error;
    }
};



//remove booking 
export const removeBooking = async(id,email,token)=>{
    try {
        await api.post(
                        `/user/removeBooking/${id}`,
                        {
                            email,
                            
            
                        },
                        {
                            headers:{
                                Authorization: `Bearer ${token}`,
                                
                            }
                        }
                    )
                }
    catch (error) {
        toast.error("Something went wrong , Please try again");
        throw error
    }
}

//function toFav to add fav property to array
export const toFav = async(id,email,token)=>{
    try {
        await api.post(
            `/user/toFav/${id}`,
            {
                email,
                

            },
            {
                headers:{
                    Authorization: `Bearer ${token}`,  
                },
            }
        )
        
    } catch (e) {
        throw e;
    }
}


//function to get all Fav used in useFavourites.jsx and to keep it persistent
export const getAllFav = async(email , token)=>{
    if(!token) return
    try {
       const res =  await api.post(
            `/user/allFav`,
            {
                email,
                

            },
            {
                headers:{
                    Authorization: `Bearer ${token}`,  
                },
            }
        );
        
        return res.data["favResidenciesID"]
        
    } catch (e) {
         toast.error("Something went wrong while fetching favourites");
        throw e
    }
}

//function to keep booking persistent
export const getAllBookings = async(email , token)=>{
    if(!token) return
    try {
        const res =  await api.post(
            `/user/allBookings`,
            {
                email,
                

            },
            {
                headers:{
                    Authorization: `Bearer ${token}`,  
                },
            }
        );
        
        return res.data['bookedVisits'];
        
    } catch (error) {
        toast.error("Something went wrong while fetching favourites");
        throw error
    }
}


//creating new residency
// export const createResidency = async(data,token)=>{
//     try {
//         const res =  await api.post(
//             `/residency/create`,
//             {
//                 data,
//              },
//             {
//                 headers:{
//                     Authorization: `Bearer ${token}`,  
//                 },
//             }
//         );

//     } catch (error) {
//         throw error
//     }
// }



//chatgpt createResidency
export const createResidency = async(data, token) => {
    try {
        const res = await api.post(
            `/residency/create`,
            data, // ✅ Send data directly
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return res.data; // Always return response data

    } catch (error) {
        
        throw error;
    }
};



