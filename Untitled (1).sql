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



ALTER USER root@127.0.0.1 IDENTIFIED WITH mysql_native_password BY Cowboys1&;

GRANT ALL PRIVILEGES ON thejoyofpainting.* TO 'root'@'127.0.0.1' IDENTIFIED BY 'Cowboys1&';

GRANT 'ALL PRIVILEGES' ON 'thejoyofpainting' TO 'root'@'127.0.0.1';
