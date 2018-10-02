const firebase = require('firebase');
const config = require('../src/secrets')

const axios = require('axios');
const fire = firebase.initializeApp(config);
const firestore = fire.firestore();

const NewsAPI = require('newsapi');
const newsapi = require('../src/secretNewsApiKey');


async function discourseList(){

  try {
    const discourseList = await firestore.collection('discourseList').get();
    console.log(discourseList);
    // discourseList.array.forEach(element => {

    // });

  } catch (error) {
    console.log(error);
  }

}

discourseList();

