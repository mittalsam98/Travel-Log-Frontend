const URL=window.location.hostname==='localhost'  ? 'http://localhost:1337/':'https://travel-log-six.vercel.app/' ;

export async function fetchblogEntry(){
    const response=await fetch(`${URL}api/logs`);
    // console.log(response.json())
    return response.json();
}

export async function createLogEntry(entry){
    const API_KEY=entry.password;
    delete entry.password;
    const response=await fetch(`${URL}api/logs`,{
        method:'POST',
        headers:{
            'content-type':'application/json',
            'X-API-KEY':API_KEY
        },
        body:JSON.stringify(entry),
    });
      
    const json=await response.json();
    if(response.ok){
        return json;
    }

    const error=new Error(json.message);
    console.log(error)
    error.response=json;
    throw error ;
}
