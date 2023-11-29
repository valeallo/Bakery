
import {
    FETCH_PASTRIES_START,
    FETCH_PASTRIES_SUCCESS,
    FETCH_PASTRIES_FAILURE
  } from '../constants/constants';
  
  export const fetchPastries = () => async dispatch => {
    dispatch({ type: FETCH_PASTRIES_START });
    try {
      const response = await fetch('/api/pastries'); 
      const data = await response.json();
      dispatch({ type: FETCH_PASTRIES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_PASTRIES_FAILURE, payload: error });
    }
  };
  
 