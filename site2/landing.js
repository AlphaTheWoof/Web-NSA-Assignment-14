const token = localStorage.getItem("token");

let formData = new FormData();
formData.append("token", token);
var matches = postData("verifytoken.php", formData);
// Auth fail
if (matches == "")
{
    localStorage.setItem("token","");
    window.location.href = "http://login.nsagroup14.com";
}

//Auth correct (do nothing)

function postData(url, data)
{
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.send(data);
    if (xhr.status === 200)
    {
        var data = xhr.responseText;
        return data;
    }
}

// logout function removes token from localstorage
function logout()
{
    localStorage.setItem("token","");
    window.location.href = "http://login.nsagroup14.com";
}