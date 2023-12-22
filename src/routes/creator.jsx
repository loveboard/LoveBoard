import { useState, useRef, useEffect } from "react"

import Grid from "./components/Grid"
import Card from "./components/Card"
import { WIDGETS,Widgets,MiComponente } from "./components/Widgets"
import BottomNavbar from "./components/mmm/BottomNavbar"




export default function Creator() {
  const [widgets1, setWidgets1] = useState([]);
  const gridRef = useRef();
  const childFunc = useRef(null)



  
  function updateWidget1(id, content) {
    console.log("creator.jsx > updateWidget1 > ",id, content)
    // filter widgets1 based on the id property
    // and return a new array with the updated widget
    // https://www.robinwieruch.de/react-state-array-add-update-remove
    // https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate
    // https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate

    var cachedwidgets1 = widgets1.map((widgeter) => {
      console.log("creator.jsx > updateWidget1 > looping",widgeter.id)
      if (widgeter.id === id) {
        console.log("new value of widget > ",widgeter.id, id, content)
        return {
          ...widgeter,
          content: content,
        };
      }
      return widgeter;
    });
    setWidgets1(cachedwidgets1);
    console.log("card > ", id, "content > ", content)
  }  

/* 
  function removeWidget1(id) {
    const updatedWidgets1 = widgets1.filter((widget) => widget.id !== id);
    setWidgets1(updatedWidgets1);
  } */


  function saveWidgets() {
    console.log("cards > ", widgets1)
  }
  return (
    <>
      {/*
    <button className="btn btn-neutral"  onClick={console.log("cardsasdasd > ")}>Neutral</button>
    <button onClick={console.log("cards > ",widgets1)}> asdasd </button>
    <br />
    */}
      <Grid setWidgets={setWidgets1} updateWidget={updateWidget1} gridReference={gridRef} closeToolbar={() => childFunc.current()}>
        {(actions) =>
          widgets1.map(function (widget1, index) {
            // const { component: Widget2, label } = WIDGETS[widget1.type];
            // var Widgett = WIDGETS[widget.type].component("https://open.spotify.com/embed/playlist/0tXXPwNy3u0wPSPXYPuUaY?utm_source=generator&theme=0")
            // console.log("widget", Widget2)

            const { label } = WIDGETS[widget1.type];

            /*
            //const MiWidget = WIDGETS[widget1.type].component; // Aquí seleccionamos el componente que queremos renderizar
            const MiWidget2 = WIDGETS[widget1.type].componente; // Aquí seleccionamos el componente que queremos renderizar
            console.log("MiWidget2",MiWidget2)
            //const parametro = WIDGETS[widget1.type].default; // Aquí obtenemos el valor por defecto para pasar al componente
  
  
            const MiWidget = WIDGETS.text.component; // Aquí seleccionamos el componente que queremos renderizar
            const parametro = WIDGETS.text.default; // Aquí obtenemos el valor por defecto para pasar al componente
  
            
            const MiWidget3 = WIDGETS.text.componente; // Aquí seleccionamos el componente que queremos renderizar
            const parametro3 = WIDGETS.text.default; // Aquí obtenemos el valor por defecto para pasar al componente
  
            const { componente: WidgetComponent, label2, default: defaultParam } = WIDGETS[widget1.type];
            */

            // var parametro = WIDGETS[widget1.type].default; // Aquí obtenemos el valor por defecto para pasar al componente
            //var MiWidget = WIDGETS[widget1.type].component; // Aquí seleccionamos el componente que queremos renderizar

            //console.log("MiWidget", MiWidget)
            //console.log(MiWidget)

            return (
              widget1 && (
                <Card
                  key={index}
                  actions={actions}
                  title={label}
                  {...widget1}
                >
                  {/*
              <Widget2 />
              <p>{widget1.content}</p>
                <p>{parametro}</p>
                  <p>{widget1.content}</p>
                  <p>{parametro}</p>
              */}


                  {MiComponente(widget1.type, widget1.content)}
                  {/*
                <Widget2 />
                <MiWidget3 param={parametro3} />
                <MiWidget param={"Gillippollas"} />
                <WidgetComponent param={defaultParam} />
                <MiWidget param={parametro} />
                */}
                </Card>
              )
            );
          })
        }
      </Grid>
      <BottomNavbar saveWidgets={saveWidgets} childFunc={childFunc}>
        <Widgets />
      <button onClick={() => childFunc.current()}>Click me</button>
      </BottomNavbar>
    </>
  );
}
