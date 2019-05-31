
CREATE TABLE animals (
  id INTEGER PRIMARY KEY AUTOINCREMENT, -- take care of IDs internally
  first_name  TEXT,
  last_name   TEXT,
  species     TEXT,
  description TEXT,
  roundness   INTEGER,
  alive       BOOLEAN,
  age         INTEGER,
  image_url   TEXT
);

INSERT INTO animals( first_name, last_name, species, description, roundness, alive, age, image_url )
  VALUES(
    "Clarence", "Boddicker", "Human", "Baddie", 7, 0, 48, "https://vignette.wikia.nocookie.net/robocop/images/d/dc/ClarenceBoddicker.jpg/revision/latest?cb=20160816063931"
);

INSERT INTO animals( first_name, last_name, species, description, roundness, alive, age, image_url )
  VALUES( "Ruby", "Tuesday", "Canine", "The best dog", 4, 1, 2, "https://images.unsplash.com/photo-1519138130-85a949fdcb4f?ixlib=rb-0.3.5&s=f340825cae4a33e3034dd209eb8c7355&w=1000&q=80"
);

INSERT INTO animals( first_name, last_name, species, description, roundness, alive, age, image_url )
  VALUES( "Kermit", "The Frog", "Frog", "Actually a muppet", 5, 1, 30, "http://fillmurray.com/300/300"
);
