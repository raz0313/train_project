const api_url = "https://www.rail.co.il/apiinfo/api/Plan/GetRoutes?OId=9700&TId=4680&Date=20220203&Hour=0630";


function init(){
    
    get_data();
    
 
}



async function get_data(){
 fetch(api_url)
 .then(response =>response.json())
 .then(data =>{
    getDetails(data);
    routesRender(data);
    

   
 })
}

function routesRender(data){
    let routesArry =  data.Data.Routes;
    routesArry.forEach((element,index) => {
     creatRoutes(element, index);
 });
}

function creatRoutes(data,index){
    let routsDiv= document.getElementById("Routes");
    let creatSubTitle = document.createElement("div");
    let creatDivRoute = document.createElement("div");
    creatSubTitle.innerHTML=`מסלול מספר ${index+1}`;
    
    
    creatSubTitle.className = 'subTitleRoutes';
    routsDiv.appendChild(creatSubTitle);
    
let routeArry  = data.Train;

routeArry.forEach(element => {
    creatDivRoute.innerHTML +=`רכבת מספר ${element.Trainno} תצא מתחנה מספר ${element.OrignStation} בשעה ${element.DepartureTime} ויגיע לתחנה מספר ${element.DestinationStation} בשעה ${element.ArrivalTime}  </br>`;
    creatDivRoute.className="divRoute";
    
});
routsDiv.appendChild(creatDivRoute);
}

function getDetails(data){
    let divDetails = document.getElementById("show_date");
   let date = data.Data.Details.Date;
   let origin = data.Data.Details.Origin;
   let dstination = data.Data.Details.Destination;
   divDetails.innerHTML=`מסלולי הגעה בתאריך ${date} מתחנה ${origin} לתחנה ${dstination}`;
   divDetails.className="divDetails";
}
let num = 0;
