document.addEventListener("DOMContentLoaded", () => {

  const horarios = [
    "09:00","10:00","11:00",
    "12:00","13:00","14:00",
    "15:00","16:00","17:00","18:00"
  ];

  const horariosOcupados = {};
  const numeroWhatsApp = "5511972776263";

  const listaHorarios = document.getElementById("lista-horarios");
  const dataInput = document.getElementById("data");
  const btn = document.querySelector(".btn-agendar");
  let horarioSelecionado = "";

  (function setMinDate() {
    const hoje = new Date();
    const yyyy = hoje.getFullYear();
    const mm = String(hoje.getMonth()+1).padStart(2,"0");
    const dd = String(hoje.getDate()).padStart(2,"0");
    dataInput.min = `${yyyy}-${mm}-${dd}`;
  })();

  dataInput.addEventListener("change", () => {
    listaHorarios.innerHTML = "";
    horarioSelecionado = "";

    const dataVal = dataInput.value;
    if (!dataVal) return;

    const dataObj = new Date(dataVal + "T00:00:00");
    const dia = dataObj.getDay();

    if (dia === 0 || dia === 1) {
      alert("Agendamentos apenas de Terça a Sábado.");
      dataInput.value = "";
      return;
    }

    const ocupados = horariosOcupados[dataVal] || [];

    horarios.forEach(h => {
      const el = document.createElement("div");
      el.className = "horario";
      el.textContent = h;

      if (ocupados.includes(h)) {
        el.classList.add("ocupado");
      } else {
        el.addEventListener("click", () => {
          document.querySelectorAll(".horario").forEach(x => x.classList.remove("selecionado"));
          el.classList.add("selecionado");
          horarioSelecionado = h;
        });
      }

      listaHorarios.appendChild(el);
    });
  });

  // BOTÃO → WhatsApp
  btn.addEventListener("click", () => {

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const servico = document.getElementById("servico").value;
    const data = dataInput.value;

    if (!nome || !telefone || !servico || !data) {
      alert("Preencha todos os campos.");
      return;
    }

    if (!horarioSelecionado) {
      alert("Escolha um horário.");
      return;
    }

    if (!horariosOcupados[data]) horariosOcupados[data] = [];
    horariosOcupados[data].push(horarioSelecionado);

    const mensagem = `
*NOVO AGENDAMENTO — Studio Victor & Bia*
Nome: ${nome}
Telefone: ${telefone}
Serviço: ${servico}
Data: ${data}
Horário: ${horarioSelecionado}
`.trim();

    const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    window.location.href = link; // <-- funciona no iPhone!
  });

});