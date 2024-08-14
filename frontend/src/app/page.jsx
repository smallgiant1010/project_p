'use client';
import styles from "./page.module.scss";
import { useState } from "react";
import FetchCars from "./fetch";




export default function Home() {
  const [data, setData] = useState({});
  const [make, setMake] = useState("");
  const [model, setModel] = useState("Camry");
  const [year, setYear] = useState("");
  const [CMPG, setCMPG] = useState([]);
  const [HMPG, setHMPG] = useState([]);
  const [cylinders, setCylinders] = useState("");
  const [fuel, setFuel] = useState("");
  const [drive, setDrive] = useState("");
  const [transmission, setTransmission] = useState("");
  const [marketValue, setMarketValue] = useState([]);
  const [isKeywordVisible, setIsKeywordVisible] = useState("");
  const [isRangeVisible, setIsRangeVisible] = useState("");
  const [isSelectionVisible, setIsSelectionVisible] = useState("");


  const store_filters = (e) => {
    e.preventDefault();
    let filters = {
      "make": make,
      "model": model,
      "year": year,
      "fuel_type": fuel,
      "drive": drive,
      "cylinders": cylinders,
      "transmission": transmission,
      "min_city_mpg": CMPG.length > 0 ? CMPG[0] : 0,
      "max_city_mpg": CMPG.length > 1 ? CMPG[1] : 50,
      "min_hwy_mpg": HMPG.length > 0 ? HMPG[0] : 0,
      "max_hwy_mpg": HMPG.length > 1 ? HMPG[1] : 60,
    };
    const clean = (obj) => {
      return Object.keys(filters).reduce((acc, key) => {
      const value = obj[key];
      if (value != '') {
        acc[key] = value;
      }
      return acc;
    }, {});
  }
    const cleanedData = clean(filters);
    console.log(cleanedData);
    setData(cleanedData);
  };

  const toggleSection = (section) => {
    switch (section) {
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
    "Cylinders": ["2", "3", "4", "5", "6", "8", "10", "12", "16"],
    "Fuel Type": ["Gas", "Diesel", "Electricity"],
    "Drive": ["Front Wheel Drive", "Rear Wheel Drive", "All Wheel Drive", "Four Wheel Drive"],
    "Transmission": ["Manual", "Automatic"],
  };


  const filterState = {
    "Cylinders": cylinders,
    "Fuel Type": fuel,
    "Drive": drive,
    "Transmission": transmission,
  };


  return (
    <main className={styles.main}>
      <div className={styles.sidebarWrapper}>
        <aside className={styles.sidebar}>
          <div className={styles.filters_header}>
            <h1>Filter</h1>
          </div>
          <form onSubmit={store_filters}>
            <div className={styles.filter_section}>
              <h2 className={styles.filter_title} onClick={() => toggleSection("keyword")}>Keyword Filters{isKeywordVisible ? " ▲" : " ▼"} </h2>
              <div className={styles.filter_dropdown}>
                {isKeywordVisible && (
                  <>
                    <label className={styles.filter_label}>
                      Make:
                      <input type="text" value={make} onChange={(e) => setter(e, "Make")} />
                    </label>
                    <label className={styles.filter_label}>
                      Model:
                      <input type="text" value={model} onChange={(e) => setter(e, "Model")} required />
                    </label>
                    <label className={styles.filter_label}>
                      Year:
                      <input type="number" value={year} onChange={(e) => setter(e, "Year")} />
                    </label>
                  </>
                )}
              </div>
            </div>
            <div className={styles.filter_section}>
              <h2 className={styles.filter_title} onClick={() => toggleSection("range")}>Range Filters{isRangeVisible ? " ▲" : " ▼"}</h2>
              <div className={styles.filter_dropdown}>
                {isRangeVisible && (
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
                          placeholder="Max"
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
                          placeholder="Max"
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
                          placeholder="Max"
                        />
                      </div>
                    </label>
                  </>
                )}
              </div>
            </div>
            <div className={styles.filter_section}>
              <h2 className={styles.filter_title} onClick={() => toggleSection("selection")}>Selection Filters{isSelectionVisible ? " ▲" : " ▼"}</h2>
              <div className={styles.filter_dropdown}>
                {isSelectionVisible && (
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
              </div>
              <div className={styles.filter_search}>
                <button type="submit" className={styles.filter_search_button}>
                  VROOM VROOM
                </button>
              </div>
            </div>
          </form>
        </aside>
      </div>
      <section className={styles.filter_data_section}>
        <div className={styles.filter_data_item}>
          <FetchCars filter={data} />
        </div>
      </section>
    </main>
  );
}
