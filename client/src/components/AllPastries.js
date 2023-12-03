import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchPastries, selectAllPastries, getPastriesStatus } from '../redux/reducers/pastrySlice';
import ProductCard from '../components/ProductCard';


const AllPastries = () => {
    const dispatch = useDispatch();
    const pastries = useSelector(selectAllPastries);
    const status = useSelector(getPastriesStatus);
  
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPastries());
        }
    }, [status, dispatch]);
  return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {pastries.map(pastry => (
            <ProductCard product={pastry} key={pastry._id}/>
        ))}
      </div>
    </div>
  )
}

export default AllPastries