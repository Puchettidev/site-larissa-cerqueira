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
  patrimonio: {
    label: "Patrimônio",
    title: "Organização e proteção de bens com segurança jurídica.",
    text:
      "Orientação sobre patrimônio familiar, bens, documentos, contratos, partilhas e medidas preventivas para reduzir riscos.",
  },
  consultoria: {
    label: "Consultoria Jurídica",
    title: "Prevenir também é uma forma de defender direitos.",
    text:
      "Leitura estratégica de documentos, riscos e decisões importantes, antes que o problema cresça.",
  },
};

const areaSubjects = {
  familia: [
    "Divórcio ou separação",
    "Guarda e convivência com filhos",
    "Pensão alimentícia",
    "Inventário e partilha",
    "Acordo familiar",
  ],
  idoso: [
    "Proteção contra abuso ou negligência",
    "Direitos da pessoa idosa",
    "Conflito familiar envolvendo cuidado",
    "Patrimônio da pessoa idosa",
    "Orientação para familiares",
  ],
  consumidor: [
    "Cobrança indevida",
    "Problema com banco ou cartão",
    "Produto ou serviço com defeito",
    "Contrato abusivo",
    "Negativação indevida",
  ],
  trabalho: [
    "Rescisão ou verbas trabalhistas",
    "Acordo trabalhista",
    "Reconhecimento de vínculo",
    "Documentos e provas",
    "Dúvida sobre direitos",
  ],
  civil: [
    "Contrato",
    "Indenização ou dano",
    "Cobrança",
    "Conflito entre pessoas",
    "Notificação ou acordo",
  ],
  patrimonio: [
    "Organização de bens",
    "Partilha patrimonial",
    "Proteção patrimonial familiar",
    "Contrato envolvendo patrimônio",
    "Prevenção de riscos",
  ],
  consultoria: [
    "Análise de documento",
    "Prevenção de problema",
    "Orientação antes de assinar contrato",
    "Dúvida sobre qual caminho seguir",
    "Outro assunto",
  ],
};

const urgencyLabels = {
  urgente: "Urgência: resolver rápido",
  importante: "Urgência: organizar com cuidado",
  preventivo: "Urgência: prevenir riscos",
};

const modeLabels = {
  whatsapp: "Encaminhamento: WhatsApp",
  presencial: "Encaminhamento: WhatsApp para combinar atendimento presencial em Muriaé",
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

const chatSteps = [
  {
    message: "Primeiro, qual tema mais parece com o seu caso?",
    key: "area",
    options: [
      ["familia", "Família"],
      ["idoso", "Pessoa idosa"],
      ["consumidor", "Consumidor"],
      ["trabalho", "Trabalho"],
      ["civil", "Civil"],
      ["patrimonio", "Patrimônio"],
      ["consultoria", "Não sei ainda"],
    ],
  },
  {
    message: "Dentro desse tema, qual assunto mais se aproxima do que você precisa?",
    key: "subject",
    options: (state) => (areaSubjects[state.area] || areaSubjects.consultoria).map((subject) => [subject]),
  },
  {
    message: "Esse assunto precisa de atenção rápida?",
    key: "urgency",
    options: [
      ["urgente", "Sim, é urgente"],
      ["importante", "É importante, mas posso organizar"],
      ["preventivo", "Quero evitar problemas"],
    ],
  },
  {
    message: "Você já tem documentos, prints, contrato ou alguma notificação sobre o caso?",
    key: "docs",
    options: [
      ["Tenho documentos ou prints"],
      ["Ainda não tenho documentos"],
      ["Não tenho certeza"],
    ],
  },
  {
    message: "Como prefere seguir? O resumo será enviado pelo WhatsApp da Dra. Larissa.",
    key: "mode",
    options: [
      ["whatsapp", "Enviar agora pelo WhatsApp"],
      ["presencial", "Quero combinar atendimento presencial"],
    ],
  },
];

const chatState = {};
let chatStepIndex = 0;

const chatToggle = document.querySelector("[data-chat-toggle]");
const chatClose = document.querySelector("[data-chat-close]");
const chatPanel = document.querySelector("[data-chat-panel]");
const chatMessage = document.querySelector("[data-chat-message]");
const chatOptions = document.querySelector("[data-chat-options]");

function renderChatStep() {
  const step = chatSteps[chatStepIndex];

  if (!step) {
    const area = areas[chatState.area] || areas.consultoria;
    const summary = [
      "Olá, Dra. Larissa. Conversei com o assistente do site.",
      `Tema indicado: ${area.label}.`,
      `Assunto: ${chatState.subject || "a informar"}.`,
      `${urgencyLabels[chatState.urgency] || "Urgência: a definir"}.`,
      `Documentos: ${chatState.docs || "a informar"}.`,
      `${modeLabels[chatState.mode] || "Preferência: a definir"}.`,
      "Gostaria de receber orientação sobre os próximos passos.",
    ].join(" ");

    chatMessage.textContent =
      "Pronto. Organizei um resumo inicial para enviar pelo WhatsApp. A análise jurídica será feita pela Dra. Larissa.";
    chatOptions.innerHTML = "";

    const link = document.createElement("a");
    link.className = "primary";
    link.href = `https://wa.me/5532999304225?text=${encodeURIComponent(summary)}`;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "Enviar resumo pelo WhatsApp";
    chatOptions.appendChild(link);

    const restart = document.createElement("button");
    restart.type = "button";
    restart.textContent = "Refazer triagem";
    restart.addEventListener("click", resetChat);
    chatOptions.appendChild(restart);
    return;
  }

  chatMessage.textContent = step.message;
  chatOptions.innerHTML = "";

  const options = typeof step.options === "function" ? step.options(chatState) : step.options;

  options.forEach(([value, label]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label || value;
    button.addEventListener("click", () => {
      chatState[step.key] = value;
      chatStepIndex += 1;
      renderChatStep();
    });
    chatOptions.appendChild(button);
  });
}

function resetChat() {
  Object.keys(chatState).forEach((key) => delete chatState[key]);
  chatStepIndex = 0;
  renderChatStep();
}

chatToggle.addEventListener("click", () => {
  const isOpening = chatPanel.hidden;
  chatPanel.hidden = !isOpening;
  chatToggle.setAttribute("aria-expanded", String(isOpening));
  if (isOpening) renderChatStep();
});

chatClose.addEventListener("click", () => {
  chatPanel.hidden = true;
  chatToggle.setAttribute("aria-expanded", "false");
});
