function searchMovie() {
  // hilangkan semua data agar tidak menumpuk ketika disearch
  $("#movie-list").html("");

  $.ajax({
    url: "https://omdbapi.com",
    // methodnya
    type: "get",
    // kembaliannya mau bentuknya apa : text, json, xml
    dataType: "json",
    // mau kirimin param apa (val = value)
    data: {
      apikey: "bc48f29c",
      s: $("#search-input").val(),
    },
    success: function (hasil) {
      if (hasil.Response == "True") {
        let movies = hasil.Search;
        // di looping
        $.each(movies, function (i, data) {
          $("#movie-list").append(
            `
            <div class="col-md-2">
            <div class="card mb-3">
            <img src="` +
              data.Poster +
              `" class="card-img-top" alt="..." loader="lazy">
            <div class="card-body">
              <h5 class="card-title">` +
              data.Title +
              `</h5>
              <h6 class="card-subtitle mb-2 text-muted">` +
              data.Year +
              `</h6>
              <a href="#" class="card-link see-details" data-bs-toggle="modal"
              data-bs-target="#exampleModal" data-id="` +
              data.imdbID +
              `">See Details</a>
            </div>
          </div>
          </div>
            `
          );
        });

        // menghilangkan title pencarian ketika disearch
        $("#search-input").val("");
      } else {
        // $('#movie-list').html(`<h1 class="text-center">Movie Tidak Ada</h1>`)
        // Error response darisananya
        $("#movie-list").html(
          `<h1 class="text-center">` + hasil.Error + `</h1>`
        );
      }
    },
  });
}

$("#search-button").on("click", function () {
  searchMovie();
});

// pencet enter ketika search (cek keycode.info) keyCode / which
$("#search-input").on("keyup", function (event) {
  if (event.keyCode === 13) {
    searchMovie();
  }
});

// minta jquery carikan class see-details pada saat di click jalankan fungsi
// $('.see-details').on("click", function() {

// minta jquery carikan id movie-list ketika saya click sebuah classnya see-details baik munculnya diawal atau nanti
$("#movie-list").on("click", ".see-details", function () {
  // ambil tombol ini dan ambil datanya yang bernama id
  // console.log($(this).data('id'))
  $.ajax({
    url: "https://omdbapi.com",
    dataType: "json",
    type: "get",
    data: {
      apikey: "bc48f29c",
      i: $(this).data("id"),
    },
    success: function (movie) {
      if (movie.Response === "True") {
        $(".modal-body").html(
          `
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="` +
            movie.Poster +
            `" 
                                class="img-fluid"/>
                            </div>
                            <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item">
                                <h3>` +
            movie.Title +
            `</h3>
                                </li>
                                <li class="list-group-item">
                                Released : ` +
            movie.Released +
            `
                                </li>
                                <li class="list-group-item">
                                Genre : ` +
            movie.Genre +
            `
                                </li>
                                <li class="list-group-item">
                                Director : ` +
            movie.Director +
            `
                                </li>
                                <li class="list-group-item">
                                Actors : ` +
            movie.Actors +
            `
                                </li>
                             </ul>
                            </div>
                        </div>
                    </div>
                `
        );
      }
    },
  });
});
