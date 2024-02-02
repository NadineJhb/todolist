SET NAMES 'utf8mb4';

DROP TABLE IF EXISTS `tasks`;

DROP TABLE IF EXISTS `user`;

CREATE TABLE user (
    id INT PRIMARY KEY NOT NULL, pseudo VARCHAR(80) NOT NULL, email VARCHAR(80) NOT NULL, password VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT, user_id INT NOT NULL, description VARCHAR(255), deadline DATETIME NOT NULL DEFAULT NOW(), category VARCHAR(80) NOT NULL, urgent BOOLEAN NOT NULL, important BOOLEAN NOT NULL, CONSTRAINT fk_user_task FOREIGN KEY (user_id) REFERENCES user (id)
);

INSERT INTO
    user (id, pseudo, email, password)
VALUES (
        1, 'Nadine', 'nadine@email.com', '$argon2id$v=19$m=19456,t=2,p=1$rcKDJ+nrC7qsE+3LCeWqAw$5mdbNlU0speuxxabBpzrIKGAiDMbmd7HO5k8YzChW5Q'
    ),
    (
        2, 'Pierre', 'pierre@email.com', '$argon2id$v=19$m=19456,t=2,p=1$rcKDJ+nrC7qsE+3LCeWqAw$5mdbNlU0speuxxabBpzrIKGAiDMbmd7HO5k8YzChW5Q'
    ),
    (
        3, 'Paul', 'paul@email.com', '$argon2id$v=19$m=19456,t=2,p=1$rcKDJ+nrC7qsE+3LCeWqAw$5mdbNlU0speuxxabBpzrIKGAiDMbmd7HO5k8YzChW5Q'
    ),
    (
        4, 'Martine', 'martine@email.com', '$argon2id$v=19$m=19456,t=2,p=1$rcKDJ+nrC7qsE+3LCeWqAw$5mdbNlU0speuxxabBpzrIKGAiDMbmd7HO5k8YzChW5Q'
    );

INSERT INTO
    tasks (
        user_id, description, deadline, category, urgent, important
    )
VALUES (
        1, 'go grocery shopping', '2024-02-02', 'Home', false, true
    ),
    (
        1, 'send my CV to Google', '2024-02-02', 'Work', true, true
    ),
    (
        2, 'go visit grandma', '2024-02-04', 'Home', true, false
    ),
    (
        2, 'find a gift for Jean', '2024-02-04', 'Home', true, true
    ),
    (
        2, 'buy soap', '2024-02-07', 'Home', false, true
    ),
    (
        2, 'cancel gym membership', '2024-02-08', 'Home', false, false
    ),
    (
        3, 'go get a sandwich', '2024-02-01', 'Home', true, false
    ),
    (
        3, 'migrate database', '2024-02-03', 'Work', true, true
    ),
    (
        3, 'push branch on git', '2024-02-04', 'Work', false, true
    ),
    (
        3, 'create figma mockups', '2024-02-01', 'Work', false, false
    ),
    (
        4, 'refund Léa', '2024-02-05', 'Home', true, false
    ),
    (
        4, 'call car insurance', '2024-02-06', 'Home', true, true
    ),
    (
        4, 'letter to mail by Sunday', '2024-02-04', 'Home', false, true
    ),
    (
        4, 'return Amazon parcel', '2024-02-07', 'Home', false, false
    );