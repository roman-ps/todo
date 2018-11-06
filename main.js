var newElement = document.createElement('p');
//var mesto = document.body;
var input = document.querySelector(".input");

newElement.className = "new";
newElement.innerHTML = "Ура получилось!";
//document.body.appendChild(div1);

input.addEventListener("dblclick", function(event) {
  event.preventDefault;
  document.body.appendChild(newElement);
});

input.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
      document.body.appendChild(newElement);
      }
})