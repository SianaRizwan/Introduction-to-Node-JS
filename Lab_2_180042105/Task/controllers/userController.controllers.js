const user = require("../model/userModel");
const bcrypt = require("bcrypt");
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");
const saltRounds = 10;
const alert = require("alert");


const getRegister = (req, res) => {
    res.sendFile("register.html", { root: "./views/users" });
  };


  const postRegister = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const gender = req.body.gender;
  const password = req.body.password;
  const retypePassword = req.body.retype_password;
   if(password === retypePassword ){
       if(String(password).length < 6){
           alert("Password must contain at least 6 characters");
           res.redirect("/register");
       }
       else{
           try{
            userRepeat = await user.findOne({ email });
            if (userRepeat){
                alert("Account already exist");
                res.redirect("/register");
            }
            else{
                const passwordHash = await bcrypt.hash(password, saltRounds);
                User = new user({
                    username,
                    email,
                    gender,
                    passwordHash,
                  });
                  await User.save();
                  localStorage.setItem("username", username);
                  res.redirect("/login");
            }
           }
           catch(error){
            alert("All the fields need to be filled in");
            res.redirect("/register");
           }

       }
   }
  };
  
  const getLogin = (req, res) => {
    res.sendFile("login.html", { root: "./views/users" });
  };

  const postLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const checkUser = await user.findOne({ email });
    if (checkUser) {
        const passwordMatch = await bcrypt.compare(password, checkUser.passwordHash);
        if (passwordMatch) {
          localStorage.setItem("username", checkUser.username);
          res.redirect("/dashboard");
        } else {
          alert("Incorrect Password!");
          res.redirect("/login");
        }
      } else {
        alert("No account exists!");
        res.redirect("/register");
      }

  };
  
  const getDashboard = (req, res) => {
    res.send("Login Successful");
  };
  
  module.exports = { getRegister, postRegister, getLogin, postLogin, getDashboard };