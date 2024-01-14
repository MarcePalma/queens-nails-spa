import * as React from "react";
import useWindowSize from "@rooks/use-window-size";
import ParticleImage, {
  ParticleOptions,
  Vector,
  forces,
  ParticleForce
} from "react-particle-image";

const particleOptions: ParticleOptions = {
  filter: ({ x, y, image }) => {
    const pixel = image.get(x, y);
    return pixel.b > 50;
  },
  color: ({ x, y, image }) => "#fb6185",
  radius: () => Math.random() * 1.5 + 0.5,
  mass: () => 40,
  friction: () => 0.15,
  initialPosition: ({ canvasDimensions }) => {
    return new Vector(canvasDimensions.width / 2, canvasDimensions.height / 2);
  }
};

const motionForce = (x: number, y: number): ParticleForce => {
  return forces.disturbance(x, y, 5);
};

export default function InteractiveNail() {
  try {
    const { innerWidth, innerHeight } = useWindowSize();

    return (
      <ParticleImage
        className="max-w-screen"
        src={"/images/nail-particle.png"}
        width={Number(innerWidth)}
        height={Number(innerHeight)}
        scale={0.50}
        entropy={20}
        maxParticles={2000}
        particleOptions={particleOptions}
        mouseMoveForce={motionForce}
        touchMoveForce={motionForce}
        backgroundColor="#121212"
      />
    );
  } catch (error) {
    console.error("Error in InteractiveNail component:", error);
    // Puedes manejar el error de manera apropiada, por ejemplo, mostrando un mensaje alternativo o realizando alguna acción específica.
    return <div>Error al cargar el componente.</div>;
  }
}
