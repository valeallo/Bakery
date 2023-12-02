import PastryLine from './PastryLine';
import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchPastries, selectAllPastries, getPastriesStatus } from '../redux/reducers/pastrySlice';




const PastryTable = () => {
  const dispatch = useDispatch();
  const pastries = useSelector(selectAllPastries);
  const status = useSelector(getPastriesStatus);

  useEffect(() => {
      if (status === 'idle') {
          dispatch(fetchPastries());
          console.log("pastries", pastries)
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
               
              </thead>
              <tbody>
              {pastries &&
        pastries.map((pastry, _index) => {
                return <PastryLine key={_index} pastry={pastry} />
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


