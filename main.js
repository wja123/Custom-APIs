'use strict';

$(document).ready(function() {
    console.log("ready!");
    $(".birthday-input").on("click", birthdayHandler);
    $(".email-input-button").on("click", emailHandler);
    $(".text-input-button").on("click", textHandler);
    $(".sum-input-button").on("click", sumHandler);
    $(".multiply-input-button").on("click", multiHandler);
    $(".square-input-button").on("click", squareHandler);
});

function birthdayHandler(e) {
    e.stopPropagation;
    serverRequest("birthday", $(".birthday-value").val());
}

function emailHandler(e) {
    e.stopPropagation;
    serverRequest("gravatar", ($(".email-input").val()));
}

function textHandler(e) {
    e.stopPropagation;
    serverRequest("sentence", encodeURI($(".text-input").val()));
}

function sumHandler(e) {
    e.stopPropagation;
    serverRequest("sum", encodeURI($(".math-input").val().split(/[^\d+.-]/g).join("/")));
}

function multiHandler(e) {
    e.stopPropagation;
    console.log(encodeURI($(".math-input").val().split(/[^\d+.-]/g).join("/")));
    serverRequest("multiply", encodeURI($(".math-input").val().split(/[^\d+.-]/g).join("/")));
}

function squareHandler(e) {
    e.stopPropagation;
    console.log($(".math-input").val());
    serverRequest("square", encodeURI($(".math-input").val()));
}

function serverRequest(calltype, input) {
    $.ajax({
        method: "GET",
        url: "//localhost:8000/" + calltype + "/" + input,
        success: function(data) {
            dataHandler(calltype, data);
            console.log(data);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function updateGrav(link) {
    $(".grav-image").attr("src", link);
}

function updateTextAnalysis(data) {
    $(".text-area").text(data);
}

function updateBirthdayData(data) {
    $(".birthday-holder").text(data);
}

function updateMathData(data) {
    $(".math-area").text(data);
}

function dataHandler(calltype, data) {
    console.log(calltype);
    if (calltype === "gravatar") {
        updateGrav("//gravatar.com/avatar/" + data);
    } else if (calltype === "sentence") {
        updateTextAnalysis(data);
    } else if (calltype === "birthday") {
        updateBirthdayData(data);
    } else if (calltype === "sum" || calltype === "multiply" || calltype === "square") {
        updateMathData(data);
    }
}