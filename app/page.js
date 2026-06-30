'use client';
import { useState } from 'react';
import { Search, MapPin, IndianRupee, Users, Shield, Flame, CheckCircle2, Snowflake, Sun, PhoneCall } from 'lucide-react';

// Highly detailed, aesthetic PG listings across prime Bangalore college hubs
const BANGALORE_PGS = [
  {
    id: 1,
    name: "Sri Sai Luxury Coliving Hub",
    locality: "Koramangala",
    exactLocation: "1st Block, near Sony World Signal & Juices Stall, Koramangala",
    type: "Unisex",
    isAC: true,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
    rating: "4.8",
    tag: "Trending",
    ownerWhatsapp: "919876543210", 
    sharingOptions: [
      { type: "1 Sharing (Private)", price: 16000, available: true },
      { type: "2 Sharing", price: 11500, available: true },
      { type: "3 Sharing", price: 9000, available: false }
    ],
    amenities: ["Food Included (3 Meals)", "High-Speed Wi-Fi", "Gym Access", "Power Backup"]
  },
  {
    id: 2,
    name: "Stanza Living Premium Stay",
    locality: "Electronic City",
    exactLocation: "Phase 1, Doddathogur Road, near PES University EC Campus entrance",
    type: "Gents",
    isAC: false,
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=600&q=80",
    rating: "4.7",
    tag: "Best Value",
    ownerWhatsapp: "919876543211",
    sharingOptions: [
      { type: "1 Sharing (Private)", price: 14000, available: true },
      { type: "2 Sharing", price: 9500, available: true },
      { type: "3 Sharing", price: 7500, available: true },
      { type: "4 Sharing", price: 6000, available: true }
    ],
    amenities: ["Food Included (Veg/Non-Veg)", "Daily Housekeeping", "Laundry Machine", "Gaming Zone"]
  },
  {
    id: 3,
    name: "Sri Balaji Elegant Ladies PG",
    locality: "Marathahalli",
    exactLocation: "Spice Garden Layout, behind Innovative Multiplex, Marathahalli",
    type: "Ladies",
    isAC: true,
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80",
    rating: "4.5",
    tag: "Highly Rated",
    ownerWhatsapp: "919876543212",
    sharingOptions: [
      { type: "1 Sharing (Private)", price: 12000, available: false },
      { type: "2 Sharing", price: 8500, available: true },
      { type: "3 Sharing", price: 6500, available: true }
    ],
    amenities: ["Food Included", "Biometric Gate", "CCTV 24/7 Security", "Washing Machine"]
  },
  {
    id: 4,
    name: "Zolo Stay Nest Premium",
    locality: "Koramangala",
    exactLocation: "4th Block, 80 Feet Road, opposite Maharaja Restaurant, Koramangala",
    type: "Gents",
    isAC: true,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80",
    rating: "4.9",
    tag: "Luxury Choice",
    ownerWhatsapp: "919876543213",
    sharingOptions: [
      { type: "1 Sharing (Private)", price: 18000, available: true },
      { type: "2 Sharing", price: 13000, available: true }
    ],
    amenities: ["Self Cooking Option", "Premium Co-working Lounge", "Gym", "Terrace Cafe"]
  }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [acFilter, setAcFilter] = useState('All'); // 'All' | 'AC' | 'Non-AC'

  // Precision filtering for custom structural requests
  const filteredPGs = BANGALORE_PGS.filter(pg => {
    const matchesSearch = pg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pg.exactLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pg.amenities.some(a => a.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocality = selectedLocality === 'All' || pg.locality === selectedLocality;
    const matchesType = selectedType === 'All' || pg.type === selectedType;
    
    const matchesAC = acFilter === 'All' || 
                      (acFilter === 'AC' && pg.isAC) || 
                      (acFilter === 'Non-AC' && !pg.isAC);
    
    return matchesSearch && matchesLocality && matchesType && matchesAC;
  });

  const handleBooking = (pgName, ownerNumber, sharingType, price, exactLocation) => {
    const message = `Hello! I found your PG "${pgName}" on the Namma Stay App.\n\n📍 Location: ${exactLocation}\n🛏️ Choice: ${sharingType}\n💰 Price: ₹${price}/month\n\nIs this room vacant? I would like to schedule a visit and pay the token amount.`;
    const whatsappUrl = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16 font-sans antialiased text-slate-800">
      
      {/* Aesthetic App Header Banner */}
      <div className="bg-gradient-to-b from-indigo-600 to-indigo-700 text-white pt-8 pb-14 px-4 rounded-b-[2rem] shadow-md text-center">
        <div className="max-w-md mx-auto">
          <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            ✨ Premium Accommodation Platform
          </span>
          <h1 className="text-3xl font-black tracking-tight mt-3">NAMMA STAY</h1>
          <p className="text-xs text-indigo-100 mt-1 opacity-90">
            Find verified PGs instantly • Tap to contact owners directly via WhatsApp
          </p>
        </div>
      </div>

      {/* Main Interactive App Container */}
      <div className="max-w-md mx-auto px-4 -mt-8">
        
        {/* Modern App Search & Filter Console */}
        <div className="bg-white rounded-2xl p-4 shadow-xl shadow-slate-100 border border-slate-100 mb-6">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search local areas, colleges, or landmarks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Quick UI Quick Filter Rows */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-50">
            
            {/* Area Filter Selector */}
            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              className="px-2 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-[11px] font-bold text-slate-600 focus:outline-none border border-transparent cursor-pointer"
            >
              <option value="All">📍 All Areas</option>
              <option value="Koramangala">Koramangala</option>
              <option value="Electronic City">Electronic City</option>
              <option value="Marathahalli">Marathahalli</option>
            </select>

            {/* Occupancy Target Group */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-2 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-[11px] font-bold text-slate-600 focus:outline-none border border-transparent cursor-pointer"
            >
              <option value="All">👥 Sharing For</option>
              <option value="Unisex">Unisex</option>
              <option value="Gents">Gents</option>
              <option value="Ladies">Ladies</option>
            </select>

            {/* Smart Climate Control Filter Pill */}
            <select
              value={acFilter}
              onChange={(e) => setAcFilter(e.target.value)}
              className={`px-2 py-2 rounded-xl text-[11px] font-bold focus:outline-none transition-all cursor-pointer border ${
                acFilter === 'AC' 
                  ? 'bg-blue-50 border-blue-200 text-blue-600' 
                  : acFilter === 'Non-AC' 
                  ? 'bg-amber-50 border-amber-200 text-amber-700' 
                  : 'bg-slate-50 border-transparent text-slate-600'
              }`}
            >
              <option value="All">❄️ AC / Non-AC</option>
              <option value="AC">AC Rooms</option>
              <option value="Non-AC">Non-AC Rooms</option>
            </select>

          </div>
        </div>

        {/* Aesthetic App-Style Dynamic Card Display Feed */}
        <div className="space-y-6">
          {filteredPGs.map((pg) => (
            <div key={pg.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100/80 flex flex-col hover:shadow-lg transition-all duration-300">
              
              {/* Product Photo Element */}
              <div className="relative h-48 w-full bg-slate-100">
                <img src={pg.image} alt={pg.name} className="w-full h-full object-cover" />
                
                {/* Meta Labels */}
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                  {pg.tag}
                </div>
                
                <div className="absolute bottom-3 right-3 bg-white px-2 py-0.5 rounded-md text-[10px] font-black text-slate-800 shadow-sm">
                  ⭐ {pg.rating}
                </div>

                <div className="absolute top-3 right-3 flex gap-1.5">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full shadow text-white uppercase tracking-wider ${
                    pg.type === 'Ladies' ? 'bg-pink-500' : pg.type === 'Gents' ? 'bg-blue-600' : 'bg-purple-600'
                  }`}>
                    {pg.type}
                  </span>
                  
                  {/* Visual climate indicator pill inside the header block */}
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full shadow flex items-center gap-0.5 text-white ${
                    pg.isAC ? 'bg-cyan-500' : 'bg-orange-400'
                  }`}>
                    {pg.isAC ? <Snowflake className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
                    {pg.isAC ? 'AC' : 'Non-AC'}
                  </span>
                </div>
              </div>

              {/* Information Meta Data Fields */}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">{pg.name}</h3>
                
                {/* Fully Enhanced Exact Physical Address Block */}
                <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-[11px] font-medium text-slate-600 mt-2 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">{pg.locality} Hub</span>
                    {pg.exactLocation}
                  </div>
                </div>

                {/* Facilities Badges Row */}
                <div className="flex flex-wrap gap-1 mt-3 mb-4">
                  {pg.amenities.map((amenity, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 text-[9px] font-bold px-2 py-0.5 rounded">
                      ✓ {amenity}
                    </span>
                  ))}
                </div>

                {/* Structured Room Sharing Matrices Sheet Options */}
                <div className="bg-indigo-50/40 rounded-2xl p-3 border border-indigo-50 mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 block mb-2">Select Sharing Room Option:</span>
                  <div className="space-y-1.5">
                    {pg.sharingOptions.map((option, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-100 text-xs shadow-xs">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-bold text-slate-700">{option.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 flex items-center">
                            <IndianRupee className="w-3 h-3" />{option.price.toLocaleString('en-IN')}<span className="text-[10px] text-slate-400 font-normal">/mo</span>
                          </span>
                          {option.available ? (
                            <button
                              onClick={() => handleBooking(pg.name, pg.ownerWhatsapp, option.type, option.price, pg.exactLocation)}
                              className="bg-emerald-600 text-white font-extrabold px-3 py-1 rounded-lg text-[10px] flex items-center gap-0.5 shadow-sm active:scale-95 transition-transform"
                            >
                              <PhoneCall className="w-2.5 h-2.5" /> Chat
                            </button>
                          ) : (
                            <span className="text-slate-300 text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded-md">Full</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Guarantee Footer element */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center text-[10px] text-slate-400 gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 fill-emerald-50" /> Secure Token Deposit Protection Enabled
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Empty Search Fallback Handling */}
        {filteredPGs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed text-xs p-6 text-slate-400 font-medium">
            No PGs found matching those filter constraints. Try resetting the AC or location filter!
          </div>
        )}
      </div>
    </div>
  );
}
