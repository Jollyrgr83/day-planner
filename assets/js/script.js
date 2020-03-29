// SEQUENCE
// Following the initialization of variables, the renderPage function is run on initial page load to create the time block elements for the page. Time block elements consist of: a row wrapper element, hour element containing the hour title (e.g. "9AM"), description element containing a textarea input to allow users to input their schedule, and a save button. Description and save button elements are targeted using jQuery using the element id which contains an entry from the timeArray variable (e.g. "9AM"). Description elements also contain a data-hour attribute with a numeric value for the hour from the timeValArray variable. This numeric value is compared against the timeNow variable generated using moment.js to determine the past, present, or future class formatting.

// arrays for hourEl title, descriptionEl ids, and values for dynamic formatting based on current hour
var timeArray = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
var timeValArray = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// initialize global object for user task inputs in description elements
var inputObject = {};

// updates time-based elements and formatting
function updateTime() {
    // update header with today's date
    $("#currentDay").text(moment().format("MMMM Do, YYYY"));
    // current hour time variable
    var timeNow = moment().format("H");
    // update description element format based on comparison with current hour (past, present, or future)
    $.each(timeArray, function(i, time) {
        var value = parseInt($("#description" + timeArray[i]).attr("data-hour"));
        if (value === parseInt(timeNow)) {
            $("#description" + timeArray[i]).attr("class", "col-lg-10 description present");
        }
        else if (value < parseInt(timeNow)) {
            $("#description" + timeArray[i]).attr("class", "col-lg-10 description past");
        }
        else if (value > parseInt(timeNow)) {
            $("#description" + timeArray[i]).attr("class", "col-lg-10 description future");
        }
    });
};

// creates page elements, initializes/loads local storage, and updates time-based elements and formatting
function renderPage() {
    // create and render time block
    $.each(timeArray, function(i, time) {
        // container for each row
        var rowEl = $("<div>");
        $(rowEl).attr("class", "row");
        $("#main-container").append(rowEl);
        // left-most block with hour listed
        var hourEl = $("<div>");
        $(hourEl).attr("class", "col-lg-1 hour py-4");
        $(hourEl).text(time);
        $(rowEl).append(hourEl);
        // center textarea input for user task input
        var descriptionEl = $("<textarea>");
        $(descriptionEl).attr("class", "col-lg-10 description");
        $(descriptionEl).attr("type", "text");
        $(descriptionEl).attr("id", "description" + time);
        $(descriptionEl).attr("data-hour", timeValArray[i]);
        $(rowEl).append(descriptionEl);
        // right-most save button element 
        var saveBtnEl = $("<button>");
        $(saveBtnEl).attr("class", "col-lg-1 saveBtn");
        $(saveBtnEl).attr("id", time);
        $(saveBtnEl).text("save");
        $(rowEl).append(saveBtnEl);    
    }); 
    // initialize user task inputs from local storage if available
    // create blank object to store user task inputs
    $.each(timeValArray, function(i, timeVal) {
        inputObject[timeVal] = " ";
    });
    // if local storage does not exist, use blank object to start
    if (localStorage.getItem("inputObject") === null) {
        inputObject = inputObject;
        localStorage.setItem("inputObject", JSON.stringify(inputObject));
    }
    // if local storage does exist, use local storage
    else {
        inputObject = JSON.parse(localStorage.getItem("inputObject"));
    }
    // update description elements with local storage values
    $.each(timeArray, function(i, time) {
        $("#description" + time).val(inputObject[time]);
    });
    // update current day in header and description element formatting
    updateTime();
};

// start script on page load
renderPage();

// event listener for save button clicks
$(".saveBtn").on("click", function(event){
    // update inputObject with user task input
    inputObject[event.target.id] = $("#description" + event.target.id).val();
    // update local storage with updated user task input
    localStorage.setItem("inputObject", JSON.stringify(inputObject));
    // update current day in header and description element format
    updateTime();
});

// event listener for clear button clicks
$("#clearBtn").on("click", function(event) {
    // reset inputObject with blank text for each description element
    $.each(timeArray, function(i, time) {
        inputObject[time] = " "; 
        $("#description" + time).val(" ");
    });
    // update local storage with blank inputObject
    localStorage.setItem("inputObject", JSON.stringify(inputObject));
});