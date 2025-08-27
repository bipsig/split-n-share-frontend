import React from 'react'
import HeaderWithSubtitle from '../components/common/PageHeader/HeaderWithSubtitle';

// const pageVariants = {
//   default: "default",
//   details: 
// }

const PageHeaderSection = ({ heading, subtitle, isDetails = false, children }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">

      <HeaderWithSubtitle
        heading={heading}
        subtitle={subtitle}
      />

      <div className="flex gap-3">
        {children}
      </div>

    </div>
  )
}

export default PageHeaderSection;
