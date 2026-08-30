import { MotionConfig } from "framer-motion";
import Gate from "./components/Gate";
import Scene from "./components/Scene";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Gate>
        <Scene />
      </Gate>
    </MotionConfig>
  );
}
