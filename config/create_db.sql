CREATE DATABASE IF NOT EXISTS `matcha` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `matcha`;
CREATE TABLE IF NOT EXISTS 'User' (
  id int,
  eemail varchar(255) DEFAULT NULL,
  password varchar(255) DEFAULT NULL,
  login varchar(255) DEFAULT NULL,
  last_name varchar(255) DEFAULT NULL,
  first_name varchar(255) DEFAULT NULL,
  phone int(10) DEFAULT NULL,
  kind int(1) DEFAULT NULL,
  looking_for int(1) DEFAULT NULL,
  bio varchar(255) DEFAULT NULL
);

passwd = $2a$08$DS1FnCLErXNSVIfRwJweee5Ssx0NqHUGgXskBILR0xhp3y0Ft3/Kq

INSERT INTO 'user' (id, login, passwd, eemail, age, last_n, first_n, phone, kind, looking_for, bio)
 VALUES
 (1, 'str_H1', '$2a$08$DS1FnCLErXNSVIfRwJweee5Ssx0NqHUGgXskBILR0xhp3y0Ft3/Kq', 'str_h1@gmail.com', 22, 'huhu', 'HUHU', 1234567890, 0, 0, 'bio bio bio'),
 (2, 'str_H2', '$2a$08$DS1FnCLErXNSVIfRwJweee5Ssx0NqHUGgXskBILR0xhp3y0Ft3/Kq', 'str_h2@gmail.com', 23, 'huhu', 'HUHU', 2345678901, 0, 0, 'bio bio bio'),
 (3, 'str_F1', '$2a$08$DS1FnCLErXNSVIfRwJweee5Ssx0NqHUGgXskBILR0xhp3y0Ft3/Kq', 'str_f1@gmail.com', 22, 'huhu', 'HUHU', 3456789012, 1, 0, 'bio bio bio'),
 (4, 'str_F2', '$2a$08$DS1FnCLErXNSVIfRwJweee5Ssx0NqHUGgXskBILR0xhp3y0Ft3/Kq', 'str_f2@gmail.com', 24, 'huhu', 'HUHU', 4567890123, 1, 0, 'bio bio bio'),
 (5, 'gay_H1', '$2a$08$DS1FnCLErXNSVIfRwJweee5Ssx0NqHUGgXskBILR0xhp3y0Ft3/Kq', 'gay_h1@gmail.com', 21, 'huhu', 'HUHU', 5678901234, 0, 1, 'bio bio bio'),
 (6, 'gay_H2', '$2a$08$DS1FnCLErXNSVIfRwJweee5Ssx0NqHUGgXskBILR0xhp3y0Ft3/Kq', 'gay_h2@gmail.com', 22, 'huhu', 'HUHU', 6789012345, 0, 1, 'bio bio bio'),
 (7, 'gay_F1', '$2a$08$DS1FnCLErXNSVIfRwJweee5Ssx0NqHUGgXskBILR0xhp3y0Ft3/Kq', 'gay_f1@gmail.com', 20, 'huhu', 'HUHU', 7890123456, 1, 1, 'bio bio bio'),
 (8, 'gay_F2', '$2a$08$DS1FnCLErXNSVIfRwJweee5Ssx0NqHUGgXskBILR0xhp3y0Ft3/Kq', 'gay_f2@gmail.com', 24, 'huhu', 'HUHU', 8901234567, 1, 1, 'bio bio bio'),
 (9, 'bis_H1', '$2a$08$DS1FnCLErXNSVIfRwJweee5Ssx0NqHUGgXskBILR0xhp3y0Ft3/Kq', 'bis_h1@gmail.com', 21, 'huhu', 'HUHU', 9012345678, 0, 2, 'bio bio bio'),
 (10, 'bis_F1', '$2a$08$DS1FnCLErXNSVIfRwJweee5Ssx0NqHUGgXskBILR0xhp3y0Ft3/Kq', 'bis_f1@gmail.com', 22, 'huhu', 'HUHU', 0123456789, 1, 2, 'bio bio bio');