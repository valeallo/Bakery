import React from 'react'
import {Link} from "react-router-dom"
import EditIcon from '@mui/icons-material/Edit';
import DeleteButton from './DeleteButton';

const PastryLine = ({pastry}) => {
  return (
    <tr className="border-b bg-gray-50 border-gray-200">
    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
        <EditIcon />
    </td>
    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
       {pastry.name}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {pastry.price}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      <div className="flex flex-col">
       <img className="h-10 w-10" src={pastry.imageUrl} alt={`${pastry.name}-image`}  />
      </div>
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {pastry.quantity}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">

    </td>

    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      <DeleteButton id={pastry._id} />
    </td>
    <div></div>
  </tr>
  )
}

export default PastryLine