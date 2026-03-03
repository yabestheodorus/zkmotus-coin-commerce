export const animationProperties = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // delay between each child
        delayChildren: 0.1, // optional: wait 0.3s before starting
      },
    },
  },

  item: {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 600, damping: 20 },
    },
  },

  fade: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 600, damping: 20 },
    },
  },
};
