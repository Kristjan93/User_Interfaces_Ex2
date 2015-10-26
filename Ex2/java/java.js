// Pseudo code

$(document).ready(function() {
	var form = $("#myForm").show();

	form.steps({
		headerTag: "h3",
		bodyTag: "fieldset",
		transitionEffect: "slideLeft",
		onStepChanging: function(event, currentIndex, newIndex) {
			// Allways allow previous action even if the current form is not valid!
			if (currentIndex > newIndex) {
				return true;
			}
			// Forbid next action on "Warning" step if the user is to young
			if (newIndex === 3 && Number($("#age-2").val()) < 18) {
				return false;
			}
			// Needed in some cases if the user went back (clean up)
			if (currentIndex < newIndex) {
				// To remove error styles
				form.find(".body:eq(" + newIndex + ") label.error").remove();
				form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
			}
			form.validate().settings.ignore = ":disabled,:hidden";
			return form.valid();
		},
		onStepChanged: function(event, currentIndex, priorIndex) {
			// Used to skip the "Warning" step if the user is old enough.
			if (currentIndex === 2 && Number($("#age-2").val()) >= 18) {
				form.steps("next");
			}
			// Used to skip the "Warning" step if the user is old enough and wants to the previous step.
			if (currentIndex === 2 && priorIndex === 3) {
				form.steps("previous");
			}
		},
		onFinishing: function(event, currentIndex) {
			form.validate().settings.ignore = ":disabled";
			return form.valid();
		},
		onFinished: function(event, currentIndex) {
			alert("Submitted!");
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
		},
		messages: {
			password: {
				pwcheck: ""
			}
		}
	});
	// Specific password requirements
	$.validator.addMethod("pwcheck", function(value) {
		return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
		&& /[a-z]/.test(value) // has a lowercase letter
		&& /\d/.test(value) // has a digit
	});

});


				// required: function() {
				// 	console.log($("#userName-2").val());
				// 	return $("#userName-2").val() == "";
				// }


// "Must contain letters [a-z] and digits[0-9]"