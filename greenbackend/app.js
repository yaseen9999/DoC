const express = require("express");
const app = express();

const upload= require('./config/multerconfig');
const mongoose = require("./config/dbconfig");
const signupcontroller= require('./controllers/signupcontroller');
const logincontroller= require('./controllers/logincontroller');
const accountcontroller= require('./controllers/accountcontroller');
const postcontroller= require('./controllers/postcontroller');
const retrivepost= require('./controllers/retrivepost');
const leafcontroller= require('./controllers/leafcontroller');
const sendotpcontroller= require('./controllers/sendotpcontroller');
const verifyotpcontroller= require('./controllers/verifyotpcontroller');
const updatepasscontroller= require('./controllers/updatepasscontroller');
const fetchcontoler= require('./controllers/fetchcontroler');
const homecontroller= require('./controllers/homecontroller');
const likecontroller= require('./controllers/likecontroller');
const addcommentcontoller= require('./controllers/addcommentcontroller');
const fetchcomments= require('./controllers/fetchcomments');
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.post('/register', signupcontroller.signup);
app.post('/login', logincontroller.login);
app.post('/userdetails', upload.single('avatarUri'), accountcontroller.account);
app.get('/useraccount/:userId', fetchcontoler.getaccounts);
app.get('/home', homecontroller.home);
app.post('/createpost', postcontroller.posts);
app.post('/getposts',retrivepost.getposts);
app.post('/leafimage',leafcontroller.leaf);
app.post('/sendotp',sendotpcontroller.otp);
app.post('/verify-otp',verifyotpcontroller.verifyotp);
app.post('/update-password',updatepasscontroller.updatepass);
app.put('/posts/:id/like',likecontroller.likes);
app.post('/addcomment/:id',addcommentcontoller.addCommentToPost);
app.get('/fetchcomments/:id',fetchcomments.getComments );
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Node.js server started on port ${PORT}`);
});
