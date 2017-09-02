INSERT INTO `user` (`id`, `uuid`, `email`, `password`, `created_by`, `created_at`, `updated_at`, `deleted_at`)
VALUES
    (1, '3a94ec6b-f6f5-4060-b61a-6d8f18605cb1', 'admin@asl', '$2a$10$OdSai7uiNEPvGGcJxZcAMuw4ABn0Myjvjd2wA2ORSdEQllDgW7JoG', NULL, '2017-07-08 11:37:15', '2017-07-08 11:37:15', NULL),
    (3, 'c3ee2433-6eb6-4d74-b223-8f53b8e71268', 'user@asl', '$2a$10$OdSai7uiNEPvGGcJxZcAMuw4ABn0Myjvjd2wA2ORSdEQllDgW7JoG', NULL, '2017-07-08 11:37:15', '2017-07-08 11:37:15', NULL);

INSERT INTO `user_role` (`id`, `user_id`, `role_id`, `created_by`, `created_at`, `updated_at`, `deleted_at`)
VALUES
    (1, 1, 1, NULL, '2017-07-15 22:37:47', '2017-07-15 22:37:47', NULL),
    (2, 3, 2, NULL, '2017-07-23 14:06:57', '2017-07-23 14:06:57', NULL);

INSERT INTO `oauth_client` (`client_id`, `client_secret`, `redirect_url`, `grants`)
VALUES
    ('asl-crm', '7pH0W2X0M1OULdoOu6S6vATCIUlFCRE9FX3RYdPS', 'http://localhost:4200/home', '[\"password\",\"authorization_code\"]');

INSERT INTO `sport` (`id`, `name`, `description`, `created_by`, `created_at`, `updated_at`, `deleted_at`)
VALUES
    (1, 'football', 'new description', NULL, '2017-09-02 09:13:09', '2017-09-02 09:13:20', NULL);

INSERT INTO `country` (`id`, `name`, `code`, `created_by`, `created_at`, `updated_at`, `deleted_at`)
VALUES
    (1, 'Netherlands', 'nl', NULL, '2017-09-02 09:13:09', '2017-09-02 09:13:19', NULL);

INSERT INTO `region` (`id`, `name`, `description`, `country_id`, `sport_id`, `created_by`, `created_at`, `updated_at`, `deleted_at`)
VALUES
    (1, 'West 1', 'North-West part of NL for football', 1, 1, NULL, '2017-09-02 09:13:09', '2017-09-02 09:13:19', NULL),
    (2, 'West 2', 'South-West part of NL for football', 1, 1, NULL, '2017-09-02 09:13:09', '2017-09-02 09:13:09', NULL),
    (3, 'Zuid 1', 'West-South part of NL for football', 1, 1, NULL, '2017-09-02 09:13:09', '2017-09-02 09:13:09', NULL),
    (4, 'Zuid 2', 'East-South part of NL for football', 1, 1, NULL, '2017-09-02 09:13:09', '2017-09-02 09:13:09', NULL),
    (5, 'Noord', 'North part of NL for football', 1, 1, NULL, '2017-09-02 09:13:09', '2017-09-02 09:13:09', NULL),
    (6, 'Oost', 'East part of NL for football', 1, 1, NULL, '2017-09-02 09:13:09', '2017-09-02 09:13:09', NULL);

INSERT INTO `competition_template` (`id`, `name`, `description`, `play_day`, `region_id`, `created_by`, `created_at`, `updated_at`, `deleted_at`)
VALUES
    (1, '4E', 'Competition 4E', 0, 1, NULL, '2017-09-02 14:39:59', '2017-09-02 14:39:59', NULL);

INSERT INTO `season` (`id`, `name`, `description`, `start_year`, `end_year`, `start_date`, `end_date`, `region_id`, `created_by`, `created_at`, `updated_at`, `deleted_at`)
VALUES
    (1, '2014-2015', NULL, 2014, 2015, '2014-09-01', '2015-06-30', 1, NULL, '2017-09-02 14:42:11', '2017-09-02 14:42:11', NULL);
