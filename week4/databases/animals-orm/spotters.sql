
CREATE TABLE spotters (
  id INTEGER PRIMARY KEY AUTOINCREMENT, -- take care of IDs internally
  name      TEXT,
  location  TEXT,
  animal_id INTEGER  -- foreign key, this is the id column in the 'animals' table
);

INSERT INTO spotters ( name, location, animal_id )
  VALUES( 'Mikaela', 'Sydney', 1 ); -- use your own animal IDs

INSERT INTO spotters ( name, location, animal_id )
  VALUES( 'Joel', 'Glasgow', 1 ); -- use your own animal IDs

INSERT INTO spotters ( name, location, animal_id )
  VALUES( 'Olivia', 'Radelaide', 2 ); -- use your own animal IDs

INSERT INTO spotters ( name, location, animal_id )
  VALUES( 'Linna', 'Auckand', 3 ); -- use your own animal IDs
