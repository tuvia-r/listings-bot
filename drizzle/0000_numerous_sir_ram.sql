CREATE TABLE `post_to_post` (
	`parent_post_id` text NOT NULL,
	`child_post_id` text NOT NULL,
	PRIMARY KEY(`child_post_id`, `parent_post_id`),
	FOREIGN KEY (`parent_post_id`) REFERENCES `posts`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`child_post_id`) REFERENCES `posts`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`post_id` text NOT NULL,
	`group_id` text,
	`group_name` text,
	`post_text` text NOT NULL,
	`post_url` text,
	`post_attachments` text,
	`shared_post` text,
	`phone_numbers` text,
	`created_at` real DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` real DEFAULT (strftime('%s', 'now')) NOT NULL,
	`processing_status` text DEFAULT 'pending' NOT NULL,
	`creation_time` real DEFAULT (strftime('%s', 'now')) NOT NULL,
	`is_house_rental_listing` integer DEFAULT 0 NOT NULL,
	`location` text DEFAULT '' NOT NULL,
	`price` real DEFAULT 'null',
	`is_price_flexible` integer DEFAULT 0 NOT NULL,
	`is_house` integer DEFAULT 0 NOT NULL,
	`size_in_m2` real DEFAULT 'null',
	`number_of_floors` integer DEFAULT 'null',
	`number_of_rooms` integer DEFAULT 'null',
	`number_of_bedrooms` integer DEFAULT 'null',
	`is_for_long_term` integer DEFAULT 0 NOT NULL,
	`has_parking` integer DEFAULT 0 NOT NULL,
	`has_garden` integer DEFAULT 0 NOT NULL,
	`is_full_furnished` integer DEFAULT 0 NOT NULL,
	`is_partially_furnished` integer DEFAULT 0 NOT NULL,
	`does_price_include_electricity` integer DEFAULT 0 NOT NULL,
	`does_price_include_water` integer DEFAULT 0 NOT NULL,
	`does_price_include_local_taxes` integer DEFAULT 0 NOT NULL,
	`available_from` text DEFAULT 'null',
	`showing_date` text DEFAULT 'null',
	`showing_time` text DEFAULT 'null',
	`is_new_construction` integer DEFAULT 0 NOT NULL,
	`is_renovated` integer DEFAULT 0 NOT NULL,
	`is_by_broker_or_agent` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `posts_post_id_unique` ON `posts` (`post_id`);