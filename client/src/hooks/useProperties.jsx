import React from 'react';
import { useQuery } from 'react-query';
import { getAllProperties } from '../utils/api';



const useProperties = () => {

    const {data , isLoading, isError ,refetch} = useQuery(
        // allProperties is name of the query
        //getAllProperties is name of the function which is written in api.js
        //{refetchOnWindowFocus:false}
        "allProperties" , getAllProperties ,{refetchOnWindowFocus:false}
);
  return {
    data , isError,isLoading,refetch
  };
    
  
};

export default useProperties;