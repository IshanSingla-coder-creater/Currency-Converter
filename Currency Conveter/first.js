const BaseURL = "https://api.frankfurter.dev/v2/rates?quotes=";
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".get_rate");
const exchangeBtn = document.querySelector(".exchange_country");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".To select");
const msg1 = document.querySelector(".msg1");
const msg2 = document.querySelector(".msg2");

for (let select of dropdown) {
  for (currcode in countryList) {
    let newOPtion = document.createElement("option");
    newOPtion.innerText = currcode;
    newOPtion.value = currcode;
    if (select.name === "from" && currcode === "USD") {
      newOPtion.selected = "selected";
    } else if (select.name === "To" && currcode === "INR") {
      newOPtion.selected = "selected";
    }
    select.append(newOPtion);
  }
  select.addEventListener("change", (evt) => {
    updatedFlag(evt.target);
  });
}

const updatedFlag = (element) => {
  let currcode = element.value;
  let countryCode = countryList[currcode];
  console.log(countryCode);
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
  // console.log(currcode);
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amountValue = amount.value;
  if (amountValue === "" || amountValue < 1) {
    amountValue = 1;
    amount.value = "1";
  }
  // console.log(fromCurr.value);
  // console.log(toCurr.value);
  const URL = `${BaseURL}${fromCurr.value},${toCurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let EURtoTO = data[0].rate;
  let EURtoFROM = data[1].rate;
  let finalConversion1 = EURtoTO / EURtoFROM;
  let finalConversion2 = amountValue * finalConversion1;
  // msg1.innerText =`1 ${fromCurr.value} = ${finalConversion1} ${toCurr.value}`;
  msg2.innerText = `${amountValue} ${fromCurr.value} = ${finalConversion2} ${toCurr.value}`;
});

exchangeBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  let temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  //   console.log(fromCurr.value);
  toCurr.value = temp;
  let fromImg = document.querySelector(".fromImg");
  let toImg = document.querySelector(".toImg");
  let temp2 = fromImg.src;
  fromImg.src = toImg.src;
  toImg.src = temp2;
  //   updatedFlag(evt);
});
