// Function for the string manipulation
function stringTools(type) {
    // Getting the user's string
    let userString = document.getElementById("user_string").value;
    switch(type) {
        case "length":
            // Alerting the length of the string
            alert(`Object 1 is ${userString.length} character(s) long!`);
            break;
        case "uppercase":
            // Alerting the string converted to uppercase
            alert(`Object 1 as uppercase is:\n${userString.toUpperCase()}`);
            break;
        case "lowercase":
            // Alerting the string converted to lowercase
            alert(`Object 1 as lowercase is:\n${userString.toLowerCase()}`);
            break;
        case "position":
            // Getting the number in the number input below the string input
            let index = Math.round(parseFloat(document.getElementById("user_num").value));
            // Making sure that the user's string and the number are valid, if not we alert the user
            if (isNaN(index) || index >= userString.length || index < 0) {
                alert("Please enter a valid number/index!");
                break;
            }
            // Alerting the character at the chosen index
            alert(`Character at index ${index} of ${userString} is:\n${userString[index]}`);
            break;
    }
}

// Function for the number manipulation
function numberTools(type) {
    // Getting the user's number and making sure that it is valid (this is excluded if the user chooses to do the random number generator)
    let userNum = parseFloat(document.getElementById("user_num").value);
    if (isNaN(userNum) && type != "random") {
        alert("Please use a valid number!");
        return false;
    }
    let pi = 3.1415926535897932384626;  // I have somehow memorised this many digits of pi
    switch(type) {
        case "root":
            // Alerting the square root of the user's number
            alert(`The square root of ${userNum} is: ${Math.sqrt(userNum)}`);
            break;
        case "round":
            // Alerting the user's number rounded using the built in js funciton (there is no builtin way to round a number to the nth digit)
            alert(`${userNum} rounded to the nearest 10th is: ${Math.round(userNum)}`);
            break;
        case "random":
            // Generating a random number between 0 and 100 and alerting the number to the user
            alert(`We generated a random number for you, it is: ${Math.round(Math.random() * 100)}`);
            break;
        case "cos":
            // Alerting the cosine of the user's number (converted to degrees)
            alert(`The Cosine of the number ${userNum} is: ${Math.cos(userNum * (pi / 180))}`);
            break;
    }
}

// Function for the date manipulation
function dateTools(type) {
    // Getting the current date
    let date = new Date();
    switch (type) {
        case "time":
            // Alerting the current time to the user
            let time = date.toLocaleTimeString();
            alert(`The current time is: ${time}`);
            break;
        case "day":
            // Alerting the current day to the user
            // Adapted from https://stackoverflow.com/a/68084713/14128844
            let day = new Intl.DateTimeFormat('en-US', { weekday: 'long'}).format(date);
            alert(`The current day is: ${day}`);
            break;
        case "date":
            // Alerting the current date to the user
            let currentDate = date.toDateString();
            alert(`The current date is: ${currentDate}`);
            break;
        case "month":
            // Alerting the current month to the user by getting the index of the month in a list of the months
            let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];  // https://gist.github.com/Shivabeach/3966545
            let month = months[date.getMonth()];
            alert(`The current month is: ${month}`);
            break;
    }
}