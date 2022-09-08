var index = 0;
function addName(){
    var table = document.getElementById('recordTable');
    var row = table.insertRow(index);
    var rollno = row.insertCell(0);
    var name = row.insertCell(1);

    rollno.innerHTML = document.getElementById('rollno').value;
    name.innerHTML = document.getElementById('name').value;
    index++;
}

function removeName(){
    document.getElementById("recordTable").deleteRow(index-1);
    index--;
}