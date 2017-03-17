PCM.Formatter = (function(){

  function formatAddress(venue, address, city, state) {
    formattedAddress = '';
    if (venue != '') { formattedAddress += venue + "<br>"; }
    if (address != '') { formattedAddress += address + "<br>"; }
    formattedAddress += city + ", " + state;
    return formattedAddress
  }

  function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var day = date.getUTCDate();
    var monthIndex = date.getUTCMonth();
    var year = date.getUTCFullYear();
    return monthNames[monthIndex] + ' ' + day + ', ' + year;
  }

  function formatTime(date) {
    var hour = date.getUTCHours() % 12;
    if (hour == 0) { hour = 12; }
    var minutes = date.getUTCMinutes();
    if (minutes < 10) { minutes = '0' + minutes; }
    var suffix = date.getUTCHours() > 11 ? 'PM' : 'AM';
    return hour + ':' + minutes + ' ' + suffix;
  }

  return{
    formatAddress: formatAddress,
    formatDate: formatDate,
    formatTime: formatTime
  }

})();
