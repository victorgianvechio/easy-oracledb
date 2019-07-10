/*
  CONNECT IN ORACLE DATABASE AND EXECUTE QUERYS.
*/
const oracledb = require('oracledb')
const fs = require('fs')

oracledb.outFormat = oracledb.OBJECT

let dbConfig = {
    username: '',
    password: '',
    connectString: ''
}

// CONFIGURE CONNECTION VARIABLES
const config = config => {
    dbConfig.username = config.user
    dbConfig.password = config.pass
    dbConfig.connectString = config.conn
}

// LOAD AN EXTERNAL .sql FILE AS STRING
const loadSQL = file => {
    return fs.readFileSync(file).toString()
}

// TEST CONNECTION
const testConnection = () => {
    return new Promise(async (resolve, reject) => {
        let conn = ''
        let result = ''

        try {
            conn = await oracledb.getConnection({
                user: dbConfig.username,
                password: dbConfig.password,
                connectString: dbConfig.connectString
            })
            result = true
            resolve(result)
        } catch (err) {
            result = `Error ${err.message}`
            reject(result)
        } finally {
            if (conn) await conn.close()
        }
    })
}

// EXECUTE SELECT QUERYS
const getTableData = (sql, param = []) => {
    return new Promise(async (resolve, reject) => {
        let conn = ''
        let result = ''

        try {
            conn = await oracledb.getConnection({
                user: dbConfig.username,
                password: dbConfig.password,
                connectString: dbConfig.connectString
            })

            result = await conn.execute(sql, param)
            resolve(result.rows)
        } catch (err) {
            result = `Error ${err.message}`
            reject(result)
        } finally {
            if (conn) await conn.close()
        }
    })
}

// EXECUTE INSERT, UPDATE AND DELETE QUERYS
const execDML = (sql, param = []) => {
    return new Promise(async (resolve, reject) => {
        let conn = ''
        let result = ''

        try {
            conn = await oracledb.getConnection({
                user: dbConfig.username,
                password: dbConfig.password,
                connectString: dbConfig.connectString
            })

            let options = {
                autoCommit: true
            }

            result = await conn.execute(sql, param, options)
            resolve(result.rowsAffected)
        } catch (err) {
            result = `Error ${err.message}`
            reject(result)
        } finally {
            if (conn) await conn.close()
        }
    })
}

// EXECUTE PROCEDURE AND RETURNS 'RETURN' PARAMETER
const execProcedure = async (sql, ptabela) => {
    let conn = ''
    let result = ''

    let param = {
        ptabela: ptabela,
        pretorno: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
    }

    try {
        conn = await oracledb.getConnection({
            user: dbConfig.username,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        })

        result = await conn.execute(sql, param)
        return result.outBinds
    } catch (err) {
        result = `Error ${err.message}`
        return result
    } finally {
        if (conn) await conn.close()
    }
}

module.exports = {
    getData: getTableData,
    exec: execDML,
    testConnection: testConnection,
    config: config,
    loadSQL: loadSQL
}
