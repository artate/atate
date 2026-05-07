//New stuff
$(document).ready(function () {
  $('#expand-journey').click(function () {
    $('.journey-continued').show();
    $('#expand-journey').hide();
    $('.journey-continued .timeline-item').each(function (i, item) {
      setTimeout(function () {
        $(item).addClass('visible');
      }, i * 200);
    });
  });

  // Mobile navigation toggle
  $('.navigation-toggle a').click(function () {
    $('.navigation-container').addClass('active');
    $('body').css('overflow', 'hidden');
  });

  $('.close-nav').click(function () {
    hideNav();
  });

  // Close nav when clicking a link on mobile
  $('header nav ul li a').click(function () {
    if (window.matchMedia('(max-width: 991px)').matches) {
      hideNav();
    }
  });

  function hideNav() {
    $('.navigation-container').removeClass('active');
    $('body').css('overflow', '');
  }

  // Scroll-triggered animations for sections
  var sectionObserverOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px', // Triggers 100px before element reaches bottom of viewport
      threshold: 0.1
  };

  var sectionObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              sectionObserver.unobserve(entry.target);
          }
      });
  }, sectionObserverOptions);

  // Target all elements with the class 'scroll-animation'
  var sections = document.querySelectorAll('.scroll-animation');
  sections.forEach(function(section) {
      sectionObserver.observe(section);
  });

  // Scroll-triggered animations for timeline items
  var timelineObserverOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.2
  };

  var timelineObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              timelineObserver.unobserve(entry.target);
          }
      });
  }, timelineObserverOptions);

  var timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(function(item) {
      timelineObserver.observe(item);
  });

  // Contact form
  $('#contact-form').on('submit', function (e) {
    e.preventDefault();

    var $form     = $(this);
    var $btn      = $form.find('.btn-site');
    var $feedback = $('#form-feedback');

    $btn.prop('disabled', true).text('Sending...');
    $feedback.removeClass('success error').hide();

    $.ajax({
      url: 'contact-handler.php',
      method: 'POST',
      data: $form.serialize(),
      dataType: 'json',
      success: function (response) {
        if (response.success) {
          $feedback.addClass('success').text(response.message).show();
          $form[0].reset();
          if (typeof hcaptcha !== 'undefined') hcaptcha.reset();
        } else {
          $feedback.addClass('error').text(response.message).show();
        }
      },
      error: function () {
        $feedback.addClass('error').text('Something went wrong. Please try again.').show();
      },
      complete: function () {
        $btn.prop('disabled', false).text('Send');
      }
    });
  });
});