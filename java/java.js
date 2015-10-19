// Pseudo code



/*
 * Class - Books
 * Include fix for creating now objects in JavaScript
 * Create 6 Items with the property's:
 *	-Name
 *	-Id(might be good)
 *	-Price
 */

/* Control of events in the page */

$(document).ready(function() {

	var product = Base.extend({
		constructor: function(id, name, price, quant) {
			this.id = id;
			this.name = name;
			this.price = price;
			this.quant = quant;
		},
		name: "",
		price: 0,
		quant: 0,
	});

	var cart = {
		products: [],
		totalPrice: 0,
		drawProducts: function() {

			$('#cartcontent tbody').remove();

			for(var i = 0; i < cart.products.length; i++){
				var row = $("<tr/>");
				$("#cartcontent").append(row);
				row.append($("<td>" + cart.products[i].id + "</td>"));
				row.append($("<td>" + cart.products[i].name + "</td>"));
				row.append($("<td>" + cart.products[i].quant + "</td>"));
				row.append($("<td>" + cart.products[i].price + "</td>"));
			}
		},
		addProduct: function(id, name, price) {
			// Update total price and display it
			cart.totalPrice += price;
			$('div.cart .total').html('Total: $'+ cart.totalPrice);

			for(var i = 0; i < cart.products.length; i++){
				if(cart.products[i].id === id) {
					cart.products[i].quant++;
					cart.drawProducts();
					return;
				}
			}
			cart.products.push( new product(id, name, price, 1) );
			cart.drawProducts();
		},
		deleteProduct: function(){
			console.log("In DeleteProducts");
		}
	}
	
	$( ".product" ).on( "click", function() {
		var id = $(this).find('p:eq(0)').text();
		var name = $(this).find('p:eq(1)').text();
		var price = $(this).find('p:eq(2)').text();

		console.log(name);
		console.log(price);

		cart.addProduct(parseFloat(id.split(':')[1]), name, parseFloat(price.split('$')[1]));
	});

});









