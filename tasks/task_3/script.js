// Dynamically populating the selects
function populateLists() {
    // Function to populate a chosen select, this is a nested function to make the code look nicer
    function populate(select) {
        select = document.getElementById(select)
        select.innerHTML = "";
        for (let i = 1; i < 13; i++) {
            select.innerHTML += `<option value="${i}">${i}</option>`;
        }
    }
    // A for loop that populates all selects until none are left
    for (let i=0;;i++) {
        if (document.getElementById(`select${i}`) == null) {
            break;
        }
        populate(`select${i}`);
    }
    // Setting the second select to be the number 6
    document.getElementById("select1").selectedIndex = 5;
}

// The main function to roll the dice
function rollDice() {
    // Getting the minimum and maximum values
    let min = document.getElementById("select0");
    min = parseInt(min.options[min.selectedIndex].text);
    let max = document.getElementById("select1");
    max = parseInt(max.options[max.selectedIndex].text);

    // Setting up the random number variable and the current image variable
    let randNum = 0;
    let currentImg = undefined;

    // Generating 2 random numbers through a for loop
    for (let i = 0; i < 2; i++) {
        // Getting the random number
        randNum = Math.round(Math.random() * (max - min) + min);

        // Setting the disabled input to show the random number
        document.getElementById(`num${i}`).value = randNum;

        // Logic to display the currently rolled dice as an image
        currentImg = document.getElementsByTagName("img")[i];
        if (randNum > 0 && randNum < 7) {
            // If the image exists, we set the image's source to the image and set it to visible
            currentImg.src = `dice/${randNum}.png`;
            currentImg.hidden = false;
        } else {
            // If the image doesn't exist we hide it and log an error to the console
            currentImg.hidden = true;
            console.log(`dice/${randNum}.png DOES NOT EXIST`)
        }
    }
}