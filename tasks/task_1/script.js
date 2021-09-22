// Dynamically adding numbers to the list
function populateList() {
    let select = document.getElementById("numbers");
    for (let i = 0; i < 13; i++) {
        select.innerHTML += `<option value="${i}">${i}</option>`;
    }
}

// For populating the list (https://stackoverflow.com/a/66971954/14128844)
if (window.addEventListener) {
    window.addEventListener("load", populateList, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", populateList);
} else {
    window.onload = populateList; //will override previously attached event listeners.
}

// Generating the multiplication table
function generateTable() {
    // Getting the values
    let select = document.getElementById("numbers");
    let number = select.options[select.selectedIndex].text;

    // Setting the values to the html
    let tableTag = document.getElementById("table_content");
    let solution = 0;
    tableTag.innerHTML = "";
    for (let i = 0; i < 13; i++) {
        solution = number * i;
        tableTag.innerHTML += `${number} X ${i} = ${solution}<br>`;
    }
}