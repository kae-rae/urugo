import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const cities = [
  ['New York', 'NY'], ['Los Angeles', 'CA'], ['Chicago', 'IL'], ['Houston', 'TX'],
  ['Phoenix', 'AZ'], ['Philadelphia', 'PA'], ['San Antonio', 'TX'], ['San Diego', 'CA'],
  ['Dallas', 'TX'], ['San Jose', 'CA'], ['Austin', 'TX'], ['Jacksonville', 'FL'],
  ['Fort Worth', 'TX'], ['Columbus', 'OH'], ['San Francisco', 'CA'], ['Charlotte', 'NC'],
  ['Indianapolis', 'IN'], ['Seattle', 'WA'], ['Denver', 'CO'], ['Boston', 'MA']
];

const propertyTypes = ['Apartment', 'House', 'Condo', 'Townhouse', 'Duplex', 'Loft', 'Studio', 'Cottage'];
const streetNames = ['Main', 'Oak', 'Maple', 'Cedar', 'Pine', 'Elm', 'Washington', 'Lake', 'Hill', 'Park'];
const streetTypes = ['St', 'Ave', 'Blvd', 'Dr', 'Ln', 'Rd', 'Way', 'Circle', 'Court', 'Place'];
const amenities = [
  'In-Unit Laundry', 'Dishwasher', 'Central AC', 'Hardwood Floors', 'Balcony',
  'Fitness Center', 'Pool', 'Parking', 'Storage', 'Security System',
  'High Speed Internet', 'Stainless Steel Appliances', 'Granite Countertops', 'Walk-in Closet'
];
const descriptions = [
  'Charming {} with stunning views',
  'Newly renovated {} in prime location',
  'Spacious {} with modern amenities',
  'Cozy {} perfect for comfortable living',
  'Luxurious {} with high-end finishes',
  'Beautiful {} in quiet neighborhood',
  'Updated {} with great natural light',
  'Pet-friendly {} with nearby parks',
  'Modern {} with open floor plan',
  'Historic {} with character'
];

async function main() {
  // Create 100 owners
  const owners = await Promise.all(
    Array(100).fill(0).map(async (_, i) => {
      return prisma.user.create({
        data: {
          role: 'OWNER',
          name: `Owner ${i + 1}`,
          email: `owner${i + 1}@example.com`,
        }
      });
    })
  );

  console.log('Created 100 owners');

  // Create 10,000 properties
  const batchSize = 100;
  for (let i = 0; i < 10000; i += batchSize) {
    const batch = Array(batchSize).fill(0).map((_, j) => {
      const [city, state] = cities[Math.floor(Math.random() * cities.length)];
      const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
      const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
      const streetType = streetTypes[Math.floor(Math.random() * streetTypes.length)];
      const streetNum = Math.floor(Math.random() * 9000) + 1000;
      const description = descriptions[Math.floor(Math.random() * descriptions.length)].replace('{}', type.toLowerCase());
      const numAmenities = Math.floor(Math.random() * 8) + 2; // 2-10 amenities
      const propertyAmenities = [...amenities]
        .sort(() => Math.random() - 0.5)
        .slice(0, numAmenities);
      
      const availableDate = new Date();
      availableDate.setDate(availableDate.getDate() + Math.floor(Math.random() * 60)); // Available within next 60 days
      
      return {
        title: `${type} on ${streetNum} ${streetName} ${streetType}`,
        description,
        city,
        state,
        zipCode: String(Math.floor(Math.random() * 90000) + 10000),
        rent: Math.floor(Math.random() * 3000) + 1000, // $1000-4000
        bedrooms: Math.floor(Math.random() * 4) + 1, // 1-4 bedrooms
        bathrooms: Math.floor(Math.random() * 3) + 1, // 1-3 bathrooms
        petFriendly: Math.random() > 0.5,
        amenities: propertyAmenities,
        availableFrom: availableDate,
        ownerId: owners[Math.floor(Math.random() * owners.length)].id
      };
    });

    await prisma.property.createMany({ data: batch });
    console.log(`Created properties ${i + 1} to ${i + batch.length}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
