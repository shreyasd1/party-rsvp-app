import React, {useReducer} from 'react'
import axios from 'axios'
import GuestContext from './guestContext'
import guestReducer from './guestReducer'
import {
  TOGGLE_FILTER,
  SEARCH_GUEST,
  CLEAR_SEARCH,
  ADD_GUEST,
  REMOVE_GUEST,
  UPDATE_GUEST,
  EDIT_GUEST,
  CLEAR_EDIT,
  GET_GUEST,
  GUESTS_ERROR
}from '../types'

const GuestState = (props) => {
  const initialState ={
    filterGuest:false,
    search:null,
    editAble: null,
      guests:[],
      errors:null
  }
  const [state,dispacth] = useReducer(guestReducer,initialState)

  //get guest
  const getGuests = async()=>{
    try {
      const res = await axios.get('/guests')
      dispacth({
        type:GET_GUEST,
        payload:res.data
      })
    } catch (err) {
      dispacth({
        type: GUESTS_ERROR,
        payload:err.response.msg
      })
    }
  }


  const addGuest =async (guest) =>{

    const config={
      'Content-Type': 'application/json'
    }
    try {
      const res = await axios.post('/guests',guest, config)
      dispacth({
      type:ADD_GUEST,
      payload:res.data
      })

    } catch (err) {
      dispacth({
        type: GUESTS_ERROR,
        payload:err.response.msg
      })
    }

   
  } 
  const removeGuest =async (id) =>{
    try {
      await axios.delete(`/guests/${id}`)
      dispacth({
        type:REMOVE_GUEST,
        payload:id
      })
    } catch (err) {
      dispacth({
        type: GUESTS_ERROR,
        payload:err.response.msg
      })
    }
   
  }
  
  const updateGuest =async (guest) =>{
    const config = {
      headers:{
        'Content-Type':'application/json'
      }
    }
    try {
      const res = await axios.put(`/guests/${guest._id}`,guest, config)
      dispacth({
        type:UPDATE_GUEST,
        payload:res.data
      })
    } catch (err) {
      dispacth({
        type: GUESTS_ERROR,
        payload:err.response.msg
      })
    }
   
  }
  
  const editGuest =(guest) =>{
    dispacth({
      type:EDIT_GUEST,
      payload:guest
    })
  }

  const clearEdit =() =>{
    dispacth({
      type:CLEAR_EDIT
    })
  }

  const toggleFilter =() =>{
    dispacth({
      type:TOGGLE_FILTER
    })
  } 

  const searchGuest =(guest)=>{
    dispacth({
      type:SEARCH_GUEST,
      payload: guest
    })
  }

  const clearSearch =() =>{
    dispacth({
      type:CLEAR_SEARCH
    })
  }

    return (
    <GuestContext.Provider
    value ={{
        guests:state.guests,
        filterGuest: state.filterGuest,
        search:state.search,
        editAble:state.editAble,
        getGuests,
        addGuest,
        removeGuest,
        updateGuest,
        editGuest,
        clearEdit,
        toggleFilter,
        searchGuest,
        clearSearch
        
    }}
    
    >{props.children}</GuestContext.Provider>
    )
}


export default GuestState
