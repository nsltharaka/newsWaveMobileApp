import axios from "axios"

export const API_URL = "http://192.168.1.5:3030"
axios.defaults.baseURL = API_URL

export const addFollowTopicFeed = async ({ title, sources }) => {

    console.log(title, sources);
    console.log("api call...");
    return new Promise((resolve) => setTimeout(() => resolve(), 2000));

}