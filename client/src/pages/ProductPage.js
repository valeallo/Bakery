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
              <section class="text-gray-700 body-font overflow-hidden bg-white">
                <div class="container px-5 py-24 mx-auto">
                  <div class="lg:w-4/5 mx-auto flex flex-wrap">
                    <img  class="lg:w-1/2 w-full h-30 object-cover object-center rounded border border-gray-200" src={pastry.imageUrl} />
                    <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                      <h2 class="text-sm title-font text-gray-500 tracking-widest">LUANA & MARIA</h2>
                      <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{pastry.name}</h1>
                      <div class="flex mb-4">
                        
                      </div>
                      <div class="min-h-[50%] p-[10%]">
                      <ul className="leading-relaxed">
                        {pastry.ingredients.map((ingredient, index) => (
                          <li key={index}>{`${ingredient.name}: ${ingredient.quantity}${ingredient.unit}`}</li>
                        ))}
                      </ul>
                      </div>
                      <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                        <div class="flex ml-6 items-center">
                          <span class="mr-3">Quantità</span>
                          <div class="relative">
                            <select class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                              {[...Array(pastry.quantity)].map((_, i) => (
                                <option key={i} value={i + 1}>{i + 1}</option>
                              ))}
                            </select>
                            <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                                <path d="M6 9l6 6 6-6"></path>
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="flex">
                        <span class="title-font font-medium text-2xl text-gray-900">{pastry.discountedPrice? pastry.discountedPrice : pastry.price}€</span>
                        <span className="text-lg text-slate-900 line-through">  {pastry.discountedPrice ? pastry.price + "€": " "}</span>
                        <button class="flex ml-auto text-white  bg-[#e68d8d] border-0 py-2 px-6 focus:outline-none  hover:bg-[#dc6262] rounded">Acquista Ora</button>
                        <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
          ) : (
              <p>Pastry not found.</p>
          )}
      </div>
  );
}

export default ProductPage