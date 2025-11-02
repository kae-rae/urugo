-- Add new fields to Property
ALTER TABLE "Property" ADD COLUMN "description" TEXT;
ALTER TABLE "Property" ADD COLUMN "amenities" TEXT[];
ALTER TABLE "Property" ADD COLUMN "zipCode" VARCHAR(10);
ALTER TABLE "Property" ADD COLUMN "petFriendly" BOOLEAN DEFAULT false;
ALTER TABLE "Property" ADD COLUMN "availableFrom" TIMESTAMP(3);

-- Create index for search performance
CREATE INDEX "Property_city_state_idx" ON "Property"("city", "state");
CREATE INDEX "Property_rent_idx" ON "Property"("rent");
CREATE INDEX "Property_availableFrom_idx" ON "Property"("availableFrom");