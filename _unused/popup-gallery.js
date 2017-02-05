
  <!--div class="popup-gallery">
    <a href="/images/post-img/4x3/pattern_3_sm.jpg" class="portfolio-box">
        <img src="/images/post-img/4x3/pattern_3_sm.jpg" class="img-responsive" alt="">
        <div class="portfolio-box-caption">
            <div class="portfolio-box-caption-content">
                <div class="project-category text-faded">
                    Category
                </div>
                <div class="project-name">
                    Project Name
                </div>
            </div>
        </div>
    </a>
  </div-->

  <!--portfolio or projects-->


var images = document.getElementsByClassName('hero-bulma--portfolio-img');
  //console.log(images);
  var modal = document.getElementById('modal');
  var modalClose = document.getElementById('modal-close');
  modalClose.addEventListener('click', function() {
    modal.className = "modal fadeout0";
  });
  for (var i = 0; i < images.length; i++) {
    images[i].addEventListener('click', function(e) {
      console.log(e.target.parentElement.parentElement);
      var name = e.target.parentElement.id;
      var image = document.createElement("img");
      image.src = "/images/portfolio-img/" + name + ".jpg";
      var modalImage = document.getElementById('modal-img');
      while (modalImage.lastChild) {
          modalImage.removeChild(modalImage.lastChild);
      }
      modalImage.appendChild(image);
      modal.className = "modal is-active fadein1"
    });
  }*/

  /* magnify popup for images from creative bootstrap*/
  // Initialize and Configure Magnific Popup Lightbox Plugin
/*  $('.popup-gallery').magnificPopup({
      delegate: 'a',
      type: 'image',
      tLoading: 'Loading image #%curr%...',
      mainClass: 'mfp-img-mobile',
      gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
      },
      image: {
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
      }
  });
