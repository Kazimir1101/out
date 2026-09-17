
$(document).ready(function () {

    let currentSlide = 0;

    const slides = $(".business-slide");
    const dots = $(".dot");

    const totalSlides = slides.length;


    function showSlide(index) {

        slides.removeClass("active");
        dots.removeClass("active");

        $(slides[index]).addClass("active");
        $(dots[index]).addClass("active");

        $("#current-slide").text(
            String(index + 1).padStart(2)
        );
    }


    function nextSlide() {

        currentSlide++;

        if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }

        showSlide(currentSlide);
    }


    /*
        Avtomatik reklam dəyişməsi
        hər 5 saniyədən bir
    */

    let sliderInterval = setInterval(
        nextSlide,
        5000
    );


    /*
        Dot-a klik
    */

    $(".dot").on("click", function () {

        currentSlide = $(this).index();

        showSlide(currentSlide);


        /*
            İstifadəçi klik etdikdən sonra
            timer yenidən başlayır
        */

        clearInterval(sliderInterval);

        sliderInterval = setInterval(
            nextSlide,
            4000
        );

    });


    /*
        Reklamın özünə klik
        növbəti reklam
    */

    $(".business-arrow").on("click", function () {

        nextSlide();

        clearInterval(sliderInterval);

        sliderInterval = setInterval(
            nextSlide,
            4000
        );

    });


    /*
        Mobil üçün swipe
    */

    let startX = 0;

    $(".business-slider").on("touchstart", function (e) {

        startX = e.originalEvent.touches[0].clientX;

    });


    $(".business-slider").on("touchend", function (e) {

        let endX =
            e.originalEvent.changedTouches[0].clientX;

        let difference = startX - endX;


        if (Math.abs(difference) > 50) {

            if (difference > 0) {

                nextSlide();

            } else {

                currentSlide--;

                if (currentSlide < 0) {
                    currentSlide = totalSlides - 1;
                }

                showSlide(currentSlide);

            }


            clearInterval(sliderInterval);

            sliderInterval = setInterval(
                nextSlide,
                4000
            );

        }

    });


    /*
        Search
    */

    $("#search-btn").on("click", function () {

        let searchValue =
            $("#search-input").val().trim();

        if (searchValue !== "") {

            console.log(
                "Axtarış:",
                searchValue
            );

        }

    });


    /*
        Enter düyməsi ilə axtarış
    */

    $("#search-input").on("keypress", function (e) {

        if (e.which === 13) {

            $("#search-btn").click();

        }

    });


    /*
        Favorite
    */

    $(".favorite").on("click", function (e) {

        e.stopPropagation();

        const icon = $(this).find("i");

        icon.toggleClass(
            "fa-regular fa-solid"
        );

    });


    /*
        Bottom navigation
    */

    $(".navbar-item").on("click", function () {

        $(".navbar-item")
            .removeClass("active");

        $(this)
            .addClass("active");

    });

});
