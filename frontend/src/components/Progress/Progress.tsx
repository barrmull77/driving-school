import React from 'react'
import style from './style.less'

export interface ProgressProps {
  percentage?: number
  strokeWidth?: number
}

const Progress: React.FunctionComponent<ProgressProps> = ({
  strokeWidth = 12,
  percentage = 0,
}) => {
  const radius = 50 - strokeWidth / 2
  const pathDescription = `
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}
    `

  const diameter = Math.PI * 2 * radius
  const progressStyle = {
    strokeDasharray: `${diameter}px ${diameter}px`,
    strokeDashoffset: `${((100 - percentage) / 100) * diameter}px`,
  }

  return (
    <svg viewBox="0 0 100 100" width={24} height={24}>
      <path
        className={style.progressTrail}
        d={pathDescription}
        strokeWidth={strokeWidth}
        fillOpacity={0}
      />

      <path
        className={style.progressPath}
        d={pathDescription}
        strokeWidth={strokeWidth}
        fillOpacity={0}
        style={progressStyle}
      />
    </svg>
  )
}

export default Progress
