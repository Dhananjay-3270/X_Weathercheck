import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const APIkey = "7073dc25a9e9458ba18163225241805";
  const [searchvalue, setSearchvalue] = useState("");
  const [data, setdata] = useState(0);
  const [isclicked, setisclicked] = useState(false);
  const handlechange = (event) => {
    let search = event.target.value;
    setSearchvalue(search);
    console.log(search);
  };
  const fetchdata = async (key, name) => {
    const url = "https://api.weatherapi.com/v1/current.json";
    try {
      const response = await axios.get(url, {
        params: {
          Key: key,

          q: name,
        },
      });
console.log(response.data);
      setdata(response.data);
      
    } catch (e) {
      alert("Failed to fetch weather data");
      console.log(e);
      setdata(0);
      setisclicked(false);
    }
  };

  return (
    <>
      <input type="text" onChange={handlechange} placeholder="Enter city name" />
      <button
        onClick={() => {
          fetchdata(APIkey, searchvalue), setisclicked(true);
        }}
      >
        Search
      </button>
      <div className="weather-cards">
        {isclicked ? (
          data ? (<>
            <div className="weather-card"><h4>Temperature</h4> {data.current.temp_c}*C</div >
              <div  className="weather-card"><h4>Humidity</h4>{data.current.humidity}%</div>
              <div  className="weather-card"><h4>Condition</h4>{data.current.condition.text}</div>
              <div  className="weather-card"> <h4>Wind Speed</h4>{data.current.wind_kph}kph</div>
              </>
          ) : (
           <p>Loading data...</p>
          )
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
