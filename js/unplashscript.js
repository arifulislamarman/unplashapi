
 function getUnsplashImages(search='', page_number=1, per_page=30, order_by='popular'){
    const YOUR_ACCESS_KEY = 'lex0W12FpnsvTJyrL23c_-RboxwGPUUiUSfOC8v9rYg';
    search == ''? 
    apiUrl =`https://api.unsplash.com/photos/?per_page=${per_page}&order_by=${order_by}&page=${page_number}` :
    apiUrl =`https://api.unsplash.com/search/photos?query=${search}&per_page=${per_page}&order_by=${order_by}&page=${page_number}`;
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            Authorization: `Client-ID ${YOUR_ACCESS_KEY}`
        }
    })
    .then(res=>res.json())
    .then(data => {
        //console.log(data.total_pages);
        //search == ''? displayImages(data) : displayImages(data.results);
        displayImages(data.results);
        pagination(data.total_pages,search); 
       
    });
}

function displayImages(images){
    
    let contentHtml = ''
    images.forEach((image, index) => {
        contentHtml+= `
                        <div class="grid-item">
                        <div class="image-wrap grid-bottom-padding">
                        <a class="image-link" href="${image.urls.regular}" data-lightbox="homePortfolio">
                        <div id="imgId-${image.id}" class="image-box">
                        <img src="${image.urls.regular}"  data-zoom="${image.urls.full}" alt="${image.alt_description}" />
                        </div>
                        </a>
                        <div class="image-info">
                        <div class="image-user">${image.user.username} </div> 
                        <div class="image-download"><a href="${image.links.download}?force=true" rel="nofollow" download="" target="_blank"><svg width="32" height="32" class="Apljk" version="1.1" viewBox="0 0 32 32" aria-hidden="false"><path d="M25.8 15.5l-7.8 7.2v-20.7h-4v20.7l-7.8-7.2-2.7 3 12.5 11.4 12.5-11.4z"></path></svg></a></div>
                        </div>
                        </div>
                        </div>`;  
                                
    });

    
    let pageContent = document.querySelector('#load-images');
    pageContent.innerHTML = contentHtml;
      
}

// pagination function 

function pagination (totalPage,searchValue){
console.log(totalPage);
     
    if(totalPage){
        let lmore = document.querySelector('.load-more');
        lmore.innerHTML='';
    }
    let paginationWrapper = document.querySelector('.pagination');
    let paginationHtml = `<ul>`;
    for(i = 1; i <= totalPage; i++){
        paginationHtml +=`<li><a href="?query=${searchValue}&page=${i}" data-page="${i}">${i}</a></li>`;
        //console.log(i);
        if (i== 15) break;
    }
    paginationHtml += `</ul>`;
    paginationWrapper.innerHTML = paginationHtml;


}

// First Show 10 Photo In Home page load 
let perPageValue = 30 ;
let pageIndex = 1 ;
function onLoadImage(perPageValue, pageIndex){

fetch(`https://api.unsplash.com/photos/?client_id=lex0W12FpnsvTJyrL23c_-RboxwGPUUiUSfOC8v9rYg&per_page=${perPageValue}&page=${pageIndex}&order_by=popular`)
.then(res => res.json())
.then(data => processImage(data));
}

window.onload = onLoadImage(perPageValue,pageIndex);

let images =[]
function processImage(data){
    images = [...data];
    let totalPage = Math.ceil(images.length/10);
    displayImages(images);
    console.log(images);
    
}

// Get Value from search field

function searchValue(e){
    e.preventDefault();
    let searchValue = document.getElementById('search-value').value;
    getUnsplashImages(searchValue);
}




//disable all click

document.addEventListener('click', event => {
    if(event.target.tagName == 'A'){
        event.preventDefault();
        //console.log(event.target.getAttribute('href'));
        let currentLink = event.target.getAttribute('href');
        history.pushState({page: 1}, "title 1", currentLink);
        //pageContent.innerHTML = `<h1>page-${currentLink}</h1>`;
        
        if(currentLink.indexOf('&page=') != -1){
            let pageNumber = currentLink.split('&page=').pop();
            let searchString = currentLink.split(/[!,?,=,&]/)[2];
            console.log(searchString);
            getUnsplashImages(searchString,pageNumber);
        }
        if(currentLink.indexOf('/t/') != -1){
            let xyz = currentLink.split('/t/')[1];
            console.log(xyz);
            getUnsplashImages(xyz);
        }
        if(location.href.substring(location.href.lastIndexOf('/')+1) == 't' ){
            window.location.href = "/";
        }                   
    }
});


function loadMore(){
    pageIndex+=1;
    console.log(perPageValue);
    onLoadImage(perPageValue,pageIndex);
}

function previousPage(){
    if(pageIndex>1){
    pageIndex+=-1;
    }
    console.log(perPageValue);
    onLoadImage(perPageValue,pageIndex);
}

// url check 
$(document).ready(function(){
    
    $('body').bind('beforeunload',function(){
        alert('hello');
        });
});


/*

function resizeGridItem(item){
    grid = document.getElementsByClassName("grid")[0];
    rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    rowSpan = Math.ceil((item.querySelector('.image-wrap').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
      item.style.gridRowEnd = "span "+rowSpan;
  }
  
  function resizeAllGridItems(){
    allItems = document.getElementsByClassName("item");
    for(x=0;x<allItems.length;x++){
      resizeGridItem(allItems[x]);
    }
  }
  
  function resizeInstance(instance){
  item = instance.elements[0];
    resizeGridItem(item);
  }

  window.addEventListener('load', resizeAllGridItems);
  //window.onload = resizeAllGridItems();
  window.addEventListener("resize", resizeAllGridItems);

  
  
  allItems = document.getElementsByClassName("item");
  for(x=0;x<allItems.length;x++){
    imagesLoaded( allItems[x], resizeInstance);
  }
  */

