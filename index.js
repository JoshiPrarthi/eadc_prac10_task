var express = require('express');

var PORT;
var Cloudant = require('@cloudant/cloudant');


if (process.env.PORT) {
  PORT = process.env.PORT;
} else {
  PORT = 8000;
}
var Cloudant = require('@cloudant/cloudant');
var url = "https://apikey-v2-2e5kdlgplmovp6jb5xfuok6afjra827zegiyhiw2ul1u:d32ec5f34b80eec562777356d8d80d1b@b9884815-a388-4e5e-8d1d-784e73de0044-bluemix.cloudantnosqldb.appdomain.cloud";
var username = "apikey-v2-197dnkn3t48agl1wuzpj91l7lo4dkifrzhim8wjf5ykg";
var password = "0f75c4be5fda84f99a0d4c582ef21b89";
var app = express();
const bodyParser = require('body-parser');
//const cors = require('cors');
//app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
////////////
app.post('/insert', (req, res) => {

  const { name, email, phone, city, country, pincode, database } = req.body;
  
  const data = {
      name: name,
      email: email,
      phone: phone,
      city: city,
      country: country,
      pincode: pincode
  };
///////
Cloudant({ url: url, username: username, password: password }, function(err, cloudant, pong) {
  if (err) {
    return console.log('Failed to initialize Cloudant: ' + err.message);
  }
console.log(pong); // {"couchdb":"Welcome","version": ..

cloudant.use(database).insert({ "name": name, "email": email, "phone": phone, "city": city, "country": country, "pincode": pincode } , (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data); // { ok: true, id: 'rabbit', ...
      }
    });
});

});


app.listen(PORT);
//console.log(message.getPortMessage() + PORT);



