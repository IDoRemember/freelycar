
export default function( action, url, data, callback)  {

    var xhr = new XMLHttpRequest()
    xhr.open(action, url, true)
    //xhr.withCredentials = true
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function(){

        console.log(xhr.readyState == XMLHttpRequest.DONE);
        if ((xhr.readyState == XMLHttpRequest.DONE) && (xhr.status == 200)) {
            if(!!callback){
                console.log(xhr.responseText);
                const tempdata = JSON.parse(xhr.responseText)
                
            }
        }
    }
    console.log(JSON.stringify(data));

    xhr.send(JSON.stringify({'aa':'uuuu'}));
}
