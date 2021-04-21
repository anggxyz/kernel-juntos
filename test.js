let d = "Thu Apr 22 2021 22:39:00 GMT+0530 (India Standard Time)";
d = new Date(d);
let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
let month = new Intl.DateTimeFormat("en", { month: "long" }).format(d);
let date = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
let time = new Intl.DateTimeFormat("en", { timeStyle: "short" }).format(d);
// let timezone = " ";
let timezone = new Intl.DateTimeFormat("en", { timeZone: "UTC" });

let _d = date + " " + month + ", " + year + " " + time + " " + timezone;
console.log("date:", _d);
