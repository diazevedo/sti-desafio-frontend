import React, { useState, useEffect } from "react";
import Subtitle from "../Subtitle";
import TableCities from "../TableCities";
import axios from "axios";

import "./styles.css";

const { idCities } = require("../../helpers/idCities");

const SectionCities = ({ classModifier }) => {
  const [citiesData, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(true);

  const fetchMultipleCities = async () => {
    const ApiKey = `d6cfde10e216a6f677b7324f015fa9c7`;
    const lang = `pt`;
    const idCollections = idCities.map(({ id }) => id);
    const urlGroupOfCities = `https://api.openweathermap.org/data/2.5/group?id=${idCollections.join()}&appid=${ApiKey}&units=metric&lang=${lang}}`;

    await axios.get(urlGroupOfCities).then(res => {
      const citiesForecast = res.data.list.map(({ id, name, main }) => ({
        id,
        name,
        min: `${main.temp_min.toFixed(0)}°`,
        max: `${main.temp_max.toFixed(0)}°`
      }));

      setCities(citiesForecast);
    });
    setLoadingCities(false);
  };

  useEffect(() => {
    fetchMultipleCities();
  }, []);

  return (
    <section className={`section-cities ${classModifier}`}>
      <Subtitle />
      <div className="wrapper-tables">
        <TableCities
          cities={citiesData.slice(0, 5)}
          classMod={loadingCities ? "-loading" : ""}
        />
        <TableCities
          cities={citiesData.slice(5, 10)}
          classMod={loadingCities ? "-loading" : ""}
        />
      </div>
    </section>
  );
};

export default SectionCities;
