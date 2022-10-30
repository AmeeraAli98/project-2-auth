
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

  $("#search-1").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    console.log(value)
    $("#sub-list li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

    $("#search").on("keyup", function() {
      var stringer = $(this).val().toLowerCase();
      $("#sesh-list li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(stringer) > -1)
      });
    });
  
   //the code for the dropdown
   $(function() { // Dropdown toggle
    $('.dropdown-toggle').click(function() { $(this).next('.dropdown-menu').slideToggle();
    });
    
    $(document).click(function(e) 
    { 
    var target = e.target; 
    if (!$(target).is('.dropdown-toggle') && !$(target).parents().is('.dropdown-toggle')) 
    //{ $('.dropdown').hide(); }
      { $('.dropdown').slideUp(); }
    });
    });
  
  






