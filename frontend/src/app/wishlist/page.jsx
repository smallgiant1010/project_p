"use client";
import Image from 'next/image';
import React from 'react'
import { useEffect, useState } from "react";
import styles from "./wishlist.module.scss";

async function getWishListCarData(input_username) {
    const url = `https://next-mobile-ventures-backend.onrender.com/profile/wishlist?input_username=${input_username}`;
    try {
        const response = await fetch(url)
        console.log(response);
        if (!response.ok) {
            throw new Error(`status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error posting data:', error);
    }
}

async function removeCarData(data) {
    if (typeof data.displacement === 'number') {
        data.displacement = data.displacement.toString();
    }
    const url = `https://next-mobile-ventures-backend.onrender.com/profile/removeCar?input_username=${data.username}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        console.log(response);
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`status: ${response.status}, error: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error posting data:', error);
    }
}

export default function Wishlist() {
    const [clickedCar, setClickedCar] = useState(null);
    const [loggedInUsername, setLoggedInUsername] = useState("");
    const [carHistory, setCarHistory] = useState([])
    // const [starStates, setStarStates] = useState(() => new Array(carStatistics.length).fill(false));


    const updateElement = (index) => {
        const copy = [...carHistory];
        copy.splice(index, 1);
        setCarHistory(copy);
    }

    const FetchCarHistory = async (username) => {
        if (username !== null) {
            setLoggedInUsername(username);
            const carsData = await getWishListCarData(username);
            setCarHistory(carsData);
        }
        else {
            window.location.href = "/login";
        }
    }

    useEffect(() => {
        const username = sessionStorage.getItem("username");
        FetchCarHistory(username);
    }, []);

    const handleClick = async (e, carObject, index) => {
        e.stopPropagation();
        e.preventDefault();
        await removeCarData(carObject);
        updateElement(index);
    }

    return (
        <main className={styles.wishlist_section}>
            <div className={styles.wishlist_container}>
                <div className={styles.heading_block}>
                    <Image
                        src="/icons/garageIcon.png"
                        alt="Garage Icon Found on Google"
                        width={200}
                        height={200}
                        quality={100}
                    />
                    <h1 className={styles.username_text}>{loggedInUsername}'s Saved Cars</h1>
                </div>
                <div className={styles.collection}>
                    {carHistory?.map((car, index) => (
                        <div className={clickedCar === index ? styles.clicked_data_item : styles.unclicked_data_item} key={index} onClick={() => setClickedCar(clickedCar === index ? null : index)} >
                            {clickedCar === index ? (
                                <div>
                                    <div className={styles.clickedCarHead}>
                                        <a href="https://www.flaticon.com/free-icons/car" title="car icons" target="_blank" className={styles.carImage}>
                                            <Image
                                                src="/icons/sedan-car-front.png"
                                                alt="Car icons created by Freepik - Flaticon"
                                                width={50}
                                                height={50}
                                                quality={100}
                                            />
                                        </a>
                                        <h2>{car.year} {car.make.toUpperCase()} {car.model.toUpperCase()}</h2>
                                        <button className={styles.delete_button} onClick={(e) => { handleClick(e, car, index) }}>
                                            <a href="https://www.flaticon.com/free-icons/car" title="car icons" target="_blank">
                                                {/* <Image
                                                src={"/deleteCar.png"}
                                                alt="Car icons created by Freepik - Flaticon"
                                                width={50}
                                                height={50}
                                                quality={100}
                                            /> */}
                                            </a>
                                        </button>
                                    </div>
                                    <h3><span>Fuel Type:</span> <strong>{car.fuel_type}</strong></h3>
                                    <h3><span>Drive:</span> <strong>{car.drive}</strong></h3>
                                    <h3><span>Cylinders:</span> <strong>{car.cylinders}</strong></h3>
                                    <h3><span>Transmission:</span> <strong>{car.transmission}</strong></h3>
                                    <h3><span>City Fuel Consumption In Miles Per Gallon:</span><strong>{car.city_mpg}</strong></h3>
                                    <h3><span>Highway Fuel Consumption In Miles Per Gallon:</span><strong>{car.highway_mpg}</strong></h3>
                                    <h3><span>Combined Fuel Consumption In Miles Per Gallon:</span><strong>{car.combination_mpg}</strong></h3>
                                </div>
                            ) : (
                                <>
                                    <a href="https://www.flaticon.com/free-icons/car" title="car icons" target="_blank" className={styles.carImage}>
                                        <Image
                                            src="/icons/sedan-car-front.png"
                                            alt="Car icons created by Freepik - Flaticon"
                                            width={50}
                                            height={50}
                                            quality={100}
                                        />
                                    </a>
                                    <h2>
                                        {car.year} {car.make.toUpperCase()} {car.model.toUpperCase()}
                                    </h2>
                                    <button className={styles.delete_button} onClick={(e) => { handleClick(e, car, index) }}>
                                        <a href="https://www.flaticon.com/free-icons/car" title="car icons" target="_blank">
                                            {/* <Image
                                                src={"/deleteCar.png"}
                                                alt="Car icons created by Freepik - Flaticon"
                                                width={50}
                                                height={50}
                                                quality={100}
                                            /> */}
                                        </a>
                                    </button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
