import React from 'react'
import { SidebarMenu } from './SidebarMenu'

export const MobileButton = () => {
  return (
    <div className='block md:hidden'>
        <SidebarMenu />
    </div>
  )
}
