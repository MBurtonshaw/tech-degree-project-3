///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////PROJECT THREE/////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Focus on first input upon pageload.
$("#name").focus();

//Hide "other job" text input.
$("#other-title").hide();

//Variable containing all the color options, to be looped through.
const $options = $("#colors-js-puns option");

//Function to hide shirt color options being used upon page load.
hideShirts();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////JOB ROLE SECTION/////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Conditional statement to check if "other" value was chosen in drop-down. If so, it shows a text input, if not it's hidden.
$("#title").change(function() {
    if ($("#title").val() === "other") {
        $("#other-title").show();
    } else {
        $("#other-title").hide();
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////SHIRT COLOR SECTION///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Function to remove all shirt color options.
function hideShirts() {
    for (let i = 0; i < $options.length; i++) {
        let $defaultDesign = $("#design option").eq(0);
        let $chosenOption = $options[i];
        $defaultDesign.text("");
        $options[1].remove();
        $options[2].remove();
        $options[3].remove();
        $options[4].remove();
        $options[5].remove();
        $options[0].text = "Please select a T-shirt theme";
    }
}

//Function to append the shirt options corresponding to "JS puns".
function showShirts_puns() {
    for (let i = 0; i < $options.length; i++) {
        //Changing text back from placeholder
        $options[0].text = "Cornflower Blue (JS Puns shirt only)";
        //Appending correct options
        $("#color").append($options[0]);
        $("#color").append($options[1]);
        $("#color").append($options[2]);
    }
}

//Function to append the shirt options corresponding to "I heart JS".
function showShirts_love() {
    for (let i = 0; i < $options.length; i++) {
        //Removing default [0] option.
        $options[0].remove();
        //Appending correct options.
        $("#color").append($options[3]);
        $("#color").append($options[4]);
        $("#color").append($options[5]);
    }
}

//Method in which when a design is chosen, the corresponding color options will appear.
$("#design").change(function() {
    if ($("#design").val() === "js puns") {
        hideShirts();
        showShirts_puns();
    } else if ($("#design").val() === "heart js") {
        hideShirts();
        showShirts_love();
    } else {
        hideShirts();
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////ACTIVITIES SECTION//////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////CALCULATE TOTAL///////////////////////////////////////////////////////////////////////
//

let dateArray = [];
let $total = 0;

//Method set up so that for every box checked, an input is added to dateArray and the $total is changed.
$(".activities input").on("change", function(event) {
    //Variable used to call upon $totalDiv, and a conditional statement to see if it exists yet. Deletes clone divs when checking multiple boxes.
    let $divCheck = $("#divCheck");
    if ($divCheck !== null) {
        $divCheck.remove();
    }

    let $check = event.target;
    let isChecked = $check.checked;
    //Conditional statements checking:
    //1: if checkbox has name "all", upon checking 200 is added to total and entry is added to array.
    if ($check.name === "all" && isChecked) {
        $total += 200;
        dateArray.push($check.name);
        //2: if checkbox had name "all" and is already checked, upon unchecking 200 is deducted from total and entry is deleted from array.
    } else if ($check.name === "all") {
        $total -= 200;
        dateArray.pop();
        //3: if a checkbox is unchecked, upon checking 100 is added to the total and the entry is added to the array.
    } else if (isChecked) {
        $total += 100;
        dateArray.push($check.name);
        //4: if a checkbox is already checked, upon unchecking 100 is deducted from total and the entry is deleted from the array.
    } else {
        $total -= 100;
        dateArray.pop();
    }

    //Div is created upon clicking that displays $total.
    let $totalDiv = "<div id='divCheck'>" + "$" + $total + "</div>";
    $(".activities").append($totalDiv);

    /////////////////////////////////////////////////CHECKBOX FUNCTIONALITY////////////////////////////////////////////////////////////////
    //

    const $checkboxes = $(".activities input");
    for (let k = 0; k < $checkboxes.length; k++) {
        let $chosenBox = $checkboxes[k];
        let $chosenLabel = $(".activities label")[k];
        let $checkboxData = $chosenBox.dataset.dayAndTime;

        if ($check.dataset.cost < 200) {
            if ($check.dataset.dayAndTime === $checkboxData) {
                if ($chosenBox.checked != true) {
                    $chosenBox.disabled = true;
                    $chosenLabel.style.color = "red";
                    if ($check.checked != true) {
                        $chosenBox.disabled = false;
                        $chosenLabel.style.color = "";
                    }
                }
            }
        }
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////PAYMENT SECTION///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////PAYMENT METHODS//////////////////////////////////////////////////////////////////////
//
const $payment = $("#payment");

//Setting default selection as "credit card"
$("#payment option")
    .eq(1)
    .attr("selected", true);

//Initially hiding Paypal & Bitcoin options
$("#paypal").hide();
$("#bitcoin").hide();

//Function to hide or show payment options based on selection in dropdown
$payment.on("change", function() {
    if ($payment.val() === "credit card") {
        $("#credit-card").show();
        $("#paypal").hide();
        $("#bitcoin").hide();
    } else if ($payment.val() === "paypal") {
        $("#credit-card").hide();
        $("#bitcoin").hide();
        $("#paypal").show();
    } else if ($payment.val() === "bitcoin") {
        $("#credit-card").hide();
        $("#paypal").hide();
        $("#bitcoin").show();
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////VALIDATION SECTION////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////NAME//////////////////////////////////////////////////////////////////////////
//
//RegEx for name input
const regExName = /^[a-z\s]+$/i;
//Flash warning for credit card section
const $nameFlash = $("<span id='nameWarning'></span").html(
    "Please enter your full name" + "<br>"
);
$nameFlash.css("color", "red");
$(".col-6").append($nameFlash);
$nameFlash.hide();
//Keyup event for name validation
$("#name").on("keyup", function(e) {
    if (
        !$("#name")
            .val()
            .match(regExName)
    ) {
        $("#name").css("border-color", "red");
    } else {
        $("#name").css("border-color", "rgb(111, 157, 220)");
    }
});
//Variables for use with Paypal & Bitcoin
const $nameFlash2 = $("<span id='nameWarning2'></span").html(
    "Please enter your full name" + "<br>"
);
const $nameFlash3 = $("<span id='nameWarning3'></span").html(
    "Please enter your full name" + "<br>"
);
//Formatting for later use
const $paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");
$paypal.firstElementChild.innerHTML += "<br>";
bitcoin.firstElementChild.innerHTML += "<br>";
//Appending, styling, & hiding variables for later use
$nameFlash2.css("color", "red");
$nameFlash3.css("color", "red");
$("#paypal p").append($nameFlash2);
$("#bitcoin p").append($nameFlash3);
$nameFlash2.hide();
$nameFlash3.hide();

//////////////////////////////////////////////////////////////////////EMAIL/////////////////////////////////////////////////////////////////
//
//RegEx for email input
const regExEmail = /^[^@]+@[^@.]+.[a-z]+$/i;
//Flash warning for credit card section
const $emailFlash = $("<span id='emailWarning'></span").html(
    "Please enter a valid eMail address" + "<br>"
);
$emailFlash.css("color", "red");
$(".col-6").append($emailFlash);
$emailFlash.hide();
//Keyup event for email validation
$("#mail").on("keyup", function(e) {
    if (
        !$("#mail")
            .val()
            .match(regExEmail)
    ) {
        $("#mail").css("border-color", "red");
    } else {
        $("#mail").css("border-color", "rgb(111, 157, 220)");
    }
});
//Variables for use with Paypal & Bitcoin
const $emailFlash2 = $("<span id='emailWarning2'></span").html(
    "Please enter a valid eMail address" + "<br>"
);
const $emailFlash3 = $("<span id='emailWarning3'></span").html(
    "Please enter a valid eMail address" + "<br>"
);
//Styling, appending, & hiding variables for later use
$emailFlash2.css("color", "red");
$emailFlash3.css("color", "red");
$("#paypal p").append($emailFlash2);
$("#bitcoin p").append($emailFlash3);
$emailFlash2.hide();
$emailFlash3.hide();

/////////////////////////////////////////////////////////////////CREDIT CARD///////////////////////////////////////////////////////////////////
//
//RegEx for credit card input
const regExCard = /^(\d{4})\D*(\d{4})\D*(\d{4})\D*(\d{4})$/;
//Flash message for credit card input, styling, appending, and initial hiding
const $cardFlash = $("<span id='cardWarning'></span").html(
    "Please enter a valid 16 digit card number" + "<br>"
);
$cardFlash.css("color", "red");
$(".col-6").append($cardFlash);
$("#cardWarning").hide();

//Keyup event for credit card validation
$("#cc-num").on("keyup", function(e) {
    if (
        !$("#cc-num")
            .val()
            .match(regExCard)
    ) {
        $cardFlash.show();
    } else {
        $cardFlash.hide();
    }
});

//Function to reformat credit card number to "xxxx xxxx xxxx xxxx"
function reformatCredit(text) {
    const regex = /^(\d{4})\D*(\d{4})\D*(\d{4})\D*(\d{4})$/g;
    return text.toString().replace(regex, "$1 $2 $3 $4");
}

//Blur event to initiate reformatting function
$("#cc-num").on("blur", function(e) {
    e.target = $("#cc-num");
    $("#cc-num").val(reformatCredit($("#cc-num").val()));
});

//RegEx for zip code input
const regExZip = /^\d{5}$/;
//Flash message for zip code input, styling, appending, and initial hiding
const $zipFlash = $("<span id='zipWarning'></span").html(
    "Please enter a valid 5 digit ZIP code" + "<br>"
);
$zipFlash.css("color", "red");
$(".col-6").append($zipFlash);
$("#zipWarning").hide();

//Keyup event for zip code validation
$("#zip").on("keyup", function(e) {
    if (
        !$("#zip")
            .val()
            .match(regExZip)
    ) {
        $zipFlash.show();
    } else {
        $zipFlash.hide();
    }
});

//RegEx for CVV input
const regExCVV = /^\d{3}$/;
//Flash message for CVV input, styling, appending, and initial hiding
const $cvvFlash = $("<span id='cvvWarning'></span").html(
    "Please enter a valid 3 digit CVV" + "<br>"
);
$cvvFlash.css("color", "red");
$(".col-6").append($cvvFlash);
$("#cvvWarning").hide();

//Keyup event for CVV validation
$("#cvv").on("keyup", function(e) {
    if (
        !$("#cvv")
            .val()
            .match(regExCVV)
    ) {
        $cvvFlash.show();
    } else {
        $cvvFlash.hide();
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////SUBMIT BUTTON///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("button").on("click", function(e) {
    ////////////////////////////////////////////////////////////////CREDIT CARD INFO///////////////////////////////////////////////////////////
    //
    if ($("#payment").val() === "credit card") {
        if (
            !$("#name")
                .val()
                .match(regExName)
        ) {
            e.preventDefault();
            $nameFlash.show();
            $("#name").css("border-color", "red");
        } else {
            $nameFlash.hide();
            $("#name").css("border-color", "rgb(111, 157, 220)");
        }
        if (
            !$("#mail")
                .val()
                .match(regExEmail)
        ) {
            e.preventDefault();
            $emailFlash.show();
            $("#mail").css("border-color", "red");
        } else {
            $emailFlash.hide();
            $("#mail").css("border-color", "rgb(111, 157, 220)");
        }
        if (
            !$("#cc-num")
                .val()
                .match(regExCard)
        ) {
            e.preventDefault();
            $cardFlash.show();
        } else {
            $cardFlash.hide();
        }
        if (
            !$("#zip")
                .val()
                .match(regExZip)
        ) {
            e.preventDefault();
            $zipFlash.show();
        } else {
            $zipFlash.hide();
        }
        if (
            !$("#cvv")
                .val()
                .match(regExCVV)
        ) {
            e.preventDefault();
            $cvvFlash.show();
        } else {
            $cvvFlash.hide();
        }
        //////////////////////////////////////////////////////////////PAYPAL///////////////////////////////////////////////////////////////////
        //
    } else if ($("#payment").val() === "paypal") {
        if (
            !$("#name")
                .val()
                .match(regExName)
        ) {
            e.preventDefault();
            $nameFlash2.show();
            $("#name").css("border-color", "red");
        } else {
            $nameFlash2.hide();
            $("#name").css("border-color", "rgb(111, 157, 220)");
        }
        if (
            !$("#mail")
                .val()
                .match(regExEmail)
        ) {
            e.preventDefault();
            $emailFlash2.show();
            $("#mail").css("border-color", "red");
        } else {
            $emailFlash2.hide();
            $("#mail").css("border-color", "rgb(111, 157, 220)");
        }
        ////////////////////////////////////////////////////////////////BITCOIN////////////////////////////////////////////////////////////////
        //
    } else if ($("#payment").val() === "bitcoin") {
        if (
            !$("#name")
                .val()
                .match(regExName)
        ) {
            e.preventDefault();
            $nameFlash3.show();
            $("#name").css("border-color", "red");
        } else {
            $nameFlash3.hide();
            $("#name").css("border-color", "rgb(111, 157, 220)");
        }
        if (
            !$("#mail")
                .val()
                .match(regExEmail)
        ) {
            e.preventDefault();
            $emailFlash3.show();
            $("#mail").css("border-color", "red");
        } else {
            $emailFlash3.hide();
            $("#mail").css("border-color", "rgb(111, 157, 220)");
        }
    }
});

//Add validation for activities section
//-Check what's needed for "exceeds"
