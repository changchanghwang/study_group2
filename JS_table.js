const editBtn = document.querySelector(".modalSt #stock_btn")
const deleteBtn = document.querySelector(".modalSt #D_stock_btn")
const namesize = document.querySelector(".modalSt #inputname")
const pricesize = document.querySelector(".modalSt #inputprice")
const numbersize = document.querySelector(".modalSt #inputnumber")

function openclose(){
    let status = $('#stocktable').css('display');
    if (status=='table'){
        $('#stocktable').hide();
        $('#onoffbtn').text('내 종목 보기');
    }else{
        $('#stocktable').show();
        $('#onoffbtn').text('숨기기');
        $('#stocktable').css('display','table')
    }
}

$(document).ready(function(){
    rate();
    myStock();
});

function rate(){
    $.ajax({
        type: "GET",
        url: "http://spartacodingclub.shop/sparta_api/rate",
        data: {},
        success: function (response){
            let rates = response['rate'];
            let temp_html = ""
            temp_html =`<span class="rates">${rates+'원'}</span>`
            $('#rate').append(temp_html)
        }
    })
}

function myStock() {
    $.ajax({
        type: "GET",
        url: "/Stock",
        data: {},
        success: function (response) {
            if (response["result"] == "success") {
                let stocks = response['view_stock']
                for (let i = 0; i<stocks.length; i++){
                    let ticker = stocks[i]['ticker']
                    let price = stocks[i]['price']
                    let quantity = stocks[i]['quantity']
                    let total = (price * quantity).toFixed(2)
                    let temp_html = `
                                    <tbody>
                                        <th>${ticker}</th>
                                        <th>${price}</th>
                                        <th>${quantity}</th>
                                        <th>${total}</th>
                                    </tbody>`
                    $('#stocktable').append(temp_html);
                }
            }
        }
    })
}

function editStock(){
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
    } else{
        $.ajax({
            type: 'POST',
            url: '/Stock/Edit',
            data: {ticker_give:ticker, price_give:price, quantity_give:quantity},
            success: function (response) {
                alert(response['msg']);
                window.location.reload()
            }
        });
    }
}
function deleteStock(){
    let ticker = $('#delete_stock').val();
    if(namesize.value === "삭제할 종목을 골라주세요"){
        alert('종목을 입력하세요.');
    }else{
        $.ajax({
            type: 'POST',
            url: '/Stock/Delete',
            data: {ticker_give:ticker},
            success: function (response) {
                alert(response['msg']);
                window.location.reload()
            }
        });
    }
}
function stock_list(){
    $.ajax({
        type: "GET",
        url: "/lists",
        data: {},
        success: function (response) {
            let stocks = response['stock_list']
            for (let i = 0; i<stocks.length; i++){
                let ticker = stocks[i]['ticker']
                let temp_html = `<option value="${ticker}">${ticker}</option>`
                $('#inputname').append(temp_html);
            }     
        }
    })
}
function Delete_list(){
    $.ajax({
        type: "GET",
        url: "/D_lists",
        data: {},
        success: function (response) {
            let stocks = response['Delete_list']
            for (let i = 0; i<stocks.length; i++){
                let ticker = stocks[i]['ticker']
                let temp_html = `<option value="${ticker}">${ticker}</option>`
                $('#delete_stock').append(temp_html);
            }     
        }
    })
}


function Ed_onClick() {
    document.querySelector('#Ed_modal_wrap').style.display ='block';
    document.querySelector('#Ed_black_bg').style.display ='block';
    return stock_list();
}   
function Ed_offClick() {
    document.querySelector('#Ed_modal_wrap').style.display ='none';
    document.querySelector('#Ed_black_bg').style.display ='none';
    window.location.reload();
}

function D_onClick() {
    document.querySelector('#D_modal_wrap').style.display ='block';
    document.querySelector('#D_black_bg').style.display ='block';
    return Delete_list();
}   
function D_offClick() {
    document.querySelector('#D_modal_wrap').style.display ='none';
    document.querySelector('#D_black_bg').style.display ='none';
    window.location.reload();
}

document.querySelector('#Ed_modal_btn').addEventListener('click', Ed_onClick);
document.querySelector('#Ed_modal_close').addEventListener('click', Ed_offClick);
document.querySelector('#D_modal_btn').addEventListener('click', D_onClick);
document.querySelector('#D_modal_close').addEventListener('click', D_offClick);
editBtn.addEventListener("click", editStock);
deleteBtn.addEventListener("click", deleteStock);