'use client';
import Image from "next/image";
import styles from "./page.module.scss";
import { useState } from "react";

export default function Home() {

  const [filterData, setFilterData] = useState({});
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2017);
  const [CMPG, setCMPG] = useState([24, 30]);
  const [HMPG, setHMPG] = useState([30, 40]);
  const [cylinders, setCylinders] = useState(2);
  const [fuel, setFuel] = useState("Gas");
  const [drive, setDrive] = useState("Front Wheel Drive");
  const [transmission, setTransmission] = useState("Automatic");
  
  const keyword_filters = {
      "Make": make, 
      "Model": model,  
      "Year": year,
  };

  const setter = (e, parameter) => {
    switch (parameter) {
      case "Make": setMake(e.target.value); break;
      case "Model": setModel(e.target.value); break;
      case "Year": setYear(e.target.value); break;
      case "City Miles Per Gallon": setCMPG(
        e.target.value
      ); break;
      case "Highway Miles Per Gallon": setHMPG(
        e.target.value
      ); break;
      case "Cylinders": setCylinders(e.target.value); break;
      case "Fuel Type": setFuel(e.target.value); break;
      case "Drive": setDrive(e.target.value); break;
      case "Transmission": setTransmission(e.target.value); break;
    }
  }

  const selection_filters = {
    "Cylinders" : [2, 3, 4, 5, 6, 8, 10, 12, 16],
    "Fuel Type" : ["Gas", "Diesel", "Electricity"],
    "Drive" : ["Front Wheel Drive", "Rear Wheel Drive", "All Wheel Drive", "Four Wheel Drive"],
    "Transmission": ["Manual", "Automatic"], 
  };

  const range_filters = {
    "City Miles Per Gallon": CMPG, 
    "Highway Miles Per Gallon": HMPG,
  };



  // {styles.sidebar_filters_label}
  // {styles.sidebar_filters_option}

  return (
    <main className={styles.main}>
      <div className={styles.search}>
        {/* <Image /> */}
      </div>
      <div className={styles.filters}>
        <form>
          
        </form>
          <h1 className={styles.filters_header}>
            Filter
          </h1>
          <hr></hr>
          <dl className={styles.filters_types}>
          </dl>
          <dt className={styles.filters_types_options}></dt>
          <dd className={styles.filters_types_options_more}></dd>
      </div>
      <div className={styles.body}>
      </div>
    </main>
  );
}
