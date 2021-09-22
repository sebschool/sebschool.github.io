// The slide links
let slides = {
    "WP lesson 0 review HTML, CSS, DOM" : `<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSAU2xHUpLh0rZWCTRDs5wxvGvS7t_wBbUPGKfHeBJRSrJl4dLCjnlJb6KDK1Oz8g/embed?start=false&loop=false&delayms=3000" frameborder="0" width="475" height="325" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>`,
    "WP lesson 1 PROGRAMMING CONCEPTS - part 1" : `<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRgsypZPltz5wEalzq0nem6f-ByM_e_a_pRCdCwC5Zw01gFaUJxAt-bDzxvvSGJsg/embed?start=false&loop=false&delayms=3000" frameborder="0" width="475" height="325" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>`,
    "WP lesson 2 PROGRAMMING CONCEPTS - part 2" : `<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQFhq7H1EZ4LqelY7Kdx1RL5Zcxlv0QaVjzGTmPiV1nW0otURPzaww1zQLCW_y8dQ/embed?start=false&loop=false&delayms=3000" frameborder="0" width="475" height="325" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>`,
    "WP lesson 3 PROGRAMMING CONCEPTS - part 3" : `<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRLBnhB79ZFAKUXu_EMdd4AXoHKLNX8yQNURbn7cqGiu9jf00z827q5wV_xbQc-0A/embed?start=false&loop=false&delayms=3000" frameborder="0" width="475" height="325" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>`,
    "WP lesson 4 COOKIES" : `<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRIiste8sMwIi9RMl_aMzOyAtBACFzWZr7Is1M3f-7K_KoGnb5QLQjxa5JTqHaNtg/embed?start=false&loop=false&delayms=3000" frameborder="0" width="475" height="325" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>`,
    "WP lesson 5 PROGRAMMING CONCEPTS - part 4" : `<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRPBTBq2DLNb5vsEknjA_IYJLFOen9erPx-ISNWhnomxi6wwe_G6ADlNArG3dB7EA/embed?start=false&loop=false&delayms=3000" frameborder="0" width="475" height="325" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>`,
    "WP lesson 6 DHTML" : `<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSPqZrlXRjTqy4XXU5u19UkS3XWPHNmvSl8jQ-K6-vJcOSW5G-w9MU1SR-a__n14A/embed?start=false&loop=false&delayms=3000" frameborder="0" width="475" height="325" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>`
};

// Dynamically setting the text of the <a> tags so I don't have to manually type them out
// And also setting the frame source for the powerpoint
function initATags() {
    // Getting all <a> tags and making an empty selected file string
    let aTags = document.getElementsByTagName("a");
    let selectedFile = "";
    // Looping through the <a> tags
    for (let i = 0; i < aTags.length - 1; i++) {
        selectedFile = decodeURI(  // Decoding the encoded url into a normal string, and setting that as the innerHTML of the <a> tag
            aTags[i].href.split("B/")[1]  // We get the href part of the tag, split it by 'B/' (because it's in the directory 'Lesson set B/') and get the second item, which is the link
        ).replace(".pptx", "");
        aTags[i].innerHTML = selectedFile;  // Setting the text of the link to the currently chosen file
        aTags[i].href = "#";  // Removing the link of the <a> tag
        aTags[i].setAttribute("onCLick", "changeSlide(this);");  // Giving the links functionality
    }
}

function changeSlide(self) {
    // Getting the div where the powerpoints will be placed
    document.getElementById("pptxFrame").innerHTML = slides[self.text];
    // Getting rid of the bold in all tags
    let aTags = document.getElementsByTagName("a");
    for (let i = 0; i < aTags.length; i++) {
        aTags[i].innerHTML = aTags[i].innerHTML.replace("<b>", "").replace("</b>", "");
    }
    // Enabling the download button and setting it's link to be the current powerpoint
    let downloadButton = document.getElementById("downloadButton");
    downloadButton.setAttribute("href", `Lesson set B/${self.innerHTML}.pptx`);
    downloadButton.setAttribute("download", `${self.innerHTML}.pptx`);
    // Making the chosen powerpoint link bold and unhiding the powerpoint download button
    self.innerHTML = `<b>${self.innerHTML}</b>`;
    downloadButton.hidden = false;
}