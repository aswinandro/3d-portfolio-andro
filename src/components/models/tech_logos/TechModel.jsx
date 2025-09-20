import React, { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

const TechModel = ({ model }) => {
  // useGLTF loads the 3D model. It caches the result automatically.
  const { scene, animations } = useGLTF(model.modelPath);
  const { ref, actions } = useAnimations(animations);

  // Play animations if they exist
  useEffect(() => {
    if (actions) {
      const actionNames = Object.keys(actions);
      if (actionNames.length > 0) {
        actions[actionNames[0]].play();
      }
    }
  }, [actions]);

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={model.scale}
      rotation={model.rotation}
      position={[0, -0.5, 0]} // Adjust position to center it in the view
    />
  );
};

export default TechModel;