// LOAD DATA
let dataFiber = JSON.parse(localStorage.getItem("fiberData")) || [];

// MODE EDIT
let currentEdit = null;

// RENDER TABLE
function renderTable() {

  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  let totalCore = 0;
  let jalurPutus = 0;

  dataFiber.forEach((item, index) => {

    totalCore += Number(item.core || 0);

    if (item.status === "Putus") {
      jalurPutus++;
    }

    let statusClass = "active";

    if (item.status === "Maintenance") {
      statusClass = "maintenance";
    }

    if (item.status === "Putus") {
      statusClass = "putus";
    }

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.jalur}</td>
      <td>${item.odp}</td>
      <td>${item.core}</td>
      <td>${item.pot}</td>
      <td>${item.teknisi}</td>

      <td class="${statusClass}">
        ${item.status}
      </td>

      <td>
        <button class="edit" onclick="editData(${index})">
          Edit
        </button>

        <button class="delete" onclick="hapusData(${index})">
          Hapus
        </button>
      </td>
    `;

    tableBody.appendChild(tr);
  });

  // UPDATE CARD
  document.getElementById("totalJalur").innerText = dataFiber.length;
  document.getElementById("totalCore").innerText = totalCore;
  document.getElementById("jalurPutus").innerText = jalurPutus;

  // SAVE
  localStorage.setItem("fiberData", JSON.stringify(dataFiber));
}

// TAMBAH / UPDATE DATA
function tambahData() {

  const jalur = document.getElementById("jalur").value;
  const odp = document.getElementById("odp").value;
  const core = document.getElementById("core").value;
  const pot = document.getElementById("pot").value;
  const teknisi = document.getElementById("teknisi").value;
  const status = document.getElementById("status").value;

  if (!jalur || !odp) {
    alert("Isi data dulu");
    return;
  }

  const dataBaru = {
    jalur,
    odp,
    core,
    pot,
    teknisi,
    status
  };

  // JIKA EDIT
  if (currentEdit !== null) {

    dataFiber[currentEdit] = dataBaru;

    currentEdit = null;

    document.getElementById("btnTambah").innerText = "Tambah";

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

// EDIT DATA
function editData(index) {

  currentEdit = index;

  const item = dataFiber[index];

  document.getElementById("jalur").value = item.jalur;
  document.getElementById("odp").value = item.odp;
  document.getElementById("core").value = item.core;
  document.getElementById("pot").value = item.pot;
  document.getElementById("teknisi").value = item.teknisi;
  document.getElementById("status").value = item.status;

  document.getElementById("btnTambah").innerText = "Update";
}

// HAPUS DATA
function hapusData(index) {

  dataFiber.splice(index, 1);

  renderTable();
}

// SEARCH

document.getElementById("search")
.addEventListener("keyup", function() {

  const keyword = this.value.toLowerCase();

  const rows = document.querySelectorAll("tbody tr");

  rows.forEach(row => {

    const text = row.innerText.toLowerCase();

    if (text.includes(keyword)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});

// JAM DIGITAL
function updateJam() {

  const now = new Date();

  document.getElementById("jam").innerText =
    now.toLocaleTimeString("id-ID");
}

setInterval(updateJam, 1000);
updateJam();

// BUTTON EVENT

document.getElementById("btnTambah")
.addEventListener("click", tambahData);

// START
renderTable();
