# easy-oracledb

[![npm](https://img.shields.io/npm/dt/easy-oracledb.svg)](https://www.npmjs.com/package/easy-oracledb)
[![license](https://img.shields.io/npm/l/easy-oracledb.svg)](https://github.com/victorgianvechio/easy-oracledb/blob/master/LICENSE)
[![version](https://img.shields.io/npm/v/easy-oracledb.svg)](https://github.com/victorgianvechio/easy-oracledb/blob/master/CHANGELOG.md)

A simple way to connect in oracle database and execute querys. This module uses [node-oracledb v3.1.2](https://github.com/oracle/node-oracledb/tree/v3.1.2).

**Table of content**

-   [Installation](#Installation)
    -   [Usage](#Usage)
-   [Functions](#Functions)
    -   [config()](#configUserPassConnectionString)
    -   [testConnection()](#testConnection)
    -   [loadSQL()](#getDataSqlParamsFile)
    -   [getData()](#getYearSqlParams)
    -   [exec()](#execSqlParams)
-   [Examples](#Examples)
-   [Changelog](#Changelog)

---

## Installation

via npm:

```sh
npm i -S easy-oracledb
```

### Usage

```javascript
const db = require('easy-oracledb')
```

## Functions

### config(user, pass, connectionString)

-   {string} **user** - database username

-   {string} **pass** - database password

-   {string} **connectionString** - a string containing host:port/database

First step configure database connection:

```javascript
db.config('master', 'masterkey', '10.254.0.2:1521/dbname')
```

### testConnection()

Connection can be tested using this function:

```javascript
await db.testConnection()
    .then(result => console.log(result))
    .ctach(err => console.log(err))
```

returns **true** if successfully connected or **error message**.

### loadSQL(file)

You can load an existing *.sql* file as string

-   {string} **file** - path to file

```javascript
let sql = await db.loadSQL('./getCustomers.sql')
```

### getData(sql, params)

Used only for **select** statements

-   {string} **sql** - a sql string

-   {array} **params** - an array of parameters _(optional)_

without parameters:

```javascript
await db.getData(sql)
    .then(resul => console.log(result))
    .catch(err => console.log(err))
```
with parameters:

```javascript
await db.getData(sql, [param1, param2, ...])
    .then(resul => console.log(result))
    .catch(err => console.log(err))
```

Returns result set of objects:

```sh
[ 
    { 
        "COD": "330248",
        "NAME": "Rouchele",
        "E_MAIL": "Rouchele@domain.com" 
    },
    { 
        "COD": "330256",
        "NAME": "John",
        "E_MAIL": "john@domain.com" 
    } 
]
```

### exec(sql, params)

Used to **insert**, **update** and **delete** statements

-   {string} **sql** - a sql string

-   {array} **params** - an array of parameters

```javascript
await db.exec(sql, [param1, param2, ...])
    .then(resul => console.log(result))
    .catch(err => console.log(err))
```

Returns number of rows affected:

```sh
{ rowsAffected: 1 }
```

You can get only value using:

```javascript
console.log(result.rowsAffected) // => 1
```

## Examples

```javascript
// Import easy-oracledb
const db = require('easy-oracledb')

// Configure database access
db.config('user', 'pass', '10.254.0.2:1521/mydb')

// Test Connection
async function testConn() {
    await db
        .testConnection()
        .then(v => {
            if (v === true) 
                console.log('Successfully Connected!')
            else 
                console.log('err:', v) // Oracle error (invalid username, pass, listener, ...)
        })
}

// Get all customers
async function getCustomers() {

    // let sql = 'SELECT COD, NAME, EMAIL FROM CUSTOMERS'
    // or load an existing sql file
    let sql = await db.loadSQL('./getCustomers.sql')

    // let customers = await db.getData(sql)
    // or
    let customers = ''
    let error = ''
    await db.getData(sql)
        .then(resul => customers = result)
        .catch(err => error = err)
}

// Get customers by registration date
async function getCustomersByRegDate() {

    // let sql = 'SELECT COD, NAME, EMAIL FROM CUSTOMERS WHERE REG_DATE BETWEEN :DATE1 AND DATE2'
    // or load an existing sql file
    let sql = await db.loadSQL('./getCustomersByRegDate.sql')

    // let customers = await db.getData(sql, ['02/08/2019', '06/08/2019'])
    // or
    let customers = ''
    let error = ''
    await db.getData(sql, ['02/08/2019', '06/08/2019'])
        .then(resul => customers = result)
        .catch(err => error = err)
}

// Insert customer without parameters
// in this case the SQL contains all values to insert
async function addNewCustomer() {
    // let sql = 'INSERT INTO CUSTOMERS(COD, NAME, EMAIL, REG_DATE) VALUES ('1', 'John', 'John@domain.com', '08/07/2019')'
    // or load an existing sql file
    let sql = await db.loadSQL('./insertCustomer.sql')

     // let result = await db.exec(sql, ['1', 'John', 'John@domain.com', '08/07/2019'])
    // or
    await db.exec(sql)
        .then(resul => console.log(result.rowsAffected))
        .catch(err => console.log(err))
}

// Insert customer with parameters
// here we are passing the parameters to the function exec()
async function addNewCustomerWithParameter() {
    // let sql = 'INSERT INTO CUSTOMERS(COD, NAME, EMAIL, REG_DATE) VALUES (:COD, :NAME, :EMAIL, :REG_DATE)'
    // or load an existing sql file
    let sql = await db.loadSQL('./insertCustomer.sql')

     // let result = await db.exec(sql, ['1', 'John', 'John@domain.com', '08/07/2019'])
    // or
    let params = ['1', 'John', 'John@domain.com', '08/07/2019']
    await db.exec(sql, params)
        .then(resul => console.log(result.rowsAffected))
        .catch(err => console.log(err))
}
```

## Changelog

see the update notes at [CHANGELOG](https://github.com/victorgianvechio/easy-oracledb/blob/master/CHANGELOG.md).

Copyright ® 2019 Victor Gianvechio
