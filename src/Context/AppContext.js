import React, { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {

    const [account,setAccount] = useState({username:"",email:""});


    const value = {
        account,
        setAccount,

    };

  return <AppContext.Provider value={value}>
             {children}
         </AppContext.Provider>;
}
