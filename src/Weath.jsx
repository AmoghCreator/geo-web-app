import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import mist from "./vids/mist.mp4";
import clouds from "./vids/clouds.mp4";
import rain from "./vids/rain.mp4";
import snow from "./vids/snow.mp4";
import storm from "./vids/thunderstorm.mp4";
import clearSky from "./vids/clear.mp4";

var val = 0;
function Weath(props) {
  const [lat, setLat] = useState();
  const [trig, setTrig] = useState(0);
  const [lon, setLon] = useState();
  const [des, setDes] = useState();
  const [weathId, setWeathId] = useState();
  const [temp, setTemp] = useState();
  const [city, setCity] = useState();
  const [custCity, setCustCity] = useState(city);
  const [vsrc, setVsrc] = useState(mist);

  var burl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2484ed69af0a06f791fa57f3576401e6`;

  useEffect(() => {
    if (val == 4) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLat(pos.coords.latitude);
        setLon(pos.coords.longitude);
      });

      axios.get(burl).then((response) => {
        setDes(response.data.weather[0].main);
        setWeathId(response.data.weather[0].id);
        setTemp(response.data.main.temp - 273);
        setCity(response.data.name);
        if (
          response.data.weather[0].id >= 700 &&
          response.data.weather[0].id < 800
        )
          setVsrc(mist);
        if (response.data.weather[0].id >= 804) setVsrc(clouds);
      });

      //   if (weathId > 800 && weathId < 900) setVsrc(clouds);
      //   if (weathId >= 300 && weathId < 532)
      //     return (
      //       <video className="videoTag" autoPlay loop muted>
      //         <source src={rain} type="video/mp4" />
      //       </video>
      //     );
      //   if (weathId >= 600 && weathId < 623)
      //     return (
      //       <video className="videoTag" autoPlay loop muted>
      //         <source src={snow} type="video/mp4" />
      //       </video>
      //     );
      //   if (weathId >= 200 && weathId < 233)
      //     return (
      //       <video className="videoTag" autoPlay loop muted>
      //         <source src={storm} type="video/mp4" />
      //       </video>
      //     );
      //   if (weathId == 800)
      //     return (
      //       <video className="videoTag" autoPlay loop muted>
      //         <source src={clearSky} type="video/mp4" />
      //       </video>
      //     );
    }

    console.log(val);
  });
  val++;

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
        if (
          response.data.weather[0].id >= 700 &&
          response.data.weather[0].id < 800
        )
          setVsrc(mist);
        if (
          response.data.weather[0].id >= 804 &&
          response.data.weather[0].id < 900
        )
          setVsrc(clouds);
        if (
          response.data.weather[0].id >= 300 &&
          response.data.weather[0].id < 532
        )
          setVsrc(rain);
        if (
          response.data.weather[0].id >= 600 &&
          response.data.weather[0].id < 623
        )
          setVsrc(snow);
        if (
          response.data.weather[0].id >= 200 &&
          response.data.weather[0].id < 233
        )
          setVsrc(storm);
        if (response.data.weather[0].id === 800) setVsrc(clearSky);
      });
    console.log(city);
  }, [custCity]);

  function submitHandler() {
    setTrig(trig + 1);
  }

  // function vido() {
  //   if (weathId >= 700 && weathId < 800)
  //     return (
  //       <video className="videoTag" autoPlay loop muted>
  //         <source src={mist} type="video/mp4" />
  //       </video>
  //     );

  //   if (weathId > 800 && weathId < 900) setVsrc(clouds);
  //   if (weathId >= 300 && weathId < 532)
  //     return (
  //       <video className="videoTag" autoPlay loop muted>
  //         <source src={rain} type="video/mp4" />
  //       </video>
  //     );
  //   if (weathId >= 600 && weathId < 623)
  //     return (
  //       <video className="videoTag" autoPlay loop muted>
  //         <source src={snow} type="video/mp4" />
  //       </video>
  //     );
  //   if (weathId >= 200 && weathId < 233)
  //     return (
  //       <video className="videoTag" autoPlay loop muted>
  //         <source src={storm} type="video/mp4" />
  //       </video>
  //     );
  //   if (weathId == 800)
  //     return (
  //       <video className="videoTag" autoPlay loop muted>
  //         <source src={clearSky} type="video/mp4" />
  //       </video>
  //     );
  // }

  function vdo(vsrc) {
    return (
      <video key={vsrc} className="videoTag" autoPlay loop muted>
        <source src={vsrc} type="video/mp4" />
      </video>
    );
  }
  return (
    <div>
      <div className="App">
        <h1 style={{ backgroud: "./vids/Sunrise - 134909.mp4" }}>
          {/* <form onSubmit={}></form> */}
          {lat} and {lon} and {des} and
          {(Math.round(temp * 100) / 100).toFixed(2)} and {weathId}
        </h1>
        <br />
        <form>
          <input
            type="text"
            value={custCity}
            onChange={(e) => {
              setCustCity(e.target.value);
              // vido();
            }}
          />
          <input type="button" value="GO" onClick={submitHandler} />
        </form>
      </div>
      {vdo(vsrc)}
      {console.log(vsrc)}
    </div>
  );
}

export default Weath;
