/*File: Service.js
   Objective: The objective of this page is to configure and create instances of the Axios library for making API calls.

   The baseurl function determines the base URL for the API calls based on the current hostname. 
   It checks if the hostname is "ipss.compliance.techgenzi.com" and returns the corresponding base URL.
   If the hostname does not match, it still returns the same base URL.
   It sets the base URL using the baseurl function and includes the "Accept" header with the value "application/json".
   The liveApi function creates an instance of Axios with default settings for API calls that require authorization. 
   It also sets the base URL using the baseurl function and includes the "Accept" header with the value "application/json". 
   Additionally, it includes the "Authorization" header with the value "Bearer" followed by the access token retrieved from the localStorage.
   Overall, the code aims to provide a flexible and reusable way to make API calls using Axios, allowing for different configurations depending on the authorization requirements.
*/
import axios from "axios";
// Determine the base URL based on the current hostname
const baseurl = () => {

    return "";
  
};
// Create an instance of axios with default settings for API calls with authorization
export const liveApi = () =>
  axios.create({
    baseURL: baseurl(),
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("ipss_access_token")}`,
    },
  });
