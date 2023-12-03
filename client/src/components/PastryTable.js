import PastryLine from './PastryLine';
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchPastries, selectAllPastries, getPastriesStatus } from '../redux/reducers/pastrySlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';




const PastryTable = () => {
  const dispatch = useDispatch();
  const pastries = useSelector(selectAllPastries);
  const status = useSelector(getPastriesStatus);
  const [addPastry, setAddPastry] = useState(false)
  const defaultPastry = {
    "name": "",
    "price": 0,
    "ingredients": [],
    "imageUrl": "https://images.pexels.com/photos/808923/pexels-photo-808923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "quantity": 0
  }

  useEffect(() => {
      if (status === 'idle') {
          dispatch(fetchPastries());
      }
  }, [status, dispatch]);



  return (
    <>
    <div className= " w-full p-20 space-y-10 ">
        <div className="bg-zinc-200 w-full h-20">
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full ">
              <thead className="border-b">
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                    
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                   Nome
                  </th>
                  
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                   Prezzo
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                   Url Immagine
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                    Quantità
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                   Ingredienti
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                  {addPastry?   <RemoveIcon onClick={()=>{setAddPastry(false)}}/>   : <AddIcon onClick={()=>{setAddPastry(true)}}/>}
                  </th>
            
              </thead>

              <tbody>
              {addPastry &&  <PastryLine  pastry={defaultPastry} isNew={true} closeAddLine={()=>{setAddPastry(false)}}/>}
              {pastries &&
                pastries.map((pastry, _index) => {
                        return <PastryLine key={_index + "tableLine"} pastry={pastry} isNew={false}/>
                    }
                    )}
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    
    </>
  );
};

export default PastryTable;


