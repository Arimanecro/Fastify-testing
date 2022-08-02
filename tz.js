process.env.TZ = 'Europe/Chisinau';

export default () => {
  const intl = new Intl.DateTimeFormat('ru', {
    month: '2-digit',
    day: '2-digit',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  return intl.format(Date.now())  
} 
