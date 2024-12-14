// Formatter une date en format YYYY-MM-DD
function formatingDate(date) {
    const d = new Date(date);
    const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
}


function setTime(date, time) {
    const d = new Date(date);
    d.setHours(time.hours);
    d.setMinutes(time.minutes);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
}

function roundToClosestTime(date, interval) {
    const d = new Date(date);
    const minutes = d.getMinutes();
    const minutesToAdd = minutes % interval;
    d.setMinutes(minutes + (interval - minutesToAdd));
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
}

// Generer des slots de temps pour les disponibilitées, en vérifiant les disponibilitées
function generateSlots(start, end, interval, reservations) {
    let startStamp = start.getTime();
    const endStamp = end.getTime();
    const slots = [];
    for (; startStamp <= endStamp; startStamp += interval * 60000) {
        let overlaps = false;

        for (const reservation of reservations) {
            const reservationStart = new Date(reservation.date);
            reservationStart.setHours(parseInt(reservation.start_time.split(':')[0]), parseInt(reservation.start_time.split(':')[1]));
            const reservationEnd = new Date(reservation.date);
            reservationEnd.setHours(parseInt(reservation.end_time.split(':')[0]), parseInt(reservation.end_time.split(':')[1]));

            if (startStamp >= reservationStart.getTime() && startStamp < reservationEnd.getTime()) {
                overlaps = true;
                break;
            }
        }

        if (!overlaps) {
            const slot = {
                date: new Date(startStamp),
            };
            slots.push(slot);
        }
    }
    return slots;
}

function generateFirstDate(date, interval, startTime, endTime, reservations) {
    let start;
    if (formatingDate(date) <= formatingDate(new Date())) {
        start = roundToClosestTime(date, interval);
        if (start.getTime() < setTime(date, startTime)) {
            start = setTime(date, startTime);
        }
    } else {
        start = setTime(date, startTime);
    }
    const end = setTime(date, endTime);
    const slots = generateSlots(start, end, interval, reservations);
    return {
        date,
        slots,
    };
}

function generateDays(date, nbDays, startTime, endTime, interval, reservations) {
    const days = [];
    days.push(generateFirstDate(date, interval, startTime, endTime, reservations));
    // Set to second Day
    const startingDay = new Date(date);
    for (let i = 1; i < nbDays; i += 1) {
        startingDay.setDate(startingDay.getDate() + 1);
        const slotsDate = new Date(startingDay);
        const startDate = setTime(slotsDate, startTime);
        const endDate = setTime(slotsDate, endTime);
        const slots = generateSlots(
            startDate,
            endDate,
            interval,
            reservations
        );
        const meetingsDay = {
            date: new Date(startingDay),
            slots,
        };
        days.push(meetingsDay);
    }
    return days;

}

export default generateDays;