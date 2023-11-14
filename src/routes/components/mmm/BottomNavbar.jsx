import { useEffect } from "react";

import anime from "animejs/lib/anime.es.js";

import "./BottomNavbar.css";

const buttons = document.querySelectorAll(".bottom-navbar button:not(.float)");
//const buttons = document.querySelectorAll(".bottom-navbar button:not(.float)");
const effect = document.querySelector(".effect");
const container = document.querySelector(".container");
let y = 0;
let moveY = 0;
let open = false;

const vh = window.innerHeight * 0.01;
var vhx = vh + "px";
document.documentElement.style.setProperty("--vh", vhx);

/*
setTimeout(function () {
  window.scrollTo(0, 1);
}, 0);

window.addEventListener("touchstart", (evt) => {
  const area = window.innerHeight - evt.touches[0].clientY;
  y = area;
  console.log(y);
});

window.addEventListener("touchend", (evt) => {
  y = 0;
  console.log(moveY);
  if (moveY > window.innerHeight / 4) {
    anime({
      targets: ".container",
      translateY: `-${window.innerHeight / 2}px`,
      duration: 600,
    });
    open = true;
  } else {
    anime({
      targets: ".container",
      translateY: `0px`,
      duration: 600,
      easing: "easeOutExpo",
    });
    open = false;
  }
});

window.addEventListener("touchmove", (evt) => {
  moveY = window.innerHeight - y - evt.touches[0].clientY;
  console.log(y);
  if (!open) {
    anime({
      targets: ".container",
      translateY: `${
        moveY <= window.innerHeight / 2
          ? moveY > 0
            ? -moveY
            : 0
          : -window.innerHeight / 2
      }px`,
      duration: 200,
    });
  } else if (open) {
    moveY = moveY + window.innerHeight / 2;
    anime({
      targets: ".container",
      translateY: `${
        moveY <= window.innerHeight / 2
          ? moveY > 0
            ? -moveY
            : 0
          : -window.innerHeight / 2
      }px`,
      duration: 200,
    });
  }
});
*/

console.log("buttons: ", buttons);
buttons.forEach((item) => {
  console.log("item: ", item);
  item.addEventListener("click", (evt) => {
    const x = evt.target.offsetLeft;
    buttons.forEach((btn) => {
      btn.classList.remove("active");
    });
    evt.target.classList.add("active");
    anime({
      targets: ".effect",
      left: `${x}px`,
      duration: 600,
    });
  });
});

function handleClickPlus(evt) {
  anime({
    targets: ".container",
    translateY: `-${window.innerHeight / 2}px`,
    duration: 600,
  });
  open = true;
  y = window.innerHeight / 2;
  moveY = moveY + window.innerHeight / 2;
}

function handleClickPlusClose(evt) {
  anime({
    targets: ".container",
    translateY: `0px`,
    duration: 600,
    easing: "easeOutExpo",
  });
  open = false;
}

export default function Navbar({ children }) {
  useEffect(() => {
    /**
     * minimize when chose an item to drop in the grid
     */

    var e = document.getElementById("stacker");
    console.log("e", e);
    var observer = new MutationObserver(function (event) {
      console.log(event);
      var classes = event[0].target.classList;
      console.log("classes", classes);
      if (classes.contains("ui-droppable-active")) {
        anime({
          targets: ".container",
          translateY: `0px`,
          duration: 600,
          easing: "easeOutExpo",
        });
        open = false;
      } else {
        console.log("no newWidget class");
      }
      // ui-droppable-active
    });

    observer.observe(e, {
      attributes: true,
      attributeFilter: ["class"],
      childList: false,
      characterData: false,
    });

    /*
    event Chrome api
      Component Grid
        emit event
      Component Navbar
        listen event

    */
  }, []);

  return (
    <div>
      <div className="bottom-navbar">
        <div className="con-effect">
          <div className="effect"></div>
        </div>
        <button className="active">
          <i className="bx bx-home"></i>
        </button>
        <button>
          <i className="bx bx-skip-previous"></i>
        </button>
        <button onClick={handleClickPlus} className="float">
          <i className="bx bx-plus"></i>
        </button>
        <button>
          <i className="bx bx-skip-next"></i>
        </button>
        <button>
          <i className="bx bxs-save"></i>
        </button>
      </div>
      <div className="container">
        <button onClick={handleClickPlusClose}>
          <i className="bx bx-x bx-sm"></i>
        </button>
        <p>Chose the media option to insert</p>
        {/*
        <button onClick={handleClickPlusClose}>Close</button>
        */}

        {children}
      </div>
    </div>
  );
}
