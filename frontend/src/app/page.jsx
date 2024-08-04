'use client';
import Image from "next/image";
import styles from "./page.module.scss";
import { useState } from "react";

export default function Home() {

  const [filterData, setFilterData] = useState({});
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(6969);
  const [CMPG, setCMPG] = useState([24, 30]);
  const [HMPG, setHMPG] = useState([30, 40]);
  const [marketValue, setMarketValue] = useState([0, 0])
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
      case "Market Value": setMarketValue(e.target.value); break;
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
    "Maket Value": marketValue
  };

  const filterState = {
    "Cylinders": cylinders,
    "Fuel Type": fuel,
    "Drive": drive,
    "Transmission": transmission,
  };



  // {styles.sidebar_filters_label}
  // {styles.sidebar_filters_option}

  return (
    <main className={styles.main}>
      <aside className={styles.sidebar}>
        <h1 className={styles.filters_header}>Filter</h1>
        <div className={styles.filter_section}>
          <h2 className={styles.filter_title}>Keyword Filters</h2>
          <form>
            <label className={styles.filter_label}>
              Make:
              <input type="text" value={make} onChange={(e) => setter(e, "Make")} />
            </label>
            <label className={styles.filter_label}>
              Model:
              <input type="text" value={model} onChange={(e) => setter(e, "Model")} />
            </label>
            <label className={styles.filter_label}>
              Year:
              <input type="number" value={year} onChange={(e) => setter(e, "Year")} />
            </label>
          </form>
        </div>
        <div className={styles.filter_section}>
          <h2 className={styles.filter_title}>Range Filters</h2>
            <label className={styles.filter_label}>
              City Miles Per Gallon:
              <div className={styles.range_input}>
                <input
                  type="number"
                  value={"Min" || ''}
                  onChange={(e) => setCMPG([Number(e.target.value), CMPG[1] || 30])}
                  placeholder="Min"
                />
                <span className={styles.range_separator}>to</span>
                <input
                  type="number"
                  value={"Max" || ''}
                  onChange={(e) => setCMPG([CMPG[0] || 24, Number(e.target.value)])}
                  placeholder= "Max"
                />
              </div>
          </label>
          <label className={styles.filter_label}>
              Highway Miles Per Gallon:
              <div className={styles.range_input}>
                <input
                  type="number"
                  value={"Min" || ''}
                  onChange={(e) => setHMPG([Number(e.target.value), [1] || 30])}
                  placeholder="Min"
                />
                <span className={styles.range_separator}>to</span>
                <input
                  type="number"
                  value={"Max" || ''}
                  onChange={(e) => setHMPG([HMPG[0] || 24, Number(e.target.value)])}
                  placeholder= "Max"
                />
              </div>
          </label>
          <label className={styles.filter_label}>
              Market Value:
              <div className={styles.range_input}>
                <input
                  type="number"
                  value={"Min" || ''}
                  onChange={(e) => setMarketValue([Number(e.target.value), marketValue[1] || 30])}
                  placeholder="Min"
                />
                <span className={styles.range_separator}>to</span>
                <input
                  type="number"
                  value={"Max" || ''}
                  onChange={(e) => setMarketValue([marketValue[0] || 24, Number(e.target.value)])}
                  placeholder= "Max"
                />
              </div>
          </label>
        </div>
        <div className={styles.filter_section}>
          <h2 className={styles.filter_title}>Selection Filters</h2>
          {Object.keys(selection_filters).map((filterKey) => (
            <div key={filterKey}>
              <h3 className={styles.filter_sub_title}>{filterKey}</h3>
              {selection_filters[filterKey].map((option) => (
                <label key={option} className={styles.filter_label}>
                  <input
                    type="radio"
                    name={filterKey}
                    value={option}
                    checked={filterState[filterKey] === option}
                    onChange={(e) => setter(e, filterKey)}
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
        </div>
      </aside>
    </main>
  );
}
