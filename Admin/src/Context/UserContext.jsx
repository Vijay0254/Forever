import React, { createContext, useState } from 'react'
import axios from '../utils/Axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const userContext = createContext()

const UserContextProvider = ({ children }) => {

    const [token, settoken] = useState(null)
    const navigate = useNavigate()
    const currency = '$'

    async function verifyToken(){
        try{
          const response = await axios.get(`/api/auth/admin/verify`, {withCredentials: true})
          if(!response.data.success){
            navigate('/')
          }
          if(response.data.success){
            settoken(response.data)
          }
        }
        catch(err){
          console.log(`Error in verify Token - ${err}`)
        }
      }

    // useEffect(() =>{
    //     verifyToken()
    // }, [])

    // console.log(token)

    const value = { token, verifyToken, settoken, currency }

  return (
    <userContext.Provider value={value}>
        {children}
    </userContext.Provider>
  )
}

export default UserContextProvider