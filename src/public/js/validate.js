$(document).ready(function () {
    
    var passInputNode = $('#pass')
    var userInputNode = $('#user')
    var apodoInputNode = $('#apodo')
    var submitButtonNode = $('#submitButton')
  
    passInputNode.keyup(validatePassField)

    userInputNode.keyup(validateUserField)
    
    apodoInputNode.keyup(validateUserField)
  
  
  
   
    /**
   * 
   *
   * @param {HTMLEvent} event
   */
  
    function validatePassField (event,num) {
      var inputNode = $(this)
  
   inputValue = inputNode.val()
     
  
      
  
      if (inputNode.val().length <= 6) {
        inputNode.addClass('is-invalid')
        inputNode.removeClass('is-valid')
  
        
      } else {
        inputNode.addClass('is-valid')
        inputNode.removeClass('is-invalid')
      }
  
     
    }

    function validateUserField (event) {
        var inputNode = $(this)
    
     inputValue = inputNode.val()
       
    
        
    
        if (inputNode.val().length <= 2) {
          inputNode.addClass('is-invalid')
          inputNode.removeClass('is-valid')
    
          
        } else {
          inputNode.addClass('is-valid')
          inputNode.removeClass('is-invalid')
        }
    
       
      }
    })
      