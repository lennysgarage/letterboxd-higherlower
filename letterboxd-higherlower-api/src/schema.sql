DROP TABLE IF EXISTS Movies;
CREATE TABLE IF NOT EXISTS Movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    movie_name TEXT NOT NULL, 
    rating REAL NOT NULL,
    poster_url TEXT NOT NULL,
    movie_url TEXT NOT NULL,
    genre TEXT
);
INSERT INTO Movies (movie_name, rating, poster_url, movie_url, genre) VALUES ('Inception', 4.21, "https://a.ltrbxd.com/resized/sm/upload/sv/95/s9/4j/inception-0-1000-0-1500-crop.jpg?v=30d7224316", "https://letterboxd.com/film/inception/", "action"), ("Paddington in Peru", 3.49, "https://a.ltrbxd.com/resized/film-poster/4/4/6/4/8/2/446482-paddington-in-peru-0-1000-0-1500-crop.jpg?v=929c78758b", "https://letterboxd.com/film/paddington-in-peru/", "comedy");