import { useState, useRef, useEffect } from "react"

import Grid from "./components/Grid"
import Card from "./components/Card"
import { WIDGETS,Widgets,MiComponente } from "./components/Widgets"
import BottomNavbar from "./components/mmm/BottomNavbar"




export default function Creator() {
  const [widgets1, setWidgets1] = useState([]);
  const gridRef = useRef();


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
      <Grid setWidgets={setWidgets1} gridReference={gridRef}>
        {(actions) =>
          widgets1.map(function (widget1, index) {
            const { component: Widget2, label } = WIDGETS[widget1.type];
            //var Widgett = WIDGETS[widget.type].component("https://open.spotify.com/embed/playlist/0tXXPwNy3u0wPSPXYPuUaY?utm_source=generator&theme=0")
            console.log("widget", Widget2)



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

            var parametro = WIDGETS[widget1.type].default; // Aquí obtenemos el valor por defecto para pasar al componente
            //var MiWidget = WIDGETS[widget1.type].component; // Aquí seleccionamos el componente que queremos renderizar

            //console.log("MiWidget", MiWidget)
            //console.log(MiWidget)

            return (
              Widget2 && (
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
      <BottomNavbar saveWidgets={saveWidgets}>
        <Widgets />
      </BottomNavbar>
    </>
  );
}
