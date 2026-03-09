-- Create database
CREATE DATABASE IF NOT EXISTS food_db;
USE food_db;
-- =========================
-- USERS TABLE (Login/Register)
-- =========================
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  password VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20)
);

-- Insert sample users
INSERT INTO users (username, password, email, phone) VALUES
("admin", "123", "admin@gmail.com", "9999999999"),
("ramesh", "111", "ramesh@gmail.com", "8888888888");

-- =========================
-- ORDERS TABLE (Food Orders)
-- =========================
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,

  customer_name VARCHAR(100),
  customer_phone VARCHAR(15),
  customer_address TEXT,

  food_name VARCHAR(100),
  quantity INT,
  price INT,
  total_price INT,

  payment_method VARCHAR(50),
  order_status VARCHAR(50),

  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample orders
INSERT INTO orders 
(customer_name, customer_phone, customer_address, food_name, quantity, price, total_price, payment_method, order_status)
VALUES
("Ramesh", "9876543210", "Bangalore", "Dosa", 2, 40, 80, "Cash", "Pending"),
("Suresh", "9123456780", "Mysore", "Idli", 3, 30, 90, "UPI", "Delivered"),
("Mahesh", "9988776655", "Hubli", "Poori", 1, 50, 50, "Card", "Preparing"),
("Anita", "9090909090", "Belgaum", "Veg Meals", 2, 120, 240, "Cash", "Pending");

SELECT @@port;