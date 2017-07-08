INSERT INTO `user` (`uuid`, `email`, `password`, `created_by`, `created_at`, `updated_at`, `deleted_at`)
VALUES
    ('3a94ec6b-f6f5-4060-b61a-6d8f18605cb1', 'admin@asl', '$2a$10$OdSai7uiNEPvGGcJxZcAMuw4ABn0Myjvjd2wA2ORSdEQllDgW7JoG', NULL, '2017-07-08 11:37:15', '2017-07-08 11:37:15', NULL);

INSERT INTO `oauth_client` (`client_id`, `client_secret`, `redirect_url`, `grants`)
VALUES
    ('asl-crm', '7pH0W2X0M1OULdoOu6S6vATCIUlFCRE9FX3RYdPS', 'http://localhost:4200/home', '[\"password\",\"authorization_code\"]');

