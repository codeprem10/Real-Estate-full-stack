import asyncHandler from 'express-async-handler'

import { prisma } from '../config/prismaConfig.js';

//function to create user
export const createUser = asyncHandler(async(req,res)=>{
    console.log("creating user")

    let {email} = req.body;
    const userExist = await prisma.user.findUnique({where:{email : email}})
    if(!userExist){
        const user = await prisma.user.create({data:req.body});
        res.send({
            message:"User registered succesfully",
            user:user
        });
    } else(res.status(201).send({message:"User already registered"})
    );
});

//function to book visit
export const bookVisit = asyncHandler(async(req,res)=>{
    const {email ,date} = req.body;
    const {id} = req.params;

    //check wheather the user has already booked the same residency
    try {
        const alreadyBooked = await prisma.user.findUnique({
            where:{email:email},
            select:{bookedVisits:true}
        })

        if(alreadyBooked.bookedVisits.some((visit)=>visit.id === id)){
            res.status(400).json({message:"This residency is already booked by you"})
        }
        else{
            await prisma.user.update({
                where:{email:email},
                data:{
                    bookedVisits:{push:{id , date}}
                }
            })
            res.send("Your visit is booked successfully!!");
        }
       
    } catch (err) {
        throw new Error(err.message)
    }
})


//function to get all bookings
export const getAllBookings = asyncHandler(async(req,res)=>{
    const {email} = req.body
    try {
        const bookings = await prisma.user.findUnique({
            where:{email:email},
            select:{bookedVisits:true}
        })

        res.status(200).send(bookings);


    } catch (err) {
        throw new Error(err.message)
    }
})

//function to cancel the booking
export const cancelBooking = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    const {id} = req.params;

    try {
        const user = await prisma.user.findUnique({
            where:{email:email},
            select:{bookedVisits:true}
        })

        const index = user.bookedVisits.findIndex((visit)=> visit.id === id)
        if(index===-1){
            res.status(404).json({message:"Booking not found"})
        }else{
            user.bookedVisits.splice(index,1)
            //now update the bookedVisits array
            await prisma.user.update({
                where:{email:email},
                data:{
                    bookedVisits:user.bookedVisits
                }
            })
            res.send("Booking cancelled successfully!!")
        }
        


    } catch (err) {
        throw new Error(err.message)
    }
})

//function to add residency to favourite list of user
export const toFav = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    const {rid} = req.params;

    try {
        const user = await prisma.user.findUnique({
            where:{email:email}
         })

         if(user.favResidenciesID.includes(rid)){
            const updateUser = await prisma.user.update({
                where:{email:email},
                data:{
                    favResidenciesID:{
                        set: user.favResidenciesID.filter((id)=> id!==rid)
                    }
                }
            });
            res.send({message:"Removed from favourites" , user:updateUser})
         } else{
            const updateUser = await prisma.user.update({
                where:{email:email},
                data:{
                    favResidenciesID:{
                        push:rid
                    }
                }
            });
            res.send({message:"Updated favourites" , user:updateUser})
         }
        
    } catch (err) {
       throw new Error(err.message) 
    }
})

//function to show all favourite residencies
export const getallFav = asyncHandler(async(req,res)=>{
    const {email} = req.body
    try {
        const favResd = await prisma.user.findUnique({
            where:{email:email},
            select:{favResidenciesID:true}
        })
        res.status(200).send(favResd)

        
    } catch (err) {
        throw new Error(err.message)
    }
})