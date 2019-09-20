var express 	= require("express"),
	app 	    = express(),
	bodyParser  = require("body-parser"),
	mongoose	= require("mongoose"),
	flash       = require("connect-flash"),
	passport    = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride= require("method-override"),
	Pet         = require("./models/pet"),
	Comment     = require("./models/comment"),
	User        = require("./models/user"),
	seedDB      = require("./seeds")

// requiring routes
var commentRoutes = require("./routes/comments"),
	petRoutes     = require("./routes/pets"),
	indexRoutes   = require("./routes/index")

mongoose.connect("mongodb+srv://wyalwy:tr4ining@cluster0-zkody.mongodb.net/test?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useCreateIndex: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //SEED THE DATABSE

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "i'm good",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/pets", petRoutes);
app.use("/pets/:id/comments", commentRoutes);

// masalah disini, atau karena gak exit mongod. ada cara atasinya di awal
// app.listen(3000, () => {
// 	console.log('Server Has Started!');
// });

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The PetMeow Server Has Started!");
});