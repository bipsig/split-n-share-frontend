import React from 'react'

const PageLayout = ({ children }) => {
  return (
    <div className="w-full h-full space-y-6 bg-gradient-to-br from-gray-50 via-gray-100 to-slate-100 min-h-screen">
      {children}
    </div>
  )
}

export default PageLayout;
