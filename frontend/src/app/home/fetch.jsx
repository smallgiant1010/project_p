'use client';
import React from 'react';
import styles from "./page.module.scss";
import Image from 'next/image';
import { useEffect, useState } from 'react';

async function getCarStats(data) {
    const parameters = new URLSearchParams(data).toString();
    const request = "http://127.0.0.1:8082/car/stats";
    const url = `${request}?${parameters}`;
    console.log(url)
    try {
        const response = await fetch(url);
        console.log(response.text);
        if (!response.ok) {
            throw new Error(`status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getCarMarketValue(data) {
    const parameters = new URLSearchParams(data).toString();
    const request = "http://127.0.0.1:8082/cars/marketvalue";
    const url = `${request}?${parameters}`;
    try {
        const response = await fetch(url);
        console.log(response);
        if (!response.ok) {
            throw new Error(`status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export default function FetchCars({ filter }) {
    const [carStatistics, setCarStatistics] = useState([]);
    // await getCarMarketValue(ymm)
    useEffect(() => {
        const getCars = async () => {
            let carData = await getCarStats(filter);
            let carStats = await Promise.all(carData.map(async(car) => {
                const ymm = {
                    "year": car.year,
                    "make": car.make,
                    "model": car.model.slice(' '),
                };
                car.value = 0;
                return car;
            })
            );
            setCarStatistics(carStats);
        };
        getCars();
    }, [filter]);
    return render({ carStatistics });
}

function render({ carStatistics }) {
    if (carStatistics.length == 0) {
        return (
            <>
                <div>
                    There is no car based on these properties
                </div>
            </>
        )
    }
    return (
        <>
            {carStatistics?.map((car, index) => (
                <div key={index}>
                    <h2>{car.year} {car.make} {car.model}</h2>
                    <p>Image is supposed to be here</p>
                    <h1>${car.value} </h1>
                </div>
            ))}
        </>
    )
}
