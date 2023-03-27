const APIURL= "https://api.github.com/users/";

const getUser = async (username) =>{
    const response = await fetch(APIURL + username);
    const data=await response.json();
    // console.log(response);
    // console.log(data);
    // const img = document.querySelector("#img");
    // img.src=data.avatar_url;
    let card;
    if(response.status==404){
         card = "<h2 style='padding:20px;'>Enter correct username.</h2>"
    }else{
     card =`
    <div class="card">
        <div id="imgdiv">
            <img class="avatar" src="${data.avatar_url}" alt="Florin Pop" class="avatar">
        </div>
        <div class="user-info">
            <h2>${data.name?data.name:""}</h2>
            <p>${data.bio?data.bio:""}</p>

            <ul class="info">
                <li>${data.followers} <strong>Followers</strong></li>
                <li>${data.following} <strong>Following</strong></li>
                <li>${data.public_repos}&nbsp; <strong>Repos</strong></li>
            </ul>
            
            <div id="repos">
            
            </div>
        </div>
    </div>
    `;}
    document.querySelector("#main").innerHTML=card;
    getRepos(username);
}
// init call
// getUser("vaibhavvsingh");

const getRepos = async (username) => {
    const response =await fetch(APIURL + username + "/repos")
    const data = await response.json();
    // console.log("first")
    // console.log(data);
    const repos = document.querySelector("#repos");
    data && data.map(x=>{
        const element = document.createElement("a");
        element.classList.add("repo");
        element.innerHTML=`<div>${x.name}</div>`;
        element.href=x.html_url;
        element.target= "_blank"
        repos.appendChild(element);
    });
}

const form = document.querySelector("form");
const search = document.querySelector("#search");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    getUser(search.value);
})
/* <a href="#" class="repo" target="_blank">Repo 1</a>
<a href="#" class="repo" target="_blank">Repo 2</a>
<a href="#" class="repo" target="_blank">Repo 3</a> */