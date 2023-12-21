import { useEffect, useRef, useState } from "react"
//import { useEffect, useRef, useState, useCallback, useMemo } from "react"

// import LongPress from "./../scripts/LongPress"
import interact from 'interactjs'

// https://github.com/taye/interact.js/issues/214
// interact.debug().defaultOptions._holdDuration = 1500;


import "./Card.css"
import EditToolbar from "./subcomponents/editToolbar/EditToolbar"

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
  //title: initialTitle,
  w,
  h,
  x,
  y,
  actions,
  children,
  content,
  type

}) {
  const cardRef = useRef(null);
  /*
  const [toggle, setToggle] = useState(true);
  const [title, setTitle] = useState(
    initialTitle || "Double click to change title"
  );
  */
  const [visible, setVisible] = useState(true);
  const [editable, setEditable] = useState(false);


  const [modalMedia, setmodalMedia] = useState({});

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

  /*   const handleToggle = (flag) => {
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
    }; */
  function unsetCardEditMode() {

    setEditable(false);
    cardRef.current.classList.remove("longpress");
    cardRef.current.classList.remove("itemselected");
  }
  const backCard = (evt) => {
    console.log("backCard", evt);

    unsetCardEditMode();

    //cardRef.current.classList.remove("longpress");

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
    // display a modal on top of the app
    document.getElementById('my_modal_3').showModal()
    // actions.handleRemove(cardRef.current, false);


  };
  /*   const handleEditCard = (flag) => {
      setEditable(true);
      console.log("handleEditCard", flag);
    };
   */
  const delCard = (evt) => {
    console.log("delCard", evt);
    //gridRef.current.removeWidget(el, false);
    actions.handleRemove(cardRef.current, false);
    //this.props.unmountMe();
    //ReactDOM.unmountComponentAtNode(ref.current);
    setVisible(false);
  };

  return visible ? (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"

            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                actions.handleEdit(cardRef.current, e.target.value);
                unsetCardEditMode();
                document.getElementById('my_modal_3').close("GG");
              }
              else {
                console.log("nain")
              }
            }} />

          <p className="py-4">Press ESC key or click on ✕ button to close</p>
          {/**
           * 
           * 
           * 
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 bottom-2"
            onClick={editable ? actions.handleEdit(cardRef.current,"Changed"): console.log("nain")}>Update</button>
           * 
           */}
        </div>
      </dialog>
      <div
        ref={cardRef}
        id={`${id}`} // convert to string
        className="grid-stack-item"
        // eslint-disable-next-line react/no-unknown-property
        gs-w={w}
        // eslint-disable-next-line react/no-unknown-property
        gs-h={h}
        // eslint-disable-next-line react/no-unknown-property
        gs-x={x}
        // eslint-disable-next-line react/no-unknown-property
        gs-y={y}
      >


        <div className="grid-stack-item-content card w-96 bg-primary text-primary-content">
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
    </>
  ) : (<div />);
}
