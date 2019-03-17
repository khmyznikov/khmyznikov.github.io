var _opened = false;
function openEnvelope() {
    // if (!_opened){
        // document.body.classList.remove('reverse');
        document.body.classList.add('animate');
        // _opened = true;
    // } else{
    //     document.body.classList.remove('animate');
    //     void document.body.offsetWidth;
    //     document.body.classList.add('reverse');
    //     _opened = false;
    // }
}

function encode(str) {
    return encodeURIComponent(window.btoa(unescape(encodeURIComponent(str))));
}

function decode(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

var recipient = new URL(location.href).searchParams.get('recipient');
if (recipient){
    document.getElementById('recipient').innerText = decode(recipient);
}

var plural = new URL(location.href).searchParams.get('plural');
if (plural) {
    document.styleSheets[1].insertRule('.letter-text .plural {display: inline;}', 0)
    document.styleSheets[1].insertRule('.letter-text .single {display: none;}', 0);
}