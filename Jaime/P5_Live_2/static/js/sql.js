$(document).ready(function() {
    console.log("Page Loaded");

    $("#filter").click(function() {
        // alert("button clicked!");
        getSQL();
    });
});


// call Flask API endpoint
function getSQL() {
    var genre = $("#genre").val();
    var min_budget = $("#min_budget").val();
    var max_budget = $("#max_budget").val();
    var release_date = $("#release_date").val();
    var mpaa = $("#mpaa").val();


    // check if inputs are valid

    // create the payload
    var payload = {
        "genre":genre,
        "min_budget":min_budget,
        "max_budget":max_budget,
        "release_date":release_date,
        "mpaa":mpaa
    }

    // Perform a POST request to the query URL
    $.ajax({
        type: "POST",
        url: "/getSQL",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: function(returnedData) {
            // print it
            console.log(returnedData);
            renderTable(returnedData);

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}

function renderTable(inp_data) {
    // init html string
    let html = "";

    // destroy datatable
    $('#sql_table').DataTable().clear().destroy();

    // loop through all rows
    inp_data.forEach(function(row) {
        html += "<tr>";

        // loop through each cell (order matters)
        html += `<td>${row.movie_id}</td>`;
        html += `<td>${row.title}</td>`;
        html += `<td>${row.mpaa}</td>`;
        html += `<td>${row.director}</td>`;
        html += `<td>${row.main_actor_1}</td>`;
        html += `<td>${row.main_actor_2}</td>`;
        html += `<td>${row.main_actor_3}</td>`;
        html += `<td>${row.main_actor_4}</td>`;
        html += `<td>${row.domestic}</td>`;
        html += `<td>${row.budget}</td>`;
        html += `<td>${row.genre_1}</td>`;
        html += `<td>${row.runtime}</td>`;
        html += `<td>${row.release_date}</td>`;

        // close the row
        html += "</tr>";
    });

    // shove the html in our elements
    console.log(html);
    $("#sql_table tbody").html("");
    $("#sql_table tbody").append(html);

    // remake data table
    $('#sql_table').DataTable();
}