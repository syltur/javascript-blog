{'use strict';
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
}
  const links = document.querySelectorAll('.titles a');
  console.log(links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }



function generateTitleLinks(){
  const ArticleSelector = document.querySelector('.post');
  const TitleSelector = document.querySelector('.post-title');
  const TitleListSelector = document.querySelector('.titles');

/* remove contents of titleList */
/*const titleList = document.querySelector(TitleListSelector);
document.querySelector(titleList).innerHTML = '';*/
/* for each article */
const articles = ArticleSelector;
let html = '';
  for(let article of articles){
    /* get the article id */
    const articleId = ArticleSelector.getAttribute('.Id');
    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(TitleSelector).innerHTML;
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);
    /* insert link into titleList */
    titleList.innerHTML.insertAdjacentHTML(beforebegin, titleList.innerHTML + linkHTML);
    /* insert link into html variable */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  console.log(html);
 }
generateTitleLinks();
}