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
    document.getElementById("date").innerHTML = `Date: ${
      allData[allData.length - 1].date
    }`;
    document.getElementById(
      "temp"
    ).innerHTML = `temperatuer: ${allData[0].temp}`;

    document.getElementById("date").innerHTML = `i feel: ${
      allData[allData.length - 1].content
    }`;
  } catch (error) {
    console.log("error", error);
  }
};
