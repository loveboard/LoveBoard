import "./cardsActions.css";
/*
taphold | long press

https://interactjs.io/
https://jsfiddle.net/kelunik/pkjze6e6/42/
https://stackoverflow.com/questions/2625210/long-press-in-javascript
https://www.w3schools.com/jquerymobile/tryit.asp?filename=tryjqmob_events_taphold
https://stackoverflow.com/questions/41329964/click-and-hold-onto-a-selected-div-to-hide
https://www.npmjs.com/package/long-press-event


https://codepen.io/allurewebsolutions/pen/YqJyYY
https://codepen.io/borntofrappe/pen/jOEKERG

var node = document.getElementsByTagName("p")[0];
var longpress = false;
var presstimer = null;
var longtarget = null;

var cancel = function(e) {
    if (presstimer !== null) {
        clearTimeout(presstimer);
        presstimer = null;
    }
    
    this.classList.remove("longpress");
};

var click = function(e) {
    if (presstimer !== null) {
        clearTimeout(presstimer);
        presstimer = null;
    }
    
    this.classList.remove("longpress");
    
    if (longpress) {
        return false;
    }
    
    alert("press");
};

var start = function(e) {
    //console.log(e);
    
    if (e.type === "click" && e.button !== 0) {
        return;
    }
    
    longpress = false;
    
    this.classList.add("longpress");
    
    presstimer = setTimeout(function() {
        alert("long click");
        longpress = true;
    }, 1000);
    
    return false;
};

node.addEventListener("mousedown", start);
node.addEventListener("touchstart", start);
node.addEventListener("click", click);
node.addEventListener("mouseout", cancel);
node.addEventListener("touchend", cancel);
node.addEventListener("touchleave", cancel);
node.addEventListener("touchcancel", cancel);
*/
var pointerX = -1;
var pointerY = -1;
/*
document.addEventListener("DOMContentLoaded", function (event) {
  //we ready baby
  //https://www.codegrepper.com/code-examples/javascript/get+cursor+position+javascript


  onmousemove = function(e){
      //console.log("mouse location:", e.clientX, e.clientY);
      pointerX = event.clientX;
      pointerY = event.clientY;
    }
});
*/
//https://stackoverflow.com/questions/7790725/javascript-track-mouse-position
function tellPos(e) {
  //console.log("Position X : " + e.pageX + "<br />Position Y : " + e.pageY);
  //console.log("mouse location:", e.clientX, e.clientY);
  pointerX = e.clientX;
  pointerY = e.clientY;
}

document.addEventListener("mousemove", tellPos, false);

export default function onLongpress(el, handler) {
  //var node = document.getElementsByTagName("p")[0];
  const MAX_TIME_TO_BE_LONG = 1000; // espera máximo 1000ms (1 seg) al siguiente click/tap

  var longpress = false;
  var presstimer = null;
  var longtarget = null;

  // https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
  //var bodyRect = document.body.getBoundingClientRect(), elemRect = el.getBoundingClientRect(), offset   = elemRect.top - bodyRect.top;

  //const elemRectY = el.getBoundingClientRect().y; // before elemRectTop
  //const elemRectX = el.getBoundingClientRect().x; // before elemRectLeft
  //alert('Element is ' + offset + ' vertical pixels from <body>');
  //console.log('Element is ' + offset + ' vertical pixels from <body>');

  function clearStyle(presstimer, element) {
    clearTimeout(presstimer);
    presstimer = null;
    element.classList.remove("longpress");
  }

  var cancel = function (e) {
    console.log("cancel ---------------------------------------------------------------");
    if (presstimer !== null) {
      clearTimeout(presstimer);
      presstimer = null;
    }
    this.classList.remove("longpress");
  };

  var click = function (e) {
    console.log("click ---------------------------------------------------------------");
    if (presstimer !== null) {
      clearTimeout(presstimer);
      presstimer = null;
    }

    this.classList.remove("longpress");

    if (longpress) {
      return false;
    }

    //alert("press");
    console.log("press ---------------------------------------------------------------");
  };

  /**
   * todo 🚀
   * check if mouse move
   * check div height and width
   */

  var start = function (e) {
    console.log("start ---------------------------------------------------------------");
    console.log(
      "Element is moving " + el.getBoundingClientRect().top + " vertical pixels"
    );

    //console.log(e);

    if (e.type === "click" && e.button !== 0) {
      return;
    }

    longpress = false;

    this.classList.add("longpress");

    const elemRectY = el.getBoundingClientRect().y; // before elemRectTop
    const elemRectX = el.getBoundingClientRect().x; // before elemRectLeft
    const pointerRectY = pointerY;
    const pointerRectX = pointerX;

    presstimer = setTimeout(function () {
      console.log("New tap");
      var elemRectYNow = el.getBoundingClientRect().y;
      var elemRectXNow = el.getBoundingClientRect().x;

      var pointerRectYNow = pointerY;
      var pointerRectXNow = pointerX;

      console.log("elemRectY", elemRectY);
      console.log("elemRectYNow", elemRectYNow);
      console.log("elemRectX", elemRectX);
      console.log("elemRectXNow", elemRectXNow);

      console.log("pointerRectY", pointerRectY);
      console.log("pointerRectYNow", pointerRectYNow);
      console.log("pointerRectX", pointerRectX);
      console.log("pointerRectXNow", pointerRectXNow);
      if (
        (elemRectY != elemRectYNow && elemRectX != elemRectXNow) ||
        (pointerRectY != pointerRectYNow && pointerRectX != pointerRectXNow)
      ) {
        //alert("is different");
        //console.log("is different");
        //var self = this;
        clearStyle(presstimer, el);
      } else {
        //alert("is not different");
        //alert("long click");
        console.log("long click");
        console.log("is not different");
        el.classList.add("itemselected");
        handler(el); // ejecuta el handler
      }
      longpress = true;
    }, MAX_TIME_TO_BE_LONG);

    return false;
  };

  el.addEventListener("mousedown", start);
  el.addEventListener("touchstart", start);
  el.addEventListener("click", click);
  el.addEventListener("mouseout", cancel);
  el.addEventListener("touchend", cancel);
  el.addEventListener("touchleave", cancel);
  el.addEventListener("touchcancel", cancel);

  /*
    const MAX_TIME_TO_SECOND_TAP = 300 // espera máximo 300ms al siguiente click/tap
    let lastTapTimestamp = 0;
    el.addEventListener('touchstart', function() {
      lastTapTimestamp = new Date().getTime();
    });
    el.addEventListener('touchend', function(event) {
        var currentTime = new Date().getTime();
        var tapEllapsedTime = currentTime - lastTapTimestamp;
  
        // si se ha hecho el segundo tap/click entre los 300ms
        if (tapEllapsedTime < MAX_TIME_TO_SECOND_TAP && tapEllapsedTime > 0) {
            event.preventDefault();
            lastTapTimestamp = 0; // reinicia el counter
            handler(event); // ejecuta el handler
        }
    });
    */
}
