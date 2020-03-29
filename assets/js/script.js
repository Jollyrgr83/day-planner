var ppp = moment().format('MMMM Do, YYYY');
console.log("ppp", ppp);
$("#currentDay").text(ppp); 
console.log("$(#currentDay)", $("#currentDay").val());
// create and render time blocks
var timeArray = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
var timeValArray = [9, 10, 11, 12, 13, 14, 15, 16, 17];
for (let i = 0; i < timeArray.length; i++) {
    var rowEl = $("<div>");
    $(rowEl).attr("class", "row");
    $("#main-container").append(rowEl);

    var hourEl = $("<div>");
    $(hourEl).attr("class", "col-lg-1 hour py-4");
    $(hourEl).text(timeArray[i]);
    $(rowEl).append(hourEl);

    var descriptionEl = $("<textarea>");
    $(descriptionEl).attr("class", "col-lg-10 description");
    $(descriptionEl).attr("type", "text");
    $(descriptionEl).attr("id", "description" + timeArray[i]);
    $(descriptionEl).attr("data-hour", timeValArray[i]);
    $(rowEl).append(descriptionEl);

    var saveBtnEl = $("<button>");
    $(saveBtnEl).attr("class", "col-lg-1 saveBtn");
    $(saveBtnEl).attr("id", timeArray[i]);
    $(saveBtnEl).text("save");
    $(rowEl).append(saveBtnEl);
};
// initialize schedule inputs from local storage if available
var inputObject = {};
for (let i = 0; i < timeArray.length; i++) {
    inputObject[timeArray[i]] = " ";
}
if (localStorage.getItem("inputObject") === null) {
    inputObject = inputObject;
    localStorage.setItem("inputObject", JSON.stringify(inputObject));
}
else {
    inputObject = JSON.parse(localStorage.getItem("inputObject"));
}
for (let i = 0; i < timeArray.length; i++) {
    $("#description" + timeArray[i]).val(inputObject[timeArray[i]]);
    console.log(inputObject[timeArray[i]]);
}
// event listener for save button clicks
$(".saveBtn").on("click", function(event){
    for (let i = 0; i < timeArray.length; i++) {
        inputObject[timeArray[i]] = $("#description" + timeArray[i]).val();
        console.log("inputObject[i]", inputObject[timeArray[i]]);
    }
    localStorage.setItem("inputObject", JSON.stringify(inputObject));
});
// event listener for clear button clicks
$("#clearBtn").on("click", function(event) {
    for (let i = 0; i < timeArray.length; i++) {
        inputObject[timeArray[i]] = " "; 
        $("#description" + timeArray[i]).val(" ");
    }
    localStorage.setItem("inputObject", JSON.stringify(inputObject));
});
// time variables
var timeNow = moment().format("H");
console.log("timeNow", typeof timeNow, timeNow);
var interval;
var secondsLeft = 60;
for (let i = 0; i < timeValArray.length; i++) {
    var value = parseInt($("#description" + timeArray[i]).attr("data-hour"));
    var timeNowValue = parseInt(timeNow);
    if (value === timeNowValue) {
        $("#description" + timeArray[i]).attr("class", "col-lg-10 description present");
    }
    else if (value < timeNowValue) {
        $("#description" + timeArray[i]).attr("class", "col-lg-10 description past");
    }
    else if (value > timeNowValue) {
        $("#description" + timeArray[i]).attr("class", "col-lg-10 description future");
    }
}
clearInterval(interval);
interval = setInterval(function() {
    secondsLeft = secondsLeft - 0.1;
    if (secondsLeft <= 0) {
        timeNow = moment().format("H");
        clearInterval(interval);
        return;
    }
}, 100);
