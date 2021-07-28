const stBtn = document.querySelector(".subject #stock_btn");
const namesize = document.querySelector(".subject #inputname")
const pricesize = document.querySelector(".subject #inputprice")
const numbersize = document.querySelector(".subject #inputnumber")

function InputStock(){
    let ticker = $('#inputname').val();
    let price = $('#inputprice').val();
    let quantity = $('#inputnumber').val();

    
    if(namesize.value === ""){
        alert('종목을 입력하세요.');
    }
    if(pricesize.value ===""){
        alert('평단가를 입력하세요.')
    }
    if(numbersize.value ===""){
        alert('갯수를 입력하세요.')
    } else {
        $.ajax({
            type: "POST",
            url: "/Stock",
            data: {ticker_give:ticker, price_give : price, quantity_give : quantity},
            success: function (response){
                if (response["result"] == "success") {
                    alert(response["msg"]);
                    window.location.reload()
                }
            }
        })
    }
}

stBtn.addEventListener("click", InputStock);