import { useEffect, useRef, useState, useCallback, useMemo } from "react";

// import LongPress from "./../scripts/LongPress";
import interact from 'interactjs'

// https://github.com/taye/interact.js/issues/214
// interact.debug().defaultOptions._holdDuration = 1500;


import "./Card.css";
import EditToolbar from "./subcomponents/editToolbar/EditToolbar";

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


*/

export default function Card({
  id,
  title: initialTitle,
  w,
  h,
  x,
  y,
  actions,
  children,
}) {
  const cardRef = useRef(null);
  const [toggle, setToggle] = useState(true);
  const [title, setTitle] = useState(
    initialTitle || "Double click to change title"
  );
  const [visible, setVisible] = useState(true);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    actions.handleRemove(cardRef.current, false);
    actions.handleAdd(cardRef.current);

    //onLongpress(cardRef.current, handleEditCard);

    //https://www.codegrepper.com/code-examples/javascript/get+cursor+position+javascript
    /*
    var pointerX = -1;
    var pointerY = -1;
    document.onmousemove = function (event) {
      pointerX = event.pageX;
      pointerY = event.pageY;
    };
    */
    interact(cardRef.current)
    .on('tap', function (event) {
      console.log("tap", event);
      // event.currentTarget.classList.toggle('switch-bg')
      event.preventDefault()
    })
    .on('doubletap', function (event) {
      console.log("doubletap", event);
      // event.currentTarget.classList.toggle('large')
      // event.currentTarget.classList.remove('rotate')
      event.preventDefault()
    })
    .on('hold', function (event) {
      console.log("hold", event);
      setEditable(true);
      // event.currentTarget.classList.toggle('rotate')
      // event.currentTarget.classList.remove('large')
    })



  }, []);

  const handleToggle = (flag) => {
    setToggle(flag);
    actions.handleEnableMove(flag);
  };
  const handleTapHold = (flag) => {
    //setToggle(flag);
    //actions.handleEnableMove(flag);
    console.log("handleTapHold");
  };

  const changeName = (evt) => {
    console.log("changeName", evt);
  };

  const backCard = (evt) => {
    console.log("backCard", evt);
    setEditable(false);
    //cardRef.current.classList.remove("longpress");
    cardRef.current.classList.remove("longpress");
    cardRef.current.classList.remove("itemselected");
    //cardRef.current.class.remove('longpress');
    //cardRef.current.className.remove('longpress');
    //console.log("cardRef.current", cardRef.current);
    //console.log("cardRef", cardRef);

    //document.getElementById(id).classlist.remove('longpress');
    //cardRef.classList.remove('longpress');
    //cardRef.current.classList.add("longpress2");
  };
  const editCard = (evt) => {
    console.log("editCard", evt);
  };
  const handleEditCard = (flag) => {
    setEditable(true);
    console.log("handleEditCard", flag);
  };

  const delCard = (evt) => {
    console.log("delCard", evt);
    //gridRef.current.removeWidget(el, false);
    actions.handleRemove(cardRef.current, false);
    //this.props.unmountMe();
    //ReactDOM.unmountComponentAtNode(ref.current);
    setVisible(false);
  };

  return visible ? (
    <div
      ref={cardRef}
      id={`${id}`} // convert to string
      className="grid-stack-item"
      gs-w={w}
      gs-h={h}
      gs-x={x}
      gs-y={y}
    >
      {/**
       * Toolbar
       */}

      <div className="grid-stack-item-content">
        {editable ? (
          <EditToolbar
            className=""
            delCard={delCard}
            editCard={editCard}
            backCard={backCard}
          ></EditToolbar>
        ) : (
          <div />
        )}
        {children}
        {/*
        <header>
          {toggle ? (
            <h2
              title="Double click to change title"
              onDoubleClick={() => handleToggle(false)}
            >
              {title}
            </h2>
          ) : (
            <input
              autoFocus
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === "Escape") {
                  handleToggle(true);
                  event.preventDefault();
                  event.stopPropagation();
                }
              }}
              onBlur={() => handleToggle(true)}
            />
          )}

          <button
            title="Delete widget"
            onClick={() => {
              actions.handleRemove(cardRef.current);
            }}
          >
            &#x2715;
          </button>
        </header>
         */}
      </div>
    </div>
  ) : (
    <div />
  );
}
