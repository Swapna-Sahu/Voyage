
import { useState, useEffect, SetStateAction } from 'react';
import TravelDetails from './Components/TravelDetails';
import VoyageProgressBar from './Components/VoyageProgressBar';

type portOfDepart = string;
type portOfArrival = string;
type departureTime = Date;
type arrivalTime = Date;

function App() {

  let today = new Date();
  let tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  const [portOfDepart, setPortOfDepart] = useState<portOfDepart>("Karlshamn");
  const [portOfArrival, setPortOfArrival] = useState<portOfArrival>("Klaipeda");
  const [departureTime, setDepartureTime] = useState<departureTime>(today)
  const [arrivalTime, setArrivalTime] = useState<arrivalTime>(tomorrow);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(0);


  function timeDiffernce(future: number, now: number) {
    let diffInMilliSeconds = Math.abs(future - now) / 1000;

    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    let difference = '';
    if (days > 0) {
      difference += (days === 1) ? `${days} day, ` : `${days} days, `;
    }
    difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;
    difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`;

    return { days: days, hours: hours, minutes: minutes };
  }

  useEffect(() => {

    let totalTravelTime = timeDiffernce(arrivalTime.getTime(), departureTime.getTime())

    if (today.getTime() < departureTime.getTime()) {
      setMessage(`Ship is at the ${portOfDepart}`);
      return setStatus(0);
    }
    else if (today.getTime() > arrivalTime.getTime()) {
      setMessage(`Ship has already arrived the  ${portOfArrival}`);
      return setStatus(100);
    }
    else if (departureTime.getTime() < arrivalTime.getTime()) {
      let diffTilNow;
      diffTilNow = timeDiffernce(today.getTime(), departureTime.getTime());
      let timeCompletedtilNowInMinutes = diffTilNow.days * 24 * 60 + diffTilNow.hours * 60 + diffTilNow.minutes;
      let totalHoursTravel = (totalTravelTime.days * 24 * 60 + totalTravelTime.hours * 60 + totalTravelTime.minutes);

      if (diffTilNow.days >= 1 || diffTilNow.hours >= 1 || diffTilNow.minutes > 30) {
        setStatus(() => Math.ceil((timeCompletedtilNowInMinutes / totalHoursTravel) * 100));
        setMessage(`Ship is on its way to ${portOfArrival}`);
      }
      if (diffTilNow.days < 1 && diffTilNow.hours < 1 && diffTilNow.minutes > 1 && diffTilNow.minutes <= 30) {
        setMessage(`Ship just started from ${portOfDepart}.(~<30min.)`);
        setStatus(() => Math.ceil((timeCompletedtilNowInMinutes / totalHoursTravel) * 100));
      }

    }
    else {
      setMessage(`Please enter place and time to see the status.`);
      setStatus(0);
    }
  }, [departureTime, arrivalTime])

  const handlePortOfDepart = (e: { target: { value: SetStateAction<string>; }; }) => setPortOfDepart(e.target.value)
  const handlePortOfArrival = (e: { target: { value: SetStateAction<string>; }; }) => setPortOfArrival(e.target.value)
  const handleDepartureTime = (e: React.ChangeEvent<HTMLInputElement>) => setDepartureTime(new Date(e.target.value))
  const handleArrivalTime = (e: React.ChangeEvent<HTMLInputElement>) => setArrivalTime(new Date(e.target.value))

  return (
    <div >
      <TravelDetails
        portOfDepart={portOfDepart}
        portOfArrival={portOfArrival}
        departureTime={departureTime}
        arrivalTime={arrivalTime}
        handlePortOfDepart={handlePortOfDepart}
        handlePortOfArrival={handlePortOfArrival}
        handleDepartureTime={handleDepartureTime}
        handleArrivalTime={handleArrivalTime}
      />

      <VoyageProgressBar
        status={status}
        message={message}
        portOfDepart={portOfDepart}
        portOfArrival={portOfArrival} 
      />
  
    </div>
  );
}

export default App;
