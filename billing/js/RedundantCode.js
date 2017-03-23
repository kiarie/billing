/**
 * @func _listbills
 * function to return the list the billing options available on a channel
 * 

function _listbills() {
    var source = document.getElementById('category-template').innerHTML;

    var template = Handlebars.compile(source);
    var path = window.location.hash.substring(1);
    var catlist = document.querySelector('.category-list');
    _getAjx(`/list/${path}`)
        .then(function (data) {
            var context = { categories: JSON.parse(data) };
            var html = template(context);
            // //console.log(data);//
            if (catlist.nodeType === 1) {//node type is type of html node it is.
                catlist.innerHTML = html;
            }
            showform()
        }).catch(function (error) {
            //console.log(error);
        });
} 
/* 
function to to bind the toggle the payment options to click
takes in an argument which is the classname of the element which will be visible.
if not set it sets it as MPESA.

function toggle_tabs(index) {
    var tabs = document.querySelectorAll('.nav .rem-active a');
    if (index === undefined) index = 'MPESA';
    Array.from(tabs).map(function (link) {
        link.addEventListener('click', toggle);
        if (document.querySelector('.' + link.id) !== document.querySelector('.' + index)) {
            document.querySelector('.' + link.id).classList.add('hidden');
        }
    });
}
/* 
*Show hidden elements

function toggle(evt) {
    evt.preventDefault();
    toggle_tabs(evt.target.id);
    document.querySelector('.' + evt.target.id).classList.toggle('hidden');
}

*/