import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPastry } from '../redux/reducers/pastrySlice';
import { useParams } from 'react-router-dom'
import { fetchPastryById } from '../redux/reducers/pastrySlice';
import { FETCH_PASTRIES_API } from '../constants/Constants';
import axios from 'axios';

const ProductPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [pastry, setPastry] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchPastry = async () => {
          setLoading(true);
          setError(null);
          try {
              const response = await axios.get(FETCH_PASTRIES_API + "/" + id);
              setPastry(response.data);
          } catch (err) {
              setError(err.message);
          } finally {
              setLoading(false);
          }
      };

      if (id) {
          fetchPastry();
      }
  }, [id]);



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
      <div>
          {pastry ? (
              <div>
                  <h1>{pastry.name}</h1>
              </div>
          ) : (
              <p>Pastry not found.</p>
          )}
      </div>
  );
}

export default ProductPage