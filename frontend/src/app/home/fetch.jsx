// 'use client';
import React from 'react';
import styles from "./page.module.scss";
import { useEffect, useState } from 'react';
import Image from 'next/image';

// async function getCarStats(data, property) {
//     const parameters = new URLSearchParams(data).toString();
//     let request = "http://127.0.0.1:8000/cars/";

//     if (property === "stats") {
//         request += "stats";
//     } else if (property === "mv") {
//         request += "marketvalue";
//     }

//     const url = `${request}?${parameters}`;

//     try {
//         const response = await fetch(url, {
//             next: {
//                 revalidate: 3600
//             }
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         return await response.json();

//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// }


// export default async function FetchCars(filters) {
//     const data = filters
//     const property = 'stats'; 
//     const carData = await getCarStats(data, property);


//     if (error) {
//         return (
//             <>
//             <div>
//                 Error Loading Data
//             </div>
//             </>
//         )
//     }

//     if (!carData) {
//         return (
//             <>
//             <div>
//                 Loading...
//             </div>
//             </>
//         )
//     }

//     return (
//         <>
//             {carData?.map((car) => (
//                 <div>
//                     <h2>{car.year} {car.make} {car.model}</h2>
//                     <p>Image is supposed to be here</p>
//                 </div>
//             ))}
//         </>
//     )
// }
