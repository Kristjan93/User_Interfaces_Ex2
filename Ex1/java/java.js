
$(document).ready(function() {

	var product = Base.extend({
		// Constructor
		constructor: function(name, price, description) {
			this.name = name;
			this.price = price;
			this.description = description;
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

			// Drop the whole table
			$('#cartcontent tbody').remove();

			// Show the cart information
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
			// Update total element
			$('div.cart .total').html('Total: $'+ cart.totalPrice);
		},
		justUpdate: function(id, quant) {
			if(cart.products[id] !== undefined ) {
				// Update product info that belong to the carts array
				cart.products[id].total += (cart.products[id].price * quant);
				cart.updateTotalPrice(cart.products[id].price * quant);
				cart.products[id].quant += quant;
				cart.products[id].display = true;
				// Draw changes
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
			alert("Error loading this product to your cart");
		},
		// Empty the cart info
		deleteProducts: function(){
			cart.products = [];
			cart.totalPrice = 0;
			cart.updateTotalPrice(0);
			cart.drawProducts();
			// Fill the array once again
			inisiateDatabase();
		}
	}

	var inisiateDatabase = function(){
		/* Here we add make the "database" */
		cart.products.push( new product("Balloon", 25, "This is a beautiful Balloon t-shirt") );
		cart.products.push( new product("Green Fever", 50, "This is an ugly t-shirt") );
		cart.products.push( new product("Elephant", 75, "Buy this or something bad will happen") );
		cart.products.push( new product("Nerdie", 45, "This t-shirt is for nerds") );
		cart.products.push( new product("Blue Fever", 50, "Dont buy this one, it's cursed") );
		cart.products.push( new product("Fuzzy", 100, "This one is the coolest one") );
	}; inisiateDatabase();

	// Get the id of the product and the quantity requested
	$('.addProduct').on('submit', function () {
		var id = $(this).find('button').val();
		var quant = parseInt($(this).find('input[name="quantity"]').val());
		cart.addProduct(id, quant);
		return false;
	});

	$( "#deleteCart").click(function(){
		cart.deleteProducts();
	});

	//Make a modal that will display a description about the product
	$(".product").click(function(event) {
		var id = $(this).find("p:first").text();
		$("#nameOfProduct").html(cart.products[id].name);
		$("#description").html(cart.products[id].description);
		event.preventDefault();
		$("#myModal_2").modal("show");
	});

	//When Q and A button is pressed.
	$("#qanda").click(function(event){
		$("#div1").html("Dont ask us anything");
	});

	//When About us is pressed.
	$("#about").click(function(event){
		$("#div1").html("Two quys from Iceland who decided to sell t-shirt on the internet.  We are related because everyone from Iceland is.  We dont like polar bears because thay some times eat our family.");
	});
});

