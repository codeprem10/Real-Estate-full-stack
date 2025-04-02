import { Suspense, useState } from "react";
import "./App.css"
import Website from "./pages/Website";
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Properties from "./pages/Properties/Properties";
import { QueryClient, QueryClientProvider } from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Property from "./pages/Property/Property";
import UserDetailContext from "./context/UserDetailContext";
import Layout from "./components/Layout/Layout";
import Bookings from "./pages/Bookings/Bookings";
import Favourites from "./pages/Favourites/Favourites";

function App() {
  const queryClient = new QueryClient()
  const [userDetails , setUserDetails] = useState({
    favourites : [],
    bookings : [],
    token : null

  })
  return (
  <UserDetailContext.Provider value={{userDetails , setUserDetails}}>

   
     {/* queryclient i used bcoz of react-query */}
    <QueryClientProvider client={queryClient}>
       <BrowserRouter>
         <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* layout is a route which is common on all pages eg. header, footer etc
             .The layout component is static and other components inside it is dynamic */}
             <Route element={<Layout/>}> 
             <Route path='/' element={<Website />} />
              <Route path="/properties">
              {/* below is the child */}
              {/* if path has no id then render Properties page */}
              <Route index element={<Properties/>} />
              {/* if path has id then render Property page */}
              <Route path=":propertyId" element={<Property/>} />
             </Route>
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/favourites" element={<Favourites />} />
            </Route>
           </Routes>
         </Suspense>
       </BrowserRouter>
      <ToastContainer/>
     <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  </UserDetailContext.Provider>
    
  );
}

export default App;
