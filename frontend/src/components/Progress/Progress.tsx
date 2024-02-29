import React from 'react'

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
  
  const styles = {
    progressPath: {
      stroke: '#4CAF50', // Example green color, replace with the hex code of @color-green-060
      strokeLinecap: 'round',
      strokeWidth,
      fillOpacity: 0,
      strokeDasharray: `${diameter}px ${diameter}px`,
      strokeDashoffset: `${((100 - percentage) / 100) * diameter}px`,
    },
    progressTrail: {
      stroke: '#BDBDBD', // Example grey color, replace with the hex code of @color-pewter-grey-095
      strokeWidth,
      fillOpacity: 0,
    },
  };

  return (
    <svg viewBox="0 0 100 100" width={24} height={24}>
      <path
        d={pathDescription}
        strokeWidth={strokeWidth}
        fillOpacity={0}
        style={styles.progressTrail}
      />

      <path
        d={pathDescription}
        strokeWidth={strokeWidth}
        fillOpacity={0}
        style={styles.progressPath}
      />
    </svg>
  )
}

export default Progress
