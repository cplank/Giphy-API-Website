let cartoons = ["Steven Universe", "My Little Pony", "Adventure Time", "Over the Garden Wall"];

function showCartoons() {

    let cartoon = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=T3mGsTKjspw6b56dhIaTFMeJe9wCcGu3&limit=10";
    $(".image-container").empty()

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let giphy = response.data
        for (let i = 0; i < giphy.length; i++) {
            let imageRating = giphy[i].rating
            let imageUrl = giphy[i].images.fixed_height_still.url
            let stillUrl = giphy[i].images.fixed_height_still.url
            let animateUrl = giphy[i].images.fixed_width.url
            let imageDiv = $("<div>")
            let p = $("<p>").text("Rating: " + imageRating)
            let cartoonImage = $("<img>")
            cartoonImage.attr("src", imageUrl)
            cartoonImage.attr("data-still", stillUrl)
            cartoonImage.attr("data-animate", animateUrl)
            cartoonImage.attr("data-state", "still")
            cartoonImage.attr("alt", "cartoon image")
            imageDiv.append(p);
            imageDiv.append(cartoonImage)
            $(".image-container").prepend(imageDiv)
        }

    });
}

function renderButtons() {

    $(".button-container").empty();
    for (var i = 0; i < cartoons.length; i++) {

        let newButton = $("<button>");
        newButton.addClass("cartoon btn");
        newButton.attr("data-name", cartoons[i]);
        newButton.text(cartoons[i]);
        $(".button-container").append(newButton);
    }
}

$("#add-giphy").on("click", function (event) {
    event.preventDefault();
    let cartoon = $("#giphy-input").val().trim();
    cartoons.push(cartoon);
    renderButtons();
    $("#giphy-input").val("");
});


$(document).on("click", ".cartoon", showCartoons);


renderButtons();

