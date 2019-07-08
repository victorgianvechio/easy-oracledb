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
const config = async (user, pass, conn) => {
    dbConfig.username = user
    dbConfig.password = pass
    dbConfig.connectString = conn
}

const loadSQL = async file => {
    return await fs.readFileSync(file).toString()
}

// EXECUTE QUERY WITHOUT PARAMETER
const getTableData = async sql => {
    let conn = ''
    let result = ''

    try {
        conn = await oracledb.getConnection({
            user: dbConfig.username,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        })

        result = await conn.execute(sql)
        return result.rows
    } catch (err) {
        result = `Error ${err.message}`
        return result
    } finally {
        if (conn) await conn.close()
    }
}

// EXECUTE QUERY WITH PARAMETER
const getTableDataParam = async (sql, param) => {
    let conn = ''
    let result = ''

    try {
        conn = await oracledb.getConnection({
            user: dbConfig.username,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        })

        result = await conn.execute(sql, param)
        return result.rows
    } catch (err) {
        result = `Error ${err.message}`
        return result
    } finally {
        if (conn) await conn.close()
    }
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

// EXECUTE INSERT, UPDATE AND DELETE WITHOUT PARAM
const execDML = async (sql, param = []) => {
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
        return result
    } catch (err) {
        result = `Error ${err.message}`
        return result
    } finally {
        if (conn) await conn.close()
    }
}

// TEST CONNECTION
const testConnection = async () => {
    let conn = ''
    let result = ''

    try {
        conn = await oracledb.getConnection({
            user: dbConfig.username,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        })
        result = true
        return result
    } catch (err) {
        result = `Error ${err.message}`
        return result
    } finally {
        if (conn) await conn.close()
    }
}

// REDIRECT getData() FUNCTION IF HAS A SECOND PARAMETER
function redirectGetDataFunction(param1, param2) {
    if (param2 === undefined) return getTableData(param1)
    else return getTableDataParam(param1, param2)
}

module.exports = {
    getData: redirectGetDataFunction,
    exec: execDML,
    testConnection: testConnection,
    config: config,
    loadSQL: loadSQL
}
