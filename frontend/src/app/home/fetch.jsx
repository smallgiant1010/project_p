// // 'use client';
// import React from 'react';
// import styles from "./page.module.scss";
// import Image from 'next/image';

// async function getCarStats(data) {
//     const parameters = new URLSearchParams(data).toString();
//     const request = "http://127.0.0.1:8082/car/stats";
//     const url = `${request}?${parameters}`;
//     console.log(url)
//     try {
//         const response = await fetch(url);

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return await response.json();
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

// async function getCarMarketValue(data) {
//     const parameters = new URLSearchParams(data).toString();
//     const request = "http://127.0.0.1:8082/car/marketvalue";
//     const url = `${request}?${parameters}`;
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return await response.json();
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

// export async function getServerSideProps(data) {
//     const { filters } = data;
//     const carData = await getCarStats(filters);

//     const carMarketValues = [];
//     for (const car of carData) {
//         const ymm = {
//             year: car.year,
//             make: car.make,
//             model: car.model,
//         };
//         carMarketValues.push(await getCarMarketValue(ymm));
//     }

//     return {
//         props: {
//             carData,
//             carMarketValues,
//         },
//     };
// }

// export default async function FetchCars({ carData, carMarketValues }) {
//     if (!carData || carMarketValues.length == 0) {
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
//             {carMarketValues?.map((car) => (
//                 <div key={car}>
//                     <h1>{car.value}</h1>
//                 </div>
//             ))}
//         </>
//     )
// }
