/* eslint-disable no-inner-declarations */
{
  'use strict';
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
  }
  generateTitleLinks();
  
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
  
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
    const articles = document.querySelectorAll('.post');
    console.log(articles);
    /* START LOOP: for every article: */
    for (let article of articles){
      /* find tags wrapper */
      const tagWraper = article.querySelectorAll(ArticleTagsSelector);
      /* make html variable with empty string */
      var html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#' + tag + '"></a></li>';
        console.log(linkHTML);
        /* add generated code to html variable */
        tag.innerHTML += linkHTML;
        /* insert link into html variable */
        html += linkHTML;
      /* END LOOP: for each tag */
      }
      
      /* insert HTML of all the links into the tags wrapper */
      tagWraper.innerHTML = html;
      /* END LOOP: for every article: */
    
    }
  }
  generateTags();
  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = document.querySelector(href);
    /* find all tag links with class active */
    const tagLinks = document.querySelector('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for(let tagLink of tagLinks){
      /* remove class active */
      tagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const allTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each found tag link */
    for(let oneTagLink of allTagLinks){
      /* add class active */
      oneTagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    
    const ArticleSelector = ('.post');
    generateTitleLinks(ArticleSelector);
  }
  tagClickHandler();
  
  function addClickListenersToTags(){
    /* find all links to tags */
    const links = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for(let link of links){
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', titleClickHandler);
    /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();
}