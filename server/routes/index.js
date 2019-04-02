const express = require("express");
const router = express.Router();
const User = require('../models/user-model');
const Collection = require('../models/collection-model');
//const NewsAPI = require("newsapi");
//const newsapi = new NewsAPI(process.env.apiKey);

const axios = require("axios");

const getUrls = stories => {
  const urlArr = [];

  stories.data.slice(0, 800).forEach(hnID => {
    urlArr.push(`https://hacker-news.firebaseio.com/v0/item/${hnID}.json`);
  });

  return urlArr;
}

const getStory = (url, searchTerm) => {
  const response = axios.get(url).then(response => {
    let containsTerm = undefined;
    let searchTerms = ["java",
      "object-orientated",
      "js ",
      "python",
      "haskell",
      "swift",
      "ruby",
      "sql",
      "kotlin",
      "programming",
      "software"
    ];
    if (searchTerm) searchTerms = [searchTerm];

    for (let i = 0; i < searchTerms.length; i++) {
      containsTerm = response.data.title
        .toLowerCase()
        .includes(searchTerms[i]);
      if (containsTerm) break;
    }

    if (
      response.data.type === "story" &&
      response.data.url !== undefined &&
      containsTerm
    ) {
      const article = {
        title: response.data.title,
        url: response.data.url,
        date: response.data.time,
        text: response.data.text,
        id: response.data.id
      };
      // console.log("ARTICLEEEEEEE", article)
      return article;
    }
    else {
      return null;
    }
  }).catch(error => console.log('error'));
  //NEVER CONSOLE LOG THE ACTUAL ERROR HACKERNEWS FUCKING HATES IT

  return response;
}

const getHackerNewsNewArticles = searchTerm => {
  return axios
    .get(`https://hacker-news.firebaseio.com/v0/newstories.json`)
    .then(res => {
      const stroriesArray = getUrls(res);
      const requests = stroriesArray.map(url => getStory(url, searchTerm));

      return Promise.all(requests);

    });
};

//Using NewsAPI - largely works! Needs npm install newsapi --save (see https://newsapi.org/docs/client-libraries/node-js) - at the moment can't select the data from it
// newsapi.v2.everything({
//   q: ['javascript', 'ruby', 'kotlin', 'python', 'programming', 'ruby on rails', 'sql', 'PHP'],
//   from: '2019-03-01',
//   to: '2019-12-12',
//   language: 'en',
//   sortBy: 'relevancy',
//   page: 2
// }).then(response => {

//   let i = undefined;
//   response.articles.forEach(NAPIin => {
//     i = (NAPIin - 1)
//   });

//   const news = {
//     title: response.articles[i].title,
//     url: response.articles[i].url,
//   }
//   console.log(news);
// });

/* GET home page */

// router.get("/asd", (req, res, next) => {
//   res.json("I'm rendering!")
// });

router.get("/api/stories", (req, res, next) => {
  getHackerNewsNewArticles().then(articles => {
    console.log("test", articles);
    return res.json(articles.filter(a => a !== null));
  });
});


router.get("/api/stories/:searchTerm", (req, res, next) => {
  getHackerNewsNewArticles(req.params.searchTerm).then(articles => {
    console.log("test", articles);
    res.json(articles.filter(a => a !== null));
  });
});

// adding liked articles to user collections favourites folder
router.post("/add-article", (req, res, next) => {
  if (req.isAuthenticated()) {
    Collection.update(
      { _id: req.collection._id },
      { $addToSet: { items: req.body.article.id } }
    ).then(x => {
      console.log("xxxxxxxxxxxxx", x);
    });
    res.send("up and running");
  }
});

//returning collection ids
router.get("/user/articles", (req, res, next) => {
  if (req.isAuthenticated()) {

    Collection.findById(req.user._id).populate('collections').then(user => {
      console.log("populated collection", collection)
      return res.json(collection)
    }).catch(error => {
      return res.status(403).json({ message: 'Unauthorized' })
    })
    res.json([
      { name: "ruby", articles: [123, 234, 345] }
    ])
    // res.json(req.user.collections)
  }
});

module.exports = router;
