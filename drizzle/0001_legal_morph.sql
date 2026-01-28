CREATE TABLE `files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`filename` varchar(255) NOT NULL,
	`s3Key` varchar(512) NOT NULL,
	`url` text NOT NULL,
	`mimeType` varchar(100),
	`fileSize` int,
	`uploadedBy` int,
	`category` varchar(50),
	`teamMemberId` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `files_id` PRIMARY KEY(`id`),
	CONSTRAINT `files_s3Key_unique` UNIQUE(`s3Key`)
);
--> statement-breakpoint
ALTER TABLE `files` ADD CONSTRAINT `files_uploadedBy_users_id_fk` FOREIGN KEY (`uploadedBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;