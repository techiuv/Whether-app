import { useState } from "react";
import React from 'react';

const SearchBar = ({ setCity }) => {

    const searchCity = (e) => {
        e.preventDefault();
        const city = e.target.city.value.trim(); 
        if (city) {
            setCity(city); 
            e.target.city.value = ''; 
        }
    }

    return (
        <form className='w-[80vw] h-12 md:w-[400px] flex justify-center items-center gap-1 md:gap-2 mx-auto bg-secondary mt-6 backdrop-blur rounded-[100px]' onSubmit={searchCity}>
            <input
                type="search"
                name="city" 
                placeholder='Search city'
                className='cursor-text w-[80%] h-[100%] px-1 md:px-3 py-1 bg-transparent border-none outline-none focus:outline-none focus:bg-transparent text-white text-sm md:text-lg font-normal placeholder:text-slate-300 backdrop-blur-md search-no-clear'
                autoComplete='off'
                aria-label="Search for weather" 
            />

            <button 
                className='cursor-pointer bg-transparent hover:shadow-slate-400 transition-all duration-75 rounded-[50%]' 
                aria-label="Search" 
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='#fff' className="text-slate-300 hover:text-white active:text-white" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
            </button>
        </form>
    );
};

export default SearchBar;
