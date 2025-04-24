CREATE DATABASE IF NOT EXISTS mon_artisan; 

-- Table artisan
CREATE TABLE IF NOT EXISTS artisan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255)
);

-- Table branche
CREATE TABLE IF NOT EXISTS branche (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categorie VARCHAR(255)
);

-- Table metier
CREATE TABLE IF NOT EXISTS metier (
    id INT AUTO_INCREMENT PRIMARY KEY,
    artisan_id INT,
    branche_id INT,
    specialite VARCHAR(255),
    FOREIGN KEY (artisan_id) REFERENCES artisan(id),
    FOREIGN KEY (branche_id) REFERENCES branche(id)
);

-- Table infos
CREATE TABLE IF NOT EXISTS infos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    artisan_id INT,
    note FLOAT,
    a_propos TEXT,
    image VARCHAR(255),
    FOREIGN KEY (artisan_id) REFERENCES artisan(id)
);


-- Table coordonnees
CREATE TABLE IF NOT EXISTS coordonnees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    artisan_id INT,
    ville VARCHAR(255),
    email VARCHAR(255),
    site_web VARCHAR(255),
    FOREIGN KEY (artisan_id) REFERENCES artisan(id)
);
