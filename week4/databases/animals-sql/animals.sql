CREATE TABLE animals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,  -- take care of IDs automatically
  name TEXT,
  species TEXT,
  description TEXT,
  roundness INTEGER,
  alive BOOLEAN,
  age INTEGER,
  image_url TEXT
);

INSERT INTO animals( name, species, description, roundness, alive, age, image_url )
  VALUES(
    'Clarence Boddicker', 'Human', 'Baddie', 8, 0, 48, 'https://vignette.wikia.nocookie.net/robocop/images/d/dc/ClarenceBoddicker.jpg/revision/latest/scale-to-width-down/350?cb=20160816063931'
  );

INSERT INTO animals( name, species, description, roundness, alive, age, image_url )
  VALUES(
    'Ruby', 'Canine', 'The best dog', 3, 1, 3, 'https://images.unsplash.com/photo-1519138130-85a949fdcb4f?ixlib=rb-0.3.5&s=f340825cae4a33e3034dd209eb8c7355&w=1000&q=80'
);

INSERT INTO animals( name, species, description, roundness, alive, age, image_url )
  VALUES( 'Kermit', 'Desert Frog', 'Extremely round', 9, 1, 2, 'https://pbs.twimg.com/media/DS1ku7XUMAATBqk.jpg' );

SELECT * FROM animals;
