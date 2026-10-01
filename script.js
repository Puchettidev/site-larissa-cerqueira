const areas = {
  familia: {
    label: "Direito de Família",
    title: "Quando a decisão envolve afeto, patrimônio e futuro.",
    text:
      "Orientação para divórcio, guarda, pensão, inventário e organização de acordos familiares, com cuidado e estratégia.",
  },
  curatela: {
    label: "Curatela",
    title: "Proteção jurídica para decisões de cuidado e responsabilidade.",
    text:
      "Orientação sobre curatela, documentação, limites de atuação, proteção de patrimônio e acompanhamento familiar responsável.",
  },
  homecare: {
    label: "Home care",
    title: "Cuidado em casa também exige orientação e garantia de direitos.",
    text:
      "Análise de pedidos, negativas, contratos e documentos relacionados a atendimento domiciliar, continuidade de cuidado e cobertura de saúde.",
  },
  saude: {
    label: "Direito da Saúde",
    title: "Quando o acesso ao tratamento precisa de resposta jurídica.",
    text:
      "Apoio em situações envolvendo tratamento, medicamentos, exames, home care, negativas de cobertura e garantia de acesso à saúde.",
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
    "Divórcio",
    "Guarda e convivência com filhos",
    "Pensão alimentícia",
    "Inventário e partilha",
    "Acordo familiar",
  ],
  curatela: [
    "Pedido de curatela",
    "Documentos necessários",
    "Responsabilidade de familiares",
    "Proteção de bens",
    "Dúvida sobre cuidado e representação",
  ],
  homecare: [
    "Pedido de home care",
    "Negativa de cobertura",
    "Continuidade de tratamento",
    "Documentos médicos",
    "Contrato ou plano de saúde",
  ],
  saude: [
    "Negativa de tratamento",
    "Medicamento ou exame",
    "Home care",
    "Plano de saúde",
    "Urgência médica com impacto jurídico",
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

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const legalMap = document.querySelector(".legal-map");
const mapNodes = [...legalMap.querySelectorAll("[data-node]")];
const mapResult = legalMap.querySelector(".map-result");
const mapContent = mapResult.querySelector(".map-result-content");
let selectedMapArea = "";
let mapTransition;

function updateMap(key) {
  const selectedKey = Object.hasOwn(areas, key) ? key : "familia";
  const area = areas[selectedKey];
  mapResult.querySelector("[data-map-label]").textContent = area.label;
  mapResult.querySelector("[data-map-title]").textContent = area.title;
  mapResult.querySelector("[data-map-text]").textContent = area.text;

  mapNodes.forEach((node) => {
    const isActive = node.dataset.node === selectedKey;
    node.classList.toggle("active", isActive);
    node.setAttribute("aria-pressed", String(isActive));
  });

  mapTransition?.cancel();
  if (selectedMapArea && selectedMapArea !== selectedKey && !reducedMotion.matches) {
    mapTransition = mapContent.animate(
      [{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 260, easing: "ease-out" },
    );
  }
  selectedMapArea = selectedKey;
}

mapNodes.forEach((button) => {
  button.addEventListener("click", () => updateMap(button.dataset.node));
});

updateMap("familia");

function measureMapContent(width) {
  // Reserve the tallest answer once per resize, keeping the card stable on selection.
  const measurement = mapResult.cloneNode(true);
  measurement.removeAttribute("aria-live");
  measurement.setAttribute("aria-hidden", "true");
  Object.assign(measurement.style, {
    position: "absolute", width: `${width}px`, minHeight: "0", height: "auto",
    visibility: "hidden", pointerEvents: "none", transform: "none",
  });
  legalMap.appendChild(measurement);
  let height = 0;
  Object.values(areas).forEach((area) => {
    measurement.querySelector("[data-map-label]").textContent = area.label;
    measurement.querySelector("[data-map-title]").textContent = area.title;
    measurement.querySelector("[data-map-text]").textContent = area.text;
    height = Math.max(height, measurement.getBoundingClientRect().height);
  });
  measurement.remove();
  return Math.ceil(height) + 4;
}

function arrangeMap() {
  const width = legalMap.clientWidth;
  const radial = width >= 600 && window.innerWidth > 720;
  const cardWidth = radial ? Math.min(340, width * 0.47) : width - 36;
  const cardHeight = Math.max(280, measureMapContent(cardWidth));
  legalMap.style.setProperty("--map-card-width", `${cardWidth}px`);
  legalMap.style.setProperty("--map-card-height", `${cardHeight}px`);
  legalMap.classList.remove("is-radial");
  if (!radial || !mapNodes.length) return;

  const nodeSize = 108;
  const clearance = 16;
  const radiusX = (width - nodeSize) / 2 - 24;
  const angles = mapNodes.map((_, index) => -Math.PI / 2 + index * Math.PI * 2 / mapNodes.length);
  let radiusY = 250;
  angles.forEach((angle) => {
    if (Math.abs(Math.cos(angle) * radiusX) < cardWidth / 2 + nodeSize * 0.52 + clearance) {
      const sine = Math.abs(Math.sin(angle));
      radiusY = Math.max(radiusY, sine < 0.001 ? Infinity : (cardHeight / 2 + nodeSize * 0.52 + clearance) / sine);
    }
  });
  const positions = angles.map((angle) => ({ x: Math.cos(angle) * radiusX, y: Math.sin(angle) * radiusY }));
  const overlap = positions.some((point, index) => positions.slice(index + 1).some((other) =>
    Math.abs(point.x - other.x) < nodeSize * 1.04 + clearance &&
    Math.abs(point.y - other.y) < nodeSize * 1.04 + clearance,
  ));
  // A compact grid is safer than forcing a crowded orbit into a narrow container.
  if (!Number.isFinite(radiusY) || radiusY > 350 || overlap) {
    legalMap.style.setProperty("--map-card-height", `${Math.max(280, measureMapContent(width - 36))}px`);
    return;
  }

  const height = Math.ceil(radiusY * 2 + nodeSize + 48);
  legalMap.style.setProperty("--map-height", `${height}px`);
  legalMap.style.setProperty("--map-ring-width", `${radiusX * 2}px`);
  legalMap.style.setProperty("--map-ring-height", `${radiusY * 2}px`);
  positions.forEach((point, index) => {
    mapNodes[index].style.setProperty("--node-x", `${width / 2 + point.x}px`);
    mapNodes[index].style.setProperty("--node-y", `${height / 2 + point.y}px`);
  });
  legalMap.classList.add("is-radial");
}

const portraitOrbit = document.querySelector(".portrait-orbit");
const orbitChips = [...portraitOrbit.querySelectorAll(".orbit-chip")];
const orbitToggle = portraitOrbit.querySelector("[data-orbit-toggle]");
const mobileOrbit = window.matchMedia("(max-width: 720px)");
const hoverOrbit = window.matchMedia("(hover: hover)");
let orbitGeometry;
const orbitPhase = -Math.PI * 5 / 6;
const orbitDuration = 60000;
let orbitAnimations = [];
let orbitTime = 0;
let orbitVisible = false;
let orbitHovered = false;
let orbitFocused = false;
let orbitPaused = false;

function orbitTransform(index, progress) {
  const angle = orbitPhase + index * Math.PI * 2 / orbitChips.length + progress * Math.PI * 2;
  const { width, height } = orbitGeometry.items[index];
  const x = Math.cos(angle) * orbitGeometry.radiusX - width / 2;
  const y = Math.sin(angle) * orbitGeometry.radiusY - height / 2;
  const scale = 0.96 + Math.sin(angle) * 0.04;
  return `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
}

function syncOrbit() {
  const running = orbitGeometry && orbitVisible && !document.hidden &&
    !reducedMotion.matches && !orbitPaused && !orbitHovered && !orbitFocused;
  portraitOrbit.classList.toggle("is-moving", Boolean(running));
  orbitAnimations.forEach((animation) => {
    if (running && animation.playState !== "running") animation.play();
    if (!running && animation.playState !== "paused") animation.pause();
  });
}

function arrangeOrbit() {
  orbitTime = orbitAnimations[0]?.currentTime ?? orbitTime;
  orbitAnimations.forEach((animation) => animation.cancel());
  orbitAnimations = [];
  const fullOrbit = portraitOrbit.clientWidth >= 460 && !mobileOrbit.matches;
  portraitOrbit.classList.toggle("is-orbiting", fullOrbit);
  orbitToggle.hidden = !fullOrbit || reducedMotion.matches;
  orbitGeometry = null;
  if (fullOrbit) {
    const items = orbitChips.map((chip) => ({ width: chip.offsetWidth, height: chip.offsetHeight }));
    const radiusX = (portraitOrbit.clientWidth - Math.max(...items.map((item) => item.width))) / 2 - 12;
    const radiusY = (portraitOrbit.clientHeight - Math.max(...items.map((item) => item.height))) / 2 - 20;
    orbitGeometry = { radiusX, radiusY, items };
    portraitOrbit.style.setProperty("--orbit-width", `${radiusX * 2}px`);
    portraitOrbit.style.setProperty("--orbit-height", `${radiusY * 2}px`);
    // Calculate the path only on resize; native transform interpolation runs without a JS frame loop.
    orbitAnimations = orbitChips.map((chip, index) => {
      chip.style.transform = orbitTransform(index, 0);
      const keyframes = Array.from({ length: 241 }, (_, step) => ({ transform: orbitTransform(index, step / 240) }));
      const animation = chip.animate(keyframes, { duration: orbitDuration, iterations: Infinity, easing: "linear" });
      animation.pause();
      animation.currentTime = orbitTime;
      return animation;
    });
  } else {
    orbitChips.forEach((chip) => chip.style.removeProperty("transform"));
  }
  syncOrbit();
}

orbitToggle.addEventListener("click", () => {
  orbitPaused = !orbitPaused;
  const label = orbitPaused ? "Retomar movimento dos temas" : "Pausar movimento dos temas";
  orbitToggle.setAttribute("aria-pressed", String(orbitPaused));
  orbitToggle.setAttribute("aria-label", label);
  orbitToggle.title = label;
  orbitToggle.querySelector("[data-orbit-pause]").hidden = orbitPaused;
  orbitToggle.querySelector("[data-orbit-play]").hidden = !orbitPaused;
  syncOrbit();
});

portraitOrbit.addEventListener("pointerenter", (event) => {
  orbitHovered = hoverOrbit.matches && event.pointerType !== "touch";
  syncOrbit();
});
portraitOrbit.addEventListener("pointerleave", () => {
  orbitHovered = false;
  syncOrbit();
});
portraitOrbit.addEventListener("focusin", () => {
  orbitFocused = portraitOrbit.contains(document.activeElement) && document.activeElement !== orbitToggle;
  syncOrbit();
});
portraitOrbit.addEventListener("focusout", (event) => {
  orbitFocused = portraitOrbit.contains(event.relatedTarget) && event.relatedTarget !== orbitToggle;
  syncOrbit();
});
document.addEventListener("visibilitychange", syncOrbit);
reducedMotion.addEventListener("change", () => {
  mapTransition?.cancel();
  arrangeOrbit();
});
mobileOrbit.addEventListener("change", arrangeOrbit);

const orbitVisibility = new IntersectionObserver(([entry]) => {
  orbitVisible = entry.isIntersecting;
  syncOrbit();
});
orbitVisibility.observe(portraitOrbit);

let mapWidth = 0;
let orbitWidth = 0;
const geometryObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.target === legalMap && entry.contentRect.width !== mapWidth) {
      mapWidth = entry.contentRect.width;
      arrangeMap();
    }
    if (entry.target === portraitOrbit && entry.contentRect.width !== orbitWidth) {
      orbitWidth = entry.contentRect.width;
      arrangeOrbit();
    }
  });
});
geometryObserver.observe(legalMap);
geometryObserver.observe(portraitOrbit);
arrangeMap();
arrangeOrbit();
document.fonts.ready.then(() => {
  arrangeMap();
  arrangeOrbit();
});

document.querySelectorAll("[data-jump]").forEach((button) => {
  button.addEventListener("click", () => {
    updateMap(button.dataset.jump);
    document.querySelector("#mapa").scrollIntoView({ behavior: reducedMotion.matches ? "instant" : "smooth" });
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
      ["curatela", "Curatela"],
      ["homecare", "Home care"],
      ["saude", "Direito da Saúde"],
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

const lectureCarousel = document.querySelector("[data-carousel]");

if (lectureCarousel) {
  const slides = Array.from(lectureCarousel.querySelectorAll("[data-slide]"));
  const dots = Array.from(lectureCarousel.querySelectorAll("[data-carousel-dot]"));
  const prevButton = lectureCarousel.querySelector("[data-carousel-prev]");
  const nextButton = lectureCarousel.querySelector("[data-carousel-next]");
  let activeSlide = 0;

  function showLectureSlide(index) {
    activeSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === activeSlide);
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeSlide;
      dot.classList.toggle("active", isActive);
      if (isActive) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  }

  prevButton.addEventListener("click", () => showLectureSlide(activeSlide - 1));
  nextButton.addEventListener("click", () => showLectureSlide(activeSlide + 1));

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => showLectureSlide(dotIndex));
  });

  showLectureSlide(0);
}
