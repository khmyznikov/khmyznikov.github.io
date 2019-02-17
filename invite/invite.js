var _opened = false;
function openEnvelope() {
    if (!_opened){
        document.body.classList.remove('reverse');
        document.body.classList.add('animate');
        _opened = true;
    } else{
        document.body.classList.remove('animate');
        void document.body.offsetWidth;
        document.body.classList.add('reverse');
        _opened = false;
    }
}

function encode(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function decode(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

var recipient = new URL(location.href).searchParams.get('recipient');
if (recipient){
    document.getElementById('recipient').innerText = decode(recipient);
}
