
CREATE TABLE users (
    user_id UUID DEFAULT uuid_generate_v4(),
    user_name varchar(255) NOT NULL,
    user_email varchar(255) NOT NULL UNIQUE,
    user_password varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE todos(
    todo_id SERIAL,
    user_id UUID,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (todo_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE test(
    names_id SERIAL PRIMARY KEY,
    names VARCHAR(255) NOT NULL
);

INSERT INTO test (names) VALUES ('hasan123');
INSERT INTO test (names) VALUES ('murat');
INSERT INTO test (names) VALUES ('andrew');


 INSERT INTO users (user_name, user_email, user_password) VALUES ('hasan', 'hasan@gmail.com', '123');
 INSERT INTO users (user_name, user_email, user_password) VALUES ('jacob', 'jacob@gmail.com', '123');
    INSERT INTO users (user_name, user_email, user_password) VALUES ('taskless', 'taskless@gmail.com', '123');


 INSERT INTO todos (user_id, description) VALUES ('49d3144d-d19d-43be-accc-8bbf465e10fb', 'hasan greets you');
 INSERT INTO todos (user_id, description) VALUES ('20c2de00-5f08-4b32-94c4-2806a9e57a56', 'hello from jacob');
 INSERT INTO todos (user_id, description) VALUES ('49d3144d-d19d-43be-accc-8bbf465e10fb', 'hasan wants you to code');
