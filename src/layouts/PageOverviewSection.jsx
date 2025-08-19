import React from 'react'

const PageOverviewSection = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {children}
    </div>
  )
}

export default PageOverviewSection;