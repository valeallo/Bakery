import React from 'react'
import { Link } from 'react-router-dom';

const ProductCard = ({product}) => {
    const defaultImage = "https://images.pexels.com/photos/808923/pexels-photo-808923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

  return (<>
        <div className="relative  flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md  hover:scale-105 transition-transform duration-300">
            <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                <div className="w-full h-100" 
                  style={{
                    backgroundImage: `url("${product.imageUrl? product.imageUrl : defaultImage }")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
            }}
                />
                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">  {product?.discountRate? - product.discountRate +"%" : " "}</span>
            </div>
            <div className="mt-4 px-5 pb-5">
                <button>
                <Link to={`/pastry/${product._id}`}>    
                <h5 className="text-xl tracking-tight text-slate-900">{product.name}</h5>
                </Link>
                </button>
                <div className="mt-2 mb-2 flex items-center justify-between">
                <p className="m-7"> 
                    <span className="text-3xl font-bold text-slate-900">{product?.discountedPrice ? product?.discountedPrice : product.price}€</span>
                    <span className="text-sm text-slate-900 line-through">{product?.discountedPrice ? product.price + "€" : " "}</span>
                </p>

                </div>
                <button className="flex items-center justify-center rounded-md bg-[#e68d8d] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#dc6262] focus:outline-none focus:ring-4 focus:ring-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Aggiungi al carrello
                </button>
            </div>
        </div>
  </>
  )
}

export default ProductCard
