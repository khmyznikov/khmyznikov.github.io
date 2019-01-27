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