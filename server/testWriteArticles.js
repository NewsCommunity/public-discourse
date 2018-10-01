const firebase = require('firebase');
const config = {
	/* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
	apiKey: 'AIzaSyDdi-knbC_esYy0s3iKhQFOT-5DI8rA1Xg',
	authDomain: 'collaboration-2c632.firebaseapp.com',
	databaseURL: 'https://collaboration-2c632.firebaseio.com',
	projectId: 'collaboration-2c632',
	storageBucket: 'collaboration-2c632.appspot.com',
	messagingSenderId: '521492989557'
};
const axios = require('axios');
const fire = firebase.initializeApp(config);
const firestore = fire.firestore();

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('0054e68e1a9c42a8af364eb5d89a2792');

var Articles;

async function getArticles(){

  try {
    const res = await newsapi.v2.topHeadlines({ sources: 'bbc-news,the-verge' });
    const articles = res.articles;

    articles.forEach(async (article) => {
      let fireResponse = await firestore.collection('discourseList').doc().set({
        article
      })
    })

  } catch (error) {
    console.log(error);
  }

}

getArticles();

