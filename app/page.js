'use client';
import { useState } from 'react';
import { Search, MapPin, IndianRupee, Users } from 'lucide-react';

const BANGALORE_PGS = [
  {
    id: 1,
    name: "Sri Sai Luxury Coliving",
    location: "Koramangala",
    type: "Unisex",
    sharing: "Single / Double",
    price: 12000,
    amenities: ["Wi-Fi", "Food", "AC", "Power Backup"],
    rating: "4.5"
  },
  {
    id: 2,
    name: "Stanza Living Dublin House",
    location: "Electronic City",
    type: "Gents",
    sharing: "Double / Triple",
    price: 8500,
    amenities: ["Wi-Fi", "Food", "Gym", "Laundry"],
    rating: "4.7"
  },
  {
    id: 3,
    name: "Sri Balaji Ladies PG",
    location: "Marathahalli",
    type: "Ladies",
    sharing: "Single / Double / Triple",
    price: 7000,
    amenities: ["Wi-Fi", "Food", "CCTV Security"],
    rating: "4.2"
  },
  {
    id: 4,
    name: "Zolo Stay Nest",
    location: "Koramangala",
    type: "Gents",
    sharing: "Single",
    price: 15000,
    amenities: ["Wi-Fi", "AC", "Gym", "Biometric Entry"],
    rating: "4.6"
  }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const filteredPGs = BANGALORE_PGS.filter(pg => {
    const matchesSearch = pg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pg.amenities.some(a => a.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = selectedLocation === 'All' || pg.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center my-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Find Your Perfect PG with Namma Stay
        </h2>
        <p className="mt-3 text-lg text-gray-500">
          Zero brokerage. Direct owner contact. Verified Bangalore listings.
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by PG name or amenities (e.g., Wi-Fi, AC)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div className="w-full md:w-48">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="All">All Locations</option>
            <option value="Koramangala">Koramangala</option>
            <option value="Electronic City">Electronic City</option>
            <option value="Marathahalli">Marathahalli</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPGs.map((pg) => (
          <div key={pg.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  pg.type === 'Ladies' ? 'bg-pink-100 text-pink-800' : 
                  pg.type === 'Gents' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {pg.type}
                </span>
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded">
                  ⭐ {pg.rating}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{pg.name}</h3>
              
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin className="w-4 h-4 mr-1 text-indigo-500" />
                {pg.location}, Bangalore
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Users className="w-4 h-4 mr-1 text-indigo-500" />
                {pg.sharing} Sharing
              </div>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {pg.amenities.map((amenity, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                    {amenity}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <div>
                  <span className="text-xs text-gray-400 block">Starting from</span>
                  <span className="text-xl font-extrabold text-indigo-600 flex items-center">
                    <IndianRupee className="w-4 h-4" /> {pg.price.toLocaleString('en-IN')}<span className="text-xs text-gray-500 font-normal">/mo</span>
                  </span>
                </div>
                <button 
                  onClick={() => alert(`Connecting you to ${pg.name} via Namma Stay...`)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPGs.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No PGs found matching your search preferences. Try selecting another locality!
        </div>
      )}
    </div>
  );
}
