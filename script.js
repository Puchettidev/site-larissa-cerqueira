const areas = {
  familia: {
    label: "Direito de Família",
    title: "Quando a decisão envolve afeto, patrimônio e futuro.",
    text:
      "Orientação para divórcio, guarda, pensão, inventário e organização de acordos familiares, com cuidado e estratégia.",
  },
  idoso: {
    label: "Direito da Pessoa Idosa",
    title: "Proteção, dignidade e segurança para quem precisa de cuidado.",
    text:
      "Apoio em medidas de proteção, direitos sociais, conflitos familiares, patrimônio e situações de abuso ou negligência.",
  },
  consumidor: {
    label: "Direito do Consumidor",
    title: "Quando uma compra, cobrança ou serviço passa do limite.",
    text:
      "Análise de cobranças indevidas, falhas de serviço, problemas com bancos, contratos e práticas abusivas.",
  },
  trabalho: {
    label: "Direito Trabalhista",
    title: "Direitos, acordos e segurança em relações de trabalho.",
    text:
      "Orientação sobre verbas, acordos, rescisão, vínculo, documentos e caminhos para resolver conflitos trabalhistas.",
  },
  civil: {
    label: "Direito Civil",
    title: "Conflitos, contratos e responsabilidades do cotidiano.",
    text:
      "Atuação em contratos, indenizações, danos, cobranças, conflitos entre pessoas e organização jurídica de relações civis.",
  },
  consultoria: {
    label: "Consultoria Jurídica",
    title: "Prevenir também é uma forma de defender direitos.",
    text:
      "Leitura estratégica de documentos, riscos e decisões importantes, antes que o problema cresça.",
  },
};

const urgencyLabels = {
  urgente: "Urgência: resolver rápido",
  importante: "Urgência: organizar com cuidado",
  preventivo: "Urgência: prevenir riscos",
};

const modeLabels = {
  whatsapp: "Preferência: WhatsApp",
  online: "Preferência: atendimento online",
  presencial: "Preferência: presencial em Muriaé",
};

const answers = {
  area: "",
  urgency: "",
  mode: "",
};

const questionCards = [...document.querySelectorAll(".question-card")];
const resultCard = document.querySelector("[data-result]");
const progressDots = [...document.querySelectorAll("[data-step-dot]")];
const whatsappLink = document.querySelector("[data-whatsapp]");

function showStep(step) {
  questionCards.forEach((card) => {
    card.classList.toggle("active", card.dataset.step === String(step));
  });
  resultCard.hidden = true;
  resultCard.classList.remove("active");
  progressDots.forEach((dot) => {
    dot.classList.toggle("active", Number(dot.dataset.stepDot) <= step);
  });
}

function showResult() {
  const area = areas[answers.area] || areas.consultoria;
  questionCards.forEach((card) => card.classList.remove("active"));
  progressDots.forEach((dot) => dot.classList.add("active"));

  document.querySelector("[data-result-title]").textContent = area.label;
  document.querySelector("[data-result-text]").textContent = area.text;
  document.querySelector("[data-result-urgency]").textContent =
    urgencyLabels[answers.urgency] || "Urgência: a definir";
  document.querySelector("[data-result-mode]").textContent =
    modeLabels[answers.mode] || "Preferência: a definir";

  const message = [
    "Olá, Dra. Larissa. Vim pelo site e fiz o diagnóstico inicial.",
    `Área indicada: ${area.label}.`,
    `${urgencyLabels[answers.urgency] || "Urgência: a definir"}.`,
    `${modeLabels[answers.mode] || "Preferência: a definir"}.`,
    "Gostaria de apresentar meu caso.",
  ].join(" ");

  whatsappLink.href = `https://wa.me/5532999304225?text=${encodeURIComponent(message)}`;
  resultCard.hidden = false;
  resultCard.classList.add("active");
}

document.querySelectorAll("[data-step] [data-answer]").forEach((button) => {
  button.addEventListener("click", () => {
    const step = Number(button.closest("[data-step]").dataset.step);

    if (step === 1) {
      answers.area = button.dataset.answer;
      showStep(2);
    }

    if (step === 2) {
      answers.urgency = button.dataset.answer;
      showStep(3);
    }

    if (step === 3) {
      answers.mode = button.dataset.answer;
      showResult();
    }
  });
});

document.querySelector("[data-restart]").addEventListener("click", () => {
  answers.area = "";
  answers.urgency = "";
  answers.mode = "";
  showStep(1);
});

function updateMap(key) {
  const area = areas[key] || areas.familia;
  document.querySelector("[data-map-label]").textContent = area.label;
  document.querySelector("[data-map-title]").textContent = area.title;
  document.querySelector("[data-map-text]").textContent = area.text;

  document.querySelectorAll("[data-node]").forEach((node) => {
    node.classList.toggle("active", node.dataset.node === key);
  });
}

document.querySelectorAll("[data-node]").forEach((button) => {
  button.addEventListener("click", () => updateMap(button.dataset.node));
});

document.querySelectorAll("[data-jump]").forEach((button) => {
  button.addEventListener("click", () => {
    updateMap(button.dataset.jump);
    document.querySelector("#mapa").scrollIntoView({ behavior: "smooth" });
  });
});

showStep(1);
