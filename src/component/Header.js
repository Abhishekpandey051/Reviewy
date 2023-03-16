import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Movie } from '@mui/icons-material';
import { Appstate } from '../App';

export default function Header() {
const useAppstate = useContext(Appstate)

  return (
    <div>
    <div className='sticky z-10 header text-3xl flex justify-between items-center text-red-500 font-bold p-3 border-b-2 border-gray-500'>
        <Link to={'/'}><span><Movie/> Reviewy</span></Link> 
        
        {useAppstate.login? 
        <Link to={'/addmovie'}>
        <h1 className=' bg-black top-0 text-lg cursor-pointer text-white flex items-center'>
        <Button >
        <AddIcon className='mr-1' color='secondary' /> <span className='text-white'>Add new card</span> </Button></h1>
        </Link >
        :
        <Link to={'/login'}>
        <h1 className=' text-lg bg-green-500 cursor-pointer flex items-center'>
        <Button >
       <span className='text-white font-medium capitalize'>Login</span> </Button></h1>
        </Link >
      

        }
    </div>

    </div>
  )
}
