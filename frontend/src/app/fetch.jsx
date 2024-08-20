'use client';
import React from 'react';
import styles from "./page.module.scss";
import { useEffect, useState } from 'react';
import Image from "next/image";

async function getCarStats(data) {
    const parameters = new URLSearchParams(data).toString();
    const request = "https://next-mobile-ventures-backend.onrender.com/car/stats";
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
    const request = "https://next-mobile-ventures-backend.onrender.com/cars/marketvalue";
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
    const request = "https://next-mobile-ventures-backend.onrender.com/cars/picture";
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

async function postCarData(data) {
    if (typeof data.displacement === 'number') {
        data.displacement = data.displacement.toString();
    }
    const url = `https://next-mobile-ventures-backend.onrender.com/profile/addCar?input_username=${data.username}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
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

export default function FetchCars({ filter }) {
    const [carStatistics, setCarStatistics] = useState([]);
    const [carPicture, setCarPicture] = useState({});
    const [carMarketValue, setCarMarketValue] = useState({});
    useEffect(() => {
        const getCars = async () => {
            const carData = await getCarStats(filter);
            carData?.forEach(car => {
                car.fuel_type = car.fuel_type.toUpperCase();
                car.transmission = car.transmission === "a" ? "Automatic" : "Manual";
                switch (car.drive) {
                    case "fwd":
                        car.drive = "Front Wheel Drive";
                        break;
                    case "rwd":
                        car.drive = "Rear Wheel Drive";
                        break;
                    case "awd":
                        car.drive = "All Wheel Drive";
                        break;
                    case "4wd":
                        car.drive = "4 Wheel Drive";
                        break;
                    default:
                        break;
                }
            });
            const [carImg, carMV] = await Promise.all([
                getCarPicture({ "make": filter.make, "model": filter.model }),
                getCarMarketValue({ "year": filter.year, "make": filter.make, "model": filter.model }),
            ])
            setCarPicture(carImg);
            setCarMarketValue(!("Message" in carMV) ? carMV : {
                "value" : "Could Not Retrieve Market Value for this Car"
            });
            setCarStatistics(carData);
        };
        getCars();
    }, [filter]);
    return render({ carStatistics }, { carPicture }, { carMarketValue });
}


function render({ carStatistics }, { carPicture }, { carMarketValue }) {
    const [clickedCar, setClickedCar] = useState(null);
    const [starStates, setStarStates] = useState(() => new Array(carStatistics.length).fill(false));

    
    const updateElement = (index) => {
        const copy = [...starStates];
        copy[index] = !copy[index];
        setStarStates(copy);
    }

    const handleClick = async(e, carObject, index) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("button clicked");
        const profile_username = sessionStorage.getItem("username");
        if (profile_username !== null) {
            let saveCarData = { ...carObject };
            saveCarData.value = carMarketValue.value;
            saveCarData.username = profile_username;
            if (!starStates[index]) {
                await postCarData(saveCarData);
            } else {
                await removeCarData(saveCarData);
            }
            console.log(starStates[index]);
            updateElement(index);
            console.log(starStates[index]);
            console.log("change");
        } else {
            window.location.href = "/login";
        }
    }
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
            <div className={styles.image_container}>
                <div className = {styles.image_background}>
                    <img src={carPicture.image_url} alt={carPicture.credit_string} className={styles.carImageItem} />
                </div>  
                <p>{carPicture.credit_string}</p>
                <div className = {styles.marketValueBlock}>
                    <div className={styles.marketValueCollection}>
                        Show Market Value
                    </div>
                    <h1 className={styles.marketValueItem}>Market Value: ${carMarketValue.value}</h1>
                </div>
            </div>
            {/* Separate Component */} 
            <div>
                {carStatistics?.map((car, index) => (
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
                                    <button className={styles.save_button} onClick={(e) => { handleClick(e, car, index) }}>
                                        <a href="https://www.flaticon.com/free-icons/star" title="star icons" target="_blank">
                                            <Image
                                                src={starStates[index] ? "/icons/star.png" : "/icons/favorites.png"}
                                                alt="Star icons created by Freepik - Flaticon"
                                                width={50}
                                                height={50}
                                                quality={100}
                                            />
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
                                <button className={styles.save_button} onClick={(e) => { handleClick(e, car, index) }}>
                                <a href="https://www.flaticon.com/free-icons/star" title="star icons" target="_blank">
                                        <Image
                                            src={starStates[index] ? "/icons/star.png" : "/icons/favorites.png"}
                                            alt="Star icons created by Freepik - Flaticon"
                                            width={50}
                                            height={50}
                                            quality={100}
                                        />
                                    </a>
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}
