{'use strict';
  function generateTitleLinks() {
  const ArticleSelector = ('.post'),
    TitleSelector = ('.post-title'),
    TitleListSelector = ('.titles');

  /* remove contents of titleList */
  const titleList = document.querySelector(TitleListSelector);
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(ArticleSelector);
  let html = '';
  for(let article of articles){
    /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(TitleSelector).innerHTML;
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
    /* insert link into titleList */
    titleList.innerHTML += linkHTML;
    /* insert link into html variable */
    html += linkHTML;
  }
  titleList.innerHTML = html;
  console.log(html);
}
generateTitleLinks();

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  })*/
  
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
  
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.active');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }   
    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
  
    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  const links = document.querySelectorAll('.titles a');
  console.log(links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
    function generateTags(){
    const ArticleTagsSelector = ('.post-tags .list');
    /* find all articles */
    const articles = document.querySelectorAll(ArticleTagsSelector);
    /* START LOOP: for every article: */
    for (let article of articles){
      /* find tags wrapper */
      const tagWraper = article.querySelectorAll(ArticleTagsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#' + tag + '">';
        console.log(linkHTML);
        /* add generated code to html variable */
        articleTag.innerHTML += linkHTML;
        /* insert link into html variable */
        html += linkHTML;
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      
    /* END LOOP: for every article: */
    
  }
}
  generateTags();
}