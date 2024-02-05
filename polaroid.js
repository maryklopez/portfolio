(function() {
	$.fn.card_slideshow = function(args) {
		this.each(function(index, slideshow_el) {
			var $this = $(slideshow_el),
				$container = $this.find(".slides-container"),
				$cards = $container.find(".slide-card"),
				$text_container = $this.find(".slides-text-container"),
				$text = $text_container.find(".side-text"),
				$indicator = $('<ul class="slides-indicator" />').appendTo(this),
				in_animation = false,
				defaults = {
					speed: 200,
					ease: "swing"
				};

			// parse defaults
			args = $.extend({}, defaults, args);

			// indicator points
			$indicator
				.html("<li></li>".repeat($cards.length))
				.find("li:first-child")
				.addClass("active");

			// index attribute
			$($cards).each(function(index, element) {
				$(element).attr("data-index", index);
				$text.filter(":eq(" + index + ")").attr("data-index", index);
			});

			// enable first one
			$text.first().addClass("active");

			// go slide animation
			var next_slide = function() {
				var $current_card = $cards.filter(":first-child"),
					next_index = parseInt($current_card.attr("data-index")) + 1;

				// start animation
				in_animation = true;

				// next index validation
				if (next_index >= $cards.length) {
					next_index = 0;
				}

				// switch text
				$text.filter(".active").removeClass("active");
				$text.filter("[data-index=" + next_index + "]").addClass("active");

				// switch indicator
				$indicator.find("li.active").removeClass("active");
				$indicator.find("li:eq(" + next_index + ")").addClass("active");

				// fade out first/top card
				$current_card
					.fadeOut(args.speed, args.ease, function() {
						// move it way back to be the last item
						$current_card.appendTo($container);
						in_animation = false;
					})
					.fadeIn(args.speed, args.ease);
			};

			// on card click
			$cards.on("click", function(e) {
				e.preventDefault();
				// only slide when animation is complete
				if (false === in_animation) {
					next_slide();
				}
			});
		});

		return this;
	};

	$(".slideshow").card_slideshow({
		speed: 150,
		ease: "swing"
	});
})();
