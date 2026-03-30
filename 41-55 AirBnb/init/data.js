const sampleListings = [
  {
    title: 'Cozy Mountain Cabin',
    description: 'A peaceful retreat in the mountains with scenic views.',
    image: {
      url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
      filename: 'unsplash/photo1'
    },
    price: 120,
    location: 'Manali',
    country: 'India',
    reviews: [],
  },
  {
    title: 'Beachside Villa',
    description: 'Enjoy ocean views and private beach access.',
    image: {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      filename: 'unsplash/photo2'
    },
    price: 250,
    location: 'Goa',
    country: 'India',
    reviews: [],
  },
  {
    title: 'Modern Apartment',
    description: 'Stay in the heart of the city with all amenities.',
    image: {
      url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb',
      filename: 'unsplash/photo3'
    },
    price: 90,
    location: 'Mumbai',
    country: 'India',
    reviews: [],
  },
  {
    title: 'Luxury Desert Camp',
    description: 'Experience desert life with modern comfort.',
    image: {
      url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
      filename: 'unsplash/photo4'
    },
    price: 180,
    location: 'Jaisalmer',
    country: 'India',
    reviews: [],
  },
  {
    title: 'Lakeview Cottage',
    description: 'Relax by the lake with stunning sunrise views.',
    image: {
      url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
      filename: 'unsplash/photo5'
    },
    price: 110,
    location: 'Nainital',
    country: 'India',
    reviews: [],
  },
  {
    title: 'Rustic Farmhouse',
    description: 'A charming farmhouse surrounded by greenery.',
    image: {
      url: 'https://images.unsplash.com/photo-1464146072230-91cabc968266',
      filename: 'unsplash/photo6'
    },
    price: 95,
    location: 'Punjab',
    country: 'India',
    reviews: [],
  },
  {
    title: 'Treehouse Stay',
    description: 'Live among trees in this unique treehouse.',
    image: {
      url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae',
      filename: 'unsplash/photo7'
    },
    price: 140,
    location: 'Kerala',
    country: 'India',
    reviews: [],
  },
  {
    title: 'Hilltop Bungalow',
    description: 'A quiet bungalow with breathtaking hill views.',
    image: {
      url: 'https://images.unsplash.com/photo-1449844908441-8829872d2607',
      filename: 'unsplash/photo8'
    },
    price: 130,
    location: 'Shimla',
    country: 'India',
    reviews: [],
  },
  {
    title: 'Heritage Haveli',
    description: 'Stay in a historic haveli with royal interiors.',
    image: {
      url: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b',
      filename: 'unsplash/photo9'
    },
    price: 200,
    location: 'Jaipur',
    country: 'India',
    reviews: [],
  },
  {
    title: 'Forest Cabin',
    description: 'A secluded cabin in the forest.',
    image: {
      url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
      filename: 'unsplash/photo10'
    },
    price: 115,
    location: 'Coorg',
    country: 'India',
    reviews: [],
  },

  // 20 more entries

  {
    title: 'Urban Studio',
    description: 'Compact and modern studio apartment.',
    image: {
      url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858',
      filename: 'unsplash/photo11'
    },
    price: 80,
    location: 'Delhi',
    country: 'India',
    reviews: [],
  },
  {
    title: 'Luxury Penthouse',
    description: 'Top-floor penthouse with skyline views.',
    image: {
      url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
      filename: 'unsplash/photo12'
    },
    price: 300,
    location: 'Bangalore',
    country: 'India',
    reviews: [],
  },
  {
    title: 'Beach Hut',
    description: 'Simple hut right on the beach.',
    image: {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      filename: 'unsplash/photo13'
    },
    price: 70,
    location: 'Goa',
    country: 'India',
    reviews: [],
  },
  {
    title: 'Snow Cabin',
    description: 'Enjoy snowfall from a warm cabin.',
    image: {
      url: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66',
      filename: 'unsplash/photo14'
    },
    price: 150,
    location: 'Manali',
    country: 'India',
    reviews: [],
  },
  {
    title: 'Jungle Lodge',
    description: 'Adventure stay in the jungle.',
    image: {
      url: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d',
      filename: 'unsplash/photo15'
    },
    price: 160,
    location: 'Assam',
    country: 'India',
    reviews: [],
  },
  {
    title: 'Cliffside Villa',
    description: 'Villa perched on a cliff with ocean views.',
    image: {
      url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511',
      filename: 'unsplash/photo16'
    },
    price: 270,
    location: 'Goa',
    country: 'India',
    reviews: [],
  },
  {
    title: 'Eco Stay',
    description: 'Sustainable living with nature.',
    image: {
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
      filename: 'unsplash/photo17'
    },
    price: 100,
    location: 'Rishikesh',
    country: 'India',
    reviews: [],
  },
  {
    title: 'Island Resort',
    description: 'Private island luxury experience.',
    image: {
      url: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21',
      filename: 'unsplash/photo18'
    },
    price: 400,
    location: 'Andaman',
    country: 'India',
    reviews: [],
  },
  {
    title: 'Countryside Villa',
    description: 'Relax in peaceful countryside.',
    image: {
      url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae',
      filename: 'unsplash/photo20'
    },
    price: 140,
    location: 'Udaipur',
    country: 'India',
    reviews: [],
  },

  // last 10

  // ...Array.from({ length: 10 }, (_, i) => ({
  //   title: `Sample Stay ${i + 21}`,
  //   description: 'Comfortable stay with great amenities.',
  //   image: {
  //     url: `https://images.unsplash.com/photo-1505693${i}6388-ac5ce068fe85`,
  //     filename: `unsplash/photo${i + 21}`
  //   },
  //   price: 100 + i * 10,
  //   location: 'Hyderabad',
  //   country: 'India',
  //   reviews: [],
  // }))
];

module.exports = { data: sampleListings };