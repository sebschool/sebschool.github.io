// Function to simply change the content frame, I could have used target="main frame" but JS is fun!
function changeFrame(url, self) {
    // Getting all <a> tags
    let aTags = document.getElementsByTagName("a");
    // Removing the bold text from all the <a> tags
    for (let i = 0; i < aTags.length; i++) {
        aTags[i].innerHTML = aTags[i].innerHTML.replace("<b>", "");
        aTags[i].innerHTML = aTags[i].innerHTML.replace("</b>", "");
    }
    // Setting the current <a> tag to be bold as to indicate that it is selected
    self.innerHTML = `<b>${self.innerHTML}</b>`;
    // Setting the content frame's source to that of the <a> tag
    frame = document.getElementById("content_frame");
    frame.src = url;
}