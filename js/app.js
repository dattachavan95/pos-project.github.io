

$(document).ready(function(){

    renderCard();
    var categoryUrl="https://dummyjson.com/products/category-list";
    var productUrl="https://dummyjson.com/products/category/";
    var singalproductUrl="https://dummyjson.com/products/";
// // get category list

$.ajax({
    url: categoryUrl,   //categoty url
    method: "GET",
    data:{},
    success:function(response){
        let html = "";
        var i =0;
        response.forEach(cat => {
            if(i < 7){
            
                let formattedCat = cat.replace(/-/g, ' ')
                                    .toLowerCase()
                                    .split(' ')
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(' ');
                                    html += '<div class="card p1 column catelist" style="width: 9rem; height: 13rem;" id='+cat+'>';
                                    html += '<img src="./images/'+cat+'.png" alt="" class="CardImage">';
                                    html += '<a href="#" class="text-decoration-none ">';
                                    html += '<h5 class="fw-bold text-dark">'+ formattedCat+'</h5>';
                                    html += '</a>';
                                    html += '</div>';
            }
            i++        
        });  
        $("#category").html(html);
    }
});

$(document).on("click", ".catelist", function () {
    var val = $(this).attr("id");
    $.ajax({
        url: productUrl+val,
        method: "GET",
        data: {},
        success:function(response){
            // console.log(response);
            // alert(val)

            let html = "";

            response.products.forEach(product => {
                html += '   <div class="col-lg-3 " >';
                html += '       <div class="card product" style="width: 12rem;" data-product-id='+product.id+'>';
                html += '            <img src="'+product.thumbnail+'" class="card-img-top" alt="...">';
                html += '           <div class="card-body">';
                html += '         <h3 class="card-title">'+product.title+'</h3>';
                html += '        <p class="card-text ">'+product.warrantyInformation+'</p>';
                html += '       <a href="#" class="Amount">'+product.price+'</a>';
                html += '       </div>';
                html += '    </div>';
                html += '  </div>';
            })
            $("#products").html(html);
            
        }
    })
  });



  $(document).on("click", ".product", function (e){
    var productid =$(this).data('product-id');
   
    $.ajax({
        url: singalproductUrl+productid,
       
        method: "GET",
        data: {},
        success:function(product){

            updateCard(product)
        },
        error: function(){
            console.log("somthing wrong")
        }
    })
  })
})
function updateCard(product){
    const cart = loadCard();
    const productIndex = cart.findIndex(item => item.id === product.id);
    if(productIndex !== -1){
        cart[productIndex].qty++;

    }else{
        cart.push({...product,qty:1});
    }
    saveCard(cart);
    renderCard();
}
function saveCard(cart){
    localStorage.setItem("cart",JSON.stringify(cart));
}

function loadCard(){
    return JSON.parse(localStorage.getItem("cart")) || [];
}

$(document).on("click","#Clear",function(e){
    if(confirm("Are you sure?")){
       
        localStorage.removeItem("cart");
        renderCard();
    }
  
})


function renderCard() {
    if (localStorage.getItem("cart")) {
        var product = JSON.parse(localStorage.getItem("cart"));
        var html = '';
        var i = 1;
        let TotalQty = 0;
        let TotalPrice = 0;

        product.forEach(data => {
            let total = data.price * data.qty;
            html += '<tr>';
            html += '<td>' + i + '</td>';
            html += '<td> ' + data.title + '</td>';
            html += '<td>' + data.price + '</td>';
            html += '<td>' + data.qty + '</td>';
            html += '<td>' + total + '</td>';
            html += '<td> <a class="btn remove-item" href="#" data-id="' + data.id + '">Remove</a></td>';
            html += '</tr>';
            i++;

            TotalQty += data.qty;
            TotalPrice += total;
        });

        let totalRow = `
            <tr class="totalprice">
                <td>=</td>
                <td>Total Price</td>
                <td></td>
                <td>${TotalQty}</td>
                <td>${TotalPrice.toFixed(2)}</td>
            </tr>`;

        $("#card tbody").html(html);
        $("#card tbody").append(totalRow);
    }
}


$(document).on("click", ".remove-item", function (e) {
    e.preventDefault();
    var productId = $(this).data("id");

    var cart = loadCard();
    cart = cart.filter(item => item.id !== Number(productId));

    saveCard(cart);
    renderCard();
});

    