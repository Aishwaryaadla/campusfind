import React from 'react'


const RateLimit = () => {
  return (
    <div className='max-w-2xl mx-auto px-4 py-8 flex items-center justify-center'>
        <div className='bg-primary/10 border border-primary/30 rounded-lg shadow-md'>
            <div className='flex-1 text-center md:text-left'>
                <h3 className='text-xl font-bold mb-2'>Rate Limit Reached</h3>
                <p className='text-base-content mb-1'>You've made too many requests in a short period. Please wait a moment</p>
                <p className='text-sm text-base-content/70'> Try again in a few seconds for the best experience</p>
            </div>
        </div>      
    </div>
  )
}

export default RateLimit
