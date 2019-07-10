# easy-oracledb

[![npm](https://img.shields.io/npm/dt/easy-oracledb.svg)](https://www.npmjs.com/package/easy-oracledb)
[![license](https://img.shields.io/npm/l/easy-oracledb.svg)](https://github.com/victorgianvechio/easy-oracledb/blob/master/LICENSE)
[![version](https://img.shields.io/npm/v/easy-oracledb.svg)](https://github.com/victorgianvechio/easy-oracledb/blob/master/CHANGELOG.md)

A simple way to connect in oracle database and execute querys. This module uses [node-oracledb v3.1.2](https://github.com/oracle/node-oracledb/tree/v3.1.2).

Oracle instant client available [here](https://www.oracle.com/technetwork/topics/winsoft-085727.html).

If you have any question or issue, feel free to ask.

**Table of content**

-   [Installation](#Installation)
    -   [Usage](#Usage)
-   [Functions](#Functions)
    -   [config(dbConfig)](#configDbConfig)
    -   [testConnection()](#testConnection)
    -   [loadSQL(file)](#loadSQLFile)
    -   [getData(sql, params)](#getDataSqlParams)
    -   [exec(sql, params)](#execSqlParams)
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

### config(dbConfig)

-   {string} **dbConfig** - an object javascript {user, pass, conn}

-   {string} **user** - db username

-   {string} **pass** - db password

-   {string} **conn** - db connection string _hots:port/dbname_

First step configure database connection:

```javascript
db.config({
    user: 'master', 
    pass: 'masterkey', 
    conn: '10.254.0.2:1521/dbname'
})
```

### testConnection()

_asynchronous function_

Connection can be tested:

```javascript
await db.testConnection()
    .then(result => console.log(result))
    .catch(err => console.log(err))
```

returns **true** if successfully connected or **error message**.

### loadSQL(file)

Load an existing *.sql* file as string

-   {string} **file** - path to file

```javascript
let sql = db.loadSQL('./getCustomers.sql')
```

### getData(sql, params)

_asynchronous function_

Used only for **select** statements.

-   {string} **sql** - a sql string

-   {array} **params** - an array of parameters _(optional)_

without parameters:

```javascript
await db.getData(sql)
    .then(result => console.log(result))
    .catch(err => console.log(err))
```
with parameters:

```javascript
await db.getData(sql, [param1, param2, ...])
    .then(result => console.log(result))
    .catch(err => console.log(err))
```

Result:

```sh
[ 
    { 
        "COD": "330248",
        "NAME": "Rouchele",
        "E_MAIL": "rouchele@domain.com" 
    },
    { 
        "COD": "330256",
        "NAME": "John",
        "E_MAIL": "john@domain.com" 
    } 
]
```

### exec(sql, params)

_asynchronous function_

Used to **insert**, **update** and **delete** statements.

-   {string} **sql** - a sql string

-   {array} **params** - an array of parameters _(optional)_

without parameters:

```javascript
await db.exec(sql)
    .then(result => console.log(result))
    .catch(err => console.log(err))
```

with parameters:

```javascript
await db.exec(sql, [param1, param2, ...])
    .then(result => console.log(result))
    .catch(err => console.log(err))
```

Returns number of rows affected:

```sh
1
```

## Examples

```javascript
// Import easy-oracledb
const db = require('easy-oracledb')

// Configure database access
db.config({
    user: 'master', 
    pass: 'masterkey', 
    conn: '10.254.0.2:1521/dbname'
})

// Test Connection
async function testConn() {
    await db.testConnection()
        .then(result => console.log('Successfully Connected!'))
        .catch(err => console.log(err))
}

// Get all customers
async function getCustomers() {

    // 'SELECT COD, NAME, EMAIL FROM CUSTOMERS'
    let sql = await db.loadSQL('./getCustomers.sql')

    await db.getData(sql)
        .then(result => console.log(result))
        .catch(err => console.log(err))
}

// Get customers by registration date
async function getCustomersByRegDate() {

    // SELECT COD, NAME, EMAIL FROM CUSTOMERS WHERE REG_DATE BETWEEN :DATE1 AND DATE2'
    let sql = await db.loadSQL('./getCustomersByRegDate.sql')

    let param = ['02/08/2019', '06/08/2019']
    await db.getData(sql, param)
        .then(result => console.log(result))
        .catch(err => console.log(err))
}

// Insert customer without parameters. Note all values ​​are in the SQL string
async function addNewCustomer() {

    // 'INSERT INTO CUSTOMERS(COD, NAME, EMAIL, REG_DATE) 
    // VALUES ('1', 'John', 'john@domain.com', '08/07/2019')'
    let sql = await db.loadSQL('./insertCustomer.sql')

    await db.exec(sql)
        .then(result => console.log(result))
        .catch(err => console.log(err))
}

// Insert customer with parameters. Note the values ​​are passed as parameters (:param)
async function addNewCustomerWithParameter() {

    // 'INSERT INTO CUSTOMERS(COD, NAME, EMAIL, REG_DATE) 
    // VALUES (:COD, :NAME, :EMAIL, :REG_DATE)'
    let sql = await db.loadSQL('./insertCustomer.sql')
     
    let params = ['1', 'John', 'john@domain.com', '08/07/2019']
    await db.exec(sql, params)
        .then(result => console.log(result))
        .catch(err => console.log(err))
}
```

## Changelog

see the update notes at [CHANGELOG](https://github.com/victorgianvechio/easy-oracledb/blob/master/CHANGELOG.md).

Copyright ® 2019 Victor Gianvechio
