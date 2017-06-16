import 'babel-polyfill'
var addclasses = function (elem, classes) {
    var cls = classes.trimRight(" ").split(" ");
    cls.map(function (cl) {
        elem.classList.add(cl);
    })
}
function load() {
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
        //console.log(context);
        //iterate through the elem and apply function to each element.
        Array.from(compileto).map(function (elem) {
            elem.innerHTML = html;
            // //console.log(html);
        });
        getLinks();
        // listings();

    }, function (error) {
        var rdata = JSON.parse(error);
        //console.log(error);
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
    //console.log('triggered to call partial')

    var url = e.target.href;
    window.history.pushState({ page: url }, null, url)
    // var tar = window.location.pathname;
    var tar = window.location.hash.substring(1);
    //console.log(tar);
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
        var loader = document.createElement('div');
        if (xhr.readyState == 1) {
            loader.id = "loader";
            loader.style.position = "fixed";
            loader.style.zIndex = "1000";
            loader.style.top = "44%";
            loader.style.left = "48%";
            var loadWrap = document.createElement('div');
            loadWrap.classList.add("spinner");
            loader.appendChild(loadWrap);
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
            var loader = document.createElement('div');
            if (xhr.readyState == 1) {
                loader.id = "loader";
                loader.style.position = "fixed";
                loader.style.zIndex = "1000";
                loader.style.top = "44%";
                loader.style.left = "48%";
                var loadWrap = document.createElement('div');
                loadWrap.classList.add("spinner");
                loader.appendChild(loadWrap);
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
 * List Cards of the Categories e.g Airtime, Electricity
 * it gets the anchors in the top header and then copies the getLinks
 * to this cards
 */
// function listings(){
// 		var category_list = document.querySelector('#best-deal .row');
// 		Array.from(document.querySelectorAll('#fh5co-offcanvas ul li a')).map(function(li){
// 			if(li.href.substr(-8)!== '#contact' && li.href.substr(0,3) !=='tel' ){

// 				var listing = document.createElement('div'),
//                     img = document.createElement('img')
//                 img.src = 'images/billing_images/'+li.href.split('#')[1]+'.png';
//                 img.maxHeight = '240';

//                 addClass(img, 'img-responsive')
// 				addclasses(listing, "col-md-4 item-block animated fadeInUp");
// 				 var blockquote  = document.createElement('div');
// 				 addClass(blockquote, "fh5co-property")
//                	var figure = document.createElement('figure');
// 					figure.appendChild(img);
//                     figure.style.backgroundImage = 'url(images/slide_2.jpg)';
// 				var inner = document.createElement('div');
//                     addClass(inner, 'fh5co-property-innter')
//                     theTpl = '<h2>'+li.innerHTML+'</h2><a href="'+li.href+'">'+li.innerHTML+'</a>'
//                     inner.innerHTML = theTpl;
// 					blockquote.appendChild(figure);
// 					blockquote.appendChild(inner);

//                     listing.appendChild(blockquote)
// 				category_list.appendChild(listing)
// 				}
// 		})
// 	}
/**
 * @func _onChange
 * function to enact change of content in the Page: essentially navigation
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
                    document.querySelector('#purchase span').textContent = `Pay For `;
                    showform(); postform(document.forms['payform']);//postform is called on the payforms form 

                }
                window.scroll(0, 100);

            }).catch(function (error) {
                window.history.back();
                //console.log(error)
            })
    }

    //console.log('imeitwa');


}
/**
 * @func loading
 * The Loader showing function when the page is still loading and not completely DOMContentLoaded
 * thus Rendered
 */
function _loading() {
    if (document.readyState == 'interactive') {
        Array.from(document.querySelectorAll('.btn')).map(function (btn) {
            btn.disabled = true;
            // console.log(btn)
        });
        var loader = document.createElement('div');
        loader.id = "loader";
        loader.style.position = "fixed";
        loader.style.zIndex = "1000";
        loader.style.top = "44%";
        loader.style.left = "48%";
        var loadWrap = document.createElement('div');
        loadWrap.classList.add("spinner");
        loader.appendChild(loadWrap);
        document.body.appendChild(loader);


    }
    if (document.readyState == 'complete') {
        document.body.removeChild(document.getElementById('loader'))
    }

}
function showform() {
    var payfor = document.querySelectorAll('.fh5co-property-innter a,.fh5co-property-specification a');
    Array.from(payfor).map(function (link) {
        link.addEventListener('click', togglepay)
    });
}
var state ={};//Global state
/**
 * @func togglepay
 * @param {*} evt 
 * this function is the one that toggles the payment page that is the form that posts the info
 */
function togglepay(evt) {
    evt.preventDefault();
    //console.log("is it called the payments?")
    var theElem = evt.target;//the element that triggers the event
    var slide = document.getElementById('slid'),
        billername = theElem.getAttribute('data-name'), category = theElem.getAttribute('cat-name'),
        pathname = theElem.hash.substring(1).split('/');//the path got from the hash in the elements href then split to get the payments page form
    window.location.hash = theElem.hash;//triggers the _onChange() which does the rest     
    // window.history.pushState({page:'previous'},null,evt.target.href);
    var path = pathname[1], biller = pathname[0];
    //console.log(pathname)
    //store a session for use
    stateHandle(state, {billername: minimum_balance})
    sessionStorage.setItem(biller, billername);
    console.log(state);
    
}
function stateHandle(prevState, newState)
{
    return Object.assign(prevState, newState);
}
/**
 * @postform binds an element to the submit eventlistener element is a form
 * this is for reuse since there will be a couple of forms to submit
 */
function postform(elem) {
    elem.addEventListener('submit', formvalid);
    Array.from(elem).map(function (e) {
        if (e.nodeName == "INPUT" && e.type !== "hidden") {
            e.addEventListener('blur', validation);
            //console.log(e.type)
        }
    });
}
/**
*  @func postforms
*   post the complete payment form to process
    [Now Not Currently used]
*/
function postforms(evt) {
    evt.preventDefault();
    var form = evt.target;//the element that triggers the event
    //can define variables in one comma seperated line in javascript awesome!! below
    //console.log(form)

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
        //console.log(error);
    });
}
/**
 * func formvalid
 * @param {*} evt
 * validates the form input only sends to iPay if everything is okay 
 */
function formvalid(evt) {
    evt.preventDefault(); //pevent preventDefault submit
    var form = evt.target;//this is the submited form

    if (isNaN(form.tel.value) || form.tel.value.length < 12 || form.tel.value == "" || form.tel.value.substring(0, 3) !== "254") {
        //console.log(form.tel.parentElement.parentElement);
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
        var btn = evt.target.querySelector('.btn-success');
        btn.disabled = true;
        btn.style.backgroundImage = "url('images/loading-btn.gif')";
        btn.style.backgroundRepeat = "no-repeat";
        btn.style.backgroundSize = "contain";

        evt.target.submit();
        //postforms(evt);//submit the from if everything else is okay   this was the Ajax way        
    }


}
function validation(evt) {
    var e = evt.target,
        formgroup = e.parentElement.parentElement,
        mobileProviders = ['airtel', 'safaricom', 'orange'];
    switch (e.name) {
        case 'tel':
            if (isNaN(e.value) || e.value.length < 12 || e.value.length > 12 || e.value == "" || e.value.substring(0, 3) !== "254") {
                setValidity("Enter a valid Telephone number starting with the prefix 254", formgroup);
                addClass(formgroup, 'has-error');
                e.focus();
                return false;
            } else {
                setValidity("", formgroup);
                toggleRemove(formgroup, 'has-error')
                if (mobileProviders.includes(location.hash.substring(1).split('/')[[0]])) {
                    document.forms.payform['account'].value = e.value;
                }
            }
            break;
        case 'eml':
            var regstr = /[A-za-z0-9_%.]+@[A-Za-z0-9.-]+\.[A-z.]{2,3}$/;
            if (!regstr.test(e.value) || e.value == "") {
                addClass(formgroup, 'has-error');
                setValidity("Enter a valid Email address", formgroup);
                e.focus(); return false;
            } else {
                setValidity("", formgroup);
                toggleRemove(formgroup, 'has-error')
            }
            break;
        case 'account':
            if (isNaN(e.value) || e.value.length < 10 || e.value.length > 19 || e.value == "") {
                addClass(formgroup, 'has-error');
                setValidity("Enter a valid Account Number Not less than 10 characters and not More than 19", formgroup);
                e.focus(); return false;
            } else {
                setValidity("", formgroup);
                toggleRemove(formgroup, 'has-error')
            }
            break;
        case 'amount':
            if (isNaN(e.value) || e.value.length < 2 || e.value.length > 6 || e.value == "") {
                addClass(formgroup, 'has-error');
                setValidity("Enter a valid Amount not less than the Minimum Required", formgroup);
                e.focus(); return false;
            } else {
                setValidity("", formgroup);
                toggleRemove(formgroup, 'has-error')
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
    //console.log('iko sawa')
}
function showAlert(content, header) {
    //console.log('alerts called')
    var elem = document.querySelector('.fh5co-property-innter');
    var closebtn = document.getElementById('closer'),
        contents = content;
    if (content.status_message !== undefined) contents = content.status_message;
    if (content.text !== undefined) contents = content.text;
    if (content.ipay_reference !== undefined) {
        reference = document.createTextNode('Reference: ' + content.ipay_reference);
        var Ref = document.createElement('h4');
        Ref.appendChild(reference);
        elem.appendChild(Ref);
    }
    //----------- the Header -------------------------//
    var headers = document.createElement('h4');
    addClass(headers, 'text-' + content.status)
    var header_content = document.createTextNode(header);
    headers.appendChild(header_content);
    //----------- the Content--------------------------//
    var text = document.createTextNode(contents)
    var p = document.createElement('span');
    addClass(p, 'text-' + content.status)
    p.appendChild(text);
    addClass(closebtn, 'btn-' + content.status)
    //------------Bring It All together----------------//
    elem.appendChild(headers);
    elem.appendChild(p);
    closebtn.addEventListener('click', dismissAlert);

    toggleRemove(elem.parentElement, 'hidden')
    // addClass(elem, 'show');
}
function _onalert() {
    if (location.search !== '') {
        var querstring = location.search.split('&'),
            content,
            header = querstring[0].replace('?', '').split('=')[1];
        //console.log(querstring[1].split('=')[0]);
        if (querstring[1].split('=')[0] === 'e') { //the querstring second element get its key i.e. su->success or e ->error
            content = JSON.parse(atob(querstring[1].split('=')[1]));
            content.status = "danger";
        } else if (querstring[1].split('=')[0] === 'su') {
            content = JSON.parse(atob(querstring[1].split('=')[1]));
        }
        //console.log(content);
        var header_content = 'Payment for Order :' + header;
        return showAlert(content, header_content);
    }
}
/**
 * Dismiss the displayed alert message and replace history to remove the GET parameters from the 
 * url without reloading the page
 * @param {* the element that is the alert box} elem 
 */
function dismissAlert(elem) {
    var parentElement = elem.target.parentElement.parentElement.parentElement
    addClass(parentElement, 'hidden')
    history.replaceState({}, 'Home', '/');
}
/**
 *  This function will set the validity errors like the setCustomValidity html5 helper would have
 * @param {* the text to be displayed by the error message helper} text 
 * @param {* the from-group parent parentElement} formgroup 
 */
function setValidity(text, formgroup) {
    if (text !== "" && formgroup.querySelector('.help-block') === null) {
        var helptext = document.createElement('span');
        addClass(helptext, 'help-block');
        addClass(helptext, 'col-md-offset-4');
        var innetext = document.createTextNode(text);
        helptext.appendChild(innetext);
        formgroup.appendChild(helptext);
    } else if (text === "" && formgroup.querySelector('.help-block') !== null) {
        formgroup.removeChild(formgroup.querySelector('.help-block'));
    }
}
//atob(location.search.split('&')[1].split('=')[1])
window.addEventListener('DOMContentLoaded', _onChange);
window.addEventListener('DOMContentLoaded', load);//when initial DOM is loaded useful!!
window.addEventListener('DOMContentLoaded', getLinks);//when initial DOM is loaded
window.addEventListener('hashchange', _onChange);//when the hash changes
window.addEventListener('load', _onalert);
document.addEventListener('readystatechange', _loading)

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