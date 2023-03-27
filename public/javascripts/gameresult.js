$(window).load(function() {
    $('#gameresultform').submit(function() {
        e.preventDefault();
      $.post('/gameresult', 
        { period : $(this).period.value,
          price : $(this).price.value 
        }   
      ).done;  

      $.get('/gameresult', 
        { period : $(this).period.value,
          price : $(this).price.value 
        }   ,(data)=>{}
      );  
      return false;
    }); 

    $("").tre
 });