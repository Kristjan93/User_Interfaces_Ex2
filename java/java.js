// Pseudo code

$(document).ready(function() {

	var product = Base.extend({
		constructor: function(name, price) {
			this.name = name;
			this.price = price;
		},
		name: "",
		price: 0,
		quant: 0,
		total: 0,
		display: false
	});

	var cart = {
		products: [],
		totalPrice: 0,
		drawProducts: function() {

			// Drop the while table
			$('#cartcontent tbody').remove();

			// Insert all the information to the tale
			for(var i = 0; i < cart.products.length; i++){
				if(cart.products[i].display === true) {
					var row = $("<tr/>");
					$("#cartcontent").append(row);
					row.append($("<td>" + cart.products[i].name + "</td>"));
					row.append($("<td>" + cart.products[i].quant + "</td>"));
					row.append($("<td>" + cart.products[i].total + "</td>"));
				}
			}
		},
		updateTotalPrice: function(price){
			cart.totalPrice += price;
			$('div.cart .total').html('Total: $'+ cart.totalPrice);
		},
		justUpdate: function(id, quant) {
			if(cart.products[id] !== undefined ) {
				cart.products[id].total += (cart.products[id].price * quant);
				cart.updateTotalPrice(cart.products[id].price * quant);
				cart.products[id].quant += quant;
				cart.products[id].display = true;
				// Update total price and display it
				cart.drawProducts();
				return true;
			}

			return false;
		},
		addProduct: function(id, quant) {

			// Call the function to update the item status in the cart
			// If false there is no item
			if(cart.justUpdate(id, quant) === true) {
				return;
			}

			// If the item does not exist
			// TODO ERROR
			// cart.products.push( new product(id, name, price, 1) );
		},
		deleteProducts: function(){
			cart.products = [];
			cart.totalPrice = 0;
			cart.updateTotalPrice(0);
			cart.drawProducts();
			inisiateDatabase();
		}
	}

	var inisiateDatabase = function(){
		/* Here we add make the "database" */
		cart.products.push( new product("Balloon", 25) );
		cart.products.push( new product("Pizza", 50) );
	}; inisiateDatabase();

	// $( ".product" ).on( "click", function() {

	// 	// Here we extract information from HTML (never done in practice)
	// 	var id = $(this).find('p:eq(0)').text();
	// 	var name = $(this).find('p:eq(1)').text();
	// 	var price = $(this).find('p:eq(2)').text();
	// 	cart.addProduct(id, name, parseFloat(price.split('$')[1]));
	// });

	// $( ".addProduct" ).submit(function(event) {
	// 	var id = $( "button:first" ).val();
	// 	var quant = $( "input:first" ).val();
	// 	console.log(id, quant);
	// 	event.preventDefault();
	// });

	$('.addProduct').on('submit', function () {
		var id = $(this).find('button').val();
		var quant = parseInt($(this).find('input[name="quantity"]').val());
		console.log(id, quant);
		cart.addProduct(id, quant);
		return false;
	});


	$( "#deleteCart").click(function(){
		cart.deleteProducts();
	});

	//Change the content on the page when clicking on Home on the navigation bar
	// $("li").click(function(){
	// 	console.log("is it working?");
 //        $("#div1").load("homePage.rtf");
 //    });

});



// questions:
// 1. is this something that i can use?
// 2. Is there anything that you can tell me about my code? Is there a better way? 
// 3. My idea about having the objects.







