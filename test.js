let d = "2021-04-07T16:00:00.000Z";
d = new Date(d);
let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
let month = new Intl.DateTimeFormat("en", { month: "long" }).format(d);
let date = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

let _d = date + " " + month + ", " + year;
console.log("date:", _d);
