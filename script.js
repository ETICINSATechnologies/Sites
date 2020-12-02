function handleNotFound() {
    var origin = window.location.origin;
    var infoDiv = document.getElementById("info");
    var linkList = document.createElement("ul");
    infoDiv.innerText = "";
    infoDiv.appendChild(linkList);

    REDIRECTS.forEach(redirect => {
        var linkListItem = document.createElement("li");
        var link = document.createElement("a");
        link.innerText = redirect.title;
        link.href = origin + redirect.path;
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

function initialise() {
    try {
        var path = window.location.pathname.split("/").pop();
        REDIRECTS.forEach(redirect => {
            if (path === redirect.path) {
                if (redirect.iframe) {
                    toIframe(redirect.path);
                } else {
                    window.location = redirect.path;
                }
            }
        });
    } catch (error) {
        window.alert("Redirection error, please use a valid path")
    }
    handleNotFound();
}

initialise();
