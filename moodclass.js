var API_KEY = "l6uqF7sCQPq99XoWHRKpST6mj2kZr5jK";

function getGIF() { // Get GIF related to location
    var queryLocation = "London";
    var queryMood = "happy";

    var searchQuery = queryLocation.trim() // + queryMood.trim();

    var goodWeather = [];
    var badWeather = [];

    // l6uqF7sCQPq99XoWHRKpST6mj2kZr5jK&q=London
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&q=" + searchQuery + "&limit=1&offset=0&rating=g&lang=en";

    console.log(queryURL);
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({url: queryURL, method: "GET"}).then(function (response) {
        // console.log(JSON.stringify(response));
        // Check if a gif was returned at all
        if (response.data.length > 0) { // Retrieving the URL for the gif
            var gifURL = response.data[0].images.downsized.url;
            appendGIF(gifURL);
        } else { // If no gif was found for the specified criteria, then just show a default gif
            var gifURL = "./assets/img/cat-hug.gif";
            appendGIF(gifURL);
        }
    });
}

function appendGIF(gifURL) { // Creating an element to hold the gif
    var image = $("<img src=" + gifURL + ">");
    // Appending the image
    $("#suggested-gif").append(image);
}

getGIF();
