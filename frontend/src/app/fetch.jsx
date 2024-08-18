'use client';
import React from 'react';
import styles from "./page.module.scss";
import { useEffect, useState } from 'react';
import Image from "next/image";

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

async function postCarData(data) {
    if (typeof data.displacement === 'number') {
        data.displacement = data.displacement.toString();
    }
    const url = `http://127.0.0.1:8082/profile/addCar?profile_id=${data._id}`;
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

// async function getWishListCarData(profile_id) {
//     const url = `http://127.0.0.1:8082/profile/wishlist?${profile_id}`;
//     try {
//         const response = await fetch(url)
//         console.log(response);
//         if (!response.ok) {
//             throw new Error(`status: ${response.status}`);
//         }
//         return await response.json();
//     } catch (error) {
//         console.error('Error posting data:', error);
//     }
// }

async function removeCarData(data) {
    if (typeof data.displacement === 'number') {
        data.displacement = data.displacement.toString();
    }
    const url = `http://127.0.0.1:8082/profile/removeCar?profile_id=${data._id}`;
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
            const first_item = carData[0];
            const [carImg, carMV] = await Promise.all([
                getCarPicture({ "make": first_item.make, "model": first_item.model }),
                getCarMarketValue({ "year": first_item.year, "make": first_item.make, "model": first_item.model }),
            ])
            setCarPicture(carImg);
            setCarMarketValue(carMV);
            setCarStatistics(carData);
        };
        getCars();
    }, [filter]);
    return render({ carStatistics }, { carPicture }, { carMarketValue });
}


function render({ carStatistics }, { carPicture }, { carMarketValue }) {
    const [clickedCar, setClickedCar] = useState(null);
    const [starState, setStarState] = useState(false);
    const handleClick = async(e, carObject, stateOfStar) => {
        e.preventDefault();
        const profile_id = sessionStorage.getItem("u_id");
        if (profile_id !== null) {
            let saveCarData = { ...carObject };
            saveCarData.value = carMarketValue.value;
            saveCarData._id = profile_id;
            if (!stateOfStar) {
                await postCarData(saveCarData);
            } else {
                await removeCarData(saveCarData);
            }
            setStarState(!stateOfStar);
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
                <img src={carPicture.image_url} alt={"Car Image"} />
                <p>{carPicture.credit_string}</p>
                <h1>Market Value: ${carMarketValue.value}</h1>
            </div>
            <div>
                {carStatistics?.map((car, index) => (
                    <div className={clickedCar === index ? styles.clicked_data_item : styles.unclicked_data_item} key={index} onClick={() => setClickedCar(clickedCar === index ? null : index)} >
                        {clickedCar === index ? (
                            <div>
                                {/* <a href="https://www.flaticon.com/free-icons/car" title="car icons" target="_blank" className={styles.carImage}>
                                    <Image
                                        src="/icons/sedan-car-front.png"
                                        alt="Car icons created by Freepik - Flaticon"
                                        width={50}
                                        height={50}
                                        quality={100}
                                    />
                                </a> */}
                                <h2>{car.year} {car.make.toUpperCase()} {car.model.toUpperCase()}</h2>
                                <h3><span>Fuel Type:</span> <strong>{car.fuel_type}</strong></h3>
                                <h3><span>Drive:</span> <strong>{car.drive}</strong></h3>
                                <h3><span>Cylinders:</span> <strong>{car.cylinders}</strong></h3>
                                <h3><span>Transmission:</span> <strong>{car.transmission}</strong></h3>
                                <h3><span>City Fuel Consumption In Miles Per Gallon:</span><strong>{car.city_mpg}</strong></h3>
                                <h3><span>Highway Fuel Consumption In Miles Per Gallon:</span><strong>{car.highway_mpg}</strong></h3>
                                <h3><span>Combined Fuel Consumption In Miles Per Gallon:</span><strong>{car.combination_mpg}</strong></h3>
                                <button className={styles.save_button} onClick={(e) => { handleClick(e, car, starState) }}>
                                    {!starState && <a href="https://www.flaticon.com/free-icons/star" title="star icons" target="_blank">
                                        <Image
                                            src="/icons/favorites.png"
                                            alt="Star icons created by Freepik - Flaticon"
                                            width={50}
                                            height={50}
                                            quality={100}
                                        />
                                    </a>
                                    }
                                    {starState && <a href="https://www.flaticon.com/free-icons/star" title="star icons" target="_blank">
                                        <Image
                                            src="/icons/star.png"
                                            alt="Star icons created by Freepik - Flaticon"
                                            width={50}
                                            height={50}
                                            quality={100}
                                        />
                                    </a>
                                    }
                                </button>
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
                                <button className={styles.save_button} onClick={(e) => { handleClick(e, car, starState) }}>
                                    {!starState && <a href="https://www.flaticon.com/free-icons/star" title="star icons" target="_blank">
                                        <Image
                                            src="/icons/favorites.png"
                                            alt="Star icons created by Freepik - Flaticon"
                                            width={50}
                                            height={50}
                                            quality={100}
                                        />
                                    </a>
                                    }
                                    {starState && <a href="https://www.flaticon.com/free-icons/star" title="star icons" target="_blank">
                                        <Image
                                            src="/icons/star.png"
                                            alt="Star icons created by Freepik - Flaticon"
                                            width={50}
                                            height={50}
                                            quality={100}
                                        />
                                    </a>
                                    }
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}
