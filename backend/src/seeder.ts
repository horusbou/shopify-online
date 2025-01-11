import path from "path";
import db, { AppDataSource } from "./database";
import { Product, User } from "./entity";

async function seed() {
  try {
    console.log("[SEED]: start");
    await AppDataSource.initialize();
    
    const existingAdmin = await db.users.findOneBy({ email: "admin@example.com" });
    if (!existingAdmin) {
      const adminUser = new User();
      adminUser.name = "Admin";
      adminUser.username = "admin";
      adminUser.email = "admin@example.com";
      adminUser.password = "$2b$10$WApd3MLXzmXgUxiXI9iOKe2arx703ZDPVFBDUQPC4IreNlhraHd3y"; // Hash this in production
      adminUser.role = "admin";
      await db.users.save(adminUser);
    } else {
      console.log("Admin user already exists, skipping...");
    }

    const existingSeller = await db.users.findOneBy({ email: "seller@example.com" });
    if (!existingSeller) {
      const sellerUser = new User();
      sellerUser.name = "Seller";
      sellerUser.username = "seller";
      sellerUser.email = "seller@example.com";
      sellerUser.password = "$2b$10$WApd3MLXzmXgUxiXI9iOKe2arx703ZDPVFBDUQPC4IreNlhraHd3y";
      sellerUser.role = "vendor";
      await db.users.save(sellerUser);
    } else {
      console.log("Seller user already exists, skipping...");
    }

    const existingCustomer = await db.users.findOneBy({ email: "customer@example.com" });
    if (!existingCustomer) {
      const customerUser = new User();
      customerUser.name = "Customer";
      customerUser.username = "customer";
      customerUser.email = "customer@example.com";
      customerUser.password = "$2b$10$WApd3MLXzmXgUxiXI9iOKe2arx703ZDPVFBDUQPC4IreNlhraHd3y";
      customerUser.role = "customer";
      await db.users.save(customerUser);
    } else {
      console.log("Customer user already exists, skipping...");
    }

    const allProducts = await db.products.find()
    if(allProducts.length>0){
        console.log("[SEED]: END");
        return;
    }

    const product1 = new Product();
    product1.name = "Sample Product 1";
    product1.description = "This is a sample product.";
    product1.price = 25.99;
    product1.amount = 100;
    product1.image="uploads/image-product-1.jpg";

    const product2 = new Product();
    product2.name = "Sample Product 2";
    product2.description = "Another great product.";
    product2.price = 15.49;
    product2.amount = 50;
    product2.image="uploads/image-product-1.jpg";


    await db.products.save(product1);
    await db.products.save(product2);

    console.log("Database has been seeded successfully!");
    console.log("[SEED]: END");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
}

seed();
