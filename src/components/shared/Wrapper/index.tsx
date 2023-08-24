import React, { FC, ReactNode } from 'react'

const Wrapper:FC<{children:ReactNode}> = ({children}) => {
  return (
    <div className='max-w-7xl mx-auto px-4 md:px-10'>{children}</div>
  )
}

export default Wrapper