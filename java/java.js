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
		constructor: function(name, price, desc) {
			this.name = name;
			this.price = price;
			this.desc = desc;
		},
		name: "",
		price: 0,
		desc: "",
	});

	var cart = {
		products: [],
		addProduct: function(name, price) {
			cart.products.push({name: name, price: price});
			console.log(cart.products);
			console.log("In addProducts");
		},
		deleteProduct: function(){
			console.log("In DeleteProducts");
		}
	}
	
	$( ".product" ).on( "click", function(e, source) {
		var name = $(this).find('p:eq(0)').text();
		var price = $(this).find('p:eq(1)').text();
		console.log(name);
		console.log(price);

		cart.addProduct(name, parseFloat(price.split('$')[1]));
	});

});









