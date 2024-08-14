'use client';
import React from 'react';
import styles from "./page.module.scss";
import Image from 'next/image';
import { useEffect, useState } from 'react';

async function getCarStats(data) {
    const parameters = new URLSearchParams(data).toString();
    const request = "http://127.0.0.1:8082/car/stats";
    const url = `${request}?${parameters}`;
    try {
        const response = await fetch(url);
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

async function getCarPicture(data) {
    const parameters = new URLSearchParams(data).toString();
    const request = "http://127.0.0.1:8082/cars/picture";
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
            const carData = await getCarStats(filter);
            let carStats = await Promise.all(carData.map(async(car) => {
                const ymm = {
                    "year": car.year,
                    "make": car.make,
                    "model": car.model.slice(' '),
                };
                // const img = await getCarPicture(ymm)
                // car.url = img.image_url
                // car.credits = img.credit_string;
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
                <div className={styles.load_fail}>
                    There is no car based on these properties
                </div>
            </>
        )
    }
    return (
        <>
            {carStatistics?.map((car, index) => (
                <div className={styles.data_item} key={index}>
                    <h2>{car.year} {car.make.toUpperCase()} {car.model.toUpperCase()}</h2>
                    {/* <img src={car.url} alt={car.credits} />
                    <p>{car.credits}</p> */}
                </div>
            ))}
        </>
    )
}
