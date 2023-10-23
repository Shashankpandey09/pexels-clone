
const apikey="3oRJIQUe1FPHI4a1EPB2OA1asdy3QJNcyaNwnTYbTVtqW8ypKVz8oflz";
var page = 1;
const imagewrapper = document.querySelector(".images");
const light=document.querySelector(".lightbox");

// Function to fetch Pexels data and display images
const downloadimg= async (imageurl)=>{
   await fetch(imageurl).then(res=>res.blob()).then(file=>{
   const a=document.createElement("a");
   a.href=URL.createObjectURL(file);
   a.download=new Date().getTime();
   a.click();
   }).catch(()=>alert("failed to download"));
   
}

async function fetchPexelsData(query) {
    const perpage = 20;
    const endpoint = `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${perpage}`;
    
    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                Authorization: `3oRJIQUe1FPHI4a1EPB2OA1asdy3QJNcyaNwnTYbTVtqW8ypKVz8oflz`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            // Process the data here
            console.log(data);
            document.querySelector(".load").innerHTML="load more";
            document.querySelector(".load").classList.remove('disable');
            const arr = data.photos;
          
            page++;
          
            arr.forEach((photo) => {
              imagewrapper.innerHTML+=  
              `<li onclick="lightbox('${photo.src.large2x}', '${photo.photographer}')" class="card"><img src="${photo.src.large2x}" alt="img">
                <div class="details">
                <div class="photo">
                <i class="ri-polaroid-line"></i>
                <span>${photo.photographer}</span>
                </div>
                <button onclick=downloadimg("${photo.src.large2x}") class="download">           
                <i  class="ri-download-2-line" ></i>
                </button>
                </div></li>`
              
            });
           
            setTimeout(() => {
                document.querySelector(".load").style.display="block";    
            }, 3000);
           
           
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error(error);
    }
}
function lightbox(image1,name1){
  light.classList.add("show");

  document.querySelector(".preview-image .img img").src=image1;
  document.querySelector(".photo span").textContent=name1;

  document.querySelector(".class .ri-download-2-line").addEventListener('click',()=>{
  downloadimg(image1);
  })
}

document.querySelector(".load").addEventListener("click",()=>{
    page++;
    document.querySelector(".load").innerHTML="loading..."
    document.querySelector(".load").classList.add("disable");
    const searchQuery = document.querySelector(".input").value;
    fetchPexelsData(searchQuery);
  })
// Search button click event listener
document.querySelector(".input").addEventListener("keyup", (e) => {
    if(e.key==="Enter"){
  
    const searchQuery = e.target.value;
    imagewrapper.innerHTML = ''; // Clear previous images
    document.querySelector(".load").style.display="none"
    fetchPexelsData(searchQuery);}
});
document.querySelector(".ri-search-line").addEventListener("click", () => {
   
    document.querySelector(".load").style.display="none"
    const searchQuery = document.querySelector(".input").value;
    imagewrapper.innerHTML = ''; // Clear previous images
  
    fetchPexelsData(searchQuery);
});
document.querySelector(".ri-close-line").addEventListener("click",()=>{
    light.classList.remove("show");
})




