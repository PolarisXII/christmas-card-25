import { motion } from "motion/react";
import { useState } from "react";
import message from "./message";

const Card: React.FC = () => {
  const [flip, setFlip] = useState(false);

  const faceBase: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    borderRadius: "12px",
    overflow: "hidden",

    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",

    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: "16px",
  };

  return (
    <div
      style={{
        width: "40vw",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        perspective: "1200px",
        WebkitPerspective: "1200px",
      }}
    >
      <motion.div
        animate={{ rotateY: flip ? 180 : 0 }}
        transition={{ duration: 0.7 }}
        style={{
          width: "100%",
          flex: 1,
          position: "relative",
          borderRadius: "12px",
          boxShadow: "4px 8px 16px rgb(66, 66, 66)",

          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",

          willChange: "transform",
        }}
      >
        {/* FRONT */}
        <div
          style={{
            ...faceBase,
            transform: "rotateY(0deg) translateZ(1px)", // <-- explicit transform fixes backface issues
            backgroundImage: `url("/card_front.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: "green",
          }}
        >
          {/* Front */}
        </div>

        {/* BACK */}
        <div
          style={{
            ...faceBase,
            transform: "rotateY(180deg) translateZ(1px)", 
            backgroundColor: "Ivory", 
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: "black",
             // <-- proper letter margins
            whiteSpace: "pre-wrap", // <-- CRITICAL
            fontFamily: "Caveat",
            fontSize: "20px",
            lineHeight: "1.6",

            textAlign: "left",
            padding: "20px 20px -20px",
            // display:"block"
          }}
        >
          {message}
        </div>
      </motion.div>

      <button
        onClick={() => setFlip((p) => !p)}
        style={{
          width: "15%",
          height: "11%",
          borderRadius: "50%",
          fontFamily: "Mountains of Christmas",
          fontSize: "20px",
          fontWeight: "bold",
          backgroundImage: `url("whirl.jpg")`,
          backgroundSize: "cover",
          color: "black",
        }}
      >
        FLIP!
      </button>
    </div>
  );
};

export default Card;
