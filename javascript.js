const ticker = document.querySelector("#name_btn");
const namesize = document.getElementById("inputname")
const price = document.getElementById("price_btn");
const number = document.getElementById("number_btn");

function ClickTicker(){
    if(namesize.value === ""){
        alert('종목을 입력하세요.');
    }else{
        alert('종목이 입력되었습니다.');
    }
}

function ClickPrice(){
    if(namesize.value === ""){
        alert('평단가를 입력하세요.');
    }else{
        alert('평단가가 입력되었습니다.');
    }
}

function ClickNumber(){
    if(namesize.value === ""){
        alert('갯수를 입력하세요.');
    }else{
        alert('갯수가 입력되었습니다.');
    }
}

ticker.addEventListener("click", ClickTicker);
price.addEventListener("click", ClickPrice);
number.addEventListener("click", ClickNumber);