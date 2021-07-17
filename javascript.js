const name = document.getElementById("name_btn");
const namesize = document.getElementById("inputname")
const price = document.getElementById("price_btn");
const number = document.getElementById("number_btn");

function ClickName(){
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

if (name){
    name.addEventListener("click", ClickName);
}

if (price){
    price.addEventListener("click", ClickPrice);
}

if (number){
    number.addEventListener("click", ClickNumber);
}
