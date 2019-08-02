var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// We are going to implement a JWT middleware that will ensure the validity of our token. 
// We'll require each protected route to have a valid access_token sent in the Authorization header
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-i1gjsh80.auth0.com/.well-known/jwks.json'
}),
  audience: 'http://localhost:4200',
  issuer: 'https://dev-i1gjsh80.auth0.com/',
  algorithms: ['RS256']
});

app.use(jwtCheck);

// For the private route, we'll add this authCheck middleware
app.get('/api/loads', jwtCheck, (req,res)=>{
  let loads = [
    // Array of loads
  ];
  res.json(loads);
})

app.listen(port);
console.log('Listening on localhost:3000');

module.exports = app;
