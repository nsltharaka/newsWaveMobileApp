import axios from "axios"
import getTimeDifferenceString from "./time"

// axios.defaults.baseURL = process.env.API_URL
axios.defaults.baseURL = "http://DESKTOP-HS4FH2H:3030"

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
        const topics = response.data

        const topicsWithFormattedDate = topics.map(topic => {
            return {
                ...topic,
                updated_at: getTimeDifferenceString(new Date(topic.updated_at))
            }
        });

        return topicsWithFormattedDate

    } catch (error) {
        console.log(JSON.stringify(error.response.data, null, 2));
    }


}

const getTopic = async (topicId) => {

    try {
        const resp = await axios.get(`topics/${topicId}`, { timeout: 5000 })
        return resp.data

    } catch (error) {
        
    }

}

export {
    addFollowTopicFeed,
    getAllTopicsForUser,
    getTopic,
}