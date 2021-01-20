var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var multer = require('multer');

require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', multer().single('upfile'), (req, res) => {
  let resposeObject = {}
  resposeObject['name'] = req.file.originalname;
  resposeObject['type'] = req.file.mimetype;
  resposeObject['size'] = req.file.size;

  console.log(req.file);
  res.json(resposeObject);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

