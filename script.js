const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-navigation");
const navLinks = document.querySelectorAll(".nav-link");
const progressBar = document.querySelector(".page-progress");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const year = document.querySelector("#current-year");
let currentLanguage = "en";

if (year) {
  year.textContent = String(new Date().getFullYear());
}

function closeMenu() {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", translations[currentLanguage].openNavigation);
  navigation.classList.remove("is-open");
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? translations[currentLanguage].openNavigation : translations[currentLanguage].closeNavigation,
    );
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

function updateScrollProgress() {
  if (!progressBar) return;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px" },
  );

  sections.forEach((section) => sectionObserver.observe(section));

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
  }
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const subject = encodeURIComponent(`${translations[currentLanguage].emailSubject} ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    formStatus.textContent = translations[currentLanguage].formSending;
    window.location.href = `mailto:jabiradem3210@gmail.com?subject=${subject}&body=${body}`;
  });
}
const translations = {
  en: {
    pageTitle: "Jabir Adem — Web Developer & UI/UX Designer",
    metaDescription: "Jabir Adem is a fourth-year software student at Arba Minch University and web developer creating thoughtful digital experiences. Explore his projects and skills.",
    skip: "Skip to content",
    homeLabel: "Jabir Adem home",
    openNavigation: "Open navigation",
    closeNavigation: "Close navigation",
    mainNavigation: "Main navigation",
    languageLabel: "Select language",
    navHome: "Home",
    navAbout: "About",
    navSkills: "Skills",
    navProjects: "Projects",
    navServices: "What I do",
    navContact: "Contact",
    navCta: "Let’s talk",
    availability: "AVAILABLE FOR OPPORTUNITIES",
    heroTitle: "Building for the <span>web,</span><br />designed for <em>people.</em>",
    heroIntro: "Hello, I’m <strong>Jabir</strong> — a web developer and UI/UX designer who turns thoughtful ideas into clear, engaging digital experiences.",
    heroCta: "Start a conversation",
    heroAboutLink: "Get to know me",
    heroFootnote: "From first sketch to finished experience.",
    heroImageAlt: "Jabir seated at his desk in a creative workspace",
    developerLabel: "THE DEVELOPER",
    heroNote: "Curious by nature.<br /><strong>Precise by design.</strong>",
    scrollCue: "SCROLL TO EXPLORE",
    introduction: "Introduction",
    introLabel: "A LITTLE ABOUT MY APPROACH",
    introQuote: "Good websites don’t just look right.<br /><span>They make everything feel easier.</span>",
    aboutImageAlt: "Jabir enjoying a day outdoors",
    aboutSecondImageAlt: "Jabir outdoors beside a railing",
    photoSwitchLabel: "Show the other photo",
    aboutEyebrow: "THE PERSON BEHIND THE PIXELS",
    aboutTitle: "A practical mind.<br /><em>A creative eye.</em>",
    aboutParagraphOne: "I’m Jabir Adem, a developer with a passion for building useful things for the web. I enjoy working across the whole process — understanding what people need, shaping a clear interface, and bringing it to life with clean, dependable code.",
    aboutParagraphTwo: "From a crisp landing page to a data-driven web app, I care about the details that make a product feel intuitive, responsive, and ready for real people.",
    educationIntro: "I’m a fourth-year software student at <strong>Arba Minch University</strong>, growing my skills through hands-on projects and a curiosity for how technology can help people.",
    focusLabel: "FOCUS",
    focusValue: "Web development & UI/UX",
    approachLabel: "APPROACH",
    approachValue: "Thoughtful, collaborative, curious",
    studiesLabel: "STUDIES",
    studiesValue: "Fourth-year software student · Arba Minch University",
    aboutLink: "More about working together",
    skillsEyebrow: "TOOLS I WORK WITH",
    skillsTitle: "The right tools<br /><em>for the right job.</em>",
    skillsDescription: "A versatile toolkit for designing, building, and improving polished web experiences — from the first component to the final interaction.",
    skillFrontend: "Front-end",
    skillFrontendDescription: "Responsive interfaces, accessible markup, and interactions that feel natural.",
    skillFrameworks: "Frameworks & tools",
    skillFrameworksDescription: "Modern libraries and frameworks to build maintainable, interactive products.",
    skillBackend: "Back-end & data",
    skillBackendDescription: "Server-side fundamentals and database knowledge to connect the whole experience.",
    skillDesign: "Design & experience",
    skillDesignDescription: "Human-centered thinking that makes products clear, useful, and a pleasure to use.",
    skillsNote: "Always learning. Always improving.",
    projectsEyebrow: "A FEW THINGS I’M BUILDING",
    projectsTitle: "Work in progress.<br /><em>Ideas taking shape.</em>",
    projectsDescription: "A look at what I’ve completed and what I’m working on next. I’ll add project links and more details as they’re ready.",
    completedLabel: "COMPLETED",
    completeStatus: "Complete",
    archiveImageAlt: "Musab Web personal digital archive dashboard showing diary, projects, books, notes, code snippets, certificates, bookmarks, and habits",
    dashboardCaption: "Dashboard preview",
    archiveDescription: "A personal digital archive for diary entries, projects, books, notes, snippets, and more.",
    linkComingSoon: "LINK COMING SOON",
    inProgressLabel: "IN PROGRESS",
    onTheWay: "On the way",
    btwDescription: "This project is in progress. More details will be shared as it takes shape.",
    comingSoon: "COMING SOON",
    asapDescription: "This project is in progress. More details will be shared as it takes shape.",
    servicesEyebrow: "HOW I CAN HELP",
    servicesTitle: "From a blank page<br /><em>to something useful.</em>",
    servicesDescription: "Whether you’re shaping a new idea or improving an existing one, I bring care and clarity to every step.",
    serviceWebsites: "Websites that work everywhere",
    serviceWebsitesDescription: "Responsive, fast-loading pages that feel at home on every screen.",
    serviceInterfaces: "Interfaces people understand",
    serviceInterfacesDescription: "Clean UI and considered UX that help people find their way.",
    serviceInteractive: "Interactive web experiences",
    serviceInteractiveDescription: "Useful JavaScript and modern front-end tools, without the clutter.",
    contactEyebrow: "HAVE A PROJECT IN MIND?",
    contactTitle: "Let’s make<br /><em>something meaningful.</em>",
    contactDescription: "Tell me what you’re working on, what you need, or even just where you’d like to start. I’d love to hear from you.",
    formKicker: "SEND A QUICK NOTE",
    nameLabel: "Your name",
    namePlaceholder: "How should I address you?",
    emailLabel: "Your email",
    emailPlaceholder: "you@example.com",
    messageLabel: "What’s on your mind?",
    messagePlaceholder: "A little about your idea or project…",
    sendButton: "Open email to send",
    formNote: "This opens your email app — no details are stored on this website.",
    formSending: "Your email app should open with your message ready to send.",
    emailSubject: "Website inquiry from",
    footerTagline: "Designed with intention. Built for the web.",
  },
  om: {
    pageTitle: "Jabir Adem — Weeb Doola",
    metaDescription: "Jabir Adem barataa sooftiweerii Yunivarsiitii Arbaa Minch fi misoomsaa weebii ti. Pirojektootaa fi dandeettii isaa ilaalaa.",
    skip: "Gara qabiyyeetti darbi",
    homeLabel: "Gara fuula jalqabaa Jabir Adem",
    openNavigation: "Qajeelcha bani",
    closeNavigation: "Qajeelcha cufi",
    mainNavigation: "Qajeelcha ijoo",
    languageLabel: "Afaan filadhu",
    navHome: "Jalqaba",
    navAbout: "Waa’ee koo",
    navSkills: "Dandeettii",
    navProjects: "Pirojektoota",
    navServices: "Waanan hojjedhu",
    navContact: "Na qunnamaa",
    navCta: "Haa mari’annu",
    availability: "CARAALEE HOJII NAN FUUDHA",
    heroTitle: "Weebii irratti<br /><em>namootaaf ijaara.</em>",
    heroIntro: "Akkam, ani <strong>Jabir</strong> jedhama — misoomsaa weebii fi dizaayinii UI/UX kan yaadota gaarii muuxannoo dijitaalaa ifaa fi hawwataa ta’anitti jijjiiruudha.",
    heroCta: "Mariin haa jalqabu",
    heroAboutLink: "Waa’ee koo baradhu",
    heroFootnote: "Yaada jalqabaa irraa kaasee hanga hojii xumuramutti.",
    heroImageAlt: "Jabir bakka hojii kalaqaa isaa keessatti taa’ee",
    developerLabel: "MISROOMSAA",
    heroNote: "Uumamaan nama qoratu.<br /><strong>Dizaayiniin immoo sirrii.</strong>",
    scrollCue: "GADI SIQII ILAALI",
    introduction: "Seensa",
    introLabel: "MALA HOJII KOO XIQQOO",
    introQuote: "Weebsaayitiin gaariin bareedduu qofa miti.<br /><span>Waan hunda salphaa godhu.</span>",
    aboutImageAlt: "Jabir yeroo bashannana alaa",
    aboutSecondImageAlt: "Jabir alatti daandii sibiilaa bira dhaabbatee",
    photoSwitchLabel: "Suuraa biraa agarsiisi",
    aboutEyebrow: "NAMICHA DIZAAYINII DUUBA JIRU",
    aboutTitle: "Yaada hojiirra oolu.<br /><em>Ija kalaqaa.</em>",
    aboutParagraphOne: "Ani Jabir Adem, misoomsaa wantoota weebii irratti namoota fayyadan ijaaruu jaallatuudha. Adeemsa hojii guutuu keessatti hirmaachuun na gammachiisa — fedhii namootaa hubachuu, fuula ifa ta’e qopheessuu, koodii qulqulluu fi amanamaa fayyadamuun hojii irra oolchuu.",
    aboutParagraphTwo: "Fuula jalqabaa bareedduu irraa hanga appii weebii daataa irratti hundaa’utti, oomishni tokko salphaa, saffisaa fi nama hundaaf mijataa akka ta’uuf xiyyeeffannaa nan kenna.",
    educationIntro: "Yunivarsiitii <strong>Arbaa Minch</strong> keessatti barataa sooftiweerii waggaa 4ffaa ti. Pirojektoota hojiirra ooluun dandeettii koo guddisaa, teeknooloojiin namoota akkamitti akka fayyadu baruuf fedhii qaba.",
    focusLabel: "XIIYYEEFFANNOO",
    focusValue: "Misooma weebii fi UI/UX",
    approachLabel: "MALA",
    approachValue: "Yaadannoo gaarii, tumsaa fi qorannoo",
    studiesLabel: "BARNOOTA",
    studiesValue: "Barataa sooftiweerii waggaa 4ffaa · Yunivarsiitii Arbaa Minch",
    aboutLink: "Waa’ee waliin hojjechuu",
    skillsEyebrow: "MEESHAALEE HOJII KOO",
    skillsTitle: "Meeshaa sirrii<br /><em>hojii sirrii ta’eef.</em>",
    skillsDescription: "Meeshaalee weebsaayitii dizaayinii gochuu, ijaaruu fi fooyyessuuf na gargaaran — kutaa jalqabaa irraa hanga walqunnamtii dhumaatti.",
    skillFrontend: "Fuula duraa",
    skillFrontendDescription: "Fuula meeshaalee adda addaatti sirreeffamu, namni hundi arguu danda’u, fi salphaatti fayyadamu.",
    skillFrameworks: "Frameworks fi meeshaalee",
    skillFrameworksDescription: "Oomisha salphaatti kunuunfamuu fi itti fayyadamuun danda’amu ijaaruuf meeshaalee ammayyaa.",
    skillBackend: "Fuula duubaa fi daataa",
    skillBackendDescription: "Bu’uura hojii sarvarii fi beekumsa kuusdeetaa muuxannoo guutuu walitti hidhuuf.",
    skillDesign: "Dizaayinii fi muuxannoo",
    skillDesignDescription: "Yaada nama irratti xiyyeeffatu kan oomisha ifaa, faayidaa qabu fi itti fayyadamuun nama gammachiisu uumu.",
    skillsNote: "Yeroo hunda barachaa fi fooyya’aa jira.",
    projectsEyebrow: "PIROJEKTOOTA ANI HOJJACHAA JIRU",
    projectsTitle: "Hojii adeemsa irra jiru.<br /><em>Yaadota ijaaramaa jiran.</em>",
    projectsDescription: "Waanan xumuree fi hojii itti aanu ilaalaa. Linkii fi odeeffannoo dabalataa yeroo qophaa’an nan dabala.",
    completedLabel: "XUMURAMEERA",
    completeStatus: "Xumurameera",
    archiveImageAlt: "Daashboordii Musab Web Personal Digital Archive kan galmee guyyaa, pirojektoota, kitaabota, yaadannoo, koodii fi kanneen biroo agarsiisu",
    dashboardCaption: "Mul’ata daashboordii",
    archiveDescription: "Kuusaa dijitaalaa dhuunfaa galmee guyyaa, pirojektoota, kitaabota, yaadannoo fi koodii of keessaa qabu.",
    linkComingSoon: "LINKII YEROON DABALAMA",
    inProgressLabel: "HOJII IRRA JIRA",
    onTheWay: "Adeemsa irra jira",
    btwDescription: "Pirojektiin kun adeemsa irra jira. Yeroo guddachaa deemuun odeeffannoo dabalataa nan qooda.",
    comingSoon: "YEROO DHUHUDHA",
    asapDescription: "Pirojektiin kun adeemsa irra jira. Yeroo guddachaa deemuun odeeffannoo dabalataa nan qooda.",
    servicesEyebrow: "AKKAMITTI SI GARGAARUU DANDA’A",
    servicesTitle: "Yaada haaraa irraa<br /><em>hanga hojii faayida qabuutti.</em>",
    servicesDescription: "Yaada haaraa qopheessaa yoo taate yookaan hojii jiru fooyyessaa yoo taate, tarkaanfii hunda irratti xiyyeeffannoo fi iftoomina nan fida.",
    serviceWebsites: "Weebsaayitii bakka hundatti hojjetu",
    serviceWebsitesDescription: "Fuula saffisaa fi meeshaalee adda addaatti sirreeffamu.",
    serviceInterfaces: "Fuula namni salphaatti hubatu",
    serviceInterfacesDescription: "Dizaayinii UI qulqulluu fi UX yaadamee qophaa’e kan namoota qajeelchu.",
    serviceInteractive: "Muuxannoo weebii walqunnamtii qabu",
    serviceInteractiveDescription: "JavaScript faayida qabu fi meeshaalee fuula duraa ammayyaa.",
    contactEyebrow: "PIROJEKTII YAADARRAA QABDAA?",
    contactTitle: "Waan<br /><em>hiika qabu haa hojjennu.</em>",
    contactDescription: "Waa’ee hojii kee, wanta si barbaachisu, yookaan bakka ati jalqabuu barbaaddu natti himi. Si irraa dhaga’uun na gammachiisa.",
    formKicker: "ERgaa GABAABAA ERGI",
    nameLabel: "Maqaa kee",
    namePlaceholder: "Maal jedhee si waamuu?",
    emailLabel: "Imeelii kee",
    emailPlaceholder: "you@example.com",
    messageLabel: "Maal natti himuu barbaadda?",
    messagePlaceholder: "Yaada yookaan pirojektii kee gabaabinaan ibsi…",
    sendButton: "Imeelii erguuf bani",
    formNote: "Appiin imeelii kee ni banama — odeeffannoon as irratti hin kuufamu.",
    formSending: "Appiin imeelii kee ergaa qopheessite qabatee banamuu qaba.",
    emailSubject: "Gaaffii weebsaayitii kan",
    footerTagline: "Yaadaan dizaayinii ta’e. Weebiif ijaarame.",
  },
};

const languageSelect = document.querySelector("#language-select");
const aboutPhotoSwitch = document.querySelector(".about-photo-switch");

if (aboutPhotoSwitch) {
  const photo = aboutPhotoSwitch.querySelector("img");
  const photos = [
    { src: "1000008965[1].jpg", altKey: "aboutImageAlt" },
    { src: "1000003519[1].jpg", altKey: "aboutSecondImageAlt" },
  ];
  let currentPhotoIndex = 0;

  aboutPhotoSwitch.addEventListener("click", () => {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    const nextPhoto = photos[currentPhotoIndex];
    photo.src = nextPhoto.src;
    photo.dataset.i18nAlt = nextPhoto.altKey;
    photo.alt = translations[currentLanguage][nextPhoto.altKey];
  });
}

function applyLanguage(language) {
  const languageCode = Object.hasOwn(translations, language) ? language : "en";
  const dictionary = translations[languageCode];
  currentLanguage = languageCode;
  document.documentElement.lang = languageCode === "om" ? "om" : "en";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = dictionary[element.dataset.i18n];
    if (value !== undefined) element.textContent = value;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const value = dictionary[element.dataset.i18nHtml];
    if (value !== undefined) element.innerHTML = value;
  });

  document.querySelectorAll("[data-i18n-content]").forEach((element) => {
    const value = dictionary[element.dataset.i18nContent];
    if (value !== undefined) element.setAttribute("content", value);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const value = dictionary[element.dataset.i18nPlaceholder];
    if (value !== undefined) element.setAttribute("placeholder", value);
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const value = dictionary[element.dataset.i18nAlt];
    if (value !== undefined) element.setAttribute("alt", value);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const value = dictionary[element.dataset.i18nAria];
    if (value !== undefined) element.setAttribute("aria-label", value);
  });

  document.title = dictionary.pageTitle;
  if (languageSelect) languageSelect.value = languageCode;
}

if (languageSelect) {
  const savedLanguage = localStorage.getItem("jabir-portfolio-language") || "en";
  applyLanguage(savedLanguage);
  languageSelect.addEventListener("change", () => {
    applyLanguage(languageSelect.value);
    localStorage.setItem("jabir-portfolio-language", languageSelect.value);
  });
}
