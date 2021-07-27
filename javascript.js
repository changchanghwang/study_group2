const stBtn = document.querySelector(".subject #stock_btn");
const namesize = document.querySelector(".subject #inputname")
const pricesize = document.querySelector(".subject #inputprice")
const numbersize = document.querySelector(".subject #inputnumber")

function InputStock(){
    ticker = $('#inputname').val();
    price = $('#inputprice').val();
    quantity = $('#inputnumber').val();

    $.ajax({
        type: "POST",
        url: "/Stock",
        data: {ticker_give:ticker, price_give : price, quantity_give : quantity},
        success: function (response){
            alert(response["msg"]);
            window.location.reload()
        }
    })
    if(namesize.value === ""){
        alert('종목을 입력하세요.');
    }
    if(pricesize.value ===""){
        alert('평단가를 입력하세요.')
    }
    if(numbersize.value ===""){
        alert('갯수를 입력하세요.')
    }
}

// function checkNum(){
//     let keyCode = event.keyCode
//     if(((keyCode >= 48) && (keyCode <= 57))&&((keyCode >= 96)&&(keyCode <= 105))){
//         return true;
//     }
//     else{
//         alert("숫자만 입력가능합니다");
//         return false;
//     }
// }

stBtn.addEventListener("click", InputStock);
// pricesize.addEventListener("keydown", checkNum)
// numbersize.addEventListener("keydown", checkNum)