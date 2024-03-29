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
