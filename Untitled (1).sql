CREATE TABLE `colors` (
  `color` text,
  `episode_ids` integer
);

CREATE TABLE `subject` (
  `subject` text,
  `episode_ids` text
);

CREATE TABLE `episodes` (
  `episode_ids` text,
  `title` text,
  `season_number` text,
  `episode_number` text,
  `date` text
);

CREATE TABLE CompiledData (
    season_episode VARCHAR(50),
    painting_index INT,
    title VARCHAR(255),
    release_date DATE,
    img_src VARCHAR(255),
    youtube_src VARCHAR(255),
    subjects VARCHAR(255),
    colors VARCHAR(255),
    color_hex VARCHAR(255)
);


ALTER USER root@127.0.0.1 IDENTIFIED WITH mysql_native_password BY Cowboys1&;

GRANT 'ALL PRIVILEGES' ON 'thejoyofpainting.*'' TO 'root'@'127.0.0.1' IDENTIFIED BY 'Cowboys1&';

GRANT 'ALL PRIVILEGES' ON 'thejoyofpainting' TO 'root'@'127.0.0.1';

ALTER USER 'root'@'127.0.0.1' IDENTIFIED WITH mysql_native_password BY 'new_password';


ALTER USER 'root'@'127.0.0.1';


SHOW GRANTS FOR 'root'@'127.0.0.1';



Ok, how about this, I want to make a table called "CompiledData". I want my columns to contain both the 'season_episode'. I want my rows to contain in this order...

'painting_index', 'title', 'release_date', 'img_src', 'youtube_src', 'subjects', 'colors', 'color_hex'


Is this doable at all? Also how would i check the table once its done?