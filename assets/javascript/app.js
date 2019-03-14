//The array that contains our initial buttons
let cartoons = ["Steven Universe", "My Little Pony", "Adventure Time", "Over the Garden Wall"];


//This function adds the gifs to the page
function showCartoons() {

    //Making a new variable that gets the data-name attribute from the button that was created in
    //renderButton (.cartoon btn)  
    let cartoon = $(this).attr("data-name");

    //this is giphy api query that searches the giphy database for the cartoon we're looking for using 
    //the cartoon variable created above. 
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=T3mGsTKjspw6b56dhIaTFMeJe9wCcGu3&limit=10";

    //This clears any previously loaded gifs from the page when a new happens. This way images don't 
    //prepend to images that are already there. Fresh start!
    $(".image-container").empty()


    //This is the ajax call to giphy using the queryUrl above.
    $.ajax({
        url: queryUrl,
        method: "GET"

        //this is the promise once the call is complete (successful or not)
    }).then(function (response) {

        //created a variable to hold the object response.data (everything we get back from giphy)
        let giphy = response.data

        //a for loop to go through that object
        for (let i = 0; i < giphy.length; i++) {

            //and grab only the pieces we want. Saving them to variables for easy access.
            let imageRating = giphy[i].rating
            let imageUrl = giphy[i].images.original_still.url
            let stillUrl = giphy[i].images.original_still.url
            let animateUrl = giphy[i].images.original.url

            //creating a new div to store the images and their ratings
            let imageDiv = $("<div>")
            let p = $("<p>").text("Rating: " + imageRating.toUpperCase())
            let cartoonImage = $("<img>")

            //adding many attributes to the new image so we can do the neat still/animate onclick
            cartoonImage.attr({
                src: imageUrl,
                "data-still": stillUrl,
                "data-animate": animateUrl,
                "data-state": "still",
                alt: "cartoon image"
            })

            //added class of gif to all newly created images
            cartoonImage.addClass("gif").addClass("img-fluid")

            //add the text and image to the newly created div
            imageDiv.prepend(p);
            imageDiv.append(cartoonImage)

            //finally, prepend the div to the image container 
            $(".image-container").prepend(imageDiv)

        }

        //this is the onclick for the still/animate
        $(".gif").on("click", function () {

            //setting the state variable to be the newly created image (.gif .image-fluid) and grabbing
            //its data-state attribute
            let state = $(this).attr("data-state")

            //if the image's data-state is still, then add an attribute data-animate
            //and change data-state to animate
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"))
                $(this).attr("data-state", "animate")

                //otherwise, do the inverse
            } else {
                $(this).attr("src", $(this).attr("data-still"))
                $(this).attr("data-state", "still")
            }
        })

    });


}

//this function creates the buttons on page load and when the user types in a new cartoon in the 
//input form
function renderButtons() {

    //again, empty the button container so previously created buttons aren't clogging up the space
    $(".button-container").empty();

    //this loops through the cartoons array
    for (var i = 0; i < cartoons.length; i++) {

        //creates a new button, adds its class, attribute, and text that appears on the button,
        //adds it to the button-container on the page. cartoons[i] refers to each index of the 
        //cartoons array.
        let newButton = $("<button>");
        newButton.addClass("cartoon btn");
        newButton.attr("data-name", cartoons[i]);
        newButton.text(cartoons[i]);
        $(".button-container").append(newButton);
    }
}

//This is the onclick that handles the submit button in the input form
$("#add-giphy").on("click", function (event) {

    //apparently the default for the submit button is to refresh, so this prevents that from happening
    //I learned recently you could also just make it a different type of button (but this one was already working!)
    event.preventDefault();

    //sets the cartoon variable to the input received from the form
    let cartoon = $("#giphy-input").val().trim();

    //pushes that into the cartoons array
    cartoons.push(cartoon);

    //calls renderButtons to make the buttons in the array again (now including our new cartoon)
    renderButtons();

    //clears the input form
    $("#giphy-input").val("");
});

//Important! This is how you get everything on the page when it loads!
$(document).on("click", ".cartoon", showCartoons);

//renderButtons all day every day
renderButtons();

