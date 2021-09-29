  
import React, {createContext, useState, useEffect} from 'react'
import io from 'socket.io-client'
import CategoriesAPI from './api/CategoriesAPI'
import ProductAPI from './api/ProductAPI'

export const DataContext = createContext()

export const DataProvider = ({children}) => {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const socket = io.connect('http://localhost:3000')
        setSocket(socket)
        return () =>  socket.close()
    },[])

    const state = {
        categoriesAPI:CategoriesAPI(),
        productAPI:ProductAPI(),
        socket
    }

    return(
        <DataContext.Provider value={state}>
            {children}
        </DataContext.Provider>
    )
}