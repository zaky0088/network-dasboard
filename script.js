localStorage.clear()

let dataFiber = JSON.parse(localStorage.getItem("fiberData")) || [];

let editIndex = -1;

// TAMPILKAN DATA
function renderTable() {

  const tableBody = document.getElementById("tableBody");

  tableBody.innerHTML = "";

  dataFiber.forEach((item, index) => {

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.jalur}</td>
      <td>${item.odp}</td>
      <td>${item.core}</td>
      <td>${item.pot}</td>
      <td>${item.teknisi}</td>
      <td>${item.status}</td>

      <td>
        <button onclick="editData(${index})">
          Edit
        </button>

        <button onclick="hapusData(${index})">
          Hapus
        </button>
      </td>
    `;

    tableBody.appendChild(tr);
  });

  localStorage.setItem(
    "fiberData",
    JSON.stringify(dataFiber)
  );
}

// TAMBAH DATA
function tambahData() {

  const jalur = document.getElementById("jalur").value;
  const odp = document.getElementById("odp").value;
  const core = document.getElementById("core").value;
  const pot = document.getElementById("pot").value;
  const teknisi = document.getElementById("teknisi").value;
  const status = document.getElementById("status").value;

  const dataBaru = {
    jalur,
    odp,
    core,
    pot,
    teknisi,
    status
  };

  // JIKA EDIT
  if (editIndex >= 0) {

    dataFiber[editIndex] = dataBaru;

    editIndex = -1;

  } else {

    // TAMBAH BARU
    dataFiber.push(dataBaru);

  }

  // RESET INPUT
  document.getElementById("jalur").value = "";
  document.getElementById("odp").value = "";
  document.getElementById("core").value = "";
  document.getElementById("pot").value = "";
  document.getElementById("teknisi").value = "";

  renderTable();
}

// EDIT
function editData(index) {

  editIndex = index;

  const item = dataFiber[index];

  document.getElementById("jalur").value = item.jalur;
  document.getElementById("odp").value = item.odp;
  document.getElementById("core").value = item.core;
  document.getElementById("pot").value = item.pot;
  document.getElementById("teknisi").value = item.teknisi;
  document.getElementById("status").value = item.status;
}

// HAPUS
function hapusData(index) {

  dataFiber.splice(index, 1);

  renderTable();
}

renderTable();
