const firebase = require('firebase');

const config = {
  /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: 'AIzaSyDdi-knbC_esYy0s3iKhQFOT-5DI8rA1Xg',
  authDomain: 'collaboration-2c632.firebaseapp.com',
  databaseURL: 'https://collaboration-2c632.firebaseio.com',
  projectId: 'collaboration-2c632',
  storageBucket: 'collaboration-2c632.appspot.com',
  messagingSenderId: '521492989557',
};
const axios = require('axios');

const fire = firebase.initializeApp(config);
const firestore = fire.firestore();
const crypto = require('crypto');

const NewsAPI = require('newsapi');

const newsapi = new NewsAPI('0054e68e1a9c42a8af364eb5d89a2792');

const webHoseApi = '835ac4c1-b497-4727-87b4-138a7d14f875';
const webHoseRequest = `http://webhose.io/filterWebContent?token=${webHoseApi}&format=json&sort=crawled&q=politics%20language%3Aenglish%20site_type%3Anews%20site%3A(bbc.co.uk%20OR%20cnn.com%20OR%20nytimes.com%20OR%20washingtonpost.com)`;

const read = require('node-readability');

let Articles;

async function getArticles() {
  try {
    const res = await newsapi.v2.topHeadlines({
      sources: 'bbc-news,the-new-york-times,the-washington-post',
    });
    const articles = res.articles;

    articles.forEach(async (article) => {
      read(article.url, async (err, articleSimple, meta) => {
        if (!err && articleSimple.content) {
          article.html = articleSimple.content;
          article.html = article.html.replace(/<h2>/g, "<h6>")
          // console.log("article: ", article);
          article.retrivalDate = firebase.firestore.FieldValue.serverTimestamp();
          console.log('Timestamp: ', article.retrivalDate);
          article.readCount = 0;
          article.payments = [];

          const url = article.url;
          console.log(url);
          const hash = await crypto
            .createHash('sha1')
            .update(url)
            .digest('hex');

          
          firestore
            .collection('discourseList')
            .doc(hash)
            .set({
              article,
              timestamp: Math.floor(new Date())
            });

          // WNYCChat
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}

getArticles();

