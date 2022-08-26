DROP TABLE IF EXISTS "user";
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    salt VARCHAR(255),
    hash VARCHAR(255)
);

DROP TABLE IF EXISTS list;
CREATE TABLE list(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);

DROP TABLE IF EXISTS task;
CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    comment VARCHAR(65535),
    position INTEGER,
    created timestamptz,
    is_done BOOLEAN,
    done timestamptz,
    list_id INTEGER,
    FOREIGN KEY (list_id) REFERENCES list (id)
);