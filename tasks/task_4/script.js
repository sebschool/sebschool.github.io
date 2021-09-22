// Initialising the login database if it doesn't already exist in local storage
function initLoginDatabase() {
    // If the accounts don't exist, we create the database
    if (!localStorage.getItem("_accounts")) {
        // Creating the database with default values
        /* This is so very insecure, but as of writing this I have not begun learning sql and php so this feels like the best way to do logins */
        let accounts = {
            "Seb" : "password123",
            "Vlad" : "VB2021",
            "test" : "test"
        };
        // Placing the database into local storage
        localStorage.setItem("_accounts", JSON.stringify(accounts));
        window.location.href = "index.html";
    }

    // If the admin accounts list doesn't exist, we create it
    if (!localStorage.getItem("_admins")) {
        // Creating the admin logins
        /* Once again, very insecure but it will have to do until I learn php and sql */
        let admins = ["Seb", "Vlad", "test"];
        admins = admins.join("|");
        localStorage.setItem("_admins", admins);
        window.location.href = "index.html";
    }
}

function checkLoggedIn(openPage = true) {
    // Initialising the login database
    initLoginDatabase();

    // Getting the username and password from the local storage
    let userName = localStorage.getItem("username");
    let passWord = localStorage.getItem("password");

    // Getting the accounts 'database' from the local storage (so users can create their own accounts)
    let accounts = JSON.parse(
        localStorage.getItem("_accounts")
    );

    // Making sure that the username and password are correct
    if (accounts[userName] == undefined || accounts[userName] != passWord) {
        return false;
    }

    // Opening the logged in page
    if (openPage) { window.location.href = "logged_in.html"; }
    return true;
}

// Very simple logout function
function logout() {
    // Removing the username and password from the localstorage
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    // Moving the window back to the login page
    window.location.href = "index.html";
}

function login() {
    // Getting the username and password in the inputs
    userName = document.getElementById("username").value;
    passWord = document.getElementById("password").value;

    // Getting the accounts 'database' from the local storage (so users can create their own accounts)
    let accounts = JSON.parse(
        localStorage.getItem("_accounts")
    );

    // Making sure the logins are valid
    if (accounts[userName] == undefined || accounts[userName] != passWord) {
        alert("Invalid Login!");
        return false;
    }

    // Using site storage to set the username and password
    localStorage.setItem("username", userName);
    localStorage.setItem("password", passWord);

    // Opening the logged-in page
    checkLoggedIn();
    return true;
}

// Making a new account function
function newAccount() {
    // Getting the username and password
    let userName = document.getElementById("new_username").value;
    let passWord = document.getElementById("new_password").value;

    if (userName.length <= 0) {
        alert("Invalid username!");
        return false;
    }

    // Retrieving the database from the local storage
    let loginDatabase = JSON.parse(localStorage.getItem("_accounts"));

    // Making sure the account doesn't already exist
    if (loginDatabase[userName] != undefined) {
        alert("Account already exists!");
        return false;
    }
    
    // Adding the new logins to the database
    loginDatabase[userName] = passWord;

    // Placing the database back in local storage and sending the user back to the login screen
    localStorage.setItem("_accounts", JSON.stringify(loginDatabase));
    alert("New account created successfully!");
    window.location.href = "index.html";

    return true;
}

function changePassword() {
    // Getting the user's new password
    let newPassword = document.getElementById("change_pw");

    // Retrieving the database from the local storage
    let loginDatabase = JSON.parse(localStorage.getItem("_accounts"));

    // Making sure the new password is not the same as the old one
    if (newPassword.value == loginDatabase[localStorage.getItem("username")] || newPassword.value == localStorage.getItem("password")) {
        alert("New password cannot be the same as the old password!");
        return false;
    }

    // Adding the new password to the database and local storage
    loginDatabase[localStorage.getItem("username")] = newPassword.value;
    localStorage.setItem("password", newPassword.value);

    // Placing the database back in local storage
    localStorage.setItem("_accounts", JSON.stringify(loginDatabase));

    // Alerting the user of the success and reloading the page to reset the input
    alert("Password changed successfully");
    newPassword.value = "";
    window.location.reload();

    return true;
}

// Function to reset the database and local storage
function resetDB() {
    localStorage.clear();
    initLoginDatabase();
}

// https://stackoverflow.com/a/840849/14128844
function eliminateDuplicates(arr) {
    var i,
        len = arr.length,
        out = [],
        obj = {};
  
    for (i = 0; i < len; i++) {
      obj[arr[i]] = 0;
    }
    for (i in obj) {
      out.push(i);
    }
    return out;
  }

// Admin creation and deletion function
function admin(type) {
    // Getting the admins list and the admin input
    let admins = localStorage.getItem("_admins").split("|");
    let adminInput = document.getElementById("admin_input");
    switch (type) {
        // Adding the admin account to the admin accounts list
        case "new":
            if (admins.indexOf(adminInput.value) != -1) {
                alert("Admin already exists!");
                return false;
            }
            admins.push(adminInput.value);
            adminInput.value = "";
            admins = eliminateDuplicates(admins);
            alert("New admin created successfully!");
            break;
        // Removing the admin account from the admin accounts list
        case "remove":
            admins = eliminateDuplicates(admins);
            admins.splice(admins.indexOf(adminInput.value), 1);
            adminInput.value = "";
            alert("Admin successfully removed!");
            break;
    }
    // Saving the admin accounts to the local storage
    admins = admins.join("|");
    localStorage.setItem("_admins", admins);

    return true;
}

// Function to show the admin tools if the user is an admin
function checkAdmin() {
    let admins = localStorage.getItem("_admins").split("|");
    if (admins.includes(localStorage.getItem("username"))) {
        let adminTab = document.getElementsByName("tab")[2];
        adminTab.hidden = false;

        return true;
    }
    return false;
}

function deleteAccount() {
    // Making sure the user wants to delete their account
    if (!confirm("Are you sure you want to delete your account?")) {
        return false;
    }

    // Retrieving the database from the local storage
    let loginDatabase = JSON.parse(localStorage.getItem("_accounts"));

    // Deleting the account from the database
    delete loginDatabase[localStorage.getItem("username")];

    // Replacing the database
    localStorage.setItem("_accounts", JSON.stringify(loginDatabase));

    // Logging the now deleted user out
    logout();

    return true;
}

// Function for disabling and enabling the checkboxes depending on if they are checked or not
function decadeBornChange(self) {
    let checkBoxes = document.getElementsByName("decadeBorn");
    if (self.checked) {
        for (let i = 0; i < checkBoxes.length; i++) {
            if (!checkBoxes[i].checked) {
                checkBoxes[i].disabled = true;
            }
        }
    } else {
        for (let i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].disabled = false;
        }
    }
}

// Function to send the game results to the results page
function gameResults() {
    // Function to get the checked item in a group of checkboxes/radio buttons
    function getCheckedElmInName(name) {
        name = document.getElementsByName(name);
        for (let i = 0; i < name.length; i++) {
            if (name[i].checked) {
                return name[i].value;
            }
        }
    }

    // Setting up the url query string
    let url = new URL(
        window.location.origin + 
        Object.assign(document.createElement('a'), {href: '.'}).pathname +  // https://stackoverflow.com/a/63791106/14128844
        "results.html"
    );

    // Getting the variables for the query string
    let decadeBorn = getCheckedElmInName("decadeBorn");
    let favLanguage = getCheckedElmInName("favLanguage");
    let toiletPaperJoke = document.getElementById("toiletPaperJoke");
    toiletPaperJoke = toiletPaperJoke.options[toiletPaperJoke.selectedIndex].value;

    if (
        decadeBorn == undefined || 
        favLanguage == undefined || 
        toiletPaperJoke == undefined
    ) {
        alert("Please select one of ALL the checkboxes!");
        return false;
    }

    url.searchParams.set("decadeBorn", decadeBorn);
    url.searchParams.set("favLanguage", favLanguage);
    url.searchParams.set("toiletPaperJoke", toiletPaperJoke);

    window.location.href = url.href;

    return true;
}

// Function to change the current tab
function changeTab(tab, self = undefined) {
    if (self != undefined) {
        // Setting the currently selected button's colour
        for (const curTab of document.getElementsByName("tab")) {
            curTab.style.backgroundColor = "white";
        }
        self.style.backgroundColor = "grey";
    }

    // Changing the tab's innerhtml
    // This would probably look better using frames or external files, but there are already enough files in this directory
    let innerTab = document.getElementById("inner_tab");
    let mainDiv = document.getElementById("main_content");
    switch(tab) {
        case "fun":
            innerTab.innerHTML = `
                <h3 align="center">Fun and games</h3>
                <p style="font-size: 12px;"><b>&emsp;What decade were you born in:</b></p>
                &emsp;<input type="checkbox" name="decadeBorn" value="70s" onChange="decadeBornChange(this);"> 70s
                &emsp;<input type="checkbox" name="decadeBorn" value="80s" onChange="decadeBornChange(this);"> 80s<br>
                &emsp;<input type="checkbox" name="decadeBorn" value="90s" onChange="decadeBornChange(this);"> 90s
                &emsp;<input type="checkbox" name="decadeBorn" value="2000s" onChange="decadeBornChange(this);"> 2000s<br>
                <p style="font-size: 12px;"><b>&emsp;Which of these languages do you use the most:</b></p>
                &emsp;<input type="radio" name="favLanguage" value="Python"> Python
                &emsp;<input type="radio" name="favLanguage" value="Javascript"> Javascript<br>
                &emsp;<input type="radio" name="favLanguage" value="C#"> C#&emsp;&emsp;
                &emsp;<input type="radio" name="favLanguage" value="C/C++"> C/C++<br>
                <p style="font-size: 12px;"><b>&emsp;Why did the toilet paper roll down the hill?</b></p>
                &emsp;<select id="toiletPaperJoke">
                    <option>To get to the other side!</option>
                    <option>To get to the bottom!</option>
                    <option>I'm not sure...</option>
                </select><br>
                <p align="center"><button onClick="gameResults();">Check your results!</button></p>
            `;
            mainDiv.style.height = "350px";
            break;
        case "account":
            innerTab.innerHTML = `
            <h3 align="center">
                Account options<br><br>
                <button onClick="logout();">Logout</button>
                <button onClick="deleteAccount();">Delete account</button><br>
                <input id="change_pw" type="password" placeholder="New password here" size="16">
                <button onClick="changePassword();">Change Password</button>
            </h3>
            `;
            mainDiv.style.height = "165px";
            break;
        case "admin":
            innerTab.innerHTML = `
            <h3 align="center">
                Administrator Tools<br><br>
                <button onClick="resetDB();">Reset Login Database</button><br>
                <input id="admin_input" type="text" placeholder="Username here" /><br>
                <button onClick="admin('new');">Add user to Admins</button><br>
                <button onClick="admin('remove');">Remove user from Admins</button>
            </h3>
            `;
            mainDiv.style.height = "215px";
            break;
    }
}