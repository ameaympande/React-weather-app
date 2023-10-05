import axios from "axios";

const weatherCall = async (city) => {
  const apiKey = "WJTBUGMRSMU65YJ8CYVL5NM6J";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      return response.data;
    } else {
      showAlert(createError(response.status));
    }
  } catch (error) {
    console.error("An error occurred:", error);
    showAlert("An unexpected error occurred.");
    throw error;
  }
};

const createError = (statusCode) => {
  switch (statusCode) {
    case 404:
      return "City not found. Please check the city name.";
    case 400:
      return "Bad request. Please review your request parameters.";
    case 401:
      return "Unauthorized. Check your API key.";
    case 403:
      return "Access denied. Ensure you have the necessary permissions.";
    case 500:
      return "Internal server error. Please try again later.";
    default:
      return "An unexpected error occurred.";
  }
};

const showAlert = (message) => {
  throw Error(message);
};

export default weatherCall;
