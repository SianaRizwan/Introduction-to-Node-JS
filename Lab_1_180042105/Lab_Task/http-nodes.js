const http = require("http");
const page = require("./loadContent");

const server = http.createServer((req,res) => {

    if (req.url == "/") {
        //res.write(page.index);
        res.end(page.index);
    } 
    else if (req.url == "/about") {
        //res.write(page.about);
        res.end(page.about);
    }
    else if (req.url == "/blog") {
        res.write(page.blog);
        res.end();
    }
    else if (req.url == "/contact") {
        res.write(page.contact);
        res.end();
    }
    else if (req.url == "/pricing") {
        res.write(page.pricing);
        res.end();
    }
    else if (req.url == "/services") {
        res.write(page.services);
        res.end();
    }
    else if (req.url == "/work") {
        //res.write(page.work);
        res.end(page.work);
    }
     else {
        res.write("<h1> <i> Page doesn't exist </i></h1><br><a href = '/'> <h3> Go to Base </h3> </a>");
        res.end();
    } 
});

module.exports = { server };