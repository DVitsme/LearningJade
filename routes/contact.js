var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function(req, res, next) {
  res.render('contact', {
    title: 'Contact'
  });
});

// send email
router.post('/send', function(req,res,next) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'YourUserName',
      pass: 'YourPassword'
    }
  });

  var mailOptions = {
    from: '"YourName" <YourEmail>',
    to: 'YourEmail',
    subject: 'Hello From PC Repair',
    text: 'You have a submission from... Name: '+req.body.name+' Email: '+req.body.email+' Message: '+req.body.messsage,
    html: '<p>You have a submission from...</p> <ul><li>Name: '+req.body.name+'</li><li> Email: '+req.body.email+'</li><li> Message: '+req.body.message+'</li></ul>'
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if(error){
      return console.log(error);
    }
    console.log('Message Sent: '+ info.response);
    res.redirect('/');
  });
});

module.exports = router;
