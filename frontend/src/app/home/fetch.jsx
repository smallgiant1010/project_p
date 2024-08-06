// 'use client';
import React from 'react';
import styles from "./page.module.scss";
import { useEffect, useState } from 'react';
import Image from 'next/image';

async function getCar(data, property) {
    const parameters = new URLSearchParams(data).toString();
    let request = "http://127.0.0.1:8000/cars/"
    if (property === "stats") {
        request += "stats";
    }
    else if (property === "mv") {
        request += "marketvalue";
    }
    const url = `${request}?${parameters}`;
    console.log(url)
    const response = await fetch(url, {
        next: {
            revalidate: 0
        }
    }).then(res => {
        if (!res.ok) {
            throw new Error("Request did not respond");
        }
    }).catch(error => {
        console.log(error);
    })
    return response.json();

}

async function getCarImage(data) {
    const [imageData, setImageData] = useState('');
    const parameters = new URLSearchParams(data).toString();
    useEffect(() => {
        const call = async () => {
            const response = await fetch(`http://127.0.0.1:8000/cars/picture?${parameters}`, {
                next: {
                    revalidate: 10
                }
            });
            if(!response.ok) throw new Error("Image Not Found");
            const blob = await res.blob();
            setImageData(URL.createObjectURL(blob));   
        };
        call();
    }, [imageData]);
    return imageData;
}


export default async function FetchCars(filters) {
    const ymm = {
        "year": filters["year"],
        "make": filters["make"],
        "model": filters["model"],
    }
    const carStatistics = await getCar(filters, "stats");
    // const carValue = await getCar(ymm, "mv");
    // const carMarketValue = (carValue != null) && ("median" in carValue) ? carValue["median"] : carValue["mean"];
    // const carImage = await getCarImage(ymm);
    return (
        <>
            {carStatistics?.map((car) => (
                <div key={car} className={styles.carInformation}>
                    <h2>{car.year} {car.make} {car.model}</h2>
                    {/* <Image
                    src={carImage}
                    alt={"Image Not Found"}
                    width={100}
                    height={100}
                    quality={100}
                    priority
                    /> */}
                    <h3>
                        {/* ${carMarketValue} */}
                    </h3>
                </div>
            ))}
        </>
    )
}
