CREATE DATABASE database_02_Khai;

use database_02_Khai;

CREATE TABLE customers(
   id INT PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   email VARCHAR(100) NOT NULL,
   number_phone VARCHAR(15),
   created_at TIMESTAMP,
   updated_at TIMESTAMP,
   UNIQUE(name)
);
   

CREATE TABLE products(
   id INT PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   product_code VARCHAR(50) NOT NULL,
   price FLOAT NOT NULL,
   quantity INT, 
   total FLOAT,
   UNIQUE(product_code)
);

CREATE TABLE orders(
   id INT PRIMARY KEY,
   customer_id INT,
   total_product INT NOT NULL,
   total_price FLOAT NOT NULL,
   order_status INT,
   time_order TIMESTAMP,
   CONSTRAINT orders_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE order_details(
   id INT PRIMARY KEY,
   order_id INT,
   product_id INT,
   order_status INT,
   created_at TIMESTAMP,
   updated_at TIMESTAMP,
   CONSTRAINT order_details_order_id_foreign FOREIGN KEY (order_id) REFERENCES orders(id),
   CONSTRAINT order_details_product_id_foreign FOREIGN KEY (product_id) REFERENCES products(id)
);
