const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
const alert = require('alert');

const isLoggedIn = (req,res,next) => {

    const user = localStorage.getItem("username")
    
    if (user){
        //res.send(`<H3>Welcome ${user}</H3>`);
        alert(`Welcome ${user}`)
        res.sendFile("index3.html", {root: "./views"});
        //res.send(document.getElementById('info') = `Welcome ${user}`);
        next();
    }else {
        alert('Please log in first');
        res.redirect('home.html');
    }
}

module.exports = isLoggedIn