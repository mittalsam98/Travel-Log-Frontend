const URL='http://localhost:3001/';

export async function fetchblogEntry(){
    const response=await fetch(`${URL}api/logs`);
    // console.log(response.json())
    return response.json();
}

