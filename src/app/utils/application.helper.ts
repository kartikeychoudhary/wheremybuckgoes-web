import { timeInterval } from "rxjs";

export const formatDate = (millis) => {
  if (millis === null || millis === undefined || millis === 0) {
    return 'No Data';
  }
  const date = new Date(millis);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const formatExecutionTime = (millis) => {
  // Ensure millis is a positive number (handle negative values if needed)
  const time = Math.abs(millis);

  const hours = Math.floor(time / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const getMillisForLast = (duration:string)=>{
  const time = new Date().getTime();
  switch(duration){
    case '7_DAYS': return (time - 1000 * 60 * 60 * 24 * 7);
    case '1_MONTH': return (time - 1000 * 60 * 60 * 24 * 30);
    case '3_MONTH': return (time - 1000 * 60 * 60 * 24 * 30 * 3);
    case '1_YEAR': return (time - 1000 * 60 * 60 * 24 * 365);
    default: return time;
  }
}

