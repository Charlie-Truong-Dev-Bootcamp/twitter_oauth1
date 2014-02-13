$(document).ready(function() {
  $("#tweet").submit(function(e){
    e.preventDefault();
    $("img").show();
    $("#tweet").children().each(function(i,item){$(item).attr('disabled','disabled')});
    $(".container p").remove();

    $.post("/tweet",{tweet:$("#tweet_text").val()},function(response){
      console.log(response);
      var response_status = response.status;
      var error = response.error;
      console.log(response.error);
      if (response_status === true && error === null){
        $("img").hide();
        $("#tweet_text").val("");
        $("#tweet").children().each(function(i,item){$(item).removeAttr('disabled')});
        $(".container").append("<p>Tweet sent successfully</p>");
      }
      else if (error != null){
      $("img").hide();
      $("#tweet_text").val("");
        $("#tweet").children().each(function(i,item){$(item).removeAttr('disabled')});
       $(".container").append("<p>"+ error +"</p>"); 
      }
      else{
        getStatus(response);
      }
    });
  });
});

var getStatus = function(response){
  $.get("/status/"+response.job_id,function(info) {
    if(info.status===true && info.error === null){
      $("img").hide();
      $("#tweet_text").val("");
      $("#tweet").children().each(function(i,item){$(item).removeAttr('disabled')});
      $(".container").append("<p>Tweet sent successfully</p>");
      response_status = true;
    }
    else if (info.error != null){
      $("img").hide();
      $("#tweet_text").val("");
        $("#tweet").children().each(function(i,item){$(item).removeAttr('disabled')});
      $(".container").append("<p>"+ info.error +"</p>"); 
    }
    else{
      setTimeout(function(){
        getStatus(response);
      },10000);
    }
  })
}
