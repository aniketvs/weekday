import React, { useCallback, useEffect, useState } from 'react'
import Header from '../header/Header'
import { fetchCardData } from './api/api'
import './Home.css'
import {useDispatch, useSelector} from 'react-redux'
import Card from '../card/Card'
import { Box, Grid } from '@mui/material'
import Loader from '../loading/Loader'
import { store } from '../../store/store'
import { getExp, getRole, setOffset } from '../../store/slice/cardSlice'
export default function Home() {
  const offset=useSelector((state)=>state.card.offset);
  const [loading,setLoading]=useState(true);
  const dispatch=useDispatch();
    useEffect(()=>{
      //load data whenever we hit bottom of scrollbar
        fetchCardData(offset,setLoading);
       
      
       
    },[offset]);
    const handle =() =>{
      //for infinite scroll
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        dispatch(setOffset()); 
      }
    }
    useEffect(()=>{

   //adding event listener for scroll
   window.addEventListener("scroll",handle);
   //clean up of event listener
   return ()=> window.removeEventListener("scroll",handle);
    },[])
    const data=useSelector((state)=>state.card.cardData);

  return (
  <>
    <Header/>
    <Box>
    {/* cards generating here*/}
    <Grid container spacing={2}>
    {
        data.map((item)=>{
            return (
               <>
               <Grid item sm={6} md={4}>
                <Card item={item} key={item.jdUid}/>
                </Grid>
               </>
            );
        })
    }
    </Grid>
    {/*loader for load more data*/}
  <div>
    {
      loading ?
    <Loader/> : null
    }
  </div>
    </Box>
  </>
  )
}
