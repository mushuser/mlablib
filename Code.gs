var API_BASE = "https://api.mlab.com/api/1"


var mlab = {
  api_key:undefined,
  database:undefined
}


function init_project(m) {
  mlab.api_key = m.api_key
  mlab.database = m.database
}


var mlab_api = {
  list_databases_f:function(){return API_BASE + "/databases?apiKey=" + mlab.api_key},
  list_collections_f:function(){return API_BASE + "/databases/" + mlab.database + "/collections?apiKey=" + mlab.api_key},
  list_documents_f:function(collection){return API_BASE + "/databases/" + mlab.database + "/collections/" + collection + "?apiKey=" + mlab.api_key},
  insert_documents_f:function(collection){return API_BASE + "/databases/" + mlab.database + "/collections/" + collection + "?apiKey=" + mlab.api_key},
}


function check_init() {
  if( (mlab.api_key == undefined) || (mlab.database == undefined) ) {
    console.log("check_init() failed, call init_project()") 
  }
}


function list_documents(collection) {
  var api_path = mlab_api.list_documents_f(collection)
  var response = redditlib.httpretry(api_path) 
  var text = response.getContentText()  
  var json = JSON.parse(text)  
  
  console.log("list_documents():%s",json)
  
  return json
}

function insert_documents(collection, documents) {
  var api_path = mlab_api.insert_documents_f(collection)
  var options = {
    "payload":JSON.stringify(documents),
    "type":"post",
    "contentType":"application/json"
  } 
  var response = redditlib.httpretry(api_path, options) 
  var text = response.getContentText()  
  var json = JSON.parse(text)  
  
  if( json.n ) {  
    console.log("%d docs inserted", json.n)
    return json.n
  } else {
    console.log("doc inserted:%s", json)
    return json
  }
}