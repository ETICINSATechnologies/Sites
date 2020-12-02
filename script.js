function handleNotFound(redirects) {
    var origin = window.location.origin;
    var infoDiv = document.getElementById("info");
    infoDiv.innerText = "";

    redirects.forEach(redirect => {
        var link = document.createElement("a");
        var image = document.createElement("img");
        var label = document.createElement("p");
        link.className = "link";
        link.title = redirect.title;
        label.innerText = redirect.title;
        if (redirect.image) {
            image.src = redirect.image;
        } else {
            image.src = "images/etic.png";
        }
        if (redirect.iframe === "TRUE") {
            link.href = origin + "/" + redirect.path;
        } else {
            link.href = redirect.to;
        }
        link.appendChild(image);
        link.appendChild(label);
        infoDiv.appendChild(link);
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
                if (redirect.iframe === "TRUE") {
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
    return found;
}

function initialise() {
    // First look at the redirects in config.js then look at those in the Google Sheets if not found
    if (!handleRedirect(REDIRECTS)) {
        fetch(SHEET)
            .then(response => response.text())
            .then(data => {
                var json = csvToJsonArray(data);
                if (!handleRedirect(json)) {
                    handleNotFound([...REDIRECTS, ...json]);
                }
            })
            .catch((error) => {
                console.error('Error fetching redirections sheet :', error);
            });
    }

}

initialise();
