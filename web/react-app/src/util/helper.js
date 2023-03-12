export const formatDateString = (strDate) => {
  var dateTimeParts = strDate.split("T");
  var date = dateTimeParts[0];
  var time = dateTimeParts[1];
  var dateParts = date.split("-");
  var result = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}. ${time}`;
  return result;
};
