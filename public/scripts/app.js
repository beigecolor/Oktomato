console.log('Sanity Check!');


let url = '/api/movies'

$.ajax({
    method: 'GET',
    url: url,
    success: (response)=>{console.log(response)},
    error: (err)=>{console.log(err)}

});

$.ajax({
    method: 'GET',
    url: url,
    success: (response)=>{console.log(response)},
    error: (err)=>{console.log(err)}

});

