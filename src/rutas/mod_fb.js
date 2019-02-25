FB.init({
  appId  : '319173528950567',
  status : true, 
  cookie : true, 
  xfbml  : true  
});
document.getElementById("btnLoguearFB").onclick=()=>
{
FB.login((res)=>
{
console.log(res)
});
}