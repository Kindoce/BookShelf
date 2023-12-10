const axios = require('axios');
const jsdom = require("jsdom");

const { JSDOM } = jsdom;

let baYi = (dom, val) => {
    const $ = require('jquery')(dom.window);
    if (val == 'search') {
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
        return books;
    } else if (val == 'chapter') {
        var chapterList = $(dom.window.document).find('#list dd');
        var chapters = chapterList.map(function () {
            var $row = $(this);
            var chapter = {};
            chapter.chapterUrl = $row.find('a').attr('href');
            chapter.chapterName = $row.find('a').text();
            return chapter;
        }).get();
        return chapters;
    } else if (val == 'content') {
        var content = $(dom.window.document).find('#content').text();
        return content;
    }
    return null;

};

let SF = (dom, val) => {
    const $ = require('jquery')(dom.window);
    if (val == 'search') {
        var bookList = $(dom.window.document).find('tbody ul').slice(0, -1);
        try {
            var books = bookList.map(function () {
                var $row = $(this);
                var book = {};
                book.author = ($row.text().split('综合信息： ')[1]).split('/')[0];
                book.bookUrl = $row.find('a').attr('href');
                var times = $row.text().split('/')
                book.updateTime = times[1] + '-' + times[2] + '-' + times[3].slice(0, 2);
                book.lastChapter = '';
                book.name = $row.find('a').text();
                book.coverUrl = $row.find('img').attr('src');
                return book;
            }).get();
            return books;
        } catch (e) {
            console.log(e);
            return null;
        }
    } else if (val == 'chapter') {
        var chapterList = $(dom.window.document).find('.catalog-list li a');
        var chapters = chapterList.map(function () {
            var $row = $(this);
            var chapter = {};
            chapter.chapterUrl = $row.attr('href');
            chapter.chapterName = $row.text();
            return chapter;
        }).get();
        return chapters;
    } else if (val == 'content') {
        var content = $(dom.window.document).find('#ChapterBody').html();
        return content;
    }
    return null;
};

let NineX = (result, val) => {
    if (val == 'search') {
        let list = result.list;
        var books = [];
        for (let i = 0; i < list.length; i++) {
            var book = {};
            book.author = list[i].author;
            book.bookUrl = 'https://novel-api.elklk.cn/api/book-info?id=' + list[i].id + '&source_id=1';
            book.updateTime = '';
            book.lastChapter = '';
            book.name = list[i].name;
            book.coverUrl = list[i].icon;
            books.push(book);
        }
        return books;
    } else if (val == 'chapter') {
        let list = result.list;
        let id = result.book_id;
        var chapters = [];
        for (let i = 0; i < list.length; i++) {
            if (list[i].list.length == 0) {
                var chapter = {};
                var cid = list[i].url.split('/');
                chapter.chapterUrl = 'https://novel-api.elklk.cn/cdn/book/content/' + id + '/' + cid[cid.length - 1];
                chapter.chapterName = list[i].name;
                chapters.push(chapter);
            } else {
                for (let j = 0; j < list[i].list.length; j++) {
                    var chapter = {};
                    var cid = list[i].list[j].url.split('/');
                    chapter.chapterUrl = 'https://novel-api.elklk.cn/cdn/book/content/' + id + '/' + cid[cid.length - 1];
                    chapter.chapterName = list[i].list[j].name;
                    chapters.push(chapter);
                }
            }
        }
        return chapters;
    } else if (val == 'content') {
        var content = result.info.content;
        return content;
    }
    return null;
};

let getRes = async (url, bookSource, val, header) => {
    if (url == '') {
        return null;
    }
    if (bookSource == '📚 SF轻小说' && val == 'chapter') {
        url = url + '/MainIndex/';
    }
    if (bookSource == '八一中文①' && val == 'content') {
        url = 'http://www.zwduxs.com' + url;
    }
    if (bookSource == '📚 SF轻小说' && val == 'content') {
        url = 'https://book.sfacg.com' + url;
    }
    if (bookSource == '9x阅读器' && val == 'search') {
        url = 'https://novel-api.elklk.cn' + url;
    }
    if (bookSource == '9x阅读器' && val == 'chapter') {
        id = url.split('id=')[1];
        url = 'https://novel-api.elklk.cn//cdn/book/chapterList/' + id + '.html'
    }
    const response = await axios.get(url);

    if (bookSource == '八一中文①') {
        const html = response.data;
        const dom = new JSDOM(html);
        return baYi(dom, val);
    }
    if (bookSource == '📚 SF轻小说') {
        const html = response.data;
        const dom = new JSDOM(html);
        return SF(dom, val);
    }
    if (bookSource == '9x阅读器') {
        return NineX(response.data.result, val);
    }
};


async function getSearchBookList(obj, bookName, bookSource) {
    let searchUrl = '';
    let header = '';
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].bookSourceName == bookSource) {
            searchUrl = obj[i].searchUrl;
            header = obj[i].header;
            break;
        }
    }
    const url = searchUrl.split(',')[0].replace('{{key}}', bookName).replace('{{page}}', 1);
    return await getRes(url, bookSource, 'search', header);
}

async function getChapterList(url, bookSource) {
    return await getRes(url, bookSource, 'chapter');
}

async function getContent(url, bookSource) {
    return await getRes(url, bookSource, 'content');
}


module.exports = {
    getSearchBookList,
    getChapterList,
    getContent,

};