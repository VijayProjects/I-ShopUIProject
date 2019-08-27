//import library 
var express = require('express');
var mongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

//Configure Middleware
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//configure Database Connection
var url = "mongodb://127.0.0.1:27017";

//Get all Categories 
app.get("/getCategories", function (request, response) {
  //connect to database
  mongoClient.connect(url, function (err, db) {
    if (!err) {
      db.db("ishop").collection("tblCategory").find({}).toArray(function (err, documents) {
        if (!err) {
          response.send(documents);
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
}); // get

// Get All Products
app.get("/getProducts", function (request, response) {
  //connect to database
  mongoClient.connect(url, function (err, db) {
    if (!err) {
      db.db("ishop").collection("tblProducts").find({}).toArray(function (err, documents) {
        if (!err) {
          response.send(documents);
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
}); // get

// Get Shopping Cart list
app.get("/getShoppingCart", function (request, response) {
  //connect to database
  mongoClient.connect(url, function (err, db) {
    if (!err) {
      db.db("ishop").collection("tblShoppingCart").find({}).toArray(function (err, documents) {
        if (!err) {
          response.send(documents);
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
}); // get

//post request for user registration
app.post("/registerUser", function (request, response) {
  var regUser = {
    userId: parseInt(request.body.Id),
    userName: request.body.Name,
    password: request.body.Password,
    email: request.body.Email,
    city: request.body.City,
    state: request.body.State,
    pinNum: parseInt(request.body.Pin)
  };
  //connect to database
  mongoClient.connect(url, function (err, db) {
    if (!err) {
      db.db("ishop").collection("tblRegister").insertOne(regUser);
      response.send("Record inserted..!");
    } else {
      console.log(err);
    }
  });
});

//post request for login
app.post("/login", function (request, response) {
  var user = request.body.userName;
  var pwd = request.body.password;
  //connect to database
  mongoClient.connect(url, function (err, db) {
    if (!err) {
      db.db("ishop").collection("tblRegister").findOne({
        userName: user,
        password: pwd
      }, function (err, result) {
        if(err) {
          console.log(err) ;
        } else {
          if(result == null) {
            response.send("Invalid Credetials");
          } else {
            response.send("Login Successfull..");
          }
        }
      });
    } else {
      console.log(err);
    }
  });
}); // post

//post request for add shopping cart
app.post("/addToShoppingCart", function (request, response) {
  var addToCart = {
    cartId: parseInt(request.body.Id),
    productCode: parseInt(request.body.ProdCode),
    productName: request.body.ProdName,
    price: parseFloat(request.body.Price),
    quantity: parseInt(request.body.Quantity),
    totalAmount: parseFloat(request.body.TotAmount)
  };
  //connect to database
  mongoClient.connect(url, function (err, db) {
    if (!err) {
      db.db("ishop").collection("tblShoppingCart").insertOne(addToCart);
      response.send("Item added to Shopping Cart");
    } else {
      console.log(err);
    }
  });
}); // post

//listen port
app.listen("8989");
console.log("server started.http://127.0.0.1:8989");