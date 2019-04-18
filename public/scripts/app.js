console.log('Sanity Check!');


let url = '/api/movies/'

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
                <p>${movie.reviews[0].review}</p>
                <button class="delete">delete</button>
                <button class="edit">edit</button>
            </div>
        `;
        
        $('#reviews').append(card)
        
    });
}

const $reviewContainer = $('#reviews');
$reviewContainer.on('click', '.delete', handleDeleteClick);
$reviewContainer.on('click', '.edit', handleEditClick);


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

function handleEditClick() {
    // Vanilla JavaScript version
    // e.stopPropagation();
    // console.log('Edit Clicked...' + e.currentTarget.id);
    // const reviewId = e.target.id;
    // console.log($(this).parent('').attr('id'));
    const movieId = $(this).parent().attr('id');
    
    
}