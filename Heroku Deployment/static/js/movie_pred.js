$(document).ready(function() {
    console.log("Page Loaded");
    get_movies();
    $("#preds_button").click(function() {
        // alert("button clicked!");
        makePredictions();
    });
});

function get_movies(){
    // Perform a POST request to the query URL
    $.ajax({
        type: "GET",
        url: "/getmovies",
        contentType: 'application/json;charset=UTF-8',
        success: function(returnedData) {
            // print it
            console.log(returnedData);
            returnedData.movies.forEach(function(movie){
                let html= `<option>${movie}</option>`;
                $("#selMovie").append(html);
            });
            $("#selMovie").select2();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}


// call Flask API endpoint
function makePredictions() {
    var movie = $("#selMovie").val();


    // check if inputs are valid

    // create the payload
    var payload = {
        "movie": movie
    }

    // Perform a POST request to the query URL
    $.ajax({
        type: "POST",
        url: "/makePredictions",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: function(returnedData) {
            // print it
            console.log(returnedData);
            $("#movie_title").text(returnedData.data[0].movie_title);
            $("#critics_actual").text(returnedData.data[0].tomatometer_rating);
            $("#critics_pred").text(returnedData.data[0].pred_tomatometer_rating.toFixed(0));
            $("#critics_diff").text(returnedData.data[0].critics_diff.toFixed(0));   
            $("#audience_actual").text(returnedData.data[0].audience_rating);
            $("#audience_pred").text(returnedData.data[0].pred_aud_rating.toFixed(0));
            $("#audience_diff").text(returnedData.data[0].audience_diff.toFixed(0));
            if (returnedData.data[0].critics_diff > 0.0) {
                $("#output1").text("Exceeded our expectations!");
            } 	
            else {
                $("#output1").text("Maybe they were a bit harsh???");
            }
            
            if (returnedData.data[0].audience_diff > 0.0) {
                $("#output2").text("Exceeded our expectations!");
            } 	
            else {
                $("#output2").text("Everyone's a critic???");
            }
                
        },

        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}