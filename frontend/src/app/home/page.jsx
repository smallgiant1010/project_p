'use client';
import styles from "./page.module.scss";
import { useState } from "react";
import FetchCars from "./fetch";

export default function Home() {

  const [filterData, setFilterData] = useState({});
  const [make, setMake] = useState("Toyota");
  const [model, setModel] = useState("Camry");
  const [year, setYear] = useState(2020);
  const [CMPG, setCMPG] = useState([]);
  const [HMPG, setHMPG] = useState([]);
  const [marketValue, setMarketValue] = useState([])
  const [cylinders, setCylinders] = useState();
  const [fuel, setFuel] = useState();
  const [drive, setDrive] = useState();
  const [transmission, setTransmission] = useState();
  
  // const keyword_filters = {
  //     "Make": make, 
  //     "Model": model,  
  //     "Year": year,
  // };

  const[isKeywordVisible, setIsKeywordVisible] = useState(true);
  const[isRangeVisible, setIsRangeVisible] = useState(true);
  const[isSelectionVisible, setIsSelectionVisible] = useState(true);


  const store_filters = () => {
      const data = {
        "make": make,
        "model": model,
        "year": year,
        "fuel_type": fuel,
        "drive": drive,
        "cylinders": cylinders,
        "transmission":transmission,
        "min_city_mpg": CMPG.length > 0 ? CMPG[0] : null,
        "max_city_mpg": CMPG.length > 1 ? CMPG[1] : null,
        "min_hwy_mpg": HMPG.length > 0 ? HMPG[0] : null,
        "max_hwy_mpg": HMPG.length > 1 ? HMPG[1] : null,
      };
      setFilterData(data);
  };

  const toggleSection = (section) => {
    switch(section){
      case "keyword":
        setIsKeywordVisible(!isKeywordVisible);
        break;
      case "range":
        setIsRangeVisible(!isRangeVisible);
        break;
      case "selection":
        setIsSelectionVisible(!isSelectionVisible);
        break;
      default:
        break;
    }
  };

  const callStats = (data) => {
    // Call the api from the python backend
    // return data as a js object
  };

  //Create new method to store all data
  //Loop through data and make boxes with said data

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
  };

  const selection_filters = {
    "Cylinders" : ["2", "3", "4", "5", "6", "8", "10", "12", "16"],
    "Fuel Type" : ["Gas", "Diesel", "Electricity"],
    "Drive" : ["Front Wheel Drive", "Rear Wheel Drive", "All Wheel Drive", "Four Wheel Drive"],
    "Transmission": ["Manual", "Automatic"], 
  };

  // const range_filters = {
  //   "City Miles Per Gallon": CMPG, 
  //   "Highway Miles Per Gallon": HMPG,
  //   "Maket Value": marketValue
  // };

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
        <div className={styles.filters_header}>
          <h1>Filter</h1>
        </div>
        <div className={styles.filter_section}>
          <h2 className={styles.filter_title} onClick={()=>toggleSection("keyword")}>Keyword Filters{isKeywordVisible ? " ▲" : " ▼"} </h2>
          {isKeywordVisible && (
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
          )}
        </div>
        <div className={styles.filter_section}>
          <h2 className={styles.filter_title} onClick={()=>toggleSection("range")}>Range Filters{isRangeVisible ? " ▲" : " ▼"}</h2>
          {isRangeVisible&&(
            <>
              <label className={styles.filter_label}>
                City Miles Per Gallon:
                <div className={styles.range_input}>
                  <input
                    type="number"
                    value={CMPG[0]}
                    onChange={(e) => setCMPG([Number(e.target.value), CMPG[1] || 30])}
                    placeholder="Min"
                  />
                  <span className={styles.range_separator}>to</span>
                  <input
                    type="number"
                    value={CMPG[1]}
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
                    value={HMPG[0]}
                    onChange={(e) => setHMPG([Number(e.target.value), [1] || 30])}
                    placeholder="Min"
                  />
                  <span className={styles.range_separator}>to</span>
                  <input
                    type="number"
                    value={HMPG[1]}
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
                    value={marketValue[0]}
                    onChange={(e) => setMarketValue([Number(e.target.value), marketValue[1] || 30])}
                    placeholder="Min"
                  />
                  <span className={styles.range_separator}>to</span>
                  <input
                    type="number"
                    value={marketValue[1]}
                    onChange={(e) => setMarketValue([marketValue[0] || 24, Number(e.target.value)])}
                    placeholder= "Max"
                  />
                </div>
            </label>
            </>
          )}
        </div>
        <div className={styles.filter_section}>
          <h2 className={styles.filter_title} onClick={()=>toggleSection("selection")}>Selection Filters{isSelectionVisible ? " ▲" : " ▼"}</h2>
          {isSelectionVisible &&(
          <>
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

            </>
          )}
              <div className={styles.filter_search}>
                <button className={styles.filter_search_button} onClick={store_filters}>
                  VROOM VROOM
                </button>
            </div>
        </div>
      </aside>
      <section>
        <div>
          {/* <FetchCars /> */}
        </div>
      </section>
    </main>
  );
}
