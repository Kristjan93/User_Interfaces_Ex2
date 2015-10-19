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

	var cart = Base.extend({
		constructor: function(){

		}
	});

	var cart = Base.extend({
		constructor: function() {

		},
		addProduct: function(){
			console.log("In addItem");
		},
		deleteProduct: function(){

		}
	});


});



	// var data = {
	// 	"total": 0,
	// 	"rows": []
	// };
	// var totalCost = 0;

	// function addProduct(name, price) {
	// 	function add() {
	// 		for (var i = 0; i < data.total; i++) {
	// 			var row = data.rows[i];
	// 			if (row.name == name) {
	// 				row.quantity += 1;
	// 				return;
	// 			}
	// 		}
	// 		data.total += 1;
	// 		data.rows.push({
	// 			name: name,
	// 			quantity: 1,
	// 			price: price
	// 		});
	// 	}

	// 	add();

	// 	totalCost += price;
	// 	// Datagrid is a easyUI function that takes care of displaying an array of objects
	// 	$('#cartcontent').datagrid('loadData', data);
	// 	$('div.cart .total').html('Total: $' + totalCost);
	// }

	// /* I don't understand this */
	// $('#cartcontent').datagrid({
	// 	singleSelect: true
	// });

	//  Select a single item make it draggable 
	// $('.item').draggable({
	// 	revert: true,
	// 	proxy: 'clone',

	// 	onStartDrag: function() {
	// 		// Positioning of the image
	// 		$(this).draggable('proxy').css('z-index', 30);
	// 	},
	// 	onStopDrag: function() {
	// 		// Display the moving icon for cursor
	// 		$(this).draggable('options').cursor = 'move';
	// 	}
	// });

	// $('.cart').droppable({
	// 	onDrop: function(e, source) {
	// 		// Find the first and second <p> after the source code that was dropped
	// 		var name = $(source).find('p:eq(0)').html();
	// 		var price = $(source).find('p:eq(1)').html();
	// 		// Making an array [Price:$][*Number*] and taking the later entry
	// 		addProduct(name, parseFloat(price.split('$')[1]));
	// 	}
	// });