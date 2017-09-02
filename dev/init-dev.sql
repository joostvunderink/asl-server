INSERT INTO `user` (`id`, `uuid`, `email`, `password`, `created_by`, `created_at`, `updated_at`, `deleted_at`)
VALUES
    (1, '3a94ec6b-f6f5-4060-b61a-6d8f18605cb1', 'admin@asl', '$2a$10$OdSai7uiNEPvGGcJxZcAMuw4ABn0Myjvjd2wA2ORSdEQllDgW7JoG', NULL, '2017-07-08 11:37:15', '2017-07-08 11:37:15', NULL),
    (3, 'c3ee2433-6eb6-4d74-b223-8f53b8e71268', 'user@asl', '$2a$10$OdSai7uiNEPvGGcJxZcAMuw4ABn0Myjvjd2wA2ORSdEQllDgW7JoG', NULL, '2017-07-08 11:37:15', '2017-07-08 11:37:15', NULL);

INSERT INTO `role` (`id`, `name`, `created_by`, `created_at`, `updated_at`, `deleted_at`)
VALUES
    (1, 'admin', NULL, '2017-07-15 15:57:53', '2017-07-15 15:57:53', NULL),
    (2, 'user', NULL, '2017-07-15 15:57:53', '2017-07-15 15:57:53', NULL),
    (3, 'guest', NULL, '2017-07-15 15:57:53', '2017-07-15 15:57:53', NULL);

INSERT INTO `user_role` (`id`, `user_id`, `role_id`, `created_by`, `created_at`, `updated_at`, `deleted_at`)
VALUES
    (1, 1, 1, NULL, '2017-07-15 22:37:47', '2017-07-15 22:37:47', NULL),
    (2, 3, 2, NULL, '2017-07-23 14:06:57', '2017-07-23 14:06:57', NULL);

INSERT INTO `oauth_client` (`client_id`, `client_secret`, `redirect_url`, `grants`)
VALUES
    ('asl-crm', '7pH0W2X0M1OULdoOu6S6vATCIUlFCRE9FX3RYdPS', 'http://localhost:4200/home', '[\"password\",\"authorization_code\"]');

