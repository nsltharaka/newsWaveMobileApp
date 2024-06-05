import axios from "axios"
import getTimeDifferenceString from "./time"
import { Alert, BackHandler } from "react-native"
import NetInfo from '@react-native-community/netinfo';

// axios.defaults.baseURL = process.env.API_URL
axios.defaults.baseURL = "http://DESKTOP-HS4FH2H:3030"

axios.interceptors.request.use(function (config) {
    // Do something before request is sent

    // check the network connection
    NetInfo.fetch().then(state => {
        console.log('Is connected?', state.isConnected);
        if (!state.isConnected) {
            Alert.alert('Connection lost!', 'Please check your internet connection and try again', [
                {text: 'OK', onPress: () => BackHandler.exitApp()},
              ]);
        }
    });


    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

const addFollowTopicFeed = async ({ title, sources }) => {

    try {

        const response = await axios.post('/follow-topic-feed/create', {
            topic: title,
            feeds: sources
        }, { timeout: 5000 })

        return response.status

    } catch (error) {
        throw error
    }

}

const getAllTopicsForUser = async () => {

    try {
        const response = await axios.get('/topics', { timeout: 5000 })
        return response.data

    } catch (error) {
        console.log(JSON.stringify(error.response.data, null, 2));
    }


}

const getTopic = async (topicId) => {

    try {
        const resp = await axios.get(`topics/${topicId}`, { timeout: 5000 })
        return resp.data

    } catch (error) {
        throw error
    }

}

const updateTopic = async (topicId, { title, sources }) => {

    try {

        const resp = await axios.put(`/topics/${topicId}`, {
            topic: title,
            feeds: sources,

        }, { timeout: 5000 })

        return resp.data

    } catch (error) {
        console.log("updateTopic failed with error ", error.response.data);
        throw error
    }

}

const unfollowTopic = async (topicId) => {

    try {
        const resp = await axios.delete(`/topics/${topicId}`, { timeout: 5000 })
        return resp.data

    } catch (error) {
        throw error
    }

}

const refreshHome = async () => {

    try {
        const resp = await axios.get(`feeds/refresh`, { timeout: 5000 })
        return resp.status

    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return error.response.data
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            return error.request
        } else {
            // Something happened in setting up the request that triggered an Error
            return error.message
        }
    }


}

const getPosts = async (url) => {

    try {
        const resp = await axios.get(url, {
            timeout: 5000,
        })
        return resp.data

    } catch (error) {
        console.log(error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return error.response.data
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            return error.request
        } else {
            // Something happened in setting up the request that triggered an Error
            return error.message
        }
    }

}

const handleAxiosError = (error) => {

    if (!error) return

    if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        Alert.alert("Error", "Could not connect to the server. Please try again later.")
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        Alert.alert("Error", "Request cannot be made. Please check your network connection.")
    }

}

export {
    handleAxiosError,
    addFollowTopicFeed,
    getAllTopicsForUser,
    getTopic,
    updateTopic,
    unfollowTopic,
    refreshHome,
    getPosts,
}