import { useState } from 'react';
import axios from 'axios';

const WeatherForm = ({ onWeatherData }) => {
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [showCard, setShowCard] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f796fa1e416ee3797e71a184cbda4d04`
      );
      onWeatherData(response.data);
      setLocation('');
      setShowCard(true);
    } catch (error) {
      setError('Error fetching weather data. Please try again.');
      console.error(error);
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f796fa1e416ee3797e71a184cbda4d04`
            );
            onWeatherData(response.data);
            setShowCard(true);
          } catch (error) {
            setError('Error fetching weather data. Please try again.');
            console.error(error);
          }
        },
        (error) => {
          setError('Error getting user location. Please try again.');
          console.error(error);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  const handleBack = () => {
    setShowCard(false);
  };

  if (showCard) {
    return null;
  }

  return (
    <div className="w-full h-screen bg-[#42ADFD] p-4 rounded mb-4 flex flex-col mx-auto justify-center items-center">
      <div className="rounded-md bg-[#ffffff] w-[300px] h-[200px] items-center py-4">
        <div className="border-b-2">
          <h1 className="font-bold text-xl mb-1 ml-3 text-[#42adfd]">Weather App</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="items-center mb-2 flex flex-col mt-[20px]">
          
           
            <input
              type="text"
              placeholder="Enter City Name"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 flex-grow w-[280px] text-center"
            />

<div className="flex flex-row mt-[10px] items-center">
              <div className="h-[1px] mt-[2px] w-[142px] bg-slate-300" />
              <p>or</p>
              <div className="h-[1px] mt-[2px] w-[142px] bg-slate-300" />
            </div>

            <button
              type="button"
              onClick={handleGetLocation}
              className="mt-2 w-[280px] bg-[#42ADFD] text-white px-4 py-2 rounded"
            >
              Get Device Location
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default WeatherForm;
