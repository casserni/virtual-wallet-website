$("#conversion-form").submit(() => {
  e.preventDefault();

  var $this = $(this);
  var base = $this.data('base');

  var request = $.ajax({
     method: "GET",
     url: `/api/v1/latest?base=${base}`,
   });

   request.done(function(data) {
     $('#conversion').html("hello");
   })
   return false
  })

  $( "#target" ).submit(function( event ) {
    alert( "Handler for .submit() called." );
    event.preventDefault();
  });
