// "use client";

// import { motion } from "framer-motion";

// interface CheckmarkProps {
//   size?: number;
//   strokeWidth?: number;
//   color?: string;
//   className?: string;
// }

// const draw = {
//   hidden: { pathLength: 0, opacity: 0 },
//   visible: {
//     pathLength: 1,
//     opacity: 1,
//     transition: {
//       pathLength: {
//         type: "spring" as const,
//         duration: 1.5,
//         bounce: 0.2,
//         ease: "easeInOut",
//       },
//       opacity: { duration: 0.2 },
//     },
//   },
// };

// export function Checkmark({
//   size = 100,
//   strokeWidth = 2,
//   color = "currentColor",
//   className = "",
// }: CheckmarkProps) {
//   return (
//     <motion.svg
//       width={size}
//       height={size}
//       viewBox="0 0 100 100"
//       initial="hidden"
//       animate="visible"
//       className={className}
//     >
//       <title>Animated Checkmark</title>
//       <motion.circle
//         cx="50"
//         cy="50"
//         r="40"
//         stroke={color}
//         variants={{
//           hidden: { pathLength: 0, opacity: 0 },
//           visible: {
//             pathLength: 1,
//             opacity: 1,
//             transition: {
//               pathLength: {
//                 type: "spring",
//                 duration: 1.5,
//                 bounce: 0.2,
//                 ease: [0.65, 0, 0.35, 1] // Using bezier curve values for easeInOut
//               },
//               opacity: { duration: 0.2 }
//             }
//           }
//         }}
//         style={{
//           strokeWidth,
//           strokeLinecap: "round",
//           fill: "transparent",
//         }}
//         transition={{
//           delay: 0,
//         }}
//       />
//       <motion.path
//         d="M30 50L45 65L70 35"
//         stroke={color}
//         variants={{
//           hidden: { pathLength: 0, opacity: 0 },
//           visible: {
//             pathLength: 1,
//             opacity: 1,
//             transition: {
//               pathLength: {
//                 type: "spring",
//                 duration: 1.5,
//                 bounce: 0.2,
//                 ease: [0.65, 0, 0.35, 1] // Using bezier curve values for easeInOut
//               },
//               opacity: { duration: 0.2 }
//             }
//           }
//         }}
//         style={{
//           strokeWidth,
//           strokeLinecap: "round",
//           strokeLinejoin: "round",
//           fill: "transparent",
//         }}
//         transition={{
//           delay: 0.2,
//         }}
//       />
//     </motion.svg>
//   );
// }