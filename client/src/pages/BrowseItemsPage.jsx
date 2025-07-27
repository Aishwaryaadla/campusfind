// import React, { useEffect, useState } from 'react'
// import Card from '../components/ui/Card'

// const BrowseItemsPage = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:4000/api/lostitems")
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setItems(data.data);
//         } else {
//           console.error("API responded with success: false");
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch items:", err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="py-10 px-4 bg-base-100 min-h-screen">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6 text-center">Browse Lost Items</h1>

//         {loading ? (
//           <div className="text-center text-base-content text-opacity-70">Loading items...</div>
//         ) : items.length === 0 ? (
//           <div className="text-center text-base-content text-opacity-70">No lost items found.</div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {items.map(item => (
//               <Card
//               key={item._id}
//               title={item.name}
//               description={item.description}
//               image={`http://localhost:4000${item.imageUrl}`}
//             />            
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default BrowseItemsPage






// import { useEffect, useState } from 'react';

// function BrowseItemsPage() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch both lost and found items
//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const lostRes = await fetch('http://localhost:4000/api/lostitems');
//         const foundRes = await fetch('http://localhost:4000/api/founditems');

//         const lostData = await lostRes.json();
//         const foundData = await foundRes.json();

//         if (lostData.success && foundData.success) {
//           // Add type field to each
//           const lostWithType = lostData.data.map(item => ({
//             ...item,
//             type: 'Lost'
//           }));
//           const foundWithType = foundData.data.map(item => ({
//             ...item,
//             type: 'Found'
//           }));

//           // Combine all items
//           const combined = [...lostWithType, ...foundWithType];
//           setItems(combined.reverse()); // newest first
//         } else {
//           console.error("Failed to fetch items");
//         }
//       } catch (err) {
//         console.error("Error fetching items", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, []);

//   if (loading) return <div className="text-center text-xl">Loading items...</div>;

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Browse Items</h1>

//       {items.length === 0 ? (
//         <p>No items found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {items.map((item) => (
//             <div key={item._id} className="bg-white shadow-md rounded-lg p-4">
//               <img
//                 src={`http://localhost:4000${item.imageUrl}`}
//                 alt={item.name}
//                 className="w-full h-48 object-cover rounded"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = 'https://via.placeholder.com/150';
//                 }}
//               />
//               <div className="mt-2">
//                 <span
//                   className={`text-sm px-2 py-1 rounded-full ${
//                     item.type === 'Lost'
//                       ? 'bg-red-100 text-red-800'
//                       : 'bg-green-100 text-green-800'
//                   }`}
//                 >
//                   {item.type}
//                 </span>
//                 <h2 className="text-lg font-semibold mt-1">{item.name}</h2>
//                 <p className="text-gray-600 text-sm">{item.description}</p>
//                 <p className="text-gray-500 text-sm mt-1">
//                   {item.type === 'Lost'
//                     ? `Lost on: ${new Date(item.dateLost).toLocaleDateString()}`
//                     : `Found on: ${new Date(item.dateFound).toLocaleDateString()}`}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default BrowseItemsPage;





import React, { useEffect, useState } from "react";
// import Card from "../components/ui/Card"; 
import ItemCard from "../components/ui/ItemCard";

const BrowseItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const [lostRes, foundRes] = await Promise.all([
          fetch("http://localhost:4000/api/lostitems"),
          fetch("http://localhost:4000/api/founditems"),
        ]);

        const lostData = await lostRes.json();
        const foundData = await foundRes.json();

        const formattedLost = (lostData.data || []).map(item => ({
          ...item,
          type: "lost",
        }));

        const formattedFound = (foundData.data || []).map(item => ({
          ...item,
          type: "found",
        }));

        setItems([...formattedLost, ...formattedFound]);
      } catch (err) {
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="py-10 px-4 bg-base-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Browse Items</h1>

        {loading ? (
          <div className="text-center text-base-content text-opacity-70">
            Loading items...
          </div>
        ) : items.length === 0 ? (
          <div className="text-center text-base-content text-opacity-70">
            No items found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <ItemCard
                key={item._id}
                title={item.name}
                description={item.description}
                image={item.imageUrl ? `http://localhost:4000${item.imageUrl}` : null}
                itemType={item.type}
              >
                <div
                  className={`badge ${
                    item.type === "lost" ? "badge-primary" : "badge-secondary"
                  }`}
                >
                  {item.type === "lost" ? "Lost Item" : "Found Item"}
                </div>
              </ItemCard>
            ))}
          </div>
        )}
      </div>
    </div>
    
  );
};

export default BrowseItems;

