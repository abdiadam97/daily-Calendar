$(document).ready(function() {

        //get history
        var history = JSON.parse(localStorage.getItem("history")) || [];
        history.forEach(function(entry) {
            var query = `[data="${entry.id}"]`;
            console.log(query)
            $(query).find(".description").val(entry.text);
        });
    //update the time on the page
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
    //update block colors
    var times = $(".time-block");
    var current = moment().hour();
    times.each(function(i, time) {
        var timeid = $(time).attr("data");

        if (timeid < current) {
            $(time).addClass("past");
        } else if (time > current) {
            $(time).addClass("future");
        }  else if (time === current) {
            $(time).addClass("present");
        }
    });
    //store in history
    $(".saveBtn").on("click", function(event) {
        //get the value
        var id = $(event.target).closest(".time-block").attr("data");
        //get txt input
        var text = $(event.target).closest(".time-block").find(".description").val();
        //get history
        var history = JSON.parse(localStorage.getItem("history")) || [];
        //create history entry
        var newEntry = {
            id: id,
            text: text
        }
        //push entry into history
        history.push(newEntry);
        //store history into local
        localStorage.setItem("history", JSON.stringify(history));
    });


});