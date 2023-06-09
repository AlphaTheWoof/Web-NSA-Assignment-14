const url = window.location.search;
const urlParams = new URLSearchParams(url);
const token = urlParams.get("token");

localStorage.setItem("token", token);
let formData = new FormData();
formData.append("token", token);
var matches = postData("verifytoken.php", formData);
if (matches == "true")
{
    // automatically redirect the user to landing site
    window.location.href = "http://account.nsagroup14.com/landing.html";

}
else if (matches == "")
{
    //remove token from local storage
    localStorage.setItem("token", "");
    // change textbox text to not signed in
    document.getElementById("msgbox").value = "You are not signed in!";
    // Change button hyperlink to login page
    document.getElementById("login").href = "http://login.nsagroup14.com";

    // Redirect to login page automatically (optional)
    // window.location.replace("login.nsagroup14.com");
}

// submit form data via POST
function postData(url, data)
{
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.send(data);
    if (xhr.status === 200)
    {
        var data = xhr.responseText
        console.log(data);
        return data;
    }
}