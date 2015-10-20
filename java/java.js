// Pseudo code

$(document).ready(function() {

	var product = Base.extend({
		constructor: function(id, name, price, quant) {
			this.id = id;
			this.name = name;
			this.price = price;
			this.quant = quant;
			this.total = price;
		},
		name: "",
		price: 0,
		quant: 0,
		total: 0,
	});

	var cart = {
		products: [],
		totalPrice: 0,
		drawProducts: function() {

			// Drop the while table
			$('#cartcontent tbody').remove();

			// Insert all the information to the tale
			for(var i = 0; i < cart.products.length; i++){
				var row = $("<tr/>");
				$("#cartcontent").append(row);
				row.append($("<td>" + cart.products[i].id + "</td>"));
				row.append($("<td>" + cart.products[i].name + "</td>"));
				row.append($("<td>" + cart.products[i].quant + "</td>"));
				row.append($("<td>" + cart.products[i].total + "</td>"));
			}
		},
		updateTotalPrice: function(price){
			cart.totalPrice += price;
			$('div.cart .total').html('Total: $'+ cart.totalPrice);
		},
		justUpdate: function(id){
			for(var i = 0; i < cart.products.length; i++){
				if(cart.products[i].id === id) {
					cart.products[i].quant++;
					cart.products[i].total += cart.products[i].price;
					cart.drawProducts();
					return true;
				}
			}
			return false;
		},
		addProduct: function(id, name, price) {

			// Update total price and display it
			cart.updateTotalPrice(price);

			// If product is already existent we just update
			if(cart.justUpdate(id) === true){
				return;
			}
			// If this is a new product add it to the list
			cart.products.push( new product(id, name, price, 1) );
			cart.drawProducts();
		},
		deleteProducts: function(){
			cart.products = [];
			cart.totalPrice = 0;
			cart.updateTotalPrice(0);
			cart.drawProducts();
		}
	}

	$( ".product" ).on( "click", function() {
		// Here we extract information from HTML (never done in practice)
		var id = $(this).find('p:eq(0)').text();
		var name = $(this).find('p:eq(1)').text();
		var price = $(this).find('p:eq(2)').text();
		cart.addProduct(parseFloat(id.split(':')[1]), name, parseFloat(price.split('$')[1]));
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









