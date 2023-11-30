
import {
    FETCH_PASTRIES_API
  } from '../../constants/Constants';
  
  export const fetchPastries = () => async dispatch => {
    dispatch({ type: "FETCH_PASTRIES_START" });
    try {
      const response = await fetch(FETCH_PASTRIES_API); 
      const data = await response.json();
      dispatch({ type: "FETCH_PASTRIES_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_PASTRIES_FAILURE", payload: error });
    }
  };
  

  export const fetchPastryById = (pastryId) => async dispatch => {
    dispatch({ type: "FETCH_PASTRY_START" });
    try {
      const response = await fetch(`${FETCH_PASTRIES_API}/${pastryId}`);
      if (!response.ok) {
        throw new Error('Pastry not found');
      }
      const data = await response.json();
      dispatch({ type: "FETCH_PASTRY_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_PASTRY_FAILURE", payload: error.message });
    }
  };
 