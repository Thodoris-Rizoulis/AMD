import { useRef, useState } from "react";
import Chart from "./Chart";
import Table from "./Table";

export default function App() {
  //City refernce
  const city = useRef(null);
  //Number refernce
  const number = useRef(null);
  //Chart and Table data
  const [temps, setTemps] = useState([]);
  //State of given invalid number
  const [numberError, setNumberError] = useState(false);
  //State of given invalid city
  const [cityError, setCityError] = useState(false);

  var interval;

  function handleSubmit(event) {
    //Prevent Reload
    event.preventDefault();
    validateNumber();
  }

  function validateNumber() {
    //API call to backend to check if number is valid
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/validate?number=${number.current.value}`)
      .then((response) => response.json())
      .then((status) => {
        if (status === 200) setMyInterval();
        //Invalid number, setting state to true
        else setNumberError(true);
      });
  }

  //Fetch temperature every minute
  function setMyInterval() {
    //Fetch 1st temperature
    fetchTemp();
    var timesRun = 1;
    //Set Interval every minute for 9 more times
    interval = setInterval(() => {
      timesRun++;
      if (timesRun <= 10) {
        fetchTemp();
        //Clear Interval after 10 times
      } else clearInterval(interval);
    }, 1000 * 60);
  }

  function fetchTemp() {
    //Fetch temperature
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api?city=${city.current.value}&number=${number.current.value}`)
      .then((response) => response.json())
      .then((data) => {
        if (data !== 404) {
          const obj = { temp: data.temp, time: new Date().toJSON(), smsPaylod: data.smsPaylod };
          //Adding temperature, time and sms payload to our data
          setTemps((oldTemps) => [...oldTemps, obj]);
        } else {
          //Clear Interval in case of a invalid city
          clearInterval(interval);
          //Invalid city, setting state to true
          setCityError(true);
        }
      });
  }

  return (
    <div className="h-screen w-full bg-[#f3f3f3]">
      <div className="flex-col mx-auto max-w-[338px] pt-[140px]">
        <img src="./images/Waymore-Routee.png" alt="Waymore-Routee" />
        <label className="block font-bold text-[18px] mt-8 mb-3 text-[#4a4b4d] font-poppinsFont tracking-wide">Please fill in the fields below</label>
        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="my-2">
            <label className="block text-xs font-poppinsFont text-[#1c1d1f] font-medium mb-2">City</label>
            <input
              //disabled input on 1st message
              disabled={temps.length > 0}
              //hold city referense
              ref={city}
              // Set city error to false on city input focus in case there is one
              onFocus={() => setCityError(false)}
              // Make input border red in case of error
              className={`px-[10px] rounded w-full h-10 border-[1px] ${cityError ? " border-red-600" : "border-[#d1d1d2]"}`}
              type="text"
            />
            {/* Pop up city error and make text red */}
            {cityError ? <span className="text-red-600 text-xs font-poppinsFont">Please add a valid city name</span> : ""}
          </div>
          <div className="mb-8 mt-4">
            <label className="block text-xs font-poppinsFont text-[#1c1d1f] font-medium">Mobile Number</label>
            <input
              //disabled input on 1st message
              disabled={temps.length > 0}
              //hold number referense
              ref={number}
              // Set number error to false on number input focus in case there is one
              onFocus={() => setNumberError(false)}
              // Make input border red in case of error
              className={`px-[10px] rounded w-full h-10 my-1 mt-2 border-[1px] ${numberError ? " border-red-600" : "border-[#d1d1d2]"}`}
              type="text"
            />
            <div className="text-xs text-slate-700 font-poppinsFont">
              {/* Pop up city error and make text red */}
              {numberError ? <span className="text-red-600">Please add a valid mobile number</span> : <span>Please add a country code before mobile number</span>}
            </div>
          </div>
          <div>
            <button className=" flex items-center justify-center bg-[#43425d] rounded w-full h-12" type="submit">
              <span className="font-poppinsFont text-sm font-light text-white">Submit</span>
            </button>
          </div>
        </form>
      </div>

      {/* Continionally rendering Chart and Table once data fetched */}
      {temps.length > 0 && (
        <>
          <Chart
            temps={{
              //set x axis labels to hour:minute
              labels: temps.map((data) => data.time.slice(11, 16)),
              datasets: [
                {
                  label: city.current.value + " Temperature",
                  //set y axis labels dinamically to rounded temperatures we fetch
                  data: temps.map((data) => Math.round(data.temp)),
                  backgroundColor: ["#43425d"],
                  borderColor: ["#43425d"],
                  borderWidth: 4,
                },
              ],
            }}
          />
          <Table city={city.current.value} temps={temps} />
        </>
      )}
    </div>
  );
}
