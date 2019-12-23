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

let dateArray = [];
let $total =  0;

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
    
    const $checkboxes = $(".activities input");
    for (let k = 0; k < $checkboxes.length; k++) {
        
    if ($check.dataset.dayAndTime.includes("Tuesday 9am-12pm")) {
           console.log('yatta');
        } else if ($check.dataset.dayAndTime.includes("Tuesday 1pm-4pm")) {
            console.log("Yattada");
        } else if ($check.dataset.dayAndTime.includes("Wednesday 9am-12pm")) {
                   console.log("yokatta");
                   } else if ($check.dataset.dayAndTime.includes("Wednesday 1pm-4pm")) {
                       console.log("It is so");
                   }
    }
});
