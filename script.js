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
    title: "Cuidado em casa também envolve direitos que merecem orientação.",
    text:
      "Análise de pedidos, negativas, contratos e documentos relacionados a atendimento domiciliar, continuidade de cuidado e cobertura de saúde.",
  },
  saude: {
    label: "Direito da Saúde",
    title: "Quando o acesso ao tratamento precisa de resposta jurídica.",
    text:
      "Apoio em situações envolvendo tratamento, medicamentos, exames, home care, negativas de cobertura e acesso à saúde.",
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
  urgente: "Urgência: atenção rápida",
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
    "Olá, Dra. Larissa. Vim pelo site e fiz a orientação inicial.",
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
  const mapWhatsapp = mapResult.querySelector("[data-map-whatsapp]");
  if (mapWhatsapp) {
    const text = `Olá, Dra. Larissa. Vim pelo site e gostaria de conversar sobre ${area.label}.`;
    mapWhatsapp.href = `https://wa.me/5532999304225?text=${encodeURIComponent(text)}`;
  }

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

// Hero orbit: rotation lives in CSS; JS only eases the speed, pauses and
// stops it while off-screen.
const portraitOrbit = document.querySelector("[data-orbit]");
const orbitToggle = portraitOrbit.querySelector("[data-orbit-toggle]");
const hoverOrbit = window.matchMedia("(hover: hover)");
let orbitRate = 1;
let orbitTarget = 1;
let orbitFrame = 0;
let orbitHovered = false;
let orbitFocused = false;

function orbitAnimations() {
  return portraitOrbit.getAnimations({ subtree: true }).filter((animation) =>
    /^orbit-/.test(animation.animationName || ""),
  );
}

function easeOrbitTo(target) {
  orbitTarget = target;
  if (orbitFrame) return;
  let last = performance.now();
  const step = (now) => {
    const delta = Math.min(64, now - last);
    last = now;
    orbitRate += (orbitTarget - orbitRate) * Math.min(1, delta / 260);
    if (Math.abs(orbitTarget - orbitRate) < 0.01) orbitRate = orbitTarget;
    orbitAnimations().forEach((animation) => {
      animation.playbackRate = orbitRate;
    });
    orbitFrame = orbitRate === orbitTarget ? 0 : requestAnimationFrame(step);
  };
  orbitFrame = requestAnimationFrame(step);
}

function syncOrbitSpeed() {
  easeOrbitTo(orbitHovered || orbitFocused ? 0.2 : 1);
}

orbitToggle.addEventListener("click", () => {
  const paused = portraitOrbit.classList.toggle("is-paused");
  const label = paused ? "Retomar movimento dos temas" : "Pausar movimento dos temas";
  orbitToggle.setAttribute("aria-pressed", String(paused));
  orbitToggle.setAttribute("aria-label", label);
  orbitToggle.title = label;
  orbitToggle.querySelector("[data-orbit-pause]").hidden = paused;
  orbitToggle.querySelector("[data-orbit-play]").hidden = !paused;
});

portraitOrbit.addEventListener("pointerenter", (event) => {
  orbitHovered = hoverOrbit.matches && event.pointerType !== "touch";
  syncOrbitSpeed();
});
portraitOrbit.addEventListener("pointerleave", () => {
  orbitHovered = false;
  syncOrbitSpeed();
});
portraitOrbit.addEventListener("focusin", (event) => {
  orbitFocused = event.target.classList.contains("orbit-chip");
  syncOrbitSpeed();
});
portraitOrbit.addEventListener("focusout", (event) => {
  orbitFocused = Boolean(event.relatedTarget?.classList?.contains("orbit-chip"));
  syncOrbitSpeed();
});

new IntersectionObserver(([entry]) => {
  portraitOrbit.classList.toggle("is-offscreen", !entry.isIntersecting);
}).observe(portraitOrbit);

reducedMotion.addEventListener("change", () => mapTransition?.cancel());

// The map is measured once its width is known and again only if the web
// fonts arrive after that first measurement (text metrics change).
let mapWidth = 0;
let mapMeasuredWithFonts = false;
function arrangeMapOnce() {
  mapMeasuredWithFonts =
    document.fonts.check('600 16px "Cormorant Garamond"') && document.fonts.check("600 16px Inter");
  arrangeMap();
}
// The first arrangement happens in its own task (keeps script evaluation
// short) with transitions off, so the nodes do not animate into place.
legalMap.classList.add("is-settling");
new ResizeObserver(([entry]) => {
  if (Math.abs(entry.contentRect.width - mapWidth) > 0.5) {
    mapWidth = entry.contentRect.width;
    arrangeMapOnce();
  }
  if (legalMap.classList.contains("is-settling")) {
    requestAnimationFrame(() => requestAnimationFrame(() => legalMap.classList.remove("is-settling")));
  }
}).observe(legalMap);
document.fonts.ready.then(() => {
  if (!mapMeasuredWithFonts) arrangeMapOnce();
});

document.querySelectorAll("[data-jump]").forEach((button) => {
  button.addEventListener("click", () => {
    updateMap(button.dataset.jump);
    document.querySelector("#mapa").scrollIntoView({ behavior: reducedMotion.matches ? "instant" : "smooth" });
  });
});

// Google Maps iframe only loads when its section approaches the viewport.
const mapFrame = document.querySelector(".compact-map iframe[data-src]");
if (mapFrame) {
  const loadMap = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    mapFrame.src = mapFrame.dataset.src;
    mapFrame.removeAttribute("data-src");
    loadMap.disconnect();
  }, { rootMargin: "300px 0px" });
  loadMap.observe(mapFrame);
}

// Sections fade up as they enter the viewport.
if (!reducedMotion.matches && "IntersectionObserver" in window) {
  const revealTargets = [...document.querySelectorAll("main > section:not(.hero)")];
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      reveal.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  revealTargets.forEach((section) => {
    section.classList.add("reveal");
    reveal.observe(section);
  });
}

// On phones, keep the assistant out of the way of the hero and contact buttons.
const chatWidget = document.querySelector("[data-chat-widget]");
const phone = window.matchMedia("(max-width: 720px)");
const guardedSections = [document.querySelector(".hero"), document.querySelector("#contato")];
const guardedVisible = new Set();
function syncChatTuck() {
  const panelOpen = !document.querySelector("[data-chat-panel]").hidden;
  chatWidget.classList.toggle("is-tucked", phone.matches && !panelOpen && guardedVisible.size > 0);
}
const chatGuard = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) guardedVisible.add(entry.target);
    else guardedVisible.delete(entry.target);
  });
  syncChatTuck();
});
guardedSections.filter(Boolean).forEach((section) => chatGuard.observe(section));
phone.addEventListener("change", syncChatTuck);

showStep(1);

const chatSteps = [
  {
    message: "Sobre qual tema você quer falar?",
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
let chatStepIndex = -1;
let chatOpener = null;

const chatToggle = document.querySelector("[data-chat-toggle]");
const chatClose = document.querySelector("[data-chat-close]");
const chatPanel = document.querySelector("[data-chat-panel]");
const chatBackdrop = document.querySelector("[data-chat-backdrop]");
const chatMessage = document.querySelector("[data-chat-message]");
const chatOptions = document.querySelector("[data-chat-options]");
const chatProgress = document.querySelector("[data-chat-progress]");
const chatWhatsappBase = "https://wa.me/5532999304225?text=";

function chatButton(label, onClick, className = "") {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  if (className) button.className = className;
  button.addEventListener("click", onClick);
  return button;
}

function chatLink(label, text) {
  const link = document.createElement("a");
  link.className = "primary";
  link.href = chatWhatsappBase + encodeURIComponent(text);
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = label;
  return link;
}

function focusFirstChatOption() {
  chatOptions.querySelector("button, a")?.focus({ preventScroll: true });
}

function renderChatStep() {
  chatOptions.innerHTML = "";
  chatOptions.classList.remove("is-stacked");

  if (chatStepIndex === -1) {
    chatProgress.textContent = "Resumo do seu caso para o WhatsApp";
    chatMessage.textContent = "Olá! Posso te ajudar a enviar um resumo do seu caso pelo WhatsApp.";
    chatOptions.classList.add("is-stacked");
    chatOptions.append(
      chatButton("Começar resumo", () => { chatStepIndex = 0; renderChatStep(); focusFirstChatOption(); }, "primary"),
      chatLink("Falar direto no WhatsApp", "Olá, vim pelo site e gostaria de agendar uma consulta."),
    );
    return;
  }

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
    chatProgress.textContent = "Resumo pronto";
    chatMessage.textContent =
      "Pronto! Seu resumo está organizado. A análise do caso é feita em consulta agendada (paga); valores e horários são informados no primeiro contato.";
    chatOptions.classList.add("is-stacked");
    chatOptions.append(chatLink("Enviar resumo pelo WhatsApp", summary), chatButton("Recomeçar", resetChat));
    return;
  }

  chatProgress.textContent = `Passo ${chatStepIndex + 1} de ${chatSteps.length}`;
  chatMessage.textContent = step.message;
  const options = typeof step.options === "function" ? step.options(chatState) : step.options;
  options.forEach(([value, label]) => {
    chatOptions.appendChild(chatButton(label || value, () => {
      chatState[step.key] = value;
      chatStepIndex += 1;
      renderChatStep();
      focusFirstChatOption();
    }));
  });
}

function resetChat() {
  Object.keys(chatState).forEach((key) => delete chatState[key]);
  chatStepIndex = -1;
  renderChatStep();
  focusFirstChatOption();
}

function openChat() {
  chatOpener = document.activeElement instanceof HTMLElement ? document.activeElement : chatToggle;
  chatPanel.hidden = false;
  chatBackdrop.hidden = !phone.matches;
  chatWidget.classList.add("is-open");
  chatToggle.setAttribute("aria-expanded", "true");
  renderChatStep();
  requestAnimationFrame(() => chatPanel.classList.add("is-visible"));
  focusFirstChatOption();
  syncChatTuck();
}

function closeChat() {
  if (chatPanel.hidden) return;
  chatPanel.classList.remove("is-visible");
  chatPanel.hidden = true;
  chatBackdrop.hidden = true;
  chatWidget.classList.remove("is-open");
  chatToggle.setAttribute("aria-expanded", "false");
  (chatOpener && document.contains(chatOpener) ? chatOpener : chatToggle).focus({ preventScroll: true });
  syncChatTuck();
}

chatToggle.addEventListener("click", () => (chatPanel.hidden ? openChat() : closeChat()));
chatClose.addEventListener("click", closeChat);
chatBackdrop.addEventListener("click", closeChat);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !chatPanel.hidden) {
    event.preventDefault();
    closeChat();
  }
});
document.addEventListener("pointerdown", (event) => {
  if (!chatPanel.hidden && !chatWidget.contains(event.target)) closeChat();
});

const lectureCarousel = document.querySelector("[data-carousel]");

if (lectureCarousel) {
  const slides = Array.from(lectureCarousel.querySelectorAll("[data-slide]"));
  const dots = Array.from(lectureCarousel.querySelectorAll("[data-carousel-dot]"));
  const prevButton = lectureCarousel.querySelector("[data-carousel-prev]");
  const nextButton = lectureCarousel.querySelector("[data-carousel-next]");
  const stage = lectureCarousel.querySelector("[data-carousel-stage]");
  const current = lectureCarousel.querySelector("[data-carousel-current]");
  const autoplayDelay = 6000;
  let activeSlide = 0;
  let autoplayTimer = 0;
  let carouselVisible = false;
  let carouselHeld = false;

  function showLectureSlide(index) {
    const previous = activeSlide;
    activeSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === activeSlide);
      slide.classList.toggle("leaving", slideIndex === previous && previous !== activeSlide);
      slide.setAttribute("aria-hidden", String(slideIndex !== activeSlide));
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeSlide;
      dot.classList.toggle("active", isActive);
      if (isActive) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });

    if (current) current.textContent = String(activeSlide + 1).padStart(2, "0");
    restartAutoplay();
  }

  function restartAutoplay() {
    clearTimeout(autoplayTimer);
    lectureCarousel.classList.remove("is-timing");
    const canPlay = carouselVisible && !carouselHeld && !reducedMotion.matches && !document.hidden;
    if (!canPlay) return;
    // Restart the progress bar on the active dot.
    void lectureCarousel.offsetWidth;
    lectureCarousel.classList.add("is-timing");
    autoplayTimer = setTimeout(() => showLectureSlide(activeSlide + 1), autoplayDelay);
  }

  prevButton.addEventListener("click", () => showLectureSlide(activeSlide - 1));
  nextButton.addEventListener("click", () => showLectureSlide(activeSlide + 1));
  dots.forEach((dot, dotIndex) => dot.addEventListener("click", () => showLectureSlide(dotIndex)));

  // Pause while the visitor is looking closely or using the controls.
  lectureCarousel.addEventListener("pointerenter", () => { carouselHeld = true; restartAutoplay(); });
  lectureCarousel.addEventListener("pointerleave", () => { carouselHeld = false; restartAutoplay(); });
  lectureCarousel.addEventListener("focusin", () => { carouselHeld = true; restartAutoplay(); });
  lectureCarousel.addEventListener("focusout", (event) => {
    if (lectureCarousel.contains(event.relatedTarget)) return;
    carouselHeld = false;
    restartAutoplay();
  });
  document.addEventListener("visibilitychange", restartAutoplay);
  new IntersectionObserver(([entry]) => {
    carouselVisible = entry.isIntersecting;
    restartAutoplay();
  }, { threshold: 0.35 }).observe(lectureCarousel);

  // Swipe on touch screens.
  let swipeStart = null;
  stage.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse") return;
    swipeStart = { x: event.clientX, y: event.clientY };
  });
  stage.addEventListener("pointerup", (event) => {
    if (!swipeStart) return;
    const dx = event.clientX - swipeStart.x;
    const dy = event.clientY - swipeStart.y;
    swipeStart = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) showLectureSlide(activeSlide + (dx < 0 ? 1 : -1));
  });

  showLectureSlide(0);
}

// Presentation video: nothing loads until the visitor presses play.
const videoBox = document.querySelector("[data-video]");
if (videoBox) {
  const player = videoBox.querySelector("[data-video-player]");
  const cover = videoBox.querySelector("[data-video-play]");
  cover.addEventListener("click", () => {
    videoBox.classList.add("is-playing");
    player.controls = true;
    cover.hidden = true;
    player.focus({ preventScroll: true });
    player.play().catch(() => {});
  });
}

// Header gets slightly more compact once the page scrolls.
const siteHeader = document.querySelector(".site-header");
const headerSentinel = document.createElement("div");
headerSentinel.setAttribute("aria-hidden", "true");
headerSentinel.className = "header-sentinel";
document.body.prepend(headerSentinel);
new IntersectionObserver(([entry]) => {
  siteHeader.classList.toggle("is-compact", !entry.isIntersecting);
}).observe(headerSentinel);

// Stop the orbit while the tab is hidden.
document.addEventListener("visibilitychange", () => {
  portraitOrbit.classList.toggle("is-tab-hidden", document.hidden);
});
