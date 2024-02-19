function subtractTimes(time1, time2) {
    
    function timeToSeconds(time) {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    }
  
   
    function formatTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
    
        // Pad the hours, minutes, and seconds with leading zeros to ensure two digits
        const paddedHours = hours.toString().padStart(2, '0');
        const paddedMinutes = minutes.toString().padStart(2, '0');
        const paddedSeconds = seconds.toString().padStart(2, '0');
    
        return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    }
  
    const seconds1 = timeToSeconds(time1);
    const seconds2 = timeToSeconds(time2);
  
    
    const differenceInSeconds = Math.abs(seconds1 - seconds2);
  
    
    return formatTime(differenceInSeconds);
  }

function convertToYearMonthDay(dateString){
    const date = new Date(dateString);

    // Extract the year, month, and day using the get methods.
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');

    // Combine the parts to get the desired format.
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}


function convertISO(isoDateString){

  // Create a new Date object from the ISO string
  const date = new Date(isoDateString);

  // Options for the toLocaleDateString method to define date format
  const dateOptions = {
      year: 'numeric',
      month: 'long', // 'short' for abbreviated month name, 'numeric' for number
      day: 'numeric',
      weekday: 'long' // 'short' for abbreviated weekday name
  };

  // Options for the toLocaleTimeString method to define time format
  const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short' // 'short' or 'long' for the name of the time zone
  };

  // Format the date and time separately
  const formattedDate = date.toLocaleDateString('en-US', dateOptions);
  const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

  // Combine the formatted date and time
  const cleanDateTime = `${formattedDate} at ${formattedTime}`;

  return cleanDateTime;
}

  


  
module.exports = {subtractTimes, convertToYearMonthDay, convertISO}