// slotsGenerator.js

/**
 * @typedef {Object} MeetingSlot
 * @property {Date} date - Date of the meeting
 */

/**
 * @typedef {Object} Time
 * @property {number} hours - Hours
 * @property {number} minutes - Minutes
 */

/**
 * Function to format a date to YYYY-MM-DD
 * @param {Date} date - Date to format
 * @return {String} Formatted date
 */
function formatingDate(date) {
    const d = new Date(date);
    const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
}

/**
 * Function to generate a random number between min and max
 * @param {Number} min - Minimum value
 * @param {Number} max - Maximum value
 * @return {number} Random number
 */
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Set a time to a date
 * @param {Date} date - A date
 * @param {Time} time - Time of the date
 * @return {Date} Date with the set time
 */
function setTime(date, time) {
    const d = new Date(date);
    d.setHours(time.hours);
    d.setMinutes(time.minutes);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
}

/**
 * Round a date to the closest interval
 * @param {Date} date - Date to round
 * @param {Number} interval - Interval in minutes
 * @return {Date} Rounded date
 */
function roundToClosestTime(date, interval) {
    const d = new Date(date);
    const minutes = d.getMinutes();
    const minutesToAdd = minutes % interval;
    d.setMinutes(minutes + (interval - minutesToAdd));
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
}

/**
 * Generate meeting slots between start and end times
 * @param {Date} start - Start time
 * @param {Date} end - End time
 * @param {Number} interval - Interval in minutes
 * @param {number} randomSlotsToDelete - Number of slots to delete randomly
 * @return {MeetingSlot[]} List of meeting slots
 */
function generateSlots(start, end, interval, randomSlotsToDelete) {
    let startStamp = start.getTime();
    const endStamp = end.getTime();
    const slots = [];
    for (; startStamp <= endStamp; startStamp += interval * 60000) {
        const slot = {
            date: new Date(startStamp),
        };
        slots.push(slot);
    }
    for (let i = 0; i < randomSlotsToDelete; i += 1) {
        const indexToDelete = randomNumber(0, slots.length);
        slots.splice(indexToDelete, 1);
    }
    return slots;
}

/**
 * Generate slots for a given date range
 * @param {Date} date - Start date
 * @param {Number} nbDays - Number of days to generate
 * @param {Time} startTime - Start time of the meetings
 * @param {Time} endTime - End time of the meetings
 * @param {Number} interval - Interval between two meetings (minutes)
 * @param {number} randomSlotsToDelete - Number of slots to delete randomly
 * @return {MeetingSlot[]} List of meeting slots
 */
function slotsGenerator(date, nbDays, startTime, endTime, interval, randomSlotsToDelete = 0) {
    const days = [];
    for (let i = 0; i < nbDays; i += 1) {
        const currentDate = new Date(date);
        currentDate.setDate(currentDate.getDate() + i);
        const start = setTime(currentDate, startTime);
        const end = setTime(currentDate, endTime);
        const slots = generateSlots(start, end, interval, randomSlotsToDelete);
        days.push(...slots);
    }
    return days;
}

export default slotsGenerator;