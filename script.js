let dataFiber = JSON.parse(localStorage.getItem("fiberData")) || [];

function renderTable() {

  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  let totalCore = 0;
  let jalurPutus = 0;

  dataFiber.forEach((item, index) => {

    totalCore += Number(item.core);

    if (item.status === "Putus") {
      jalurPutus++;
    }

    const tr = document.createElement("tr");

    let statusClass = "active";

    if (item.status === "Maintenance") {
      statusClass = "maintenance";
    }

    if (item.status === "Putus") {
      statusClass = "putus";
    }

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
        <button class="edit" onclick="editData(${index})">Edit</button>
        <button class="delete" onclick="hapusData(${index})">Hapus</button>
      </td>
    `;

    tableBody.appendChild(tr);
  });

  document.getElementById("totalJalur").innerText = dataFiber.length;
  document.getElementById("totalCore").innerText = totalCore;
  document.getElementById("jalurPutus").innerText = jalurPutus;

  localStorage.setItem("fiberData", JSON.stringify(dataFiber));
}

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

  // MODE EDIT
  if (editIndex !== -1) {

    dataFiber[editIndex] = dataBaru;
    editIndex = -1;

  } else {

    // MODE TAMBAH
    dataFiber.push(dataBaru);

  }

  renderTable();

  document.getElementById("jalur").value = "";
  document.getElementById("odp").value = "";
  document.getElementById("core").value = "";
  document.getElementById("pot").value = "";
  document.getElementById("teknisi").value = "";
}

function editData(index) {

  const item = dataFiber[index];

  document.getElementById("jalur").value = item.jalur;
  document.getElementById("odp").value = item.odp;
  document.getElementById("core").value = item.core;
  document.getElementById("pot").value = item.pot;
  document.getElementById("teknisi").value = item.teknisi;
  document.getElementById("status").value = item.status;

  // SIMPAN INDEX YANG DIEDIT
  editIndex = index;
}

// SEARCH

document.getElementById("search").addEventListener("keyup", function() {

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

  const jam = now.toLocaleTimeString("id-ID");

  document.getElementById("jam").innerText = jam;
}

setInterval(updateJam, 1000);
updateJam();

renderTable();
