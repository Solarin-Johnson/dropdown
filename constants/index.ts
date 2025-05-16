export const SPRING_CONFIG = {
  stiffness: 280,
  damping: 32,
  mass: 0.4,
};

export const SPRING_CONFIG_BOUNCE = {
  stiffness: 1000,
  damping: 500,
  mass: 3,
  overshootClamping: true,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};
