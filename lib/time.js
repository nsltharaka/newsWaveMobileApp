export default function getTimeDifferenceString(pastTime) {
    // Get current time
    const now = new Date();

    // Calculate difference in milliseconds
    const diff = now.getTime() - pastTime.getTime();

    // Define durations for different time ranges
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;

    // Determine the time range based on the difference
    if (diff < 0) {
        return "Invalid time: Past time cannot be in the future";
    } else if (diff < second) {
        return "just now";
    } else if (diff < minute) {
        return `${Math.floor(diff / second)} seconds ago`;
    } else if (diff < hour) {
        return `${Math.floor(diff / minute)} minutes ago`;
    } else if (diff < day) {
        return `${Math.floor(diff / hour)} hours ago`;
    } else if (diff < week) {
        return `${Math.floor(diff / day)} days ago`;
    } else if (diff < month) {
        return `${Math.floor(diff / week)} weeks ago`;
    } else if (diff < year) {
        return `${Math.floor(diff / month)} months ago`;
    } else {
        return `${Math.floor(diff / year)} years ago`;
    }
}

// Example usage
// const pastTime = new Date(2024, 4, 28, 12, 0, 0); // Replace with your actual time
// const result = getTimeDifferenceString(pastTime);
// console.log(result);