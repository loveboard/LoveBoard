import { useEffect, useRef, useState } from "react";
import "./EditToolbar.css";

/*

function handleClickEdit(evt) {
  console.log("handleClickEdit", evt);
}
// https://reactgo.com/react-call-parent-component-method/
function handleClickDel(evt) {
  console.log("handleClickDel", evt);
}
function handleClickBack(evt) {
  console.log("handleClickBack", evt);
}
*/
export default function EditToolbar(props) {
  const { delCard, backCard, editCard } = props;
  useEffect(() => {
    /**
     * run after render
     */
  }, []);
  const [visible, setVisible] = useState(true);

  return visible ? (
    <div className="ItemPreviewPopOutButton">
      <button onClick={editCard} className="float">
        <i className="bx bx-pencil bx-sm"></i>
      </button>
      <button onClick={backCard} className="float">
        <i className="bx bx-arrow-back bx-sm"></i>
      </button>
      <button onClick={delCard} className="float">
        <i className="bx bx-trash bx-sm"></i>
      </button>
    </div>
  ) : (
    <div />
  );
}
