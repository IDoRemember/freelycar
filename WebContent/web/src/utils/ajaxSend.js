
export default function( action, url, data, callback)  {

    var xhr = new XMLHttpRequest()
    xhr.open(action, url, true)
    xhr.withCredentials = true
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function(){
        if ((xhr.readyState == XMLHttpRequest.DONE) && (xhr.status == 200)) {
            if(!!callback){
                const tempdata = JSON.parse(xhr.responseText)
                if (!tempdata.errno && tempdata.message === "nologin") {
                    window.location.href = "/account/login"
                } else {
                    callback(tempdata)
                }
            }
        }
    }
    xhr.send(JSON.stringify(data))
}
