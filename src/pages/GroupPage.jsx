import React from 'react'
import { useParams } from 'react-router-dom'

const GroupPage = () => {
  const { id } = useParams();
  return (
    <div>
      Group Page {id}
    </div>
  )
}

export default GroupPage
