const quoteContainer = document.getElementById('quote-container');
const textQuote = document.getElementById('quote');
const authorText = document.getElementById('quote-author');
const twitterBtn = document.getElementById('twitter');
const nextQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader')

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true
}

function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

async function getQuote(){
    loading()
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if(data.quoteAuthor === ''){
            authorText.innerText = "Unknown";
        }else{
           authorText.innerText = "- " + data.quoteAuthor;
        }


        if(data.quoteText.length >= 50){
            textQuote.classList.add('long-quote');
        }else{
            textQuote.classList.remove('long-quote');
        }

        textQuote.innerText = data.quoteText;
        complete()
    }catch(error){
        getQuote();
        console.log('whoops, no quote', error);
    }
}


function tweetQuote(){
    const quote = textQuote.innerText;
    const author = authorText.innerText;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank')
}


//onclick

nextQuoteButton.addEventListener('click',getQuote)
twitterBtn.addEventListener('click',tweetQuote)

//onload
getQuote();