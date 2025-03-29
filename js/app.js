// $(document).ready(function () {
//     renderCard();

//     var categoryUrl = "https://dummyjson.com/products/category-list";
//     var productUrl = "https://dummyjson.com/products/category/";
//     var singleProductUrl = "https://dummyjson.com/products/";

//     // Fetch and render category list with slider functionality
//     $.ajax({
//         url: categoryUrl,
//         method: "GET",
//         success: function (response) {
//             let html = "";
//             response.forEach(cat => {
//                 let formattedCat = cat.replace(/-/g, ' ')
//                     .toLowerCase()
//                     .split(' ')
//                     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//                     .join(' ');

//                 html += `
//                     <div class="card p1 column catelist" style="width: 9rem; height: 13rem;" id="${cat}">
//                         <img src="./images/${cat}.png" alt="" class="CardImage">
//                         <a href="#" class="text-decoration-none">
//                             <h5 class="fw-bold text-dark">${formattedCat}</h5>
//                         </a>
//                     </div>`;
                    
//             });

//             $("#category").html(html);

//             // Initialize slider after rendering categories
//             initSlider();
//         }
//     });
    

//     // Slider functionality
//     function initSlider() {
//         const slider = $(".slider");
//         const sliderWrapper = $(".slider-wrapper");
//         const cardWidth = $(".card").outerWidth(true); // Include margins
//         const visibleCards = Math.floor(sliderWrapper.width() / cardWidth);
//         let currentIndex = 0;

//         $(".next-btn").on("click", function () {
//             const totalCards = slider.children().length;
//             if (currentIndex + visibleCards < totalCards) {
//                 currentIndex++;
//                 updateSlider();
//             }
//         });

//         $(".prev-btn").on("click", function () {
//             if (currentIndex > 0) {
//                 currentIndex--;
//                 updateSlider();
//             }
//         });

//         function updateSlider() {
//             const offset = -(currentIndex * 6 * cardWidth);
//             slider.css("transform", `translateX(${offset}px)`);
//         }
//     }

//     // Fetch and render products by category
//     $(document).on("click", ".catelist", function () {
//         var categoryId = $(this).attr("id");

//         $.ajax({
//             url: productUrl + categoryId,
//             method: "GET",
//             success: function (response) {
//                 let html = "";

//                 response.products.forEach(product => {
//                     html += `
//                         <div class="col-lg-3">
//                             <div class="card product" style="width: 12rem;" data-product-id="${product.id}">
//                                 <img src="${product.thumbnail}" class="card-img-top" alt="...">
//                                 <div class="card-body">
//                                     <h3 class="card-title">${product.title}</h3>
//                                     <p class="card-text">${product.warrantyInformation || ""}</p>
//                                     <a href="#" class="Amount">${product.price}</a>
//                                 </div>
//                             </div>
//                         </div>`;
//                 });

//                 $("#products").html(html);
//             }
//         });
//     });

//     // Fetch and update cart with a single product
//     $(document).on("click", ".product", function () {
//         var productId = $(this).data("product-id");

//         $.ajax({
//             url: singleProductUrl + productId,
//             method: "GET",
//             success: function (product) {
//                 updateCard(product);
//             },
//             error: function () {
//                 console.log("Something went wrong.");
//             }
//         });
//     });

//     // Update cart in local storage
//     function updateCard(product) {
//         const cart = loadCard();
//         const productIndex = cart.findIndex(item => item.id === product.id);

//         if (productIndex !== -1) {
//             cart[productIndex].qty++;
//         } else {
//             cart.push({ ...product, qty: 1 });
//         }

//         saveCard(cart);
//         renderCard();
//     }

//     function saveCard(cart) {
//         localStorage.setItem("cart", JSON.stringify(cart));
//     }

//     function loadCard() {
//         return JSON.parse(localStorage.getItem("cart")) || [];
//     }

//     // Clear the cart
//     $(document).on("click", "#Clear", function () {
//         if (confirm("Are you sure?")) {
//             localStorage.removeItem("cart");
//             renderCard();
//         }
//     });

//     // Render the cart on the page
//     function renderCard() {
//         if (localStorage.getItem("cart")) {
//             const cart = JSON.parse(localStorage.getItem("cart"));
//             let html = "";
//             let i = 1;
//             let totalQty = 0;
//             let totalPrice = 0;

//             cart.forEach(item => {
//                 const total = item.price * item.qty;
//                 html += `
//                     <tr>
//                         <td>${i}</td>
//                         <td>${item.title}</td>
//                         <td>${item.price}</td>
//                         <td>${item.qty}</td>
//                         <td>${total}</td>
//                         <td><a class="btn remove-item" href="#" data-id="${item.id}">Remove</a></td>
//                     </tr>`;
//                 i++;
//                 totalQty += item.qty;
//                 totalPrice += total;
//             });

//             html += `
//                 <tr class="totalprice">
//                     <td>=</td>
//                     <td>Total Price</td>
//                     <td></td>
//                     <td>${totalQty}</td>
//                     <td>${totalPrice.toFixed(2)}</td>
//                 </tr>`;

//             $("#card tbody").html(html);
//         } else {
//             $("#card tbody").html("");
//         }
//     }

//     // Remove an item from the cart
//     $(document).on("click", ".remove-item", function (e) {
//         e.preventDefault();
//         const productId = $(this).data("id");
//         let cart = loadCard();
//         cart = cart.filter(item => item.id !== Number(productId));
//         saveCard(cart);
//         renderCard();
//     });
// });