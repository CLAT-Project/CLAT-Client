const formatTime = (isoString:string) =>{
  const date = new Date(isoString);
  date.setHours(date.getHours() + 9); 
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const isAM = hours < 12;
  const formattedHours = isAM ? hours : hours - 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const period = isAM ? '오전' : '오후';

  return `${period} ${formattedHours}:${formattedMinutes}`;
}

export default formatTime