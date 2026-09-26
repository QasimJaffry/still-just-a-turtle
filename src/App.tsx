import { MotionConfig } from "framer-motion";
import Gate from "./components/Gate";
import Scene from "./components/Scene";
import UpdateBadge from "./components/UpdateBadge";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <UpdateBadge />
      <Gate>
        <Scene />
      </Gate>
    </MotionConfig>
  );
}
