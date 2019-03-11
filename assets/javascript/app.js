let cartoons = ["Steven Universe", "My Little Pony", "Adventure Time", "Over the Garden Wall"];




function showCartoons() {

    let cartoon = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=T3mGsTKjspw6b56dhIaTFMeJe9wCcGu3&limit=5";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#image-container").append(response)
        console.log(response)
    });
}

function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#button-container").empty();
    // Loops through the array of movies
    for (var i = 0; i < cartoons.length; i++) {

        // Then dynamicaly generates buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        let newButton = $("<button>");
        // Adds a class of movie to our button
        newButton.addClass("cartoon");
        // Added a data-attribute
        newButton.attr("data-name", cartoons[i]);
        // Provided the initial button text
        newButton.text(cartoons[i]);
        // Added the button to the buttons-view div
        $("#button-container").append(newButton);
    }
}

// This function handles events where the add movie button is clicked
$("#add-giphy").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    let cartoon = $("#giphy-input").val().trim();

    // The movie from the textbox is then added to our array
    cartoons.push(cartoon);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".cartoon", showCartoons);

// Calling the renderButtons function to display the intial buttons
renderButtons();
