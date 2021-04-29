// Select DOM elements to work with
const welcomeDiv = document.getElementById("WelcomeMessage");
const signInButton = document.getElementById("loginRedirect");
const cardDiv = document.getElementById("card-div");
const mailButton = document.getElementById("readMail");
const profileButton = document.getElementById("seeProfile");
const profileDiv = document.getElementById("profile-div");

function showWelcomeMessage(account) {
    // Reconfiguring DOM elements
    cardDiv.style.display = 'initial';
    welcomeDiv.innerHTML = `Welcome ${account.username}`;
    // signInButton.nextElementSibling.style.display = 'none';
    signInButton.setAttribute("onclick", "signOut();");
    signInButton.setAttribute('class', "btn btn-success ml-auto")
    signInButton.innerHTML = "Sign Out";
}

function updateUI(data, endpoint) {
    console.log('Graph API responded at: ' + new Date().toString());

    if (endpoint === graphConfig.graphMeEndpoint) {
        const title = document.createElement('p');
        title.innerHTML = "<strong>Title: </strong>" + data.jobTitle;
        const email = document.createElement('p');
        email.innerHTML = "<strong>Mail: </strong>" + data.mail;
        const phone = document.createElement('p');
        phone.innerHTML = "<strong>Phone: </strong>" + data.businessPhones[0];
        const address = document.createElement('p');
        address.innerHTML = "<strong>Location: </strong>" + data.officeLocation;
        profileDiv.appendChild(title);
        profileDiv.appendChild(email);
        profileDiv.appendChild(phone);
        profileDiv.appendChild(address);
    } else if (endpoint === graphConfig.graphMailEndpoint) {
        if (data.value.length < 1) {
            alert("Your mailbox is empty!")
        } else {
            const tabList = document.getElementById("list-tab");
            const tabContent = document.getElementById("nav-tabContent");

            data.value.map((d, i) => {
                // Keeping it simple
                if (i < 10) {
                    const listItem = document.createElement("a");
                    listItem.setAttribute("class", "list-group-item list-group-item-action")
                    listItem.setAttribute("id", "list" + i + "list")
                    listItem.setAttribute("data-toggle", "list")
                    listItem.setAttribute("href", "#list" + i)
                    listItem.setAttribute("role", "tab")
                    listItem.setAttribute("aria-controls", i)
                    listItem.innerHTML = d.subject;
                    tabList.appendChild(listItem)

                    const contentItem = document.createElement("div");
                    contentItem.setAttribute("class", "tab-pane fade")
                    contentItem.setAttribute("id", "list" + i)
                    contentItem.setAttribute("role", "tabpanel")
                    contentItem.setAttribute("aria-labelledby", "list" + i + "list")
                    contentItem.innerHTML = "<strong> from: " + d.from.emailAddress.address + "</strong><br><br>" + d.bodyPreview + "...";
                    tabContent.appendChild(contentItem);
                }
            });
        }
    }
}

function printRequest(){
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.print) {
        window.iOSPrintCapability = true;
    }

    if (window.iOSPrintCapability)
        window.webkit.messageHandlers.print.postMessage('print');
    else
        window.print();
}

function pushPermissionRequest(){
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers['push-permission-request']) {
        window.iOSPushCapability = true;
    }

    if (window.iOSPushCapability)
        window.webkit.messageHandlers['push-permission-request'].postMessage('push-permission-request');
}
window.addEventListener('push-permission-request', (message) => {
    if (message && message.detail){
        const buttonWrap = document.getElementById('push-permission-request-wrap');
        switch (message.detail) {
            case 'granted':
                buttonWrap.getElementsByClassName('badge-success')[0].style = '';
                buttonWrap.getElementsByClassName('badge-danger')[0].style = 'display:none';
                break;
            default:
                buttonWrap.getElementsByClassName('badge-success')[0].style = 'display:none';
                buttonWrap.getElementsByClassName('badge-danger')[0].style = '';
                break;
        }
    }
});
function pushPermissionState(){
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers['push-permission-state']) {
        window.iOSPushCapability = true;
    }

    if (window.iOSPushCapability)
        window.webkit.messageHandlers['push-permission-state'].postMessage('push-permission-state');
}
window.addEventListener('push-permission-state', (message) => {
    if (message && message.detail){
        const buttonWrap = document.getElementById('push-permission-state-wrap');
        // console.log(message.detail);
        switch (message.detail) {
            case 'notDetermined':
                buttonWrap.getElementsByClassName('badge-info')[0].style = '';
                buttonWrap.getElementsByClassName('badge-success')[0].style = 'display:none';
                buttonWrap.getElementsByClassName('badge-danger')[0].style = 'display:none';
                break;
            case 'denied':
                buttonWrap.getElementsByClassName('badge-danger')[0].style = '';
                buttonWrap.getElementsByClassName('badge-info')[0].style = 'display:none';
                buttonWrap.getElementsByClassName('badge-success')[0].style = 'display:none';
                break;
            case 'authorized':
            case 'ephemeral':
            case 'provisional':
                buttonWrap.getElementsByClassName('badge-success')[0].style = '';
                buttonWrap.getElementsByClassName('badge-danger')[0].style = 'display:none';
                buttonWrap.getElementsByClassName('badge-info')[0].style = 'display:none';
                break;
            default:
                buttonWrap.getElementsByClassName('badge-success')[0].style = 'display:none';
                buttonWrap.getElementsByClassName('badge-danger')[0].style = 'display:none';
                buttonWrap.getElementsByClassName('badge-info')[0].style = 'display:none'
                break;
        }
    }
});
window.addEventListener('push-notification', (message) => {
    if (message && message.detail) { 
        console.log(message.detail);
        if (message.detail.aps && message.detail.aps.alert)
            alert(`${message.detail.aps.alert.title} ${message.detail.aps.alert.body}`);
    }
});