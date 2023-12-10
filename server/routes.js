const axios = require('axios');
const fs = require('fs');
const jsdom = require("jsdom");

const { getSearchBookList, getChapterList, getContent } = require('./bookSourceManage');
const { get } = require('http');

const { JSDOM } = jsdom;
const dataPath = './server/bookshelf.json';
const settingsPath = './server/settings.json';
const syPath = './server/sy.json';

let syData = fs.readFileSync(syPath, 'utf-8');
let obj = JSON.parse(syData);

module.exports = function (app) {
    app.get('/fetchUrl', async (req, res) => {
        const url = req.query.url;
        try {
            const response = await axios.get(url);
            res.send(response.data);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });

    app.get('/fetchBookList', async (req, res) => {
        try {
            let jsonData = fs.readFileSync(dataPath, 'utf-8');
            let obj = JSON.parse(jsonData);
            res.send(JSON.stringify(obj));
        } catch (error) {
            res.status(500).send(JSON.stringify({ message: error.message }));
        }
    });

    app.get('/getSearchBook', async (req, res) => {
        // 处理post请求的逻辑
        const bookName = req.query.bookName;
        const bookSource = req.query.bookSource;
        try {
            books = await getSearchBookList(obj, bookName, bookSource);
            res.send(books);
        } catch (error) {
            res.status(500).send(JSON({ message: error.message }));
        }
    });

    app.get('/getChapterList', async (req, res) => {
        const url = req.query.url;
        const bookSource = req.query.bookSource;
        try {
            chapters = await getChapterList(url, bookSource);
            res.send(chapters);
        } catch (error) {
            res.status(500).send(JSON.stringify({ message: error.message }));
        }
    });

    app.get('/getContent', async (req, res) => {
        const url = req.query.url;
        const bookSource = req.query.bookSource;
        try {
            content = await getContent(url, bookSource);
            res.send(content);
        } catch (error) {
            res.status(500).send(JSON.stringify({ message: error.message }));
        }
    });

    app.post('/saveBook', async (req, res) => {
        const data = req.body;
        const val = req.query.val;
        try {
            let jsonData = fs.readFileSync(dataPath, 'utf-8');
            let obj = JSON.parse(jsonData);
            let found = false;
            let item = {};
            for (let i = 0; i < obj.length; i++) {
                if (obj[i].name === data.name && obj[i].bookSource_family === data.bookSource_family && obj[i].author === data.author) {
                    found = true;
                    item = obj[i];
                    if (val == 'add') {
                        obj[i] = data;
                        console.log("Update bookshelf: " + data.name);
                    }
                    else if (val == 'delete') {
                        obj.splice(i, 1); // 删除匹配的元素
                        console.log("Delete from bookshelf: " + data.name);
                    }
                    break;
                }
            }
            if (!found) {
                obj.push(data);
                console.log("Add to bookshelf: " + data.name);
            }
            jsonData = JSON.stringify(obj, null, 2);
            fs.writeFileSync(dataPath, jsonData, 'utf-8');
            res.send(JSON.stringify({ message: 'Success', found: found, item: item }));
        } catch (error) {
            res.status(500).send(JSON.stringify({ message: error.message }));
        }
    });

    app.get('/fetchSettings', async (req, res) => {
        try {
            let jsonData = fs.readFileSync(settingsPath, 'utf-8');
            let obj = JSON.parse(jsonData);
            res.send(JSON.stringify(obj));
        } catch (error) {
            res.status(500).send(JSON.stringify({ message: error.message }));
        }
    });

    app.post('/saveSettings', async (req, res) => {
        const data = req.body;
        try {
            let jsonData = JSON.stringify(data, null, 2);
            fs.writeFileSync(settingsPath, jsonData, 'utf-8');
            res.status(200).send(JSON.stringify({ message: 'Success' }));
        } catch (error) {
            res.status(500).send(JSON.stringify({ message: error.message }));
        }
    });
}