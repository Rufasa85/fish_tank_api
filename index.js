var express = require('express');
const cors =require("cors");
const session = require('express-session')
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
var allRoutes = require('./controllers');

// Requiring our models for syncing
var db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//local config
// app.use(cors({
//   origin:["http://localhost:3000"],
//   credentials:true
// }))
// app.use(session({
//     secret: "keyboard cat", 
//     resave: false, 
//     saveUninitialized: false,
//     cookie : {
//       maxAge:2*60*60*1000,
//     }
// }))

//deployed config

app.use(cors({ 
  origin:["https://fish-tank-react.herokuapp.com"],
  credentials:true
}))

app.use(session({
    secret: "keyboard cat", 
    resave: false, 
    saveUninitialized: false,
     proxy:true,
    cookie : {
      maxAge:2*60*60*1000,
      sameSite:"none",
       secure:true
    }
}))


app.use('/',allRoutes);

db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});