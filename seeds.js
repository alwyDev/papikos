var mongoose = require("mongoose");
var Place = require("./models/place");
var Comment = require("./models/comment");

var data = [
	{
		name: "Kocheng",
		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/250px-Cat03.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus vel facilisis volutpat est velit egestas dui id ornare. Non enim praesent elementum facilisis leo vel fringilla est ullamcorper."
	},
	{
		name: "Ko",
		image: "https://www.rspcasa.org.au/wp-content/uploads/2017/09/Cat-Banner-Mobile-600x300-fit-crop-constrain-q70-mobile_banner_image.png",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus vel facilisis volutpat est velit egestas dui id ornare. Non enim praesent elementum facilisis leo vel fringilla est ullamcorper."
	},
	{
		name: "Cheng",
		image: "https://www.kitska.com.au/wp-content/uploads/2018/09/Hairless-kitty-600x300.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus vel facilisis volutpat est velit egestas dui id ornare. Non enim praesent elementum facilisis leo vel fringilla est ullamcorper."
	}
]

function seedDB(){
	//Remove all places
	Place.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed places!");
		Comment.remove({}, function(err){
			if(err){
				console.log(err);
			}
			console.log("removed comments!");
		
		//add a few places
	data.forEach(function(seed){
		Place.create(seed, function(err, place){
			if(err){
				console.log(err)
			} else {
				console.log("added a place");
				//create a comment
				Comment.create(
					{
						text: "This cat is cool!",
						author: "Alwy"
					}, function(err, comment){
						if(err){
							console.log(err);
						} else {	
							place.comments.push(comment);
							place.save();
							console.log("Created new comment");
						}
					});
				}
			});
		});
	});
});
	//add a few comments
}

module.exports = seedDB;
