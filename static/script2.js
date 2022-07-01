init();

function init() {
  getPersons();
}

function getPersons() {
  httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", "/api/persons");
  httpRequest.onreadystatechange = doAfficherPersons;
  httpRequest.send();
}

function doAfficherPersons() {
  const table = document.getElementsByTagName("table")[0];

  rows = table.getElementsByClassName("row");
  for (row of rows) row.remove();

  lignes = 0;
  total_points = 0;

  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status == 200) {
      reponse = httpRequest.responseText;
      persons = JSON.parse(reponse);

      for (person of persons)
        doInsert(person.annee, person.matricule, person.nom, person.prenom, person.sexe, person.specialite, person.moyenne);
    } else {
      alert("Il y a un petit soucis");
    }
  }
}

function doInsertRowTable(annee, matricule, nom, prenom, sexe, specialite, moyenne) {
  const table = document.getElementsByTagName("table")[0];

  row = document.createElement("tr");

  row.setAttribute("class", "row");

  col1 = document.createElement("td");
  col2 = document.createElement("td");
  col3 = document.createElement("td");
  col4 = document.createElement("td");
  col5 = document.createElement("td");
  col6 = document.createElement("td");
  col7 = document.createElement("td");
  col8 = document.createElement("td");
  col9 = document.createElement("td");

  var btnEdit = document.createElement("button");
  btnEdit.innerText = "Edit";
  btnEdit.onclick = function () {
    editRow(btnEdit);
  };

  col1.innerText = annee;
  col2.innerText = matricule;
  col3.innerText = nom;
  col4.innerText = prenom;
  col5.innerText = sexe;
  col6.innerText = specialite;
  col7.innerText = moyenne;

  col1.setAttribute("class", "col_number");
  col2.setAttribute("class", "col_number");
  col3.setAttribute("class", "col_text");
  col4.setAttribute("class", "col_text");
  col5.setAttribute("class", "col_text");
  col6.setAttribute("class", "col_text");
  col7.setAttribute("class", "col_number");

  row.append(col1);
  row.append(col2);
  row.append(col3);
  row.append(col4);
  row.append(col5);
  row.append(col6);
  row.append(col7);

  table.append(row);
}

function doInsert(annee, matricule, nom, prenom, sexe, specialite, moyenne) {

  doInsertRowTable(annee, matricule, nom, prenom, sexe, specialite, moyenne);
}