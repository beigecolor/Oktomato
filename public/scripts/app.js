console.log('Sanity Check!');


let url = '/api/movies/';
let $movieId;

function getAllMovies() {
    $.ajax({
        method: 'GET',
        url: url,
        success: showMovies,
        error: (err)=>{console.log(err)}
    });
}

getAllMovies();

function showMovies(response){
    console.log(response);
    $('#reviews').empty();
    response.forEach(movie => {
        console.log(movie)
        let stars = ''
        for(let i = movie.rating; i > 0; i--){
            stars +='⭐'
        }

        let card = `
            <div id=${movie._id} class="review">
                <h2>${movie.title} ${stars}</h2>
                <p>${movie.reviews.review}</p>
                <button class="delete">delete</button>
                <button class="edit" data-toggle="modal" data-target="#editModal">edit</button>
            </div>
        `;
        
        $('#reviews').append(card)
        
    });
}

const $reviewContainer = $('#reviews');
const $editModal = $('#editModal');
$reviewContainer.on('click', '.delete', handleDeleteClick);
$reviewContainer.on('click', '.edit', handleEditClick);
$editModal.on('click', '#editFilmButton', handleEditSubmit);


// Delete Movie Review
function handleDeleteClick(e) {
    // Vanilla JavaScript version
    // e.stopPropagation();
    // console.log('Delete Clicked...' + e.currentTarget);
    // const reviewId = e.target.id;
    const movieId = $(this).parent('').attr('id');
    $.ajax({
        method: 'DELETE',
        url: `${url}${movieId}`,
        success: getAllMovies,
        error: (err)=>{console.log(err)}
    });
    
}


// Edit Moview Review
function handleEditClick() {
    // Vanilla JavaScript version 
    // e.stopPropagation();
    // console.log('Edit Clicked...' + e.currentTarget.id);
    // const reviewId = e.target.id;
    // console.log($(this).parent('').attr('id'));
    const editModal = $('#editModal');
    $movieId = $(this).parent().attr('id');
    console.log('Edit ' + $movieId);
    const $title = $('#editMovieTitle');
    const $year = $('#editMovieYear');
    const $review = $('#editMovieReview');

    // Get review to edit
    $.ajax({
        method: 'GET',
        url: `${url}${$movieId}`,
        success: getMovieReview,
        error: (err)=>{console.log(err)}
    });

    // Update Edit Modal with review to edit
    function getMovieReview(response) {
        console.log(response);
        $title.val(response.title);
        $year.val(response.year);
        $review.val(response.reviews.review);
    }
    
}


// Submit Updated Movie Review
function handleEditSubmit(e) {
    // e.preventDefault();
    console.log('Edit Submit');
    const $editForm = $('#editForm');

    // console.log($editForm);

    $.ajax({
        method: 'PUT',
        url: `${url}${$movieId}`,
        success: getAllMovies,
        data: $editForm.serialize(),
        error: (err)=>{console.log(err)}
    });

    $('#editModal .btn-secondary').click()
}