import React from 'react'
import axios from 'axios'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from 'react-redux';
import { deletePastry } from '../redux/reducers/pastrySlice'


const DeleteButton = ({id, element}) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deletePastry(id))}

  return (
   <button onClick={handleDelete}>
         <DeleteOutlineIcon />
   </button>
  )
}

export default DeleteButton