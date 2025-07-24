import { Smartphone, Backpack, Key, Headphones, Book, Umbrella, Watch, Glasses } from 'lucide-react';
import Card from './ui/Card';

const PopularCategories = () => {
  const categories = [
    { icon: <Smartphone className="w-5 h-5 text-accent" />, name: 'Electronics', count: '156 items', desc: 'Phones, chargers, earbuds' },
    { icon: <Backpack className="w-5 h-5 text-accent" />, name: 'Bags & Backpacks', count: '89 items', desc: 'Backpacks, purses, laptop bags' },
    { icon: <Key className="w-5 h-5 text-accent" />, name: 'Keys & Cards', count: '234 items', desc: 'Keychains, ID cards, wallets' },
    { icon: <Headphones className="w-5 h-5 text-accent" />, name: 'Accessories', count: '67 items', desc: 'Earphones, smartwatches, pendrives' },
    { icon: <Book className="w-5 h-5 text-accent" />, name: 'Books & Supplies', count: '78 items', desc: 'Textbooks, notebooks, calculators' },
    { icon: <Umbrella className="w-5 h-5 text-accent" />, name: 'Personal Items', count: '123 items', desc: 'Water bottles, umbrellas, clothing' },
    { icon: <Watch className="w-5 h-5 text-accent" />, name: 'Watches & Jewelry', count: '34 items', desc: 'Watches, rings, chains' },
    { icon: <Glasses className="w-5 h-5 text-accent" />, name: 'Glasses & Cases', count: '45 items', desc: 'Specs, shades, cases' },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4 text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse common item types people usually lose or find on campus.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {categories.map((cat, index) => (
          <Card key={index} className="p-5 text-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-10 h-10 flex items-center justify-center bg-accent/10 rounded-full">
                {cat.icon}
              </div>
              <h3 className="text-lg">{cat.name}</h3>
              <p className="text-sm font-medium text-black">{cat.count}</p>
              <p className="text-xs text-muted-foreground">{cat.desc}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-10">
        <button className="btn btn-outline btn-black">Browse All Categories</button>
      </div>
    </section>
  );
};

export default PopularCategories;
