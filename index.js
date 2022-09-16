function translateResponseLocation(headers) {
  const newHeaders = new Headers(headers);
 //Delete Cloudflare default access control allow origin header
  if (headers.has("Access-Control-Allow-Origin")) {
       newHeaders.delete("Access-Control-Allow-Origin")       
  }
  newHeaders.delete("access-control-expose-header") 
  newHeaders.delete("set-cookie")
 //Now add our domain access control allow origin header
  newHeaders.set("Access-Control-Allow-Origin","*")       
  return newHeaders;
}

async function handleRequest(request) {
  const parsedUrl = new URL(request.url)
  let path = parsedUrl.pathname.replace("/stream","")
  let search = parsedUrl.search
  var last = path + search

  let response = await fetch("http://google.com/" + last)

  return new Response(
        response.body,
        {
            status: response.status,
            statusText: response.statusText,
            headers: translateResponseLocation(response.headers)
        }
    )
  
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
