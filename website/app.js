// Personal API Key for OpenWeatherMap API
//  Glopel var
let date = new Date();
let newDate =
  date.getMonth() + 1 + "." + date.getDate() + "." + date.getFullYear();
let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apikey = "&appid=4d4ae08339ca471314324f6c8c18374c";
const localHostUrl = "http://localhost:8000";
// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);

/* Function called by event listener */
function performAction(e) {
  const newZip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  fetch(baseURL + newZip + apikey)
    .then((data) => data.json())
    .then((data) => {
      postData(localHostUrl + "/add", {
        date: date,
        temp: data.weather[0].main,
        content: feelings,
      });
    });
}

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newData = await res.json();
    console.log({ newData });
  } catch (error) {
    console.log("error", error);
  }

  /* Function to GET Project Data */

  const updateUL = async () => {
    const request = await fetch("/all");
    try {
      const allData = await request.json();
      document.getElementById("date").innerHTML = `Date: ${allData[0].date}`;
      document.getElementById(
        "temp"
      ).innerHTML = `temperatuer: ${allData[0].temp}`;

      document.getElementById(
        "date"
      ).innerHTML = `i feel: ${allData[0].content}`;
    } catch (error) {
      console.log("error", error);
    }
  };
};
