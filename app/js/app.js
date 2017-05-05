import $ from 'jquery';
import mask from 'jquery-inputmask'
import {
	default as swal } from 'sweetalert2'
import VMasker from 'vanilla-masker'
import Siema from 'siema'

function initSlider() {
	var slider = new Siema({
		selector: '.testi__slider',
		duration: 350,
		easing: 'ease-out',
		perPage: 1,
		startIndex: 0,
		draggable: false,
		threshold: 20,
		loop: true,
	});
	const slides = $('.testi__slider-item');
	slides.map(function(index, item) {
		$('.testi__slider-counter').append('<div class="testi__slider-dot"></div>');
	});

	const dots = $('.testi__slider-dot');
	$(dots[slider.currentSlide]).addClass('testi__slider-dot--active');
	dots.map(function(index, item) {
		$(item).on('click', function() {
			slider.goTo(index);
			$('.testi__slider-dot').removeClass('testi__slider-dot--active');
			$(dots[slider.currentSlide]).addClass('testi__slider-dot--active');
		});
	});

	setInterval(function() {
		slider.next();
		$('.testi__slider-dot').removeClass('testi__slider-dot--active');
		$(dots[slider.currentSlide]).addClass('testi__slider-dot--active');
	}, 4000)
}


function onMenuClick(item) {
	$(item).on('click', function(e) {
		e.stopPropagation()

		$('.head-mobile')
			.css('display', 'none')
			.show()
			.removeClass('head-mobile--active')
			.delay(300)
			.fadeOut(0)
	})
}

function initMobileMenu() {
	$('.head__burger').on('click', function() {
		$('.head-mobile')
			.css('display', 'flex')
			.hide()
			.fadeIn(0)
			.addClass('head-mobile--active')
	})
}


let email_validated = false;
let name_validated = false;
let message_validated = false;



function initFormValidation() {
	function isEmail(email) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
		return regex.test(email)
	}


	$('#message').on('input', function() {
		if ($('#message').val() !== '') {
			$('#message').removeClass('input-error')
			$('#message').addClass('input-success')
			message_validated = true
		} else {
			$('#message').removeClass('input-success')
			$('#message').addClass('input-error')
			message_validated = false
		}
	})

	$('#email').on('input', function() {
		let email = $('#email').val()
		if (isEmail(email)) {
			$('#email').removeClass('input-error')
			$('#email').addClass('input-success')
			email_validated = true
		} else {
			$('#email').removeClass('input-success')
			$('#email').addClass('input-error')
			email_validated = false
		}
	})

	$('#name').on('input', function() {
		if ($('#name').val() !== '') {
			$('#name').removeClass('input-error')
			$('#name').addClass('input-success')
			name_validated = true
		} else {
			$('#name').removeClass('input-success')
			$('#name').addClass('input-error')
			name_validated = false
		}
	})
}




function formSubmit() {
	const form = $('.form-table')

	$(form).submit(function(event) {
		event.preventDefault()

		let formData = $(form).serialize();
		if (message_validated === true && email_validated === true && name_validated === true) {
			$.ajax({
					type: 'POST',
					url: $(form).attr('action'),
					data: formData
				})
				.done(function(response) {
					swal({
						title: 'Success!',
						text: 'Wait for the answer :)',
						type: 'success',
						timer: 2000
					})

					$('#name').val('').removeClass('input-success');
					$('#email').val('').removeClass('input-success');
					$('#message').val('').removeClass('input-success');
				})
				.fail(function(data) {
					swal({
						title: 'Error!',
						text: 'Something went wrong, try again',
						type: 'error',
						timer: 2000
					})
				});
		} else {
			swal({
				title: 'Error!',
				text: 'Please fill correctly all the fields',
				type: 'error'
			})
		}
	})
}




function initAnchorScrolling() {
	$('a[href^="#"]').on('click', function() {
		let el = $(this).attr('href')
		$('body').animate({ scrollTop: $(el).offset().top }, 500)
	})
}



$(document).ready(function() {
	initAnchorScrolling()
	initSlider();
	initMobileMenu();
	onMenuClick('.head-mobile__cross');
	onMenuClick('.head-mobile__item');
	initFormValidation()
	formSubmit()
});
