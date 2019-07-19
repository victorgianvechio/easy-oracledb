# Change Log

## easy-oracledb v1.0.2 (19 Jul 2019)

-   Update examples in README;
-   Alter function name **loadSQL()** to **readSQL()**

## easy-oracledb v1.0.1 (10 Jul 2019)

-   Updated README;
-   Function **config(object)** now receives an object as parameter:

```javascript
db.config({
    user: 'master',
    pass: 'masterkey',
    conn: '10.254.0.2:1521/dbname'
})
```

instead of:

```javascript
db.config('master', 'masterkey', '10.254.0.2:1521/dbname')
```

-   Refactored code;

## easy-oracledb v1.0.0 (08 Jul 2019)

-   Published.
