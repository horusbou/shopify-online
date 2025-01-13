import path from "path";
import db, { AppDataSource } from "./database";
import { Product, User } from "./entity";
import { Category } from "./entity/Category";

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

    const electronics = new Category();
    electronics.name = "Electronics";

    const furniture = new Category();
    furniture.name = "Furniture";

    await db.categories.save(electronics)
    await db.categories.save(furniture)

    const product1 = new Product();
    product1.name = "Smartphone";
    product1.price = 699.99;
    product1.amount = 100;
    product1.description = "A high-performance smartphone with great features.";
    product1.image = "/uploads/products/smartphone.jpg";
    product1.categories = [electronics];

    const product2 = new Product();
    product2.name = "Laptop";
    product2.price = 1299.99;
    product2.amount = 50;
    product2.description = "Powerful laptop with a sleek design.";
    product2.image = "/uploads/products/laptop.jpg";
    product2.categories = [electronics];

    const product3 = new Product();
    product3.name = "Smartwatch";
    product3.price = 199.99;
    product3.amount = 150;
    product3.description = "Stylish smartwatch with fitness tracking.";
    product3.image = "/uploads/products/smartwatch.png";
    product3.categories = [electronics];


    const product4 = new Product();
    product4.name = "Sofa";
    product4.price = 399.99;
    product4.amount = 20;
    product4.description = "A comfortable 3-seater sofa.";
    product4.image = "/uploads/products/sofa.png";
    product4.categories = [furniture];

    const product5 = new Product();
    product5.name = "Dining Table";
    product5.price = 499.99;
    product5.amount = 10;
    product5.description = "A spacious dining table for 6 people.";
    product5.image = "/uploads/products/dining-table.png";
    product5.categories = [furniture];

    await db.products.save(product1)
    await db.products.save(product2)
    await db.products.save(product3)
    await db.products.save(product4)



    console.log("Database has been seeded successfully!");
    console.log("[SEED]: END");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
}

seed();
