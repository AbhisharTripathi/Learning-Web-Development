const sampleListings = [
  { title: "Beachfront Villa", description: "Beautiful villa facing the ocean.", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85", price: 6500, location: "Goa", country: "India" },
  { title: "Mountain Cabin", description: "Peaceful wooden cabin in the mountains.", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e", price: 3500, location: "Manali", country: "India" },
  { title: "Luxury Apartment", description: "Modern apartment in downtown.", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb", price: 7200, location: "Mumbai", country: "India" },
  { title: "Royal Haveli Stay", description: "Experience royal Rajasthani culture.", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e", price: 5400, location: "Jaipur", country: "India" },
  { title: "Lake View Cottage", description: "Quiet cottage beside lake.", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688", price: 3800, location: "Nainital", country: "India" },
  { title: "Desert Camp", description: "Traditional camping in desert dunes.", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470", price: 2900, location: "Jaisalmer", country: "India" },
  { title: "Forest Treehouse", description: "Unique treehouse in forest.", image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e", price: 4200, location: "Wayanad", country: "India" },
  { title: "Snow Chalet", description: "Wooden chalet with snow views.", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858", price: 5600, location: "Gulmarg", country: "India" },
  { title: "Hill Resort", description: "Beautiful hilltop resort.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750", price: 4100, location: "Shimla", country: "India" },
  { title: "Backwater Villa", description: "Luxury stay near Kerala backwaters.", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511", price: 4700, location: "Alleppey", country: "India" },

  { title: "Tea Garden Bungalow", description: "Stay in tea plantation.", image: "https://images.unsplash.com/photo-1494526585095-c41746248156", price: 3900, location: "Darjeeling", country: "India" },
  { title: "River View Lodge", description: "Peaceful lodge near river.", image: "https://images.unsplash.com/photo-1501183638710-841dd1904471", price: 3100, location: "Rishikesh", country: "India" },
  { title: "Temple City Stay", description: "Comfortable stay near temples.", image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6", price: 2500, location: "Varanasi", country: "India" },
  { title: "Coffee Estate Stay", description: "Relax in coffee farms.", image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae", price: 3600, location: "Coorg", country: "India" },
  { title: "Wildlife Lodge", description: "Stay near wildlife sanctuary.", image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e", price: 5100, location: "Jim Corbett", country: "India" },
  { title: "Business Hotel", description: "Perfect for business travelers.", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2", price: 6200, location: "Bangalore", country: "India" },
  { title: "Lake Palace Stay", description: "Romantic palace beside lake.", image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9", price: 8800, location: "Udaipur", country: "India" },
  { title: "Cliffside Resort", description: "Amazing cliff view rooms.", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", price: 5300, location: "Varkala", country: "India" },

  { title: "City Apartment", description: "Stylish apartment downtown.", image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353", price: 7200, location: "New York", country: "USA" },
  { title: "Beach Condo", description: "Modern condo near beach.", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85", price: 7500, location: "Miami", country: "USA" },
  { title: "Hollywood Hills Villa", description: "Luxury villa in hills.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750", price: 12000, location: "Los Angeles", country: "USA" },
  { title: "Downtown Loft", description: "Industrial style loft.", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb", price: 6800, location: "Chicago", country: "USA" },

  { title: "Paris Studio", description: "Charming studio apartment.", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688", price: 9000, location: "Paris", country: "France" },
  { title: "London Flat", description: "Elegant flat in central London.", image: "https://images.unsplash.com/photo-1501183638710-841dd1904471", price: 9500, location: "London", country: "UK" },
  { title: "Canal View Apartment", description: "Beautiful canal view.", image: "https://images.unsplash.com/photo-1494526585095-c41746248156", price: 8700, location: "Amsterdam", country: "Netherlands" },
  { title: "Colosseum Stay", description: "Stay near historic landmarks.", image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6", price: 8800, location: "Rome", country: "Italy" },
  { title: "Santorini Villa", description: "White villa with sea view.", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511", price: 11000, location: "Santorini", country: "Greece" },

  { title: "Tokyo Capsule Stay", description: "Modern compact stay.", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2", price: 5000, location: "Tokyo", country: "Japan" },
  { title: "Kyoto Traditional House", description: "Authentic Japanese home.", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e", price: 7200, location: "Kyoto", country: "Japan" },
  { title: "Seoul City Apartment", description: "Trendy city apartment.", image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae", price: 6400, location: "Seoul", country: "South Korea" },
  { title: "Bali Jungle Villa", description: "Private villa in jungle.", image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e", price: 7800, location: "Bali", country: "Indonesia" },

  { title: "Sydney Harbour Apartment", description: "Apartment with harbour view.", image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9", price: 9200, location: "Sydney", country: "Australia" },
  { title: "Melbourne Studio", description: "Modern city studio.", image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353", price: 7000, location: "Melbourne", country: "Australia" },
  { title: "Cape Town Beach House", description: "House near beach.", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85", price: 6500, location: "Cape Town", country: "South Africa" },
  { title: "Dubai Luxury Suite", description: "High-end luxury suite.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750", price: 13000, location: "Dubai", country: "UAE" },
  { title: "Istanbul Heritage Hotel", description: "Historic hotel stay.", image: "https://images.unsplash.com/photo-1501183638710-841dd1904471", price: 7600, location: "Istanbul", country: "Turkey" }
];

module.exports = { data: sampleListings };