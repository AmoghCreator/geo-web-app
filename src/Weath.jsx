import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Sunrise from "./vids/Sunrise - 134909.mp4";

var val = 1;
function Weath(props) {
  const [lat, setLat] = useState();
  const [trig, setTrig] = useState(0);
  const [lon, setLon] = useState();
  const [des, setDes] = useState();
  const [weathId, setWeathId] = useState();
  const [temp, setTemp] = useState();
  const [city, setCity] = useState();
  const [custCity, setCustCity] = useState(0);

  var burl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2484ed69af0a06f791fa57f3576401e6`;

  useEffect(() => {
    if (val == 1) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLat(pos.coords.latitude);
        setLon(pos.coords.longitude);
      });

      axios.get(burl).then((response) => {
        setDes(response.data.weather[0].main);
        setWeathId(response.data.weather[0].id);
        setTemp(response.data.main.temp - 273);
        setCity(response.data.name);
      });
    }
    val++;
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude);
      setLon(pos.coords.longitude);
    });

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=` +
          custCity +
          `&appid=2484ed69af0a06f791fa57f3576401e6`
      )
      .then((response) => {
        setDes(response.data.weather[0].main);
        setWeathId(response.data.weather[0].id);
        setTemp(response.data.main.temp - 273);
        setCity(response.data.name);
      });
    console.log(city);
  }, [custCity]);

  function vid() {
    if (weathId >= 700 && weathId < 800)
      return (
        <video className="videoTag" autoPlay loop muted>
          <source src={Sunrise} type="video/mp4" />
        </video>
      );
  }

  function submitHandler() {
    setTrig(trig + 1);
  }

  return (
    <div>
      <h1 className="App" style={{ backgroud: "./vids/Sunrise - 134909.mp4" }}>
        {/* <form onSubmit={}></form> */}
        {lat} and {lon} and {des} and
        {(Math.round(temp * 100) / 100).toFixed(2)} and {weathId}
      </h1>
      {vid()}
      <form>
        <input
          type="text"
          value={custCity}
          onChange={(e) => setCustCity(e.target.value)}
        />
        <input type="button" value="x" onClick={submitHandler} />
      </form>
    </div>
  );
}

export default Weath;
