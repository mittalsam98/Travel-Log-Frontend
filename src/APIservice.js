const URL='http://localhost:3001/';

export async function fetchblogEntry(){
    const response=await fetch(`${URL}api/logs`);
    // console.log(response.json())
    return response.json();
}

export async function createLogEntry(entry){
    const response=await fetch(`${URL}api/logs`,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(entry),
    });
    // console.log(response.json())
    return response.json();
}
