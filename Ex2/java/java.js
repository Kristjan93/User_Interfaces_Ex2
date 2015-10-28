$(document).ready(function() {

	// Make an instance of the form
	var form = $("#myForm").show();
	var email = "";

	form.steps({
		headerTag: "h3",
		// Where we want our form frame to be
		bodyTag: "fieldset",
		transitionEffect: "slideLeft",
		onStepChanging: function(event, currentIndex, newIndex) {
			// Always allow previous action even if the current form is not valid!
			if (currentIndex > newIndex) {
				return true;
			}
			if (currentIndex < newIndex) {
				// Here we get the email information to display later
				if (currentIndex === 0) {
					// Set email variable for later use when prompting user
					email = $("#email-2").val();
				}
				// Needed in some cases if the user went back (clean up)
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
			// Here we pretend to have sent user a email
			alert("All information concerning your purchase has been sent to " + email + ".");
		}
	}).validate({
		errorPlacement: function errorPlacement(error, element) {
			element.before(error);
		},
		// Here are the rules for what will be validated
		// It is also possible to add a class="required" to element
		rules: {
			name: {
				required: true
			},
			surname: {
				required: true
			},
			email: {
				required: true,
				email: true
			},
			shipAddr: {
				required: true
			},
			telephone: {
				digits: true,
				rangelength: [3, 30]
			},
			userName: {
				required: {
					// If the user tapes anything into field it becomes required 
					depends: function() {
						return $('#userName-2').val() != '';
					}
				}
			},
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
			},
			acceptTerms: {
				required: true
			}
		},
		// What we want out error messages to be
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

	// This is a fix for the options field for picking month and year since they are not
	// technically input fields
	$.validator.addMethod("valueNotEquals", function(value, element, arg) {
		return arg != value;
	});

	// We want to display the uploaded image into our img tag
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

	// Function for taking ceare of redirecting the user if he wants prefers to pay by paypal
	$('body').on('click', '.btn-group button', function(e) {
		var id = this.id;
		if (id === "paypal") {
			window.location.replace("https://www.paypal.com/es/webapps/mpp/home");
		}
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
	});

});