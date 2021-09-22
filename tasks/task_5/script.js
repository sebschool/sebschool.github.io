// The 'check' function that I'm not sure what it is, so I made a little funny joke!
function check() {
    let checkValue = document.getElementById('check').value;
    checkValue = `'${checkValue}'`
    if (checkValue == "''") {
        checkValue = "Absolutely nothing!"
    }
    alert(`I don't know what to put here, but you wrote\n${checkValue}\nin the text input above!`);
}

// The multiples table function
function createTable() {
    // Getting the variables
    let columns = parseInt(document.getElementById("columns").value);
    let multiple = parseInt(document.getElementById("multiple").value);
    let upperLimit = parseInt(document.getElementById("upper_limit").value);

    // Making sure the user actually used proper values
    if (
        columns == undefined || multiple == undefined || upperLimit == undefined ||
        isNaN(columns) || isNaN(multiple) || isNaN(upperLimit) || 
        columns == null || multiple == null || upperLimit == null
    ) {
        alert("Please use correct values!");
        return false;
    }

    // For loop setup variables
    let currentNum = 0;
    let tableStr = "<table border=1>";

    // Instead of using javascript to create the table through functions, we create the table as a string and document.write() it to the body
    // While true loop for writing to document
    while (true) {
        // Breaking the loop if the current number is greater than the upper limit
        if (currentNum > upperLimit) { break; }

        tableStr += "<tr>"

        // Looping through the columns
        for (let i = 0; i < columns;) {
            // Breaking the loop if the current number is greater than the upper limit
            if (currentNum > upperLimit) { break; }

            // If the current number is divisible by the user's chosen multiple, we add that to the tab;e
            if (currentNum % multiple == 0 && currentNum != 0) {
                tableStr += `<td>${currentNum}</td>`
                i ++;  // Only increasing i so the tables lay out correctly
            }
            // Increasing the current number
            currentNum ++;
        }
        tableStr += "</tr>"
    }
    tableStr += "</table>"

    // Writing the table to the document
    document.write(tableStr);
    return true;
}