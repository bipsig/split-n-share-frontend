import React from 'react'

const HeaderWithSubtitle = ({ heading, subtitle }) => {
  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
        {heading}
      </h1>
      <p className="text-sm text-gray-600 mt-1">
        {subtitle}
      </p>
    </div>
  )
}

export default HeaderWithSubtitle;
