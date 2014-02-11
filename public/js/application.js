$(document).ready(function() {
  $("#tweet").submit(function(e){
    e.preventDefault();
    $("img").show();
    $("#tweet").children().each(function(i,item){$(item).attr('disabled','disabled')});
    $(".container p").remove();

    $.post("/tweet",{tweet:$("#tweet_text").val()},function(){
      $("img").hide();
      $("#tweet_text").val("");
      $("#tweet").children().each(function(i,item){$(item).removeAttr('disabled')});
      $(".container").append("<p>Tweet sent successfully</p>");
    })
  });
});
