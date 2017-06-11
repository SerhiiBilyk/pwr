create table user_books (
  id_ub int(6) not null auto_increment,
  book_id int(6),
  user_id int(6),
  primary key(id_ub),
  foreign key (book_id) references books(id),
  foreign key (user_id) references users(id)
);

  create table users (
    id int(6) not null auto_increment,
    name varchar(30) not null,
    surname varchar(30) not null,
    country varchar(30) not null,
    email varchar(30) not null,
    password varchar(30) not null,
    category varchar(30) not null,
    primary key(id)
  );

  create table books (
    id int(6) not null auto_increment,
    title varchar(60) not null,
    author varchar(30) not null,
    rating float not null,
    img_big varchar(255) not null,
    img_small varchar(255) not null,
    rating_count int(10) not null,
    category varchar(20) not null,
    id_2 int(20) not null,
    primary key(id)
  );
