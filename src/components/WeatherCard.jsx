import { FiArrowLeft } from 'react-icons/fi';
import { MdOutlineWaterDrop } from 'react-icons/md';
import { CiTempHigh, CiLocationOn } from 'react-icons/ci';
import countryData from 'country-data';
import clear from '../assets/clear.png';
import cloud from '../assets/cloud.png';
import mist from '../assets/mist.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';
import haze from '../assets/haze.png';
import notFound from '../assets/404.png';

const WeatherCard = ({ weatherData, onBack }) => {
  const handleBack = () => {
    onBack();
  };

  if (!weatherData) {
    return null;
  }

  const { main, weather, name, sys } = weatherData;

  const temperatureCelsius = Math.round(main.temp - 273.15); // Convert temperature from Kelvin to Celsius

  const countryCode = sys.country;
  const country = countryData.countries[countryCode]?.name || sys.country;

  let weatherIcon;
  switch (weather[0].main.toLowerCase()) {
    case 'clear':
      weatherIcon = clear;
      break;
    case 'clouds':
      weatherIcon = cloud;
      break;
    case 'mist':
      weatherIcon = mist;
      break;
    case 'rain':
      weatherIcon = rain;
      break;
    case 'snow':
      weatherIcon = snow;
      break;
    case 'haze':
      weatherIcon = haze;
      break;
    default:
      weatherIcon = notFound;
      break;
  }

  return (
    <div className="w-full h-screen bg-[#42ADFD] p-4 rounded mb-4 flex flex-col mx-auto justify-center items-center">
      <div className="rounded-md bg-[#ffffff] w-[350px] h-[414px] items-center">
        <div className="border-b-2 flex flex-row p-1">
          <button onClick={handleBack} className="bg-transparent text-[#42adfd] font-extrabold">
            <FiArrowLeft size={18} />
          </button>
          <h1 className="font-bold text-l mb-1 ml-2 text-[#42adfd]">Weather App</h1>
        </div>

        <div className="flex flex-col items-center pb-4 border-b-2">
          <div className="mr-2 mt-2">
            <img
              src={weatherIcon}
              alt={weather[0].description}
              className="w-[110px] h-[110px] ml-2"
            />
            <div className="mt-2 mb-2 flex justify-center ">
              <p className="font-bold text-[60px]">{temperatureCelsius}°C</p>
            </div>
          </div>

          <div className="flex flex-col justify-center p-2">
            <p className="text-gray-600 text-center">{weather[0].description}</p>
          </div>

          <div className="flex flex-row p-1 ">
            <p>
              <CiLocationOn size={20} />
            </p>
            <h2 className="text-xl ml-1">
              {name}, {country}
            </h2>
          </div>
        </div>

        <div className="flex relative h-fit flex-row justify-evenly items-center">
          <div className="flex flex-row items-center">
            <CiTempHigh size={40} className="text-[#42adfd]" />
            <div className="flex flex-col">
              <p>{Math.round(main.feels_like - 273.15)}°C</p>
              <p className="text-xs">Feels Like</p>
            </div>
          </div>
          <div className="bg-slate-400 h-[60px] w-[1px]" />
          <div className="flex flex-row">
            <MdOutlineWaterDrop size={40} className="text-[#42adfd]" />
            <div className="flex flex-col mr-4">
              <p>{main.humidity}%</p>
              <p className="text-xs">Humidity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
