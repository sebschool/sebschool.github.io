// Function to change the values in the select element
function changeSelect(userElement) {
    // If the checkbox isn't actually selected, we exit the function
    if (!userElement.checked) {
        return false;
    }

    // Getting the variables for editing the HTML
    let userElementValue = userElement.value;
    let selectValues = document.getElementById("select_values");
    selectValues.hidden = false;

    // Changing the values of the dropdown box depending on that checkbox was chosen
    switch(userElementValue) {
        case "Mac":
            selectValues.innerHTML = `
                <option>Macbook Pro</option>
                <option>Apple II</option>
                <option>IPad Air</option>
                <option>Iphone SE</option>
            `;
            break;
        case "Microsoft":
            selectValues.innerHTML = `
                <option>HP Pavillion</option>
                <option>Lenovo Thinkpad</option>
                <option>Windows Phone</option>
                <option>IBM 5100</option>
            `;
            break;
        case "Open Source":
            selectValues.innerHTML = `
                <option>Kali Linux</option>
                <option>Android</option>
                <option>Temple OS</option>
                <option>Lemon Clicker</option>
            `;
            break;
    }

    // Changing the text below the dropdown box
    return true;
}

// Changing the text below the dropdown box
function changeTextBelow(select) {
    let belowText = document.getElementById("select_disp");
    belowText.innerHTML = select.options[select.selectedIndex].text;
}