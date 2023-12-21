
import "./Widgets.css"

export const WIDGETS = {
  text: {
    component: (param) => <div style={{ textAlign: "center" }}>{param}</div>,
    label: "Text",
    componente: (param) => <div style={{ textAlign: "center" }}>{param}</div>,
    
    default: "Hola soy Goku",
  },
  photo: {
    component: () => (
      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Furnarius.jpg/751px-Furnarius.jpg" alt="hornero" className="contain" />
    ),
    label: "Photo",
    default: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Furnarius.jpg/751px-Furnarius.jpg",
  },
  video: {
    component: () => (
      <div style={{ padding: "0px" }} className="contain">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube-nocookie.com/embed/BRGwCgfS4Qk?autoplay=0"
          title="YouTube video player"
        ></iframe>
      </div>
    ),
    label: "Video",
    default: "BRGwCgfS4Qk",
  },
  spotify: {
    component: () => (
      <div style={{ padding: "0px" }} className="contain">
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/0tXXPwNy3u0wPSPXYPuUaY?utm_source=generator&theme=0"
          width="100%" height="100%" frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>
    ),
    label: "Spotify",
    label: "Spotify",
    default: "0tXXPwNy3u0wPSPXYPuUaY",
  },

};


export function Widgets() {
  // https://www.w3schools.com/TAGS/att_data-.asp
  // https://developer.mozilla.org/es/docs/Learn/HTML/Howto/Use_data_attributes
  return (
    <aside className="grid-container">
      {Object.entries(WIDGETS).map(([key, value]) => (
        <div
          key={key}
          data-type={key}
          data-content={value.default}
          className="droppable grid-stack-item photo-grid-stack-item grid-item"
          // eslint-disable-next-line react/no-unknown-property
          gs-h="2"
          // eslint-disable-next-line react/no-unknown-property
          gs-w="2"
        >
          <div className="grid-stack-item-content">
            <div>
              {value.label}
              {/*
              <span>Let me in, Im a photo</span>      
            
              {value.label}    */}
            </div>
          </div>
        </div>
      ))}
      {/*
      <div
        className="droppable grid-stack-item photo-grid-stack-item"
        key="photo3"
        data-type="photo3"
        gs-h="2"
        gs-w="2"
      >
        <div className="grid-stack-item-content">
          <div>
            <span>Let me in, Im a photo</span>
          </div>
          <div>
            <span>Let me in, Im a photo</span>
          </div>
        </div>
      </div>
      */}
    </aside>
  );
}


export function MiComponente(type, content) {
  //const MiWidget = WIDGETS[type];
  //const parametro = WIDGETS.text.default; // Aquí obtenemos el valor por defecto para pasar al componente

  switch (type) {
    case "text":
      return <div style={{ textAlign: "center" }}>{content}</div>;
    case "video":
      return <div style={{ padding: "0px" }} className="contain"> <iframe
        width="100%"
        height="100%"
        src={"https://www.youtube-nocookie.com/embed/" + content + "?autoplay=0"}
        title="YouTube video player"
      ></iframe>
      </div>;



    case "spotify":
      return <div style={{ padding: "0px" }} className="contain">
      <iframe
        style={{ borderRadius: "12px" }}
        src={"https://open.spotify.com/embed/playlist/" + content + "?utm_source=generator&theme=0"}
        width="100%" height="100%" frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>;
    case "photo":
      return <img src={content} alt="hornero" className="contain" />
      ;
    default:
      return <div style={{ textAlign: "center" }}>{"ERROR"}</div>;
      break;
  }
}
