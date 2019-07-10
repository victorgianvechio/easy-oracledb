const db = require('./dbConnection.js')

;(async () => {
    db.config({
        user: 'user',
        pass: 'pass',
        conn: 'host:port/dbname'
    })

    let sql = `SELECT 'TEST1' AS TEST1, 'TEST2' AS TEST2 FROM DUAL`

    await db
        .getData(sql)
        .then(v => console.log('v', v))
        .catch(err => console.log('err', err))
})()
