var express = require('express');
var PORT;
var Cloudant = require('@cloudant/cloudant');


if (process.env.PORT) {
  PORT = process.env.PORT;
} else {
  PORT = 8080;
}
var Cloudant = require('@cloudant/cloudant');
var url = "https://apikey-v2-182sso54wjwbhfsn4vutlvd52tohwxm5tr5neu0vzjf8:ef898583465dfc2b6ae676f89dbe74ca@fda58982-1434-460f-8929-dfc3615c3c07-bluemix.cloudantnosqldb.appdomain.cloud";
var username = "apikey-v2-182sso54wjwbhfsn4vutlvd52tohwxm5tr5neu0vzjf8";
var password = "ef898583465dfc2b6ae676f89dbe74ca";
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
app.post('/', (req, res) => {

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