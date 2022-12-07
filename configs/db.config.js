module.exports = {
    HOST : 'localhost',
    USER : 'root',
    PASSWORD : 'mysql@123#',
    DB : 'ecom_db',
    dialect : 'mysql',
    pool : {
        max : 5,
        min : 0,
        acquire : 30000,
        idle : 1000
    }
}