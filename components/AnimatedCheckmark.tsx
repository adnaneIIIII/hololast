// components/AnimatedCheckmark.tsx
"use client"

import React from "react"
import { motion } from "framer-motion"

interface CheckmarkProps {
  size?: number
  strokeWidth?: number
  className?: string
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        delay: i * 0.3,
        type: "spring",
        duration: 1.8,
        bounce: 0.1,
      },
      opacity: { delay: i * 0.3, duration: 0.3 },
    },
  }),
}

export default function AnimatedCheckmark({
  size = 120,
  strokeWidth = 3,
  className = "",
}: CheckmarkProps) {
  return (
    <div className="relative">
      <motion.div
        className="absolute inset-0 bg-orange-500/20 rounded-full blur-2xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1.2 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-0 border-2 border-orange-500/30 rounded-full"
        animate={{
          scale: [1, 1.05, 1],
          transition: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
      />
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        initial="hidden"
        animate="visible"
        className={`relative z-10 ${className}`}
      >
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="rgb(234 89 12)"
          strokeWidth={strokeWidth}
          fill="transparent"
          custom={0}
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: {
                pathLength: {
                  delay: 0,
                  type: "spring" as const,
                  duration: 1.8,
                  bounce: 0.1
                },
                opacity: { delay: 0, duration: 0.3 }
              }
            }
          }}
          style={{ strokeLinecap: "round" }}
        />
        <motion.path
          d="M25 50L42 67L75 33"
          stroke="rgb(234 89 12)"
          strokeWidth={strokeWidth + 1}
          fill="transparent"
          custom={1}
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: {
                pathLength: {
                  delay: 0.3,
                  type: "spring" as const,
                  duration: 1.8,
                  bounce: 0.1
                },
                opacity: { delay: 0.3, duration: 0.3 }
              }
            }
          }}
          style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
        />
      </motion.svg>
    </div>
  )
}
