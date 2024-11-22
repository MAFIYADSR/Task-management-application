1.  Run method:--
Start MySQL and to create the database run this code--
"------
        CREATE DATABASE todo_list;

USE todo_list;

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE
);

--------" 

2.  Run the backend:
 i used here nodemon to start the backend server;
install nodemon and run nodemon .\server.js

3.  Backend routes manage CRUD operations for tasks.
4.  Frontend communicates with the backend via REST APIs.


