let body=document.querySelector("body");
let btn1=document.querySelector(".btn1");
let btn2=document.querySelector(".btn2");
let btn3=document.querySelector(".btn3");
let home=document.querySelector(".h");
let form=document.querySelector("#login1");
let login=document.querySelector(".l");
let loginbtn=document.querySelector("#loginbtn");

body.style.backgroundImage="url('pic1.jpg')";
home.addEventListener("click",()=>{
    body.style.backgroundImage="url('pic1.jpg')";
});
btn1.addEventListener("click",()=>{
    body.style.backgroundImage="url('photo1.jpg')";
});
btn2.addEventListener("click",()=>{
    body.style.backgroundImage="url('photo2.jpg')";
});
btn3.addEventListener("click",()=>{
    body.style.backgroundImage="url('photo3.jpg')";
});
login.addEventListener("click",()=>{
    form.classList.remove("hide");
});
loginbtn.addEventListener("click",()=>{
  form.classList.add("hide");
});

//currency converter code
const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const ccbtn = document.querySelector(".ccbtn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const cc = document.querySelector(".hide1");
const cc1 = document.querySelector(".cc");

cc1.addEventListener("click",()=>{
    cc.classList.remove("hide1");
});

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

ccbtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});