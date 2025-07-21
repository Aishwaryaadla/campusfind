import React from 'react'
import { Link } from 'react-router'
import { PlusIcon,Search,User } from "lucide-react"

const Navbar = () => {
  return (
    <header className="border-b bg-white sticky top-0 z-50">    
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">

            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Search className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-semibold">CampusFind</span>
            </div>

            {/* <div className='flex item-center gap-4'>
                <Link to={"/browseitems"} className="btn btn-primary">
                    <span>Browse Items</span>
                </Link>
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
            </div> */}



            <div className="hidden md:flex items-center space-x-8">
                <Link to={"/browseitems"} className="text-muted-foreground hover:text-foreground transition-colors">
                <span>Browse Items</span>
                </Link>

                <Link to={"/lost"} className="text-muted-foreground hover:text-foreground transition-colors btn bg-white sticky">
                    <PlusIcon className='size-5' />
                    <span>Report Lost</span>
                </Link>

                <Link to={"/found"} className="text-muted-foreground hover:text-foreground transition-colors btn bg-white sticky">
                    <PlusIcon className='size-5' />
                    <span>Report Found</span>
                </Link>

                <Link to={"/about"} className="text-muted-foreground hover:text-foreground transition-colors">
                <span>How It Works</span>
                </Link>


                
            </div>


            <div className="flex items-center space-x-4">
                <Link to={'/login'} className="btn bg-white sticky">
                    <User className="w-4 h-4 mr-2" />Sign In
                </Link>
                <Link to={'/signup'} className="btn btn-primary">
                    Get Started
                </Link>
          </div>



        </div>
    </div>
  </header>
  )
}

export default Navbar;
