// const myConverterUrl ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/eur.json";

const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

import { countryList } from "./codes.js";

let inputField =document.getElementsByTagName("input");
let btn = document.querySelector("button");
let result = document.querySelector("#result");
let fromSelect = document.querySelector("#fromSelect");
let toSelect = document.querySelector("#toSelect");
let fromImage = document.querySelector(".select1-box img");
let toImage = document.querySelector(".select2-box img");







for(let currCode in countryList){
    
    let newOption1 = document.createElement("option");
    newOption1.innerText=`${currCode}`;
    newOption1.value=currCode;
    fromSelect.append(newOption1);


    let newOption2 = document.createElement("option");
    newOption2.innerText = currCode;
    newOption2.value= currCode;
    toSelect.append(newOption2);

    if(currCode === "PKR"){
        newOption1.selected= "selected";
    }

    if(currCode === "USD"){
        newOption2.selected= "selected";
    }


    fromSelect.addEventListener("change", (evt)=>{
        updateFlagFrom(evt.target);
    })

    toSelect.addEventListener("change", (evt)=>{
        updateFlagTo(evt.target);
    })
}


const updateFlagFrom = (element)=>{
    let currCode = element.value;
    let countryCode =countryList[currCode];
    let newImageURL =`https://flagsapi.com/${countryCode}/flat/64.png`
    fromImage.src= newImageURL;
}

const updateFlagTo = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newImageURL = `https://flagsapi.com/${countryCode}/flat/64.png`;
    toImage.src= newImageURL;
}


const exchangeValue = async ()=> {
    let amount = document.querySelector("#ipt").value;
    let fromValue = fromSelect.value.toLowerCase();
    let toValue = toSelect.value.toLowerCase();
    

    let newURL = `${BASE_URL}/${fromValue}.json`;
    let response = await fetch(newURL);
    let data = await response.json();
    let rate = data[fromValue][toValue];


    let finalAmount = amount*rate;
    
    result.innerText = `${amount} ${fromValue.toUpperCase()} = ${finalAmount.toFixed(2)} ${toValue.toUpperCase()}`;


}



btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    exchangeValue();
});


window.addEventListener("load", () => {
    exchangeValue();
  });

