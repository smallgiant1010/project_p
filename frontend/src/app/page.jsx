import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
  const keyword_filters = [
    "Make", 
    "Model",  
    "Year",
  ]

  const selection_filters = {
    "Cylinders" : [2, 3, 4, 5, 6, 8, 10, 12, 16],
    "Fuel Type" : ["Gas", "Diesel", "Electricity"],
    "Drive" : ["Front Wheel Drive", "Rear Wheel Drive", "All Wheel Drive", "Four Wheel Drive"],
    "Transmission": ["Manual", "Automatic"], 
  }

  const range_filters = [
    "City Miles Per Gallon", 
    "Highway Miles Per Gallon",
  ]


  {styles.sidebar_filters_label}
  {styles.sidebar_filters_option}

  return (
    <main className={styles.main}>
      <div className={styles.search}>
        <input className={styles.search_bar}>
        </input>
        {/* <Image /> */}
      </div>
      <div className={styles.filters}>
          <span className={styles.filters_header}>
            Filter
          </span>
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
