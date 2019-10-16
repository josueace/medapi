// routes/auth-routes.js
const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const mongoose     = require('mongoose');

// User model
const User = require("../models/user");
const DocDoc = require("../models/doctor");
const HospitalDoc = require("../models/hospital");
const Visit = require("../models/visit");
const Lab = require("../models/lab");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


    authRoutes.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
		
		console.log('coco1 '+JSON.stringify(theUser));
		
        if (err) {
            res.status(500).json({ message: 'Something went wrong authenticating user' });
            return;
        }
    
        if (!theUser) {
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            res.status(401).json(failureDetails);
            return;
        }

        // save user in session
        req.login(theUser, (err) => {
            if (err) {
				console.log(err);
                res.status(500).json({ message: 'Session save went bad.' });
                return;
            }

            // We are now logged in (that's why we can also send req.user)
           console.log('user '+JSON.stringify(theUser)+' logged in');
           res.status(200).json(theUser);
        });
    })(req, res, next);
});


  authRoutes.post('/signup', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
	console.log(JSON.stringify(req.body));
  console.log(username+" 2 "+password);
    if (!username || !password) {
	  console.log('uno');	
      res.status(400).json({ message: 'Provide username and password' });
      return;
    }

    if(password.length < 2){
		 console.log('dos');
        res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
        return;
    }
  
    User.findOne({ username }, (err, foundUser) => {

        if(err){
			 console.log('trues');
            res.status(500).json({message: "Username check went bad."});
            return;
        }

        if (foundUser) {
			 console.log('cinco '+JSON.stringify(foundUser));
            res.status(400).json({ message: 'Username taken. Choose another one.' });
            return;
        }
  
        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
  
        const aNewUser = new User({
            username:username,
            password: hashPass
        });
		console.log(username+" 3 "+password);
  
        aNewUser.save(err => {
			console.log(JSON.stringify(err));
            if (err) {
                res.status(400).json({ message: '1Saving user to database went wrong.' });
                return;
            }
            
            // Automatically log in user after sign up
            // .login() here is actually predefined passport method
            req.login(aNewUser, (err) => {

                if (err) {
                    res.status(500).json({ message: 'Login after signup went bad.' });
                    return;
                }
            
                // Send the user's information to the frontend
                // We can use also: res.status(200).json(req.user);
                res.status(200).json(aNewUser);
            });
        });
    });
});



authRoutes.post('/logout', (req, res, next) => {
    // req.logout() is defined by passport
    req.logout();
    res.status(200).json({ message: 'Log out success!' });
});


authRoutes.get('/loggedin', (req, res, next) => {
    // req.isAuthenticated() is defined by passport
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
        return;
    }
    res.status(403).json({ message: 'Unauthorized' });
});



 



authRoutes.get('/doctor/:user', (req, res, next) => {
  DocDoc.find({"user":req.params.user},'name speciality city state -_id')

  .then(list => {
    res.json(list);
  })
  .catch(error => next(error))
});

authRoutes.get('/hospital/:user', (req, res, next) => {
  HospitalDoc.find({"user":req.params.user},'name phone city state -_id')
  .then(list => {
    res.json(list);
  })
  .catch(error => next(error))
});

authRoutes.get('/visit/:user', (req, res, next) => {
  Visit.find({"user":req.params.user},'visitdate hospital doctor reazon diagnosis -_id')
  .then(list => {
    res.json(list);
  })
  .catch(error => next(error))
});

authRoutes.get('/lab/:user', (req, res, next) => {
  Lab.find({"user":req.params.user},'labdate name  results  -_id')
  .then(list => {
    res.json(list);
  })
  .catch(error => next(error))
});

authRoutes.post('/hospital', (req, res, next) => {
  const hospital = new HospitalDoc({
    name: req.body.name,
    phone: req.body.phone,
    city: req.body.city,
    state: req.body.state,
    user: "pedro"
  });

  hospital.save()
  .then(hospital => {
    res.json({
      message: 'New hospital created!',
      id: hospital._id
    });
  })
  .catch(error => next(error))
});

authRoutes.post('/doctor', (req, res, next) => {
  const doctor = new DocDoc({
    name: req.body.name,
    speciality: req.body.speciality,
    city: req.body.city,
    state: req.body.state,
    user: "pedro"
  });
  
  doctor.save()
  .then(doctor => {
    res.json({
      message: 'New doctor created!',
      id: doctor._id
    });
  })
  .catch(error => next(error))
});

authRoutes.post('/visit', (req, res, next) => {
  const visit = new Visit({
    visitdate: req.body.visitdate,
    hospital: req.body.hospital,
    doctor: req.body.doctor,
    reazon: req.body.reazon,
    diagnosis: req.body.diagnosis,
    user: "pedro"
  });
  
  visit.save()
  .then(doctor => {
    res.json({
      message: 'New visit created!',
      id: visit._id
    });
  })
  .catch(error => next(error))
});

authRoutes.post('/lab', (req, res, next) => {
  const lab = new Lab({
    labdate: req.body.labdate,
    name: req.body.name,
    results: req.body.results,
    user: "pedro"
  });
  
  lab.save()
  .then(lab => {
    res.json({
      message: 'New lab created!',
      id: lab._id
    });
  })
  .catch(error => next(error))
});


authRoutes.post('/deldoctor', (req, res, next) => {
  
 DocDoc.findOneAndRemove({name: req.body.name	}, ()=>{});
  
});
authRoutes.post('/delvisit', (req, res, next) => {
  
 Visit.findOneAndRemove({visitdate: req.body.visitdate	}, ()=>{});
  
});

authRoutes.post('/dellab', (req, res, next) => {
  
 Lab.findOneAndRemove({labdate: req.body.labdate	}, ()=>{});
  
});






module.exports = authRoutes;