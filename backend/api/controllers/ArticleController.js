'use strict'
const db = require('../db')
const table = 'article'

module.exports = {

    getArticle: async (req, res) => {
        let sql = 'SELECT * FROM ' + table ;
        db.query(sql, async (err, response) => { 
            if (err) throw err
            res.json(response)
        })
    },

    getArticleWithId: async (req, res) => {
        const articleId = req.body.id;
        let sql =` SELECT * FROM   ` + table +` where Id=? `;
        db.query(sql,[articleId], async (err, response) => { 
            if (err) throw err
            res.json(response)
        })
    },


    addArticle: (req, res) => {
        const article = req.body.data;

        const sql = `insert into ` + table + ` set ?`
        db.query(sql, [article], (err1, res1) => {
            if (err1) {
                throw err1
            }
            res.json(`OK`)
        })
    },

    updateArticle: (req, res) => {
        const article = req.body.data;
        const articleId = req.body.id;
        // console.log(article)
        // console.log(articleId)
        const sql = `Update ` + table + ` set ? where Id = ?`
        db.query(sql, [article, articleId], (err1, res1) => {
            if (err1) {
                throw err1
            }
            res.json(`OK`)
        })
    },
    deleteArticle: (req, res) => {
        const articleId = req.body.id;
        const sql2 = `delete from  ` + table + ` where Id = ?`
        db.query(sql2, [articleId], (err1, res1) => {
            if (err1) {
                throw err1
            }
            res.json('OK')
        })
    },

}