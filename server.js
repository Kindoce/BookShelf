const express = require('express');
const axios = require('axios');
const cors = require('cors');
const jsdom = require("jsdom");
const bodyParser = require('body-parser');
const fs = require('fs')

const { JSDOM } = jsdom;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/fetchUrl', async (req, res) => {
    const url = req.query.url;
    try {
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
});

app.get('/fetchBookList', async (req, res) => {
    try {
        let jsonData = fs.readFileSync('./bookshelf.json', 'utf-8');
        let obj = JSON.parse(jsonData);
        res.send(JSON.stringify(obj));
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: error.message }));
    }
});


app.post('/postData', async (req, res) => {
    // 处理post请求的逻辑
    const data = req.body;
    const url = req.query.url;
    try {
        const response = await axios.get(url);
        const html = response.data;
        const dom = new JSDOM(html);
        const $ = require('jquery')(dom.window);
        var bookList = $(dom.window.document).find('.grid tr:not(:first-child)');
        var books = bookList.map(function () {
            var $row = $(this);
            var book = {};
            book.author = $row.find('td').eq(2).text();
            book.bookUrl = $row.find('td').eq(0).find('a').attr('href');
            book.words = $row.find('td').eq(3).text();
            book.updateTime = $row.find('td').eq(4).text();
            book.lastChapter = $row.find('td').eq(1).find('a').text();
            book.name = $row.find('td').eq(0).find('a').text().replace(/（.*|（.*|免费阅读|全文.*阅读|最新章节|笔趣阁|小说/g, '');
            var id = book.bookUrl.match(/(\d+)\/?$/)[1];
            var iid = parseInt(id / 1000);
            book.coverUrl = 'http://www.zwduxs.com/files/article/image/' + iid + '/' + id + '/' + id + 's.jpg';
            return book;
        }).get();
        res.send(books);
    } catch (error) {
        res.status(500).send(JSON({ message: error.message }));
    }
});

app.post('/postChapter', async (req, res) => {
    const data = req.body;
    const url = req.query.url;
    try {
        const response = await axios.get(url);
        const html = response.data;
        const dom = new JSDOM(html);
        const $ = require('jquery')(dom.window);
        var chapterList = $(dom.window.document).find('#list dd');
        var chapters = chapterList.map(function () {
            var $row = $(this);
            var chapter = {};
            chapter.chapterUrl = $row.find('a').attr('href');
            chapter.chapterName = $row.find('a').text();
            return chapter;
        }).get();
        res.send(chapters);
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: error.message }));
    }
});

app.post('/postChapterContent', async (req, res) => {
    const data = req.body;
    const url = req.query.url;
    try {
        const response = await axios.get(url);
        const html = response.data;
        const dom = new JSDOM(html);
        const $ = require('jquery')(dom.window);
        var content = $(dom.window.document).find('#content').text();
        res.send(content);
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: error.message }));
    }
});

app.post('/saveBook', async (req, res) => {
    const data = req.body;
    const val = req.query.val;
    try {
        let jsonData = fs.readFileSync('./bookshelf.json', 'utf-8');
        let obj = JSON.parse(jsonData);
        let found = false;
        let item = {};
        for (let i = 0; i < obj.length; i++) {
            if (obj[i].name === data.name) {
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
        fs.writeFileSync('./bookshelf.json', jsonData, 'utf-8');
        res.send(JSON.stringify({ message: 'Success', found: found, item: item }));
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: error.message }));
    }
});



app.listen(3000, () => console.log('Server started on port 3000'));
