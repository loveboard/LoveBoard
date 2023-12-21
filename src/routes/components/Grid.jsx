import { useRef, useEffect } from "react"
import GridStack from "gridstack/dist/gridstack-all"
import "gridstack/dist/gridstack.css"

import "./Grid.styles.scss"
 import "./Grid.css"

//const Item = ({ id }) => <div>I am item: {id}</div>;

let id = 1;
// eslint-disable-next-line react/prop-types
export default function Grid({ children, setWidgets,updateWidget, closeToolbar}) {
  //const refs = useRef({});
  const gridRef = useRef();

  useEffect(() => {
    gridRef.current = GridStack.init({
      column: 6, // will auto switch on smaller screens
      row: 10,
      disableOneColumnMode: true,
      float: true,
      acceptWidgets: true,
      //draggable:{handle:'.drag-handle'},
      removable: true,
      staticGrid: false,
      //cellHeight: 'initial', // start square but will set to % of window width later

      //cellHeightUnit: "px",
      //cellHeight: 70, // make sure we have a decent height and not width/12 for 1 column
      alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ),

      cellHeight: 'auto',
      cellWidth: 'auto',
      //cellHeight: 70,
      minRow: 4, // don't collapse when empty
      margin: 4,
      resizable: {
        handles: "all",
      },
      // dragIn: "droppable", // class that can be dragged from outside

      /*
      dragInOptions: {
        revert: "invalid",
        scroll: false,
        appendTo: "body",
        helper: "clone",
      },
      */
      //column: 6, // will auto switch on smaller screens
      //row: 10,
      //cellHeight: "auto", // start square but will set to % of window width later
      //cellWidth:"initial",

    });

    const grid = gridRef.current;
    // GridStack.setupDragIn(gridRef.current, '.droppable');
    // https://github.com/gridstack/gridstack.js/issues/2231
    /*     GridStack.setupDragIn(
          '.droppable',{
          appendTo: gridRef.current,
          revert: "invalid",
          scroll: false,
          helper: "clone"
        });
     */
    // new 4.x static method instead of setting up options on every grid (never been per grid really)
    GridStack.setupDragIn(
      '.droppable', 
      { 
        appendTo: ".grid-stack", 
        revert: "invalid",
        scroll: false,
        helper: "clone" 
      });
    // GridStack.setupDragIn(); // second call will now work (cache last values)

      /*

    grid.load([
      { x: 0, y: 0, content: "1" },
      { x: 0, y: 1, h: 2, content: "2" },
      { x: 0, y: 3, content: "3" },
    ]);
    */

    if (grid) {
      grid.on("dropped", function (event, previousWidget, newWidget) {
        console.log("dropped", event, previousWidget, newWidget);
        const { el, w, h, x, y } = newWidget;
        grid.removeWidget(el);
        setWidgets((items) => [
          ...items,
          {
            id: 'identificator-'+id++,
            type: el.dataset.type,
            content: el.dataset.content,
            w,
            h,
            x,
            y,
          },
        ]);
      });
    }
  }, []);

  const handleAdd = (el) => {
    if (el && gridRef.current) {
      gridRef.current.makeWidget(el);
      closeToolbar();
    }
  };
  const handleRemove = (el, actualRemove = true) => {
    if (el && gridRef.current) {
      gridRef.current.removeWidget(el, false);
      actualRemove &&
        setWidgets((items) => items.filter((item) => `${item.id}` !== el.id));
    }
  };
  const handleEdit = (el,newValue) => {
    if (el && gridRef.current) {
      console.log("handleEdit", el);
      console.log("id > ", el.id);
      updateWidget(el.id, newValue)
      //var newValue = parseInt(el.y) + 1;
    	//gridRef.current.update(el, {y: newValue});
    	//gridRef.current.update(el, {content: newValue});
      
      // idk, i should copy something from handleRemove above
    }
  };
  const handleEnableMove = (flag = true) => {
    if (gridRef.current) {
      gridRef.current.enableMove(flag);
    }
  };

  return (
      <div id="stacker" className="grid-stack">
        {children({
          handleAdd,
          handleRemove,
          handleEdit,
          handleEnableMove,
        })}
      </div>
  );
}
