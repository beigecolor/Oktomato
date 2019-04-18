console.log('Sanity Check!');


let url = '/api/movies'

$.ajax({
    method: 'GET',
    url: url,
    success: showMovies,
    error: (err)=>{console.log(err)}

});

// $.ajax({
//     method: 'GET',
//     url: url,
//     success: (response)=>{console.log(response)},
//     error: (err)=>{console.log(err)}

// });

function showMovies(response){
    console.log(response)
    response.forEach(movie => {
        console.log(movie)
        let card = `<h2 id=${movie._id}>${movie.title}</h2>`
        $('#reviews').append(card)
        movie.reviews.forEach(review => {
            let card = `<p>${review.review}</p>`
            console.log(review);
            $(`#${movie._id}`).append(card);
        })
        
    });

}