const api_url = "https://www.rail.co.il/apiinfo/api/Plan/GetRoutes?OId=9700&TId=4680&Date=20220201&Hour=0630";


function init(){
    
    get_data();
    
 
}



async function get_data(){
 fetch(api_url)
 .then(response =>response.json())
 .then(data =>{
    creatTrainNumberOnTheSelect(data);
   
 })
}

function creatTrainNumberOnTheSelect(data){
let selectTrainNum= document.getElementById("train_number");
let trainArryObj = data.Data.Omasim;

trainArryObj.forEach((item , index )=>{
    let opt = document.createElement('option');
    opt.value = index;
    opt.innerHTML =` קו מספר ${ item.TrainNumber}`;
   
    selectTrainNum.appendChild(opt);
    
});
selectTrainNum.onchange = (e)=>{
    
   
    creatTrainStationsOption(trainArryObj,e.target.value )
    let showTimeDiv = document.getElementById("train_time_info");
    showTimeDiv.innerHTML='';
    showTimeDiv.className='';
}
}

function creatTrainStationsOption(data, index){
    let selectTrainStation= document.getElementById("train_station");
    selectTrainStation.innerHTML =` <option  hidden>בחר מס' תחנה </option>`;
    let stationArry = data[index].Stations;

    stationArry.forEach((item, index )=>{
        let opt = document.createElement('option');
        opt.value = index;
        opt.innerHTML =` תחנה מספר ${ item.StationNumber}`;
    
        selectTrainStation.appendChild(opt);
    });
    selectTrainStation.onchange = (e)=>{
        
        showTrainTime(stationArry,e.target.value);
    }    

}  

function showTrainTime(data,index){
    let showTimeDiv = document.getElementById("train_time_info");
showTimeDiv.className ="train_info";
 let time = data[index].Time;
 let omes = data[index].OmesPercent;
 showTimeDiv.innerHTML =  `הרכבת תגיע לתחנה בשעה ${time} העומס  הוא ${omes}%`  ;
}