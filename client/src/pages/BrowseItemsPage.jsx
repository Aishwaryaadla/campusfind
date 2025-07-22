import React, { useEffect, useState } from 'react'
import Card from '../components/ui/Card'

const BrowseItemsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/lostitems")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setItems(data.data);
        } else {
          console.error("API responded with success: false");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch items:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-10 px-4 bg-base-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Browse Lost Items</h1>

        {loading ? (
          <div className="text-center text-base-content text-opacity-70">Loading items...</div>
        ) : items.length === 0 ? (
          <div className="text-center text-base-content text-opacity-70">No lost items found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map(item => (
              <Card
              key={item._id}
              title={item.name}
              description={item.description}
              image={`http://localhost:4000${item.imageUrl}`}
            />            
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BrowseItemsPage
