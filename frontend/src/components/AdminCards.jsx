import React from 'react'
import ActiveCaretakersCard from './ActiveCaretakersCard'
import ConnectedDevicesCard from './ConnectedDevicesCard'
import PendingIssuesCard from './PendingIssuesCard'

function AdminCards() {
  return (
    <div className="w-full px-6 pl-10">
      <h1 className="text-2xl font-semibold text-gray-700 mt-4 mb-6">Welcome, Harsha!</h1>
      <div className="flex flex-wrap gap-10">
        <ActiveCaretakersCard/>
        <ConnectedDevicesCard/>
        <PendingIssuesCard/>
      </div>
    </div>
    
  )
}

export default AdminCards