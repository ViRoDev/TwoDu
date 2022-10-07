CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    salt VARCHAR(255),
    hash VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS list(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);

CREATE TABLE IF NOT EXISTS task(
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