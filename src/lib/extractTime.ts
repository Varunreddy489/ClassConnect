export function extractTime(dateString: string) {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  // const day = padZero(date.getDate());
  // const month = padZero(date.getMonth() + 1);
  // const year = date.getFullYear();

  return `${hours}:${minutes} `;
}

// - ${day}/${month}/${year}

export function extractDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day.toString().padStart(2, "0")}-${month
    .toString()
    .padStart(2, "0")}-${year}`;
}

function padZero(number: number) {
  return number.toString().padStart(2, "0");
}
