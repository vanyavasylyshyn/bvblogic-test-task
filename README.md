# bvblogic-test-task

## Start the project
1. npm install - install all dependencies.
2. start MySQL server and create database.
3. in .env file set your MySQL host, port, username, password, database name.
4. run the command: ts-node ./node_modules/typeorm/cli.js migration:run
   to create tables in database.

## Routes
  POST    /house/create                 - creating house      
  POST    /booking/create/:houseId      - booking house     
  GET     /booking/history/:houseId     - get history of bookings for house    
  GET     /booking/cancel/:bookingId    - cancel booking    
  GET     /house/:houseId               - get house info    
  POST    /house/updateInfo/:houseId    - update house information    
  POST    /house/find                   - find house by period and price limit    
  DELETE  /house/deleteHouse/:houseId   - delete house    
  POST    /house/image/:houseId         - set house image    
  GET     /house/houseImages/:fileId    - get house image    
