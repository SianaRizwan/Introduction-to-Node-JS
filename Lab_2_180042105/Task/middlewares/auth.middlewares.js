const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
const alert = require('alert');

const isLoggedIn = (req,res,next) => {

    const user = localStorage.getItem("username")
    
    if (user){
        res.send(`<H3>Welcome ${user}</H3>`);
        next();
    }else {
        alert('Please log in first');
        res.redirect('home.html');
    }
}

module.exports = isLoggedIn