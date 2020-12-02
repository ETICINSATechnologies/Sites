function handleNotFound(redirects) {
    var origin = window.location.origin;
    var infoDiv = document.getElementById("info");
    var linkList = document.createElement("ul");
    infoDiv.innerText = "";
    infoDiv.appendChild(linkList);

    redirects.forEach(redirect => {
        var linkListItem = document.createElement("li");
        var link = document.createElement("a");
        link.innerText = redirect.title;
        if (redirect.iframe==="TRUE") {
            link.href = origin + "/" + redirect.path;
        } else {
            link.href = redirect.to;
        }
        linkListItem.appendChild(link);
        linkList.appendChild(linkListItem);
    });
}

function toIframe(redirect) {
    var body = document.body;
    body.innerHTML = "";
    var iframe = document.createElement("iframe");
    iframe.src = redirect.to;
    iframe.id = "iframe";
    body.appendChild(iframe);
    document.title = redirect.title;
}

function handleRedirect(redirects) {
    try {
        var path = window.location.pathname;
        var found = false;
        path = path.replace(/\/$/, ""); // remove trailing slash
        path = path.split("/").pop(); //get string after last slash
        redirects.forEach(redirect => {
            if (path === redirect.path) {
                if (redirect.iframe==="TRUE") {
                    toIframe(redirect);
                } else {
                    window.location = redirect.to;
                }
                found = true;
                return;
            }
        });
    } catch (error) {
        window.alert("Redirection error, please use a valid path")
    }
    if (!found) handleNotFound(redirects);
}

function initialise() {
    fetch(SHEET)
        .then(response => response.text())
        .then(data => {
            var json = csvToJsonArray(data);
            handleRedirect(json);
        })
        .catch((error) => {
            console.error('Error fetching redirections sheet :', error);
        });
}

initialise();
