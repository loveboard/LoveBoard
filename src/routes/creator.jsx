import { useState } from "react";

import Grid from "./components/Grid";
import Card from "./components/Card";
import Widgets, { WIDGETS } from "./components/Widgets";
import BottomNavbar from "./components/mmm/BottomNavbar";


export default function Creator() {
  const [widgets, setWidgets] = useState([]);

  return (
    <>
    <Grid setWidgets={setWidgets}>
      {(actions) =>
        widgets.map((widget) => {
          const { component: Widget, label } = WIDGETS[widget.type];

          return (
            Widget && (
              <Card
                key={widget.id}
                actions={actions}
                title={label}
                {...widget}
              >
                <Widget />
              </Card>
            )
          );
        })
      }
    </Grid>
      <BottomNavbar>
        <Widgets />
      </BottomNavbar>
    </>
  );
}
