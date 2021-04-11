# User API
Simple API for user creation login and update

 Server URL :  https://apidemo12.herokuapp.com

(Consider an dummy Organization which has some xyz product for which the employee have store the user data)

Guidlines:
1. An Employee can only create an user
2. user data can only be accessed by Employee
3. employees need a token to Access an user data
4. only admin employees can create or modify the user data

-----------------------------------------------------------------------------------
# API endPoints
-----------------------------------------------------------------------------------
1.  Login
*  endpoint: /ELogin
*  Use: to log in to the system and getting the token
*  payload:
{
    "Email": string,
    "password": string
}
 -----------------------------------------------------------------------------------
 
 2.Add User
 *   endpoint :/AddUser
 *   use: Adding Normal user
 *   payload:
{
    'Email': string,
    'firstName': String,
    'lastName': String,
    'address': String,
    'createdBy': String
}

Token from login  Must be Added in hedder of request with key "Token" 
-----------------------------------------------------------------------------------
 
3.Finding User 
* endpoint : /FindUser
*  use:Finding Normal user 
*  payload:
{
    "query": {
        "Email": string
    },
    "page": { //For Pagination please leave it blank if you want to search the data in full db  since it will search the data in given dimentions
        "page": 2,
        "limit": 3
    }
}
  
Token from login  Must be Added in hedder of request with key "Token" 
-----------------------------------------------------------------------------------  

4.Finding Employee
 *  endpoint: /FindEmp  
 *  use:for Finding Employee
 *  payload:
 {
     "query": {
         "Email": string
     },
     "page": { //For Pagination
         "page": 2,
         "limit": 3
     }
 }
-----------------------------------------------------------------------------------

5.Creating Employee
  * endpoint :/AddEMP
  * use:Adding Employee user
  *  payload:
 {
    "isAdmin": Boolean,
    "Email": String,
    "Eid": String,
    "address": String,
    "firstName": String,
    "lastName": String,
    "password": String
}
----------------------------------------------------------------------------------- 

6.Converting PDF to JSON  
 * endpoint : /PDFJSON
*  use:for Converting PDF to Text 
*  payload:
{
    "id": 123,
    "data:" < Baswe64 encoded PDF > "
}
  
Token from login  Must be Added in hedder of request with key "Token" 

----------------------------------------------------------------------------------- 
