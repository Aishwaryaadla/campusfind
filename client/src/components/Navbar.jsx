import React from 'react'
import { Link } from 'react-router'
import { PlusIcon,Search,LogIn } from "lucide-react"

const Navbar = () => {
  return (
  <header className='bg-base-300 border-b border-base-content/10'>
    <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center justify-between'>
                <Search /><h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>CampusFind
                </h1>
            </div>
            
            <div className='flex item-center gap-4'>
                <Link to={"/lost"} className="btn btn-primary">
                    <PlusIcon className='size-5' />
                    <span>Report Lost</span>
                </Link>
            </div>
            <div className='flex item-center gap-4'>
                <Link to={"/found"} className="btn btn-primary">
                    <PlusIcon className='size-5' />
                    <span>Report Found</span>
                </Link>
            </div>
            <div className='flex item-center gap-4'>
                <Link to={"/about"} className="btn btn-secondary">
                    <button>
                    <span>How It Works</span>
                    </button>
                </Link>
            </div>
            <div className='flex item-center gap-4'>
                <Link to={"/login"} className="btn btn-secondary">
                    <LogIn />
                    <button>
                    <span>Sign In</span>
                    </button>
                </Link>
            </div>
            <div className='flex item-center gap-4'>
                <Link to={"/signup"} className="btn btn-secondary">
                    <button>
                    <span>Get Started</span>
                    </button>
                </Link>
            </div>

        </div>
    </div>
  </header>
  )
}

export default Navbar;
