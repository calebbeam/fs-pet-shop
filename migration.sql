DROP TABLE IF EXISTS pet;

CREATE TABLE pet (
    id SERIAL,
    age INTEGER,
    kind VARCHAR(25),
    name VARCHAR(25)
);