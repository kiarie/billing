function load() {

    console.log("load event detected!");
    // var source   = $("#entry-template").html();
    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    var compileto = document.querySelectorAll('.channels');
    /*there are two DOM elements with this links so select all
     inorder to iterate with them all running the reqiured functions on them
   */

    _getAjx('/list').then(function (data) {
        var rdata = JSON.parse(data);
        var context = { items: rdata };
        var html = template(context);
        console.log(context);
        //iterate through the elem and apply function to each element.
        Array.from(compileto).map(function (elem) {
        elem.innerHTML = html;
            // console.log(html);
        });
        getLinks();

    }, function (error) {
        var rdata = JSON.parse(error);
        console.log(error);
        alert('Problem with the connection ' + rdata.error);
    });
    // var compileto = document.querySelector('.channels');

}
/*
@func ajx
 This is the function that triggers the partial calls to the server for 
essentially the content to be loaded.
*/
function ajx(e) {
    e.preventDefault();
    console.log('triggered to call partial')

    var url = e.target.href;
    window.history.pushState({ page: url }, null, url)
    // var tar = window.location.pathname;
    var tar = window.location.hash.substring(1);
    console.log(tar);
    var slide = document.getElementById('slid');
    var response;
    _get(tar, function (res) {
        response = res;
        slide.innerHTML = res;
        return response
    });
}
function _get(pathname, callback) {
    var xhr = new XMLHttpRequest();
    // var loaded;
    xhr.onload = function (evt) {
        callback(this.response);
        showform();//list the billing options available
    }
    xhr.onreadystatechange = function () {
        var loader = document.createElement('img');
        if (xhr.readyState == 1) {

            loader.src = "images/loader.gif";
            loader.id = "loader"
            loader.style.position = "fixed";
            loader.style.zIndex = "1000";
            loader.style.top = "34%";
            loader.style.left = "49%";

            document.body.appendChild(loader);

        }
        if (xhr.readyState == 4) {
            document.body.removeChild(document.getElementById('loader'))


        }
    }
    xhr.open('GET', `partial/${pathname}`);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    xhr.send();

}
/**
 * @funct _getAjx
 * function to return a get request as a promise so we can
 * use it in other functions.
 */
function _getAjx(pathname) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function (evt) {
            if (xhr.status === 200) {
                resolve(this.response)
            } else {
                reject(this.response);
            }
        }
        xhr.onreadystatechange = function () {
            var loader = document.createElement('img');
            if (xhr.readyState == 1) {

                loader.src = "images/loader.gif";
                loader.id = "loader"
                loader.style.position = "fixed";
                loader.style.zIndex = "1000";
                loader.style.top = "34%";
                loader.style.left = "49%";

                document.body.appendChild(loader);

            }
            if (xhr.readyState == 4) {
                document.body.removeChild(document.getElementById('loader'))
            }
        }
        xhr.onerror = reject;
        xhr.open('GET', `${pathname}`);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
        xhr.send();
    });
}
/**
 * @func _post
 * My own custom post ajax functions that returns a promise
 * simple enough but works \^^/ 
 *  */
function _post(pathname, formdata) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function (evt) {
            resolve(this.response);
        }
        xhr.onerror = reject;
        xhr.open('POST', `${pathname}`);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(formdata);
    });
}
/**
 * @func getLinks
 * hijack all links in header nav and attacheventlistener that does ajax calls on click"
*/
function getLinks() {
    var links = Array.from(document.querySelectorAll('.channels > li a'));
    links.forEach(function (link) {
        link.addEventListener('click', ajx);
    });
}
/**
 * @func _onChange
 * function to enact change of content
*/
function _onChange() {
    var paths = window.location.hash.substring(1), pathname = paths.split('/');
    var slide = document.getElementById('slid');
    if (paths !== '') {
        _getAjx(`/partial/${paths}`).
            then(function (response) {
                slide.innerHTML = response;
                if (pathname[1] === 'payments') {
                    var biller = pathname[0];
                    document.querySelector('.form-horizontal input[name="biller"]').value = biller;//the biller                 
                    document.querySelector('#biller').textContent = sessionStorage.getItem(biller);
                    document.querySelector('#purchase h3').textContent = `Pay For ${sessionStorage.getItem(biller)}`;
                    showform(); postform(document.forms['payform']);//postform is called on the payforms form 
                    console.log(sessionStorage.getItem(biller));
                    console.log(biller);

                }
            }).catch(function (error) {
                window.history.back();
                console.log(error)
            })
    }

    console.log('imeitwa');


}
/**
 * @func _listbills
 * function to return the list the billing options available on a channel
 * 
 */
function _listbills() {
    var source = document.getElementById('category-template').innerHTML;

    var template = Handlebars.compile(source);
    var path = window.location.hash.substring(1);
    var catlist = document.querySelector('.category-list');
    _getAjx(`/list/${path}`)
        .then(function (data) {
            var context = { categories: JSON.parse(data) };
            var html = template(context);
            // console.log(data);//
            if (catlist.nodeType === 1) {//node type is type of html node it is.
                catlist.innerHTML = html;
            }
            showform()
        }).catch(function (error) {
            console.log(error);
        });
}
/* 
function to to bind the toggle the payment options to click
takes in an argument which is the classname of the element which will be visible.
if not set it sets it as MPESA.
*/
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
*/
function toggle(evt) {
    evt.preventDefault();
    toggle_tabs(evt.target.id);
    document.querySelector('.' + evt.target.id).classList.toggle('hidden');
}
//this is the one that renders the request for payment form bind it so that it works
function showform() {
    var payfor = document.querySelectorAll('.fh5co-property-innter a,.fh5co-property-specification a');
    console.log(payfor);
    Array.from(payfor).map(function (link) {
        link.addEventListener('click', togglepay)
    });
}
//@func togglepay        
//this function is the one that toggles the payment page that is the form that posts the info
function togglepay(evt) {
    evt.preventDefault();
    console.log("is it called the payments?")
    var theElem = evt.target;//the element that triggers the event
    var slide = document.getElementById('slid'),
        billername = theElem.getAttribute('data-name'), category = theElem.getAttribute('cat-name'),
        pathname = theElem.hash.substring(1).split('/');//the path got from the hash in the elements href then split to get the payments page form
    window.location.hash = theElem.hash;//triggers the _onChange() which does the rest     
    // window.history.pushState({page:'previous'},null,evt.target.href);
    var path = pathname[1], biller = pathname[0];
    //store a session for use
    sessionStorage.setItem(biller, billername);
}
/**
 * @postform binds an element to the submit eventlistener element is a form
 * this is for reuse since there will be a couple of forms to submit
 */
function postform(elem) {
    console.log(elem);
    console.log('form imeitwa ya payments');
    elem.addEventListener('submit', formvalid);
    Array.from(elem).map(function (e) {
        if (e.nodeName == "INPUT" && e.type !== "hidden") {
            e.addEventListener('blur', validation);
            console.log(e.type)
        }
    })
}
/** @func postforms
*   post the complete payment form to process
*/
function postforms(evt) {
    evt.preventDefault();
    var form = evt.target;//the element that triggers the event
    //can define variables in one comma seperated line in javascript awesome!! below
    console.log(form)
    var path = form.action, formdata = new FormData(form), jsons = {};
    //iterate object make an array out of it and map each element to the jsons object notation
    Array.from(formdata.entries()).map(function (f) {
        return jsons[f[0]] = f[1];
    })
    var slide = document.getElementById('best-deal');
    _post(path, JSON.stringify(jsons)).then(function (data) {
        slide.innerHTML = data;
        window.history.pushState({ page: 'previous' }, null, evt.target.href)
        toggle_tabs();
    }, function (error) {
        console.log(error);
    });
}
/**
 * @func bill complete a billing transaction
 */
function bill() {
    var postbill = document.forms['complete-bill'];
    if (postbill !== undefined) {
        postform(postbill);
        postform.submit();
    }
}
function formvalid(evt) {
    evt.preventDefault(); //pevent preventDefault submit
    var form = evt.target;//this is the submited form
    console.log(form.tel.value)

    if (isNaN(form.tel.value) || form.tel.value.length < 12 || form.tel.value == "" || form.tel.value.substring(0, 3) !== "254") {
        console.log(form.tel.parentElement.parentElement);
        form.tel.parentElement.parentElement.classList.add('has-error');
        form.tel.focus(); return false;
    } else if (form.eml.value.match('/[A-za-z0-9_%.]+@[A-Za-z0-9.-]+\.[A-z.]{3}$/') || form.eml.value == "") {
        addClass(form.eml.parentElement.parentElement, 'has-error');
        form.eml.focus(); return false;
    }
    else if (isNaN(form.amount.value) || form.amount.length < 7 || form.amount.value == "") {
        addClass(form.amount.parentElement.parentElement, 'has-error');
        form.amount.focus(); return false;
    }
    else if (isNaN(form.account.value) || form.account.length < 17 || form.account.value == "") {
        addClass(form.account.parentElement.parentElement, 'has-error');
        form.account.focus(); return false;
    } else {
        evt.target.submit();
        //postforms(evt);//submit the from if everything else is okay           
    }


}
function validation(evt) {
    var e = evt.target;

    switch (e.name) {
        case 'tel':
            if (isNaN(e.value) || e.value.length < 12 || e.value.length > 12 || e.value == "" || e.value.substring(0, 3) !== "254") {
                e.setCustomValidity("Enter a valid Telephone number starting with the prefix 254");
                addClass(e.parentElement.parentElement, 'has-error');
                e.focus();
                return false;
            } else {
                e.setCustomValidity("");
                toggleRemove(e.parentElement.parentElement, 'has-error')
            }
            break;
        case 'eml':
            var regstr = /[A-za-z0-9_%.]+@[A-Za-z0-9.-]+\.[A-z.]{2,3}$/;
            if (!regstr.test(e.value) || e.value == "") {
                addClass(e.parentElement.parentElement, 'has-error');
                e.setCustomValidity("Enter a valid Email address");
                e.focus(); return false;
            } else {
                e.setCustomValidity("");
                toggleRemove(e.parentElement.parentElement, 'has-error')
            }
            break;
        case 'account':
            if (isNaN(e.value) || e.value.length < 10 || e.value.length > 19 || e.value == "") {
                addClass(e.parentElement.parentElement, 'has-error');
                e.setCustomValidity("Enter a valid Account Number 254");
                e.focus(); return false;
            } else {
                e.setCustomValidity("");
                toggleRemove(e.parentElement.parentElement, 'has-error')
            }
            break;
        case 'amount':
            if (isNaN(e.value) || e.value.length < 2 || e.value.length > 6 || e.value == "") {
                addClass(e.parentElement.parentElement, 'has-error');
                e.setCustomValidity("Enter a valid Amount");
                e.focus(); return false;
            } else {
                e.setCustomValidity("");
                toggleRemove(e.parentElement.parentElement, 'has-error')
            }
            break;
    }
}
function addClass(elem, $class) {
    return elem.classList.add($class)
}
function removeclass(elem, $class) {
    return elem.classList.remove($class)
}
function toggleRemove(elem, $class) {
    if (elem.classList.contains($class)) removeclass(elem, $class)
    console.log('iko sawa')
}
function showAlert(content, header) {
    console.log('alerts called')
    var elem = document.querySelector('.fh5co-property-innter');
    var closebtn = document.getElementById('closer'),
        contents = content;
    if (content.status_message !== undefined) contents = content.status_message;
    var headers = document.createElement('h2');
    //  addClass(headers, 'fh5co-property-innter')             
    var header_content = document.createTextNode(header);
    headers.appendChild(header_content);
    var text = document.createTextNode(contents)
    var p = document.createElement('p');
    //  addClass(p, 'fh5co-property-innter')
    p.appendChild(text);


    elem.appendChild(headers);
    elem.appendChild(p);
    closebtn.addEventListener('click', dismissAlert);

    toggleRemove(elem.parentElement, 'hidden')
    // addClass(elem, 'show');
}
function _onalert() {
    if (location.search !== '') {
        var querstring = location.search.split('&'),
            content = 'Succesfully Processed the transaction',
            header = querstring[0].replace('?', '').split('=')[1];
        if (querstring[1] !== 'su') {
            content = JSON.parse(atob(querstring[1].split('=')[1]));
        }
        console.log(content);
        var header_content = 'Payment for Order :' + header;
        return showAlert(content, header_content);
    }
}
function dismissAlert(elem) {
    var parentElement = elem.target.parentElement.parentElement.parentElement
    addClass(parentElement, 'hidden')
    history.replaceState({}, 'Home', '/')
    console.log(elem.target.parentElement.parentElement.parentElement)
}
//atob(location.search.split('&')[1].split('=')[1])

window.addEventListener('DOMContentLoaded', _onChange);
window.addEventListener('DOMContentLoaded', load);//when initial DOM is loaded useful!!
window.addEventListener('DOMContentLoaded', getLinks);//when initial DOM is loaded
window.addEventListener('hashchange', _onChange);//when the hash changes
window.addEventListener('load', _onalert);

        /**
0	UNSENT	Client has been created. open() not called yet.
1	OPENED	open() has been called.
2	HEADERS_RECEIVED	send() has been called, and headers and status are available.
3	LOADING	Downloading; responseText holds partial data.
4	DONE	The operation is complete.
         * billing status expected
         * {
         *  "header_status":200,
         *  "status":"1",
         *  "text":"safaricom payment for Account 2sw22 has succesfully been accepted ",
         *  "reference":"SAFARICOM1642561826"
         * }
         */