// Featured Auctions
export const featuredAuctions = [
  {
    id: 1,
    title: "Limited Edition Rolex worn at Oscars",
    name: "Limited Edition Rolex worn at Oscars",
    image: "https://images.unsplash.com/photo-1665159882881-883891068051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
    currentBid: 24500,
    highestBid: 24500,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 2 + 1000 * 60 * 15), // 2h 15m from now
    seller: {
      id: 101,
      name: "Brad Mitchell",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=399&q=80",
      verified: true
    },
    celebrity: "Brad Mitchell",
    category: "watches",
    charityPercent: 15,
    charityName: "Children's Education Fund"
  },
  {
    id: 2,
    title: "Diamond Necklace from Met Gala",
    name: "Diamond Necklace from Met Gala",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    currentBid: 18750,
    highestBid: 19000,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 4 + 1000 * 60 * 30), // 4h 30m from now
    seller: {
      id: 102,
      name: "Emma Stone",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      verified: true
    },
    celebrity: "Emma Stone",
    category: "jewelry",
    charityPercent: 10,
    charityName: "Women's Health Initiative"
  },
  {
    id: 3,
    title: "Custom Leather Jacket from Premiere",
    name: "Custom Leather Jacket from Premiere",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
    currentBid: 7800,
    highestBid: 7800,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 + 1000 * 60 * 60 * 8), // 1d 8h from now
    seller: {
      id: 103,
      name: "Ryan Reynolds",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      verified: true
    },
    celebrity: "Ryan Reynolds",
    category: "clothing",
    charityPercent: 20,
    charityName: "Cancer Research"
  }
];

// Featured Celebrities
export const featuredCelebrities = [
  {
    id: 101,
    name: "John Davis",
    role: "Actor & Producer",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 102,
    name: "Sarah Johnson",
    role: "Actress",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=461&q=80"
  },
  {
    id: 103,
    name: "Michael Lewis",
    role: "Musician",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
  },
  {
    id: 104,
    name: "Emma Parker",
    role: "Model & Influencer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"
  }
];

// Auction Listings
export const auctions = [
  ...featuredAuctions,
  {
    id: 4,
    title: "Custom Tom Ford Suit from Premiere",
    name: "Custom Tom Ford Suit from Premiere",
    image: "https://images.unsplash.com/photo-1557330359-ffb0deed6163?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    currentBid: 12800,
    highestBid: 13100,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 5 + 1000 * 60 * 42), // 5h 42m from now
    seller: {
      id: 105,
      name: "Daniel Craig",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      verified: true
    },
    celebrity: "Daniel Craig",
    category: "clothing",
    charityPercent: 15,
    charityName: "Film Preservation Foundation"
  },
  {
    id: 5,
    title: "Cartier Gold Bracelet from Awards Show",
    name: "Cartier Gold Bracelet from Awards Show",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    currentBid: 8450,
    highestBid: 8800,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 8 + 1000 * 60 * 10), // 8h 10m from now
    seller: {
      id: 106,
      name: "Jessica Alba",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      verified: true
    },
    celebrity: "Jessica Alba",
    category: "jewelry",
    charityPercent: 20,
    charityName: "Women in Film"
  },
  {
    id: 6,
    title: "Game-Worn Signed Nike Sneakers",
    name: "Game-Worn Signed Nike Sneakers",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    currentBid: 15600,
    highestBid: 15600,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 + 1000 * 60 * 60 * 3), // 1d 3h from now
    seller: {
      id: 107,
      name: "LeBron James",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      verified: true
    },
    celebrity: "LeBron James",
    category: "footwear",
    charityPercent: 85,
    charityName: "Youth Sports Foundation"
  },
  {
    id: 7,
    title: "Vintage Versace Gown from Red Carpet",
    name: "Vintage Versace Gown from Red Carpet",
    image: "https://images.unsplash.com/photo-1511871893393-82e9c16b81e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    currentBid: 22750,
    highestBid: 23500,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 6 + 1000 * 60 * 25), // 6h 25m from now
    seller: {
      id: 108,
      name: "Zendaya",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80",
      verified: true
    },
    celebrity: "Zendaya",
    category: "clothing",
    charityPercent: 30,
    charityName: "Fashion Scholarship Fund"
  },
  {
    id: 8,
    title: "Signed Martin Guitar from World Tour",
    name: "Signed Martin Guitar from World Tour",
    image: "https://images.unsplash.com/photo-1460467820054-c87ab43e9b59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1467&q=80",
    currentBid: 18200,
    highestBid: 18950,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 60 * 10), // 2d 10h from now
    seller: {
      id: 109,
      name: "Ed Sheeran",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      verified: true
    },
    celebrity: "Ed Sheeran",
    category: "memorabilia",
    charityPercent: 100,
    charityName: "Music Education Initiative"
  },
  {
    id: 9,
    title: "Limited Edition Hermès Handbag",
    name: "Limited Edition Hermès Handbag",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    currentBid: 27900,
    highestBid: 28250,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 12 + 1000 * 60 * 45), // 12h 45m from now
    seller: {
      id: 110,
      name: "Blake Lively",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      verified: true
    },
    celebrity: "Blake Lively",
    category: "accessories",
    charityPercent: 40,
    charityName: "Children's Hospital Foundation"
  }
];

// All Celebrities
export const celebrities = [
  ...featuredCelebrities.map(celeb => ({
    ...celeb,
    itemCount: Math.floor(Math.random() * 20) + 10,
    auctionCount: Math.floor(Math.random() * 7) + 2
  })),
  {
    id: 105,
    name: "Chris Evans",
    role: "Actor, Producer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    itemCount: 12,
    auctionCount: 4
  },
  {
    id: 106,
    name: "Taylor Swift",
    role: "Musician, Songwriter",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    itemCount: 24,
    auctionCount: 7
  },
  {
    id: 107,
    name: "Serena Williams",
    role: "Athlete, Entrepreneur",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    itemCount: 18,
    auctionCount: 3
  },
  {
    id: 108,
    name: "John Legend",
    role: "Musician, Producer",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    itemCount: 15,
    auctionCount: 5
  },
  {
    id: 109,
    name: "Zoe Saldana",
    role: "Actress, Producer",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80",
    itemCount: 20,
    auctionCount: 6
  },
  {
    id: 110,
    name: "Idris Elba",
    role: "Actor, Producer, DJ",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    itemCount: 16,
    auctionCount: 4
  }
];

// Featured Celebrity
export const featuredCelebrity = {
  id: 201,
  name: "Emma Watson",
  role: "Actress, Model, Activist",
  bio: "Emma Watson is selling pieces from her personal wardrobe, including items worn at major premieres and events. A portion of all sales goes to support educational charities worldwide.",
  image: "https://images.unsplash.com/photo-1532332248682-206cc786359f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  itemCount: 28,
  auctionCount: 8,
  charity: 42
};

// Users for Admin
export const users = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "celebrity",
    status: "active",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    joinedAt: "Apr 12, 2023"
  },
  {
    id: 2,
    name: "Michael Davis",
    email: "michael.davis@example.com",
    role: "user",
    status: "active",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    joinedAt: "May 3, 2023"
  },
  {
    id: 3,
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    role: "admin",
    status: "active",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    joinedAt: "Jan 18, 2023"
  },
  {
    id: 4,
    name: "Emily Taylor",
    email: "emily.taylor@example.com",
    role: "celebrity",
    status: "pending",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80",
    joinedAt: "Mar 30, 2023"
  },
  {
    id: 5,
    name: "James Brown",
    email: "james.brown@example.com",
    role: "user",
    status: "inactive",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    joinedAt: "Feb 15, 2023"
  }
];

// Celebrity Verification Requests
export const celebrityRequests = [
  {
    id: 301,
    name: "Amanda Richards",
    role: "Actress, Model",
    email: "amanda.richards@example.com",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80",
    idVerified: true,
    agentConfirmed: true
  },
  {
    id: 302,
    name: "Thomas Clark",
    role: "Musician, Producer",
    email: "thomas.clark@example.com",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    idVerified: true,
    agentConfirmed: false
  },
  {
    id: 303,
    name: "Sophia Williams",
    role: "Fashion Designer",
    email: "sophia.williams@example.com",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80",
    idVerified: true,
    agentConfirmed: true
  }
];

// Fixed Price Items
export const fixedPriceItems = [
  {
    id: 101,
    name: "Limited Edition Sunglasses from Cannes Festival",
    description: "Worn during the press tour for my latest film. These limited edition Ray-Ban sunglasses are in excellent condition and come with original case and authenticity certificate.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    price: 450,
    condition: "Like New",
    category: "accessories",
    seller: {
      id: 102,
      name: "Emma Stone",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      verified: true
    },
    listedAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 48 hours ago
    charityPercent: 25,
    charityName: "Education For All"
  },
  {
    id: 102,
    name: "Signed Basketball Jersey",
    description: "Game-worn during playoffs last season. Professionally cleaned and preserved in excellent condition. Includes certificate of authenticity.",
    image: "https://images.unsplash.com/photo-1515459961680-58c478c51457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    price: 1200,
    condition: "Good",
    category: "clothing",
    seller: {
      id: 107,
      name: "LeBron James",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      verified: true
    },
    listedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24 hours ago
    charityPercent: 100,
    charityName: "Youth Basketball Foundation"
  },
  {
    id: 103,
    name: "Designer Boots from European Tour",
    description: "Custom Alexander McQueen boots worn during my European tour last year. Size 39, minimal wear with original box and dust bag.",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1212&q=80",
    price: 850,
    condition: "Excellent",
    category: "footwear",
    seller: {
      id: 106,
      name: "Taylor Swift",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      verified: true
    },
    listedAt: new Date(Date.now() - 1000 * 60 * 60 * 72), // 72 hours ago
    charityPercent: 50,
    charityName: "Music Education Initiative"
  },
  {
    id: 104,
    name: "Oscar Ceremony Cufflinks",
    description: "Silver and onyx cufflinks worn to the Academy Awards ceremony. Only worn once, pristine condition with certificate of authenticity.",
    image: "https://images.unsplash.com/photo-1601612628452-9e99ced43524?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    price: 375,
    condition: "Like New",
    category: "accessories",
    seller: {
      id: 105,
      name: "Chris Evans",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      verified: true
    },
    listedAt: new Date(Date.now() - 1000 * 60 * 60 * 96), // 96 hours ago
    charityPercent: 30,
    charityName: "Children's Hospital Foundation"
  },
  {
    id: 105,
    name: "Designer Tennis Bracelet from Grand Slam",
    description: "Tiffany & Co. tennis bracelet worn during the Grand Slam final. 18k gold with diamonds, includes gift box and authenticity papers.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    price: 3200,
    condition: "Excellent",
    category: "jewelry",
    seller: {
      id: 107,
      name: "Serena Williams",
      image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      verified: true
    },
    listedAt: new Date(Date.now() - 1000 * 60 * 60 * 36), // 36 hours ago
    charityPercent: 40,
    charityName: "Women's Sports Foundation"
  },
  {
    id: 106,
    name: "Music Festival Guitar Strap",
    description: "Custom leather guitar strap used during Coachella performance. Hand-tooled with my initials, light wear but excellent condition.",
    image: "https://images.unsplash.com/photo-1550985543-49bee3167284?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1033&q=80",
    price: 520,
    condition: "Good",
    category: "memorabilia",
    seller: {
      id: 108,
      name: "John Legend",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      verified: true
    },
    listedAt: new Date(Date.now() - 1000 * 60 * 60 * 120), // 120 hours ago
    charityPercent: 70,
    charityName: "Music Therapy Foundation"
  },
  {
    id: 107,
    name: "Movie Premiere Leather Jacket",
    description: "Bespoke Saint Laurent leather jacket worn to the premiere of my latest action film. Size M, excellent condition with minor wear.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    price: 1850,
    condition: "Excellent",
    category: "clothing",
    seller: {
      id: 110,
      name: "Idris Elba",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      verified: true
    },
    listedAt: new Date(Date.now() - 1000 * 60 * 60 * 60), // 60 hours ago
    charityPercent: 15,
    charityName: "Film Education Trust"
  },
  {
    id: 108,
    name: "Red Carpet Evening Gown",
    description: "Custom Vera Wang evening gown worn to the Golden Globes. Size 4, midnight blue with hand-beaded embellishments, professionally preserved.",
    image: "https://images.unsplash.com/photo-1605086998852-23b135a8fdb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    price: 2700,
    condition: "Like New",
    category: "clothing",
    seller: {
      id: 109,
      name: "Zoe Saldana",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80",
      verified: true
    },
    listedAt: new Date(Date.now() - 1000 * 60 * 60 * 84), // 84 hours ago
    charityPercent: 60,
    charityName: "Diversity in Film Initiative"
  }
];

// Featured Fixed Price Items
export const featuredFixedPriceItems = fixedPriceItems.slice(0, 4);

// Dashboard Stats
export const dashboardStats = {
  totalUsers: 24582,
  userGrowth: 12,
  celebrityAccounts: 342,
  celebrityGrowth: 8,
  activeAuctions: 1287,
  auctionGrowth: 24,
  totalRevenue: 1450000,
  revenueGrowth: 18
};
