// Bài 1: Chuyển đổi mili giây
const convertMilliseconds = (milliseconds) => {
    let seconds, minutes, hours, days;
    let milliStr, secondStr, minuteStr, hourStr, dayStr;
    if (milliseconds && milliseconds > 0) {
        milliseconds = Math.floor(milliseconds);
        // days = 24 * 60 * 60 * 1000
        if (milliseconds >= 86400000) {
            days = parseInt(milliseconds / 86400000);
            milliseconds = milliseconds % 86400000;
        }

        // hours = 60 * 60 * 1000
        if (milliseconds >= 3600000) {
            hours = parseInt(milliseconds / 3600000);
            milliseconds = milliseconds % 3600000;
        }

        // minutes = 60 * 1000
        if (milliseconds > 60000) {
            minutes = parseInt(milliseconds / 60000);
            milliseconds = milliseconds % 60000;
        }

        if (milliseconds >= 1000) {
            seconds = parseInt(milliseconds / 1000);
            milliseconds = milliseconds % 1000;
        }

        if (days > 0) {
            if (days > 1) {
                dayStr = `${days} days, `;
            } else {
                dayStr = `${days} day, `;
            }
        } else {
            dayStr = "";
        }

        if (hours > 0) {
            if (hours > 1) {
                hourStr = `${hours} hours, `;
            } else {
                hourStr = `${hours} hour, `;
            }
        } else {
            hourStr = "";
        }

        if (minutes > 0) {
            if (minutes > 1) {
                minuteStr = `${minutes} minutes, `;
            } else {
                minuteStr = `${minutes} minute, `;
            }
        } else {
            minuteStr = "";
        }

        if (seconds > 0) {
            if (seconds > 1) {
                secondStr = `${seconds} seconds, `;
            } else {
                secondStr = `${seconds} second, `;
            }
        } else {
            secondStr = "";
        }

        if (milliseconds > 1) {
            milliStr = `${milliseconds} milliseconds`;
        } else {
            milliStr = `${milliseconds} millisecond`;
        }

        return `${dayStr}${hourStr}${minuteStr}${secondStr}${milliStr}`;
    }

    return null;
};

console.log(convertMilliseconds(1001));
console.log(convertMilliseconds(34325055574));

// Bài 2: Tính khoảng cách giữa 2 ngày
const startDate = "2020-01-01";
const endDate = "2020-01-22";

const getDay = (startDate, endDate) => {
    let timeStart = new Date(startDate);

    let timeEnd = new Date(endDate);

    let day = (timeEnd - timeStart) / 86400000;

    console.log(day);
};

getDay(startDate, endDate);

// Bài 3:

import _ from "lodash";

const users = [
    { id: "name1", age: 40, height: 1 },
    { id: "name2", age: 39, height: 2 },
    { id: "name3", age: 38, height: 2 },
    { id: "name4", age: 40, height: 2 },
];

let ageUser = JSON.stringify(_.groupBy(users, "age"));

console.log(ageUser);
