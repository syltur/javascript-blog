/* eslint-disable no-undef */
/* eslint-disable no-inner-declarations */
{
  'use strict';
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
  };
  const ArticleSelector = ('.post'),
    TitleSelector = ('.post-title'),
    TitleListSelector = ('.titles'),
    TagsListSelector = ('.list-tags'),
    AuthorsListSelector = ('.list-authors'),
    CloudClassCount = 5,
    CloudClassPrefix = ('tag-size-');

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
  
    const activeArticles = document.querySelectorAll('.active');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }   
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    clickedElement.classList.add('active');
    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);
    targetArticle.classList.add('active');
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    generateTitleLinks('[data-tags~=#"' + tag + '"]');

    
  };
  
 
  function generateTitleLinks(customSelector = '') {
    const titleList = document.querySelector(TitleListSelector);
    const articles = document.querySelectorAll(ArticleSelector + customSelector);
    let html = '';
    for(let article of articles){
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(TitleSelector).innerHTML;
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      titleList.innerHTML += linkHTML;
      html += linkHTML;
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();
  
  function calculateTagClass(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (CloudClassCount - 1) + 1 );
    return classNumber;
  }

  function generateTags(){
    let allTags = {};
    const ArticleTagsSelector = ('.post-tags ul');
    const articles = document.querySelectorAll('.post');
    for (let article of articles){
      const tagWraper = article.querySelector(ArticleTagsSelector);
      let html = '';
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');
      
      for(let tag of articleTagsArray){
        const linkHTMLData = {tag: tag};
        const linkHTML = templates.tagLink(linkHTMLData);

        html += linkHTML;
        if(!allTags[tag]) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
    
      tagWraper.innerHTML = html;
      const tagsParams = calculateTagsParams(allTags);
      function calculateTagsParams(tags){
        const params = {'max': 0, 'min': 999999};
        for(let tag in tags){
          params.max = Math.max(tags[tag], params.max);
          params.min = Math.min(tags[tag], params.min);
        }
        return params;
      }
    
      calculateTagsParams();
      
      const allTagsData = {tags: []};
      for(let tag in allTags){
        allTagsData.tags.push({
          tag: tag,
          count: allTags[tag],
          className: calculateTagClass(allTags[tag], tagsParams),
          classPrefix: CloudClassPrefix,
        });
      } 
      
      const tagList = document.querySelector(TagsListSelector);
      tagList.innerHTML = templates.tagCloudLink(allTagsData);

    }
  }
  generateTags();


  const tagClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    for(let tagLink of tagLinks){
      tagLink.classList.remove('active');
    }
    const allTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    
    for(let oneTagLink of allTagLinks){
      oneTagLink.classList.add('active');
    }
    generateTitleLinks('[data-tags~="'+ tag + '"]');
  };
  

  function addClickListenersToTags(){
    const links = document.querySelectorAll('a[href^="#tag-"]');
    for(let link of links){
      link.addEventListener('click', tagClickHandler);
    }
  }
  addClickListenersToTags();

  
  function generateAuthors(){
    let allAuthors = {};
    const articles = document.querySelectorAll('.post');
    for (let article of articles){
      const author = article.getAttribute('data-author');
      const authorWrapper = article.querySelector('.post-authors');
      
      if(authorWrapper){
        const linkHTMLData = {author: author};
        const linkHTML = templates.authorLink(linkHTMLData);
        
        authorWrapper.innerHTML = linkHTML;
        if(!allAuthors[author]) {
          allAuthors[author] = 1;
        } else {
          allAuthors[author]++;
        }
      }

      function calculateAuthorParams(authors){
        const params = {'max': 0, 'min': 999999};
        for(let author in authors){
          params.max = Math.max(authors[author], params.max);
          params.min = Math.min(authors[author], params.min);
        }
        return params;
      }
    
      calculateAuthorParams();

      const allAuthorsData = {authors: []};
      for(let author in allAuthors){
        allAuthorsData.authors.push({
          author: author,
          allAuthors: allAuthors[author],
          count: allAuthors[author],
        });
      } 
      const authorList = document.querySelector(AuthorsListSelector);
      authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
    }
  }
  generateAuthors();
  

  const authorClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    for(let authorLink of authorLinks){
      authorLink.classList.remove('active');
    }
    const allAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

    for(let oneAuthorLink of allAuthorLinks){
      oneAuthorLink.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
  };

  function addClickListenersToAuthors (){
    const links = document.querySelectorAll('a[href^="#author-"]');
    for(let link of links){
      link.addEventListener('click', authorClickHandler);
    }
  }
  addClickListenersToAuthors(); 
}