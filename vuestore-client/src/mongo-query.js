db.products.insertMany([
  {
    code: "123",
    name: "Black Wallet",
    price: "60000.00",
    description:
      "Sleek black wallet, perfect for keeping your essentials organized and secure.",
    imageUrl: "/img/photo-1",
    averageRating: "5.0",
    category: "Accessories",
  },
  {
    code: "234",
    name: "Black iphone",
    price: "4000.00",
    description:
      "High-end smartphone with a sophisticated black finish, offering advanced features.",
    imageUrl: "/img/photo-2",
    averageRating: "5.0",
    category: "Electronics",
  },
  {
    code: "345",
    name: "Beer Can",
    price: "90.00",
    description: "Refreshing beer in a convenient can, ideal for any occasion.",
    imageUrl: "/img/photo-3",
    averageRating: "4.7",
    category: "Beverages",
  },
  {
    code: "456",
    name: "Powder Fondation",
    price: "190.00",
    description:
      "Smooth powder foundation providing a flawless finish for all skin types.",
    imageUrl: "/img/photo-4",
    averageRating: "5.0",
    category: "Skincare",
  },
  {
    code: "567",
    name: "Pigmentation Blush",
    price: "200.00",
    description:
      "Vibrant blush designed to enhance your natural complexion with a healthy glow.",
    imageUrl: "/img/photo-5",
    averageRating: "4.9",
    category: "Skincare",
  },
  {
    code: "678",
    name: "Sun Glasses",
    price: "200.00",
    description:
      "Stylish sunglasses offering UV protection and a fashionable look.",
    imageUrl: "/img/photo-6",
    averageRating: "5.0",
    category: "Accessories",
  },
  {
    code: "789",
    name: "Dark Shoes",
    price: "290.00",
    description:
      "Trendy dark-colored shoes versatile enough for casual and formal wear.",
    imageUrl: "/img/photo-7",
    averageRating: "4.8",
    category: "Footwear",
  },
  {
    code: "890",
    name: "Sport Shoes",
    price: "400.00",
    description:
      "Durable sport shoes engineered for optimal performance during activities.",
    imageUrl: "/img/photo-8",
    averageRating: "5.0",
    category: "Footwear",
  },
  {
    code: "901",
    name: "Lens",
    price: "1940.00",
    description:
      "Precision camera lens ensuring high-quality photography with sharp images.",
    imageUrl: "/img/photo-9",
    averageRating: "4.6",
    category: "Electronics",
  },
  {
    code: "109",
    name: "Woman Shoes",
    price: "330.00",
    description: "Elegant women's shoes combining style and comfort.",
    imageUrl: "/img/photo-10",
    averageRating: "4.9",
    category: "Footwear",
  },
  {
    code: "987",
    name: "Camera",
    price: "2230.00",
    description:
      "Professional-grade camera capturing stunning photos and videos.",
    imageUrl: "/img/photo-11",
    averageRating: "5.0",
    category: "Electronics",
  },
  {
    code: "908",
    name: "White Phone",
    price: "3180.00",
    description: "Sleek white phone featuring state-of-the-art technology.",
    imageUrl: "/img/photo-12",
    averageRating: "5.0",
    category: "Electronics",
  },
  {
    code: "111",
    name: "Wooden Chair",
    price: "650.00",
    description:
      "Sturdy and elegant wooden chair adding a touch of class to any room.",
    imageUrl: "/img/photo-13",
    averageRating: "4.5",
    category: "Furniture",
  },
  {
    code: "222",
    name: "Office Desk",
    price: "250.00",
    description:
      "Functional office desk designed to enhance productivity and organization.",
    imageUrl: "/img/photo-14",
    averageRating: "4.7",
    category: "Furniture",
  },
  {
    code: "333",
    name: "Table Lamp",
    price: "70.00",
    description:
      "Modern table lamp providing excellent lighting and complementing any decor.",
    imageUrl: "/img/photo-15",
    averageRating: "4.8",
    category: "Furniture",
  },
  {
    code: "444",
    name: "Bookscase",
    price: "520.00",
    description:
      "Stylish bookcase perfect for organizing books and decorative items.",
    imageUrl: "/img/photo-16",
    averageRating: "4.8",
    category: "Furniture",
  },
  {
    code: "555",
    name: "Wardrobe",
    price: "750.00",
    description:
      "Spacious wardrobe offering ample storage for clothing and accessories.",
    imageUrl: "/img/photo-17",
    averageRating: "4.9",
    category: "Furniture",
  },
  {
    code: "666",
    name: "Couch",
    price: "2350.00",
    description:
      "Comfortable and stylish couch perfect for relaxing and lounging.",
    imageUrl: "/img/photo-18",
    averageRating: "5.0",
    category: "Furniture",
  },
  {
    code: "919",
    name: "Red Wine",
    price: "320.00",
    description:
      "Rich and flavorful red wine, ideal for pairing with meals or special occasions.",
    imageUrl: "/img/photo-19",
    averageRating: "4.9",
    category: "Beverages",
  },
  {
    code: "999",
    name: "Green Tea",
    price: "100.00",
    description:
      "Refreshing green tea with a smooth taste, perfect for a relaxing break.",
    imageUrl: "/img/photo-20",
    averageRating: "4.8",
    category: "Beverages",
  },
]);

db.orders.insertOne({
  user_id: 1,
  cart_items: ["123", "234", "345"],
});

// Join query for looking items in cart collection with products
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "cart_items",
      foreignField: "code",
      as: "products",
    },
  },
]);
