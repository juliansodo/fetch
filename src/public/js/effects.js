
$(document).ready(function() {
    $('#corazonlink').click(function(e) {
        $('#corazon').toggleClass('material-icons rp red-text')
        $('#corazon').toggleClass('material-icons rp black-text')
        e.preventDefault();
   });

 $('#repostlink').click(function(e) {
    $('#repost').toggleClass('material-icons yellow-text')
    $('#repost').toggleClass('material-icons black-text')
    e.preventDefault();
});
});

 