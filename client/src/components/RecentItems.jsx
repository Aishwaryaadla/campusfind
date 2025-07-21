import { Calendar, MapPin, Tag } from 'lucide-react';

const recentItems = [
  {
    id: 1,
    title: "iPhone 14 Pro",
    description: "Black iPhone with cracked screen protector",
    location: "Library - 2nd Floor",
    date: "2 hours ago",
    status: "found",
    category: "Electronics"
  },
  {
    id: 2,
    title: "Blue Nike Backpack",
    description: "Navy blue backpack with laptop compartment",
    location: "Student Center",
    date: "5 hours ago",
    status: "lost",
    category: "Bags"
  },
  {
    id: 3,
    title: "Silver MacBook Air",
    description: "13-inch MacBook with university stickers",
    location: "Computer Lab - Engineering",
    date: "1 day ago",
    status: "found",
    category: "Electronics"
  },
  {
    id: 4,
    title: "Red Water Bottle",
    description: "Hydro Flask with name 'Sarah' on it",
    location: "Gym - Locker Room",
    date: "1 day ago",
    status: "lost",
    category: "Personal Items"
  }
];

export function RecentItems() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4 font-semibold">Recent Lost & Found Items</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See what's been recently reported. Your item might already be here waiting for you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {recentItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>

                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {item.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {item.date}
                  </div>
                  <div className="flex items-center">
                    <Tag className="w-4 h-4 mr-1" />
                    {item.category}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="border px-6 py-2 rounded-md text-sm hover:bg-gray-100 transition">
            View All Items
          </button>
        </div>
      </div>
    </section>
  );
}
