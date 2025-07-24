import React from 'react'
import {Search,Plus,Eye} from 'lucide-react'
import Card from '../components/ui/Card'
import { Link } from 'react-router'

const HeroSection = () => {
  return (
    <div>
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 text-center">
      <h1 className="text-4xl md:text-5xl mb-6 max-w-4xl mx-auto">
            Lost something on campus? Found something that isn't yours?
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            CampusFind connects our community to reunite lost items with their owners quickly and easily.
          </p>

          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input placeholder="Search for lost items..." className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"/>  
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/20">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Search className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">I Lost Something</h3>
                <p className="text-muted-foreground">
                  Report your lost item and get notified when someone finds it
                </p>
                <div className="w-full">
                  <div className="btn btn-outline w-full flex justify-center items-center gap-2">
                    <Link to={'/lost'} className="w-full flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span>Report Lost Item</span>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/20">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">I Found Something</h3>
                <p className="text-muted-foreground">
                Help return a found item to its rightful owner by connecting to them
                </p>
                <div className="w-full">
                  <div className="btn btn-outline w-full flex justify-center items-center gap-2">
                    <Link to={'/found'} className="w-full flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span>Report Found Item</span>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        </section>
    </div>
        
  )
}

export default HeroSection
