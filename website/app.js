// Personal API Key for OpenWeatherMap API
//  Glopel var
let date = new Date();
let newDate =
  date.getMonth() + 1 + "." + date.getDate() + "." + date.getFullYear();
let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apikey = "&appid=4d4ae08339ca471314324f6c8c18374c&units=metric";
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
        temp: data.main.temp,
        content: feelings,
      });
    })
    .then(() => {
      updateUL();
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
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */

const updateUL = async () => {
  try {
    const request = await fetch(localHostUrl + "/all");
    const allData = await request.json();
    console.log(allData);
    document.getElementById(
      "date"
    ).innerHTML = `Date: ${new Intl.DateTimeFormat("en-US").format(
      new Date(allData.date)
    )}`;
    document.getElementById("temp").innerHTML = `temperatuer: ${allData.temp}`;

    document.getElementById("content").innerHTML = `i feel: ${allData.content}`;
  } catch (error) {
    console.log("error", error);
  }
};
