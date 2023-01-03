// on a affecter l url du fichier json a une variable 
 let jsonpath = '/fichier.json'
//  Create an XMLHttpRequest object
 var request = new XMLHttpRequest();
 
// open the request and  get data from fichier json 
 request.open('GET', jsonpath);
//  chose type of response  that we gone a receive 
 request.responseType = 'Json';
 request.send();
  

//   on va creer une variable pour stocker the data that we received 
request.onload = function() {
var data = JSON.parse(request.response);
console.log(data);
// loop in the variable and call a function to help creat  rows for chaque elementin the respons 
 for(var i = 0; i < data.length; i++) {
    creatrow(data[i]);
}
};

let table = document.getElementById("tbody");
let id = 0;
function creatrow(Json) {
  id++;
  let tr = document.createElement("tr");
  tr.setAttribute("id", "tr" + id);
  tr.innerHTML = `<td>${Json["Title"]}</td>
    <td>${Json["Director"]}</td>
    <td>${parseInt(Json["Runtime"])}</td>
    <td>${Json["Year"]}</td>
    <td><img src=${Json["Poster"]}" class="img-thumbnail"alt="movie poster" width="100px" height="100px"></td>`;
  tr.appendChild(listforfestivals(Json));
  tr.appendChild(actorslist(Json));
  table.appendChild(tr);


}

function actorslist(jsonObject){
    let actors, ul, li, td;
  td = document.createElement("td");
  ul = document.createElement("ul");
  ul.setAttribute("class","list-unstyled");
  actors = jsonObject["Actors"];
  for (let j = 0; j < actorslist.length; j++) {
    li = document.createElement("li");
    li.setAttribute("id", "li" + j);
    li.innerHTML = `${actors[j]["first-name"]} ${actors[j]["last-name"]},nationality:${actors[j]["nationality"]}`;
    ul.appendChild(li);
  }
  td.appendChild(ul);
  return td;
}


function listforfestivals(jsonObject) {
    let festivals, ul, li, td;
    festivals = jsonObject["festivals"];
    td = document.createElement("td");
    ul = document.createElement("ul");
    ul.setAttribute("class","list-unstyled");
    for (let j = 0; j < festivals.length; j++) {
      li = document.createElement("li");
      li.setAttribute("id", "li" + j);
      li.innerHTML = festivals[j];
      ul.appendChild(li);
    }
    td.appendChild(ul);
    return td;
  }

  function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("table");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}    

function sortnum(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("table");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = parseInt(rows[i].getElementsByTagName("TD")[n].innerHTML);
      y = parseInt(rows[i + 1].getElementsByTagName("TD")[n].innerHTML);
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x > y) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x < y) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
  
  
  function searchTable(){

    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("inputsearche");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  