const sql = require('../config/index');
const bcrypt = require('bcrypt');
const {createJWT} = require('../middleware/AuthenticatedUser')

class user {
    login(data ,result){
        const {emailAdd, userPass} = data;
        sql.query(`SELECT firstName, lastName, emailAdd, userPass, userRole, userProfile, joinDate FROM users WHERE emailAdd =?;`, [emailAdd], async (err,results) => {
            const value = results;
            if(err) result(err,null);
            else{
                await bcrypt.compare(userPass, results[0].userPass, (err, results) => {
                    if(err) result({err,message:"You provided incorrect details!"}, null);
                    else result(null, (results, value));
                })
            }
        })
    }

    fetchUsers(result){
        sql.query(`SELECT userID, firstName, lastName, emailAdd, userPass, userRole, userProfile FROM users;`, (err,results) => {
            if(err) result(err);
            else result(null, results);
        })
    }

    fetchUser(id, result){
        sql.query(`SELECT userID, firstName, lastName, emailAdd, userRole, userPass FROM users WHERE userID = ?;`, [id], (err, results) => {
            if(err) result(err, null);
            else result(null, results);
        })
    }

    async createUser(data, result){
        data.userPass = await bcrypt.hash(data.userPass, 15);
        sql.query(`INSERT INTO users SET ?;`, [data], (err,results) => {
            if(err) result(err, null);
            else result(null, results);
            }
        )
    }

    updateUser(data, id, result){
        if(data.userPass !== null || data.userPass !== undefined) data.userPass = bcrypt.hashSync(data.userPass, 15);
        sql.query(`UPDATE users SET ? WHERE userID = ?;`, [data, id], (err, results) => {
            if(err) result(err, null);
            else result(null, results);
        })
    }

    deleteUser(id, result){
        sql.query(`DELETE FROM users WHERE userID = ?;`, [id], (err, results) => {
            if(err) result(err, null);
            else result(null, results);
        })
    }
}

class products {
    fetchProducts(result){
        sql.query(`SELECT * FROM products;`, (err, results) => {
            if(err) result(err, null);
            else result(null, results);
        });
    }

    fetchProduct(id, result){
        sql.query(`SELECT * FROM products WHERE id = ?;`, [id], (err,results) => {
            if(err) result(err, null);
            else result(null, results);
        })
    }

    addProduct(data, result){
        sql.query(`INSERT INTO products SET ?;`, [data], (err, results) => {
            if(err) result(err, null);
            else result(null, results);
        })
    }

    updateProduct(data,id, result){
        sql.query(`UPDATE products SET ? WHERE id = ?;`, [data, id], (err, results) => {
            if(err) result(err, null);
            else result(null, results);
        })
    }

    deleteProduct(id,result){
        sql.query(`DELETE FROM products WHERE id = ?`, [id], (err, results) => {
            if(err) result(err, null);
            else result(null, results);
        })
    }
}

module.exports = {user, products};