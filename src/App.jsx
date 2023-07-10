import { useState } from 'react';
import WeatherForm from './components/WeatherForm';
import WeatherCard from './components/WeatherCard';





const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [showWeatherForm, setShowWeatherForm] = useState(true);

  const handleWeatherData = (data) => {
    setWeatherData(data);
    setShowWeatherForm(false);
  };

  const handleBack = () => {
    setShowWeatherForm(true);
  };

  return (
    <div className='w-full h-screen '> 
      {showWeatherForm ? (
        <WeatherForm onWeatherData={handleWeatherData} />
      ) : (
        <WeatherCard weatherData={weatherData} onBack={handleBack} />
      )}
    </div>
  );
};

export default App;


