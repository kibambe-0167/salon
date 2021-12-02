

const weekDays = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sum" ]

export const Months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

export const Years = [ "2021", "2022", "2023" ]


// date.getDay() + " " + date.getMonth() + "/" + date.getDate() + "/" + date.getYear() + " | " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

const getDate = () => {
  var obj = new Date();
  var date = [];
  // date.push(  ); // push day of the week
  date.push( Months[obj.getMonth()]  ); // push month 
  date.push( obj.getFullYear() ); // push full year
  date.push( weekDays[ obj.getDay() ] + " " + obj.getDate() ); // push day of the month and time
  date.push( obj.getHours() + ":" + obj.getMinutes() + ":" + obj.getSeconds() ); // push day of the month and time


  // console.log( date )
  return date;
}








export default getDate;