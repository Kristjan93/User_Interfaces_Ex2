// Pseudo code

$(document).ready(function() {

	var form = $("#myForm").show();
	var email = "";

	form.steps({
		headerTag: "h3",
		bodyTag: "fieldset",
		transitionEffect: "slideLeft",
		onStepChanging: function(event, currentIndex, newIndex) {
			// Allways allow previous action even if the current form is not valid!
			if (currentIndex > newIndex) {
				return true;
			}
			// Needed in some cases if the user went back (clean up)
			if (currentIndex < newIndex) {
				// Here we get the email information to display later
				if(currentIndex === 0) {
					email = $("#email-2").val();
				}
				// To remove error styles
				form.find(".body:eq(" + newIndex + ") label.error").remove();
				form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
			}
			form.validate().settings.ignore = ":disabled,:hidden";
			return form.valid();
		},
		onFinishing: function(event, currentIndex) {
			form.validate().settings.ignore = ":disabled";
			return form.valid();
		},
		onFinished: function(event, currentIndex) {
			alert("All information concerning your purchase has been sent to " + email + ".");
		}
	}).validate({
		errorPlacement: function errorPlacement(error, element) {
			element.before(error);
		},
		rules: {
			email: {
				email: true
			},
			telephone: {
				digits: true,
				rangelength: [3, 30]
			},
			userName: {
				required: {
					depends: function() {
						return $('#userName-2').val() != '';
					}
				}
			},
			// TODO fix how pwcheck messes everything up 
			password: {
				required: false,
				pwcheck: {
					depends: function() {
						return $('#userName-2').val() != '';
					}
				},
				maxlength: 8
			},
			confirm: {
				equalTo: "#password-2"
			},
			holderName: {
				required: true
			},
			typeCard: {
				required: true
			},
			expiryMonth: {
				valueNotEquals: "month"
			},
			expiryYear: {
				valueNotEquals: "year"
			},
			cvv: {
				required: true
			}
		},
		messages: {
			password: {
				pwcheck: "Must contain letters [a-z] and digits[0-9]"
			},
			expiryMonth: {
				valueNotEquals: "Please select an item"
			},
			expiryYear: {
				valueNotEquals: "Please select an item"
			}
		}
	});

	// Specific password requirements
	$.validator.addMethod("pwcheck", function(value) {
		return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
			// has a lowercase letter
			&& /[a-z]/.test(value)
			// has a digit
			&& /\d/.test(value)
	});

	$.validator.addMethod("valueNotEquals", function(value, element, arg){
		return arg != value;
	});

	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#disImg').attr('src', e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
		}
	}

	$("#profImg-2").change(function() {
		readURL(this);
	});

	$('body').on('click', '.btn-group button', function (e) {
		var id = this.id;

		if(id === "paypal") {
			window.location.replace("https://www.paypal.com/es/webapps/mpp/home");
		}
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
	});


});