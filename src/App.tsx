import "./App.css";
import Card from "./Card";
import EmojiRain from "./EmojiRain";

function App() {
  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url("/tree.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 0 }}>
        <Card />
      </div>

      <EmojiRain count={50} />
      
    </>
  );
}

export default App;
