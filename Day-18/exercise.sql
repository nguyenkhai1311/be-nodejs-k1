CREATE DATABASE database_01_Khai;

use database_01_Khai;
CREATE TABLE courses(
    id int NOT NULL,
    name varchar(50) NOT NULL,
    price float,
    detail text, 
    teacher_id int NOT NULL,
    active int,
    created_at timestamp,
    updated_at timestamp 
);

ALTER TABLE courses ADD COLUMN description text NUll AFTER price;

ALTER TABLE courses RENAME COLUMN detail TO content;
ALTER TABLE courses MODIFY COLUMN content text NOT NULL;

CREATE TABLE teacher(
    id int NOT NULL,
    name varchar(50) NOT NUll,
    bio text NUll,
    created_at timestamp,
    updated_at timestamp
);

INSERT INTO teacher(id, name, bio, created_at, updated_at) VALUES (1, "Hoang An", "Giang vien F8", NOW(), NOW());
INSERT INTO teacher(id, name, bio, created_at, updated_at) VALUES (2, "Son Dang", "Giang vien F8", NOW(), NOW());
INSERT INTO teacher(id, name, bio, created_at, updated_at) VALUES (3, "Nguyen Van Phuong", "Giang vien Dai Hoc", NOW(), NOW());

INSERT INTO courses(id, name, price, description, content, teacher_id, active, created_at, updated_at) VALUES (1, "Khoa hoc PHP", 2500000, "PHP", "Day ngon ngu lap trinh PHP co ban", 1, 1, NOW(), NOW());
INSERT INTO courses(id, name, price, description, content, teacher_id, active, created_at, updated_at) VALUES (2, "Khoa hoc Javascript", 3000000, "JS", "Day ngon ngu lap trinh Javascript co ban", 1, 0, NOW(), NOW());
INSERT INTO courses(id, name, price, description, content, teacher_id, active, created_at, updated_at) VALUES (3, "Khoa hoc Nodejs", 4000000, "Nodejs", "Nodejs co ban", 1, 1, NOW(), NOW());

INSERT INTO courses(id, name, price, description, content, teacher_id, active, created_at, updated_at) VALUES (4, "Khoa hoc HTML CSS", 1500000, "HTML CSS", "HTML CSS co ban", 2, 1, NOW(), NOW());
INSERT INTO courses(id, name, price, description, content, teacher_id, active, created_at, updated_at) VALUES (5, "Khoa hoc Sass", 500000, "Sass", "Ngon ngu tien xu ly Sass", 2, 0, NOW(), NOW());
INSERT INTO courses(id, name, price, description, content, teacher_id, active, created_at, updated_at) VALUES (6, "Khoa hoc Express", 2000000, "Express", "Express co ban", 2, 1, NOW(), NOW());

INSERT INTO courses(id, name, price, description, content, teacher_id, active, created_at, updated_at) VALUES (7, "Khoa hoc ReactJS", 3500000, "ReactJs", "ReactJs co ban", 3, 1, NOW(), NOW());
INSERT INTO courses(id, name, price, description, content, teacher_id, active, created_at, updated_at) VALUES (8, "Khoa hoc VueJS", 2900000, "VueJS", "VueJS co ban", 3, 0, NOW(), NOW());
INSERT INTO courses(id, name, price, description, content, teacher_id, active, created_at, updated_at) VALUES (9, "Khoa hoc C/C++", 250000, "C/C++", "Ngon ngu C/C++", 3, 0, NOW(), NOW());

UPDATE courses SET name = "Khoa hoc HTML CSS", price = 1500000, updated_at = NOW() WHERE id = 1;
UPDATE courses SET name = "Khoa hoc Sass", price = 200000, updated_at = NOW() WHERE id = 2;
UPDATE courses SET name = "Khoa hoc ReactJS", price = 3500000, updated_at = NOW() WHERE id = 3;
UPDATE courses SET name = "Khoa hoc Nodejs", price = 4000000, updated_at = NOW() WHERE id = 4;
UPDATE courses SET name = "Khoa hoc VueJS", price = 2500000, updated_at = NOW() WHERE id = 5;
UPDATE courses SET name = "Khoa hoc Express", price = 2900000, updated_at = NOW() WHERE id = 6;
UPDATE courses SET name = "Khoa hoc Python", price = 1600000, updated_at = NOW() WHERE id = 7;
UPDATE courses SET name = "Khoa hoc PHP", price = 1900000, updated_at = NOW() WHERE id = 8;
UPDATE courses SET name = "Khoa hoc Java", price = 3200000, updated_at = NOW() WHERE id = 9;

UPDATE teacher SET bio = "Giang vien day Fullstack", updated_at = NOW() WHERE id = 1;
UPDATE teacher SET bio = "CEO F8", updated_at = NOW() WHERE id = 2;
UPDATE teacher SET bio = "Chu nhiem lop TT23", updated_at = NOW() WHERE id = 3;

SELECT * FROM courses;
SELECT * FROM teacher;