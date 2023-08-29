CREATE DATABASE database_03_Khai;

use database_03_Khai;
CREATE TABLE products (
    id int PRIMARY KEY auto_increment,
    sku varchar(15) UNIQUE NOT NULL,
    name varchar(100) NOT NULL,
    original_price float DEFAULT 0,
    price float DEFAULT 0,
    description text,
    quantity int NOT NULL,
    user_guide text,
    created_at timestamp,
    updated_at timestamp
);

CREATE TABLE attributes (
    id int PRIMARY KEY auto_increment,
    name varchar(100) UNIQUE NOT NULL,
    created_at timestamp,
    updated_at timestamp
);

CREATE TABLE attribute_values (
    id int PRIMARY KEY auto_increment,
    value varchar(100) UNIQUE NOT NULL,
    attribute_id int,
    created_at timestamp,
    updated_at timestamp,
    CONSTRAINT attribute_values_attribute_id_foreign FOREIGN KEY (attribute_id) REFERENCES attributes(id)
);

CREATE TABLE attributes_products (
    id int PRIMARY KEY auto_increment,
    attribute_value_id int,
    product_id int,
    CONSTRAINT attributes_products_product_id_foreign FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT attributes_products_attribute_values_id_foreign FOREIGN KEY (attribute_value_id) REFERENCES attribute_values(id)
);



use database_03_Khai;
-- Products
INSERT INTO products(sku, name, original_price, price, description, quantity, user_guide, created_at, updated_at) VALUES ('0123456789', 'Tui dung laptop', 300000, 160000, 'Dung de dung laptop', 20, 'Su dung ngay sau khi mo', NOW(), NOW());

INSERT INTO products(sku, name, original_price, price, description, quantity, user_guide, created_at, updated_at) VALUES ('0618165144', 'Ao phong', 120000, 90000, 'Mac cho mua he', 0, 'Giat voi nhiet do duoi 45 do', NOW(), NOW());

INSERT INTO products(sku, name, original_price, price, description, quantity, user_guide, created_at, updated_at) VALUES ('0384616514', 'But muc', 10000, 5000, 'Dung de viet', 120, 'Su dung ngay sau khi mo', NOW(), NOW());

-- Attributes
use database_03_Khai;
INSERT INTO attributes(name, created_at, updated_at) VALUES ('Mau sac', NOW(), NOW());
INSERT INTO attributes(name, created_at, updated_at) VALUES ('Kich thuoc', NOW(), NOW());
INSERT INTO attributes(name, created_at, updated_at) VALUES ('Chat lieu', NOW(), NOW());

-- Attributes-Value
use database_03_Khai;
INSERT INTO attribute_values(value, attribute_id, created_at, updated_at) VALUES ('Den', 1, NOW(), NOW());
INSERT INTO attribute_values(value, attribute_id, created_at, updated_at) VALUES ('Trang', 1, NOW(), NOW());
INSERT INTO attribute_values(value, attribute_id, created_at, updated_at) VALUES ('Xanh', 1, NOW(), NOW());

INSERT INTO attribute_values(value, attribute_id, created_at, updated_at) VALUES ('M', 2, NOW(), NOW());
INSERT INTO attribute_values(value, attribute_id, created_at, updated_at) VALUES ('L', 2, NOW(), NOW());
INSERT INTO attribute_values(value, attribute_id, created_at, updated_at) VALUES ('XXL', 2, NOW(), NOW());

INSERT INTO attribute_values(value, attribute_id, created_at, updated_at) VALUES ('Nhua', 3, NOW(), NOW());
INSERT INTO attribute_values(value, attribute_id, created_at, updated_at) VALUES ('Vai Canvas', 3, NOW(), NOW());
INSERT INTO attribute_values(value, attribute_id, created_at, updated_at) VALUES ('Cotton', 3, NOW(), NOW());

-- Attributes-Products
INSERT INTO attributes_products(attribute_value_id, product_id) VALUES (1, 1);
INSERT INTO attributes_products(attribute_value_id, product_id) VALUES (6, 1);
INSERT INTO attributes_products(attribute_value_id, product_id) VALUES (8, 1);

INSERT INTO attributes_products(attribute_value_id, product_id) VALUES (3, 2);
INSERT INTO attributes_products(attribute_value_id, product_id) VALUES (5, 2);
INSERT INTO attributes_products(attribute_value_id, product_id) VALUES (9, 2);

INSERT INTO attributes_products(attribute_value_id, product_id) VALUES (2, 3);
INSERT INTO attributes_products(attribute_value_id, product_id) VALUES (4, 3);
INSERT INTO attributes_products(attribute_value_id, product_id) VALUES (7, 3);

use database_03_Khai;
SELECT * FROM products;

SELECT products.name as 'Ten san pham', attributes.name as 'Thuoc Tinh', attribute_values.value 
FROM attribute_values, attributes, attributes_products, products 
WHERE attributes.id = attribute_values.attribute_id 
    AND attribute_values.id = attributes_products.attribute_value_id 
    AND attributes_products.product_id = products.id 
    AND products.id = 1;

SELECT * FROM products WHERE quantity > 0;

