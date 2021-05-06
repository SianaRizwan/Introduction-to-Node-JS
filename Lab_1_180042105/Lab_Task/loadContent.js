const fs = require("fs");

const index = fs.readFileSync("./HTML/index.html", "utf-8");
const about = fs.readFileSync("./HTML/about.html", "utf-8");
const blog = fs.readFileSync("./HTML/blog.html", "utf-8");
const contact = fs.readFileSync("./HTML/contact.html", "utf-8");
const pricing = fs.readFileSync("./HTML/pricing.html", "utf-8");
const services = fs.readFileSync("./HTML/services.html", "utf-8");
const work = fs.readFileSync("./HTML/work.html", "utf-8");
// const work = fs.readFile("./HTML/work.html", "utf-8", (err) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                return work;
//             }
//         });


module.exports = { index, about, blog, contact, pricing, services, work};
