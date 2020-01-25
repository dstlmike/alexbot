var nodemailer = require('nodemailer');
var exit = require('..random/exit');
exit;

var transporter = nodemailer.createTransport({ 
host: 'mail.google.com', 
port: '465', 
secure: true, 
auth: { 
user: 'alexdeabot@gmail.com', 
pass: '113Hopest!' 
} 
}); 

var mailOptions = { 
from: 'alexdeabot@gmail.com', 
to: 'dstl_mike1@hotmail.com', 
subject: 'subject', 
text: 'New Registration:' 
}; 

transporter.sendMail(mailOptions, function(error, info){ 
if(error) { 
res.send(400); 
} else { 
res.send(202); 
} 
}); 
});

