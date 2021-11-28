const express = require('express');
const morgan = require('morgan');
const fs = require('file-system');
const dbFilePath = 'medicamentDB.json';
const nodemailer = require('nodemailer');
const app = express();
const path = require('path');

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use(express.static(path.resolve(__dirname + './../frontend')));


//get index.html
app.get('/',  (request, response) =>{
  response.status(200).sendFile(path.resolve(__dirname + './../frontend/js/app.js'));
});

//gmail
app.post('/send-mail', async (req, res) => {
  console.log(req.body);
  try {

    switch (true) {
      case req.body.name.length < 3:
        throw new Error('Too short phone.');
        break;

      case req.body.phone.length < 3:
        throw new Error('Too short phone.');
        break;

      case req.body.email.length < 6:
        throw new Error('Too short phone.');
        break;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nodealeksey1@gmail.com',
        pass: '6868812qwe'
      }
    });

    const mailOptions = {
      from: req.body.email,
      to: 'nodealeksey1@gmail.com',
      subject: `Message from ${req.body.email} : ${req.body.phone}`,
      html: `<p>${req.body.message}</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send(req.body);

  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.get('/api/medicamentDB', (req, res) => res.send(getListFromDB()));


app.get('/api/medicamentDB/:id', (req, res) => {
  const drugsData = getListFromDB(),
    medicamentDB = drugsData.find(medicamentDB => medicamentDB.id === req.params.id);

  medicamentDB ? res.send(medicamentDB) : res.send({});
});

function getListFromDB() {
  return JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
}


app.listen(5000, () => console.log('Server has been started...'));
