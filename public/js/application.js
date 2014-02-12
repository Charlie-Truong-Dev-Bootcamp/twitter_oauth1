$(document).ready(function() {
  $("#tweet").submit(function(e){
    e.preventDefault();
    $("img").show();
    $("#tweet").children().each(function(i,item){$(item).attr('disabled','disabled')});
    $(".container p").remove();

    $.post("/tweet",{tweet:$("#tweet_text").val()},function(response){
      console.log(response);
      var response_status = response.status;
      if (response_status === true){
        $("img").hide();
        $("#tweet_text").val("");
        $("#tweet").children().each(function(i,item){$(item).removeAttr('disabled')});
        $(".container").append("<p>Tweet sent successfully</p>");
      }
      else{
        getStatus(response);
      }
    });
  });
});

var getStatus = function(response){
  $.get("/status/"+response.job_id,function(status) {
    if(status==="true"){
      $("img").hide();
      $("#tweet_text").val("");
      $("#tweet").children().each(function(i,item){$(item).removeAttr('disabled')});
      $(".container").append("<p>Tweet sent successfully</p>");
      response_status = true;
    }
    else{
      console.log("Need to check again.")
      setTimeout(function(){
        getStatus(response);
      },10000);
    }
  })
}
