import React, { useState, useEffect } from 'react'
import { NavbarLinks } from '../constants/Constants'
import { Link } from 'react-router-dom'

const Navbar = () => {
    


    return (
        <>
            <div className=" w-full">
                <div className="flex items-center justify-between flex-wrap  bg-[#3D2C8D] p-4">
                    <div className="flex items-center flex-shrink-0 text-white">
                        <div className="flex">
                            <div></div>
                            <span
                                style={{ fontFamily: 'Courier New' }}
                                className="font-semibold text-3xl tracking-tight mr-10"
                            >
                                My Personal Blog
                            </span>
                        </div>
                        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                            <div className="text-sm lg:flex-grow">
                                {/* {NavbarLinks.map((page, index) => {
                                    return (
                                        <Link key={index} to={page.link}>
                                            <li className="block mt-4 lg:inline-block lg:mt-0 text-[#C996CC] hover:text-white mr-4">
                                                {page.title}
                                            </li>
                                        </Link>
                                    )
                                })} */}
                            </div>
                        </div>
                    </div>
                    <div className="mr-5">
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar