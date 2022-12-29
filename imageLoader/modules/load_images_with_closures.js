function loadImage(url, callback){
    let image = new Image();
    image.onload = function(){
        callback(null, image)
    }

    image.onerror = function(){
        const msg = `could not load url`;
        callback(new Error(msg))
    }

    image.src = url;
}

export default loadImage;