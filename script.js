const PROTOTYPE_STORAGE_KEY = "anywhere-door-prototype-settings";
const DB_NAME = "anywhere-door";
const DB_VERSION = 1;
const STORE_CATEGORIES = "categories";
const STORE_LINKS = "links";
const STORE_SETTINGS = "settings";
const STORE_ASSETS = "assets";
const SETTINGS_ID = "app-settings";
const SCROLL_OFFSET = 112;

const sunIconMarkup = `
  <circle cx="12" cy="12" r="4.25"></circle>
  <path d="M12 2.75V5"></path>
  <path d="M12 19V21.25"></path>
  <path d="M4.75 12H2.75"></path>
  <path d="M21.25 12H19.25"></path>
  <path d="M5.9 5.9L7.5 7.5"></path>
  <path d="M18.1 18.1L16.5 16.5"></path>
  <path d="M18.1 5.9L16.5 7.5"></path>
  <path d="M5.9 18.1L7.5 16.5"></path>
`;

const moonIconMarkup = `
  <path d="M18.5 14.75A7.5 7.5 0 0 1 9.25 5.5A8.25 8.25 0 1 0 18.5 14.75Z"></path>
`;

const DEFAULT_SETTINGS = Object.freeze({
  id: SETTINGS_ID,
  theme: "light",
  density: "standard",
  cardStyle: "mist",
  openMode: "new",
  wallpaperMode: "preset",
  wallpaperAssetId: "",
  wallpaperPresetKey: "mist",
  noticeDismissed: false,
});

function timestamp() {
  return new Date().toISOString();
}

const SAMPLE_DATA = (() => {
  const createdAt = timestamp();
  const updatedAt = createdAt;

  return {
    categories: [
      {
        id: "cat-work",
        name: "工作中枢",
        order: 0,
        createdAt,
        updatedAt,
      },
      {
        id: "cat-build",
        name: "构建与部署",
        order: 1,
        createdAt,
        updatedAt,
      },
      {
        id: "cat-inspiration",
        name: "灵感收集",
        order: 2,
        createdAt,
        updatedAt,
      },
      {
        id: "cat-life",
        name: "生活常用",
        order: 3,
        createdAt,
        updatedAt,
      },
    ],
    links: [
      {
        id: "link-figma",
        name: "Figma",
        url: "https://www.figma.com",
        categoryId: "cat-work",
        order: 0,
        description: "设计协作",
        tags: ["设计", "协作"],
        note: "默认置顶",
        iconMode: "preset",
        iconAssetId: "",
        iconPresetKey: "grid",
        createdAt,
        updatedAt,
      },
      {
        id: "link-github",
        name: "GitHub",
        url: "https://github.com",
        categoryId: "cat-work",
        order: 1,
        description: "代码仓库",
        tags: ["代码", "协作"],
        note: "",
        iconMode: "auto",
        iconAssetId: "",
        iconPresetKey: "",
        createdAt,
        updatedAt,
      },
      {
        id: "link-notion",
        name: "Notion",
        url: "https://www.notion.so",
        categoryId: "cat-work",
        order: 2,
        description: "知识整理",
        tags: ["文档"],
        note: "",
        iconMode: "preset",
        iconAssetId: "",
        iconPresetKey: "note",
        createdAt,
        updatedAt,
      },
      {
        id: "link-linear",
        name: "Linear",
        url: "https://linear.app",
        categoryId: "cat-work",
        order: 3,
        description: "任务流转",
        tags: ["项目"],
        note: "",
        iconMode: "preset",
        iconAssetId: "",
        iconPresetKey: "spark",
        createdAt,
        updatedAt,
      },
      {
        id: "link-vercel",
        name: "Vercel",
        url: "https://vercel.com",
        categoryId: "cat-build",
        order: 0,
        description: "部署面板",
        tags: ["部署"],
        note: "",
        iconMode: "auto",
        iconAssetId: "",
        iconPresetKey: "",
        createdAt,
        updatedAt,
      },
      {
        id: "link-cloudflare",
        name: "Cloudflare",
        url: "https://dash.cloudflare.com",
        categoryId: "cat-build",
        order: 1,
        description: "DNS 与安全",
        tags: ["网络"],
        note: "",
        iconMode: "preset",
        iconAssetId: "",
        iconPresetKey: "orbit",
        createdAt,
        updatedAt,
      },
      {
        id: "link-railway",
        name: "Railway",
        url: "https://railway.app",
        categoryId: "cat-build",
        order: 2,
        description: "环境与监控",
        tags: ["运维"],
        note: "",
        iconMode: "preset",
        iconAssetId: "",
        iconPresetKey: "stack",
        createdAt,
        updatedAt,
      },
      {
        id: "link-behance",
        name: "Behance",
        url: "https://www.behance.net",
        categoryId: "cat-inspiration",
        order: 0,
        description: "视觉参考",
        tags: ["灵感"],
        note: "",
        iconMode: "auto",
        iconAssetId: "",
        iconPresetKey: "",
        createdAt,
        updatedAt,
      },
      {
        id: "link-dribbble",
        name: "Dribbble",
        url: "https://dribbble.com",
        categoryId: "cat-inspiration",
        order: 1,
        description: "界面灵感",
        tags: ["界面"],
        note: "",
        iconMode: "preset",
        iconAssetId: "",
        iconPresetKey: "spark",
        createdAt,
        updatedAt,
      },
      {
        id: "link-pinterest",
        name: "Pinterest",
        url: "https://www.pinterest.com",
        categoryId: "cat-inspiration",
        order: 2,
        description: "情绪板",
        tags: ["收藏"],
        note: "",
        iconMode: "preset",
        iconAssetId: "",
        iconPresetKey: "grid",
        createdAt,
        updatedAt,
      },
      {
        id: "link-maps",
        name: "Maps",
        url: "https://maps.google.com",
        categoryId: "cat-life",
        order: 0,
        description: "位置与路线",
        tags: ["出行"],
        note: "",
        iconMode: "auto",
        iconAssetId: "",
        iconPresetKey: "",
        createdAt,
        updatedAt,
      },
      {
        id: "link-calendar",
        name: "Calendar",
        url: "https://calendar.google.com",
        categoryId: "cat-life",
        order: 1,
        description: "日程安排",
        tags: ["效率"],
        note: "",
        iconMode: "preset",
        iconAssetId: "",
        iconPresetKey: "note",
        createdAt,
        updatedAt,
      },
      {
        id: "link-billing",
        name: "账单中心",
        url: "https://pay.example.com",
        categoryId: "cat-life",
        order: 2,
        description: "支付与账单",
        tags: ["财务"],
        note: "",
        iconMode: "preset",
        iconAssetId: "",
        iconPresetKey: "stack",
        createdAt,
        updatedAt,
      },
    ],
    settings: {
      ...DEFAULT_SETTINGS,
      wallpaperPresetKey: "mist",
    },
  };
})();

function svgUrl(svg) {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function buildWallpaper(colors) {
  return svgUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1200">
      <rect width="1600" height="1200" fill="${colors.base}"/>
      <circle cx="260" cy="180" r="240" fill="${colors.one}" fill-opacity="${colors.oneOpacity}"/>
      <circle cx="1280" cy="260" r="320" fill="${colors.two}" fill-opacity="${colors.twoOpacity}"/>
      <circle cx="1330" cy="910" r="340" fill="${colors.three}" fill-opacity="${colors.threeOpacity}"/>
      <circle cx="450" cy="940" r="280" fill="${colors.four}" fill-opacity="${colors.fourOpacity}"/>
      <path d="M0 735C210 686 330 752 512 708C760 648 949 810 1168 744C1320 698 1458 674 1600 714V1200H0Z" fill="${colors.layer}" fill-opacity="${colors.layerOpacity}"/>
    </svg>
  `);
}

const WALLPAPERS = {
  light: {
    mist: buildWallpaper({
      base: "#edf1f6",
      one: "#dbe8ff",
      oneOpacity: "0.9",
      two: "#e9eff9",
      twoOpacity: "0.94",
      three: "#d1e2ff",
      threeOpacity: "0.62",
      four: "#f7e5d9",
      fourOpacity: "0.42",
      layer: "#f6f8fb",
      layerOpacity: "0.92",
    }),
    warm: buildWallpaper({
      base: "#f2ece6",
      one: "#f5dcc8",
      oneOpacity: "0.88",
      two: "#efe6dc",
      twoOpacity: "0.92",
      three: "#f3d7bf",
      threeOpacity: "0.52",
      four: "#e0d8f2",
      fourOpacity: "0.22",
      layer: "#f8f5f1",
      layerOpacity: "0.9",
    }),
    cool: buildWallpaper({
      base: "#eaf0f2",
      one: "#d5edf3",
      oneOpacity: "0.9",
      two: "#e3eef7",
      twoOpacity: "0.92",
      three: "#cce4f1",
      threeOpacity: "0.58",
      four: "#dfe7ff",
      fourOpacity: "0.28",
      layer: "#f4f8fa",
      layerOpacity: "0.9",
    }),
    night: buildWallpaper({
      base: "#e8ebf1",
      one: "#d8dded",
      oneOpacity: "0.86",
      two: "#dfe4f0",
      twoOpacity: "0.88",
      three: "#ccd3e8",
      threeOpacity: "0.55",
      four: "#bfc7dc",
      fourOpacity: "0.22",
      layer: "#f2f4f8",
      layerOpacity: "0.9",
    }),
  },
  dark: {
    mist: buildWallpaper({
      base: "#11161e",
      one: "#1f2c43",
      oneOpacity: "0.82",
      two: "#182335",
      twoOpacity: "0.9",
      three: "#203a5c",
      threeOpacity: "0.48",
      four: "#344d4f",
      fourOpacity: "0.24",
      layer: "#161c27",
      layerOpacity: "0.88",
    }),
    warm: buildWallpaper({
      base: "#171413",
      one: "#3d2621",
      oneOpacity: "0.8",
      two: "#2b2020",
      twoOpacity: "0.9",
      three: "#65453f",
      threeOpacity: "0.42",
      four: "#3d3344",
      fourOpacity: "0.22",
      layer: "#1f1919",
      layerOpacity: "0.88",
    }),
    cool: buildWallpaper({
      base: "#10171d",
      one: "#163042",
      oneOpacity: "0.82",
      two: "#1a2638",
      twoOpacity: "0.9",
      three: "#1e4958",
      threeOpacity: "0.4",
      four: "#274b52",
      fourOpacity: "0.22",
      layer: "#151d27",
      layerOpacity: "0.88",
    }),
    night: buildWallpaper({
      base: "#0c1017",
      one: "#20283a",
      oneOpacity: "0.84",
      two: "#171d2c",
      twoOpacity: "0.92",
      three: "#2a3350",
      threeOpacity: "0.42",
      four: "#1c2438",
      fourOpacity: "0.24",
      layer: "#121824",
      layerOpacity: "0.9",
    }),
  },
};

const WALLPAPER_LABELS = {
  mist: "晨雾",
  warm: "暖沙",
  cool: "冰湖",
  night: "深夜",
};

const PRESET_ICONS = {
  grid: {
    label: "网格",
    variant: "is-blue",
    svg: `
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <rect x="4" y="4" width="6" height="6" rx="1.4"></rect>
        <rect x="14" y="4" width="6" height="6" rx="1.4"></rect>
        <rect x="4" y="14" width="6" height="6" rx="1.4"></rect>
        <rect x="14" y="14" width="6" height="6" rx="1.4"></rect>
      </svg>
    `,
  },
  spark: {
    label: "火花",
    variant: "is-sand",
    svg: `
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M12 4.5L13.8 10.2L19.5 12L13.8 13.8L12 19.5L10.2 13.8L4.5 12L10.2 10.2Z"></path>
      </svg>
    `,
  },
  stack: {
    label: "层叠",
    variant: "is-dark",
    svg: `
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M5 9L12 5L19 9L12 13L5 9Z"></path>
        <path d="M5 13L12 17L19 13"></path>
        <path d="M5 16.5L12 20L19 16.5"></path>
      </svg>
    `,
  },
  orbit: {
    label: "轨道",
    variant: "is-blue",
    svg: `
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <circle cx="12" cy="12" r="2.3"></circle>
        <path d="M4.5 12C4.5 8.3 7.9 5.3 12 5.3C16.1 5.3 19.5 8.3 19.5 12C19.5 15.7 16.1 18.7 12 18.7C7.9 18.7 4.5 15.7 4.5 12Z"></path>
        <path d="M8.5 6.5C10.8 8 13.2 10.5 15.5 17.5"></path>
      </svg>
    `,
  },
  note: {
    label: "便签",
    variant: "is-sand",
    svg: `
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M7 4.5H17C18.4 4.5 19.5 5.6 19.5 7V17L14.5 19.5H7C5.6 19.5 4.5 18.4 4.5 17V7C4.5 5.6 5.6 4.5 7 4.5Z"></path>
        <path d="M14.5 19.5V15.2C14.5 14.1 15.4 13.2 16.5 13.2H19.5"></path>
        <path d="M8 9H16"></path>
        <path d="M8 12.5H13"></path>
      </svg>
    `,
  },
};

const body = document.body;
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#global-search");
const clearSearchButton = document.querySelector("#clear-search");
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = themeToggle?.querySelector(".theme-icon-current");
const newSiteButton = document.querySelector("#new-site-button");
const categoryList = document.querySelector("#category-list");
const sidebarHint = document.querySelector("#sidebar-hint");
const manageCategoriesButton = document.querySelector("#manage-categories-button");
const emptyManageCategoriesButton = document.querySelector(
  "#empty-manage-categories-button",
);
const loadSampleButton = document.querySelector("#load-sample-button");
const sectionsRoot = document.querySelector("#sections-root");
const emptyStateCard = document.querySelector("#empty-state-card");
const searchEmptyState = document.querySelector("#search-empty");
const overflowMenu = document.querySelector(".overflow-menu");
const overflowSummary = overflowMenu?.querySelector("summary");

const appearanceDialog = document.querySelector("#appearance-dialog");
const transferDialog = document.querySelector("#transfer-dialog");
const shortcutsDialog = document.querySelector("#shortcuts-dialog");
const aboutDialog = document.querySelector("#about-dialog");
const editorDialog = document.querySelector("#editor-dialog");
const categoryDialog = document.querySelector("#category-dialog");
const confirmDialog = document.querySelector("#confirm-dialog");

const themeInputs = [...document.querySelectorAll('input[name="dialog-theme"]')];
const densityInputs = [...document.querySelectorAll('input[name="density"]')];
const cardStyleInputs = [...document.querySelectorAll('input[name="card-style"]')];
const openModeInputs = [...document.querySelectorAll('input[name="open-mode"]')];
const wallpaperButtons = [...document.querySelectorAll("[data-wallpaper-value]")];
const uploadWallpaperButton = document.querySelector("#upload-wallpaper-button");
const resetWallpaperButton = document.querySelector("#reset-wallpaper-button");
const wallpaperUploadInput = document.querySelector("#wallpaper-upload-input");
const wallpaperStatus = document.querySelector("#wallpaper-status");

const exportIconsInput = document.querySelector("#export-icons");
const exportWallpaperInput = document.querySelector("#export-wallpaper");
const exportJsonButton = document.querySelector("#export-json-button");
const exportSizeNote = document.querySelector("#export-size-note");
const importJsonButton = document.querySelector("#import-json-button");
const importSampleButton = document.querySelector("#import-sample-button");
const importFileInput = document.querySelector("#import-file-input");
const importModeCards = [...document.querySelectorAll("[data-import-mode]")];
const importFeedbackCard = document.querySelector("#import-feedback-card");
const importFeedbackSummary = document.querySelector("#import-feedback-summary");
const importFeedbackList = document.querySelector("#import-feedback-list");

const editorForm = document.querySelector("#editor-form");
const editorEyebrow = document.querySelector("#editor-eyebrow");
const editorLinkIdInput = document.querySelector("#editor-link-id");
const editorNameInput = document.querySelector("#editor-name");
const editorUrlInput = document.querySelector("#editor-url");
const editorCategorySelect = document.querySelector("#editor-category");
const editorDescriptionInput = document.querySelector("#editor-description");
const editorTagsInput = document.querySelector("#editor-tags");
const editorNoteInput = document.querySelector("#editor-note");
const editorFormStatus = document.querySelector("#editor-form-status");
const editorUploadPanel = document.querySelector("#editor-upload-panel");
const editorPresetPanel = document.querySelector("#editor-preset-panel");
const uploadIconButton = document.querySelector("#upload-icon-button");
const clearIconUploadButton = document.querySelector("#clear-icon-upload-button");
const editorIconFileInput = document.querySelector("#editor-icon-file");
const editorUploadPreview = document.querySelector("#editor-upload-preview");
const editorUploadStatus = document.querySelector("#editor-upload-status");
const presetIconGrid = document.querySelector("#preset-icon-grid");
const iconModeButtons = [...document.querySelectorAll("[data-icon-mode]")];

const categoryCreateForm = document.querySelector("#category-create-form");
const categoryCreateInput = document.querySelector("#category-create-input");
const categoryCreateStatus = document.querySelector("#category-create-status");
const categoryManagerList = document.querySelector("#category-manager-list");
const categoryManagerEmpty = document.querySelector("#category-manager-empty");

const confirmMessage = document.querySelector("#confirm-message");
const confirmSubmit = document.querySelector("#confirm-submit");

const editorErrorElements = {
  name: document.querySelector("#editor-name-error"),
  url: document.querySelector("#editor-url-error"),
  category: document.querySelector("#editor-category-error"),
};

const state = {
  categories: [],
  links: [],
  assets: new Map(),
  settings: { ...DEFAULT_SETTINGS },
  search: "",
  importMode: "replace",
  exportIncludeIcons: true,
  exportIncludeWallpaper: false,
  importFeedback: null,
  activeCategoryId: "",
  sortSectionId: "",
  pendingDelete: null,
  sectionRecords: [],
  categoryRowFeedback: { id: "", message: "" },
  editor: {
    mode: "create",
    linkId: "",
    categoryId: "",
    iconMode: "auto",
    presetKey: "grid",
    uploadAsset: null,
    existingUploadAssetId: "",
    status: "",
  },
  drag: {
    type: "",
    sourceId: "",
    categoryId: "",
    overId: "",
  },
};

const dialogReturnFocus = new WeakMap();
let databasePromise;
let persistQueue = Promise.resolve();
let scrollTicking = false;
const faviconStateCache = new Map();

function createId(prefix) {
  if (window.crypto?.randomUUID) {
    return `${prefix}-${window.crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("数据库请求失败"));
  });
}

function openDatabase() {
  if (databasePromise) return databasePromise;

  databasePromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_CATEGORIES)) {
        const store = db.createObjectStore(STORE_CATEGORIES, { keyPath: "id" });
        store.createIndex("order", "order", { unique: false });
      }

      if (!db.objectStoreNames.contains(STORE_LINKS)) {
        const store = db.createObjectStore(STORE_LINKS, { keyPath: "id" });
        store.createIndex("categoryId", "categoryId", { unique: false });
        store.createIndex("order", "order", { unique: false });
        store.createIndex("normalizedUrl", "normalizedUrl", { unique: false });
      }

      if (!db.objectStoreNames.contains(STORE_SETTINGS)) {
        db.createObjectStore(STORE_SETTINGS, { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains(STORE_ASSETS)) {
        const store = db.createObjectStore(STORE_ASSETS, { keyPath: "id" });
        store.createIndex("kind", "kind", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error("打开数据库失败"));
  });

  return databasePromise;
}

async function getAllRecords(storeName) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const request = transaction.objectStore(storeName).getAll();

    transaction.oncomplete = () => resolve(request.result ?? []);
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("读取数据失败"));
    transaction.onabort = () =>
      reject(transaction.error ?? new Error("读取数据已中止"));
  });
}

async function getRecord(storeName, key) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const request = transaction.objectStore(storeName).get(key);

    transaction.oncomplete = () => resolve(request.result ?? null);
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("读取数据失败"));
    transaction.onabort = () =>
      reject(transaction.error ?? new Error("读取数据已中止"));
  });
}

async function replaceAllData({ categories, links, settings, assets }) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      [STORE_CATEGORIES, STORE_LINKS, STORE_SETTINGS, STORE_ASSETS],
      "readwrite",
    );

    const categoriesStore = transaction.objectStore(STORE_CATEGORIES);
    const linksStore = transaction.objectStore(STORE_LINKS);
    const settingsStore = transaction.objectStore(STORE_SETTINGS);
    const assetsStore = transaction.objectStore(STORE_ASSETS);

    categoriesStore.clear();
    linksStore.clear();
    settingsStore.clear();
    assetsStore.clear();

    categories.forEach((category) => categoriesStore.put(category));
    links.forEach((link) => linksStore.put(link));
    settingsStore.put(settings);
    assets.forEach((asset) => assetsStore.put(asset));

    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("写入数据失败"));
    transaction.onabort = () =>
      reject(transaction.error ?? new Error("写入数据已中止"));
  });
}

function cloneSettings(source) {
  return {
    ...DEFAULT_SETTINGS,
    ...(source ?? {}),
    id: SETTINGS_ID,
  };
}

function normalizeText(value) {
  return String(value ?? "").trim().toLowerCase();
}

function formatCount(value) {
  return String(value).padStart(2, "0");
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function ensureUrlProtocol(value) {
  if (/^[a-z][a-z\d+\-.]*:/i.test(value)) return value;
  return `https://${value}`;
}

function normalizeUrl(value) {
  const raw = String(value ?? "").trim();

  if (!raw) {
    throw new Error("请输入网址");
  }

  let parsed;

  try {
    parsed = new URL(ensureUrlProtocol(raw));
  } catch {
    throw new Error("请输入有效的网址");
  }

  if (!/^https?:$/i.test(parsed.protocol)) {
    throw new Error("仅支持 http 或 https 链接");
  }

  const protocol = parsed.protocol.toLowerCase();
  const host = parsed.host.toLowerCase();
  const pathname = parsed.pathname.replace(/\/+$/, "") || "/";
  const search = parsed.search;
  const hash = parsed.hash;
  const baseHref = `${protocol}//${host}${pathname}${search}`;

  return {
    href: `${baseHref}${hash}`,
    normalizedUrl: baseHref,
    displayUrl: `${host}${pathname === "/" ? "" : pathname}${search}`,
    origin: `${protocol}//${host}`,
  };
}

function isSubsequence(query, target) {
  let index = 0;

  for (const char of target) {
    if (char === query[index]) {
      index += 1;
      if (index === query.length) return true;
    }
  }

  return false;
}

function matchesQuery(query, target) {
  if (!query) return true;

  const compactQuery = query.replace(/\s+/g, "");
  const compactTarget = target.replace(/[\s./:_-]+/g, "");

  return target.includes(query) || isSubsequence(compactQuery, compactTarget);
}

function parseTags(value) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function readPrototypeSettings() {
  try {
    const raw = localStorage.getItem(PROTOTYPE_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SETTINGS,
      theme: parsed.theme === "dark" ? "dark" : "light",
      density: ["relaxed", "compact"].includes(parsed.density)
        ? parsed.density
        : DEFAULT_SETTINGS.density,
      cardStyle: ["mist", "clear", "solid"].includes(parsed.cardStyle)
        ? parsed.cardStyle
        : DEFAULT_SETTINGS.cardStyle,
      openMode: parsed.openMode === "self" ? "self" : "new",
      wallpaperMode: "preset",
      wallpaperPresetKey: WALLPAPER_LABELS[parsed.wallpaper]
        ? parsed.wallpaper
        : DEFAULT_SETTINGS.wallpaperPresetKey,
    };
  } catch {
    return null;
  }
}

function sortCategories(categories) {
  return [...categories].sort((left, right) => {
    const orderDiff = (left.order ?? 0) - (right.order ?? 0);
    if (orderDiff !== 0) return orderDiff;
    return left.name.localeCompare(right.name, "zh-CN");
  });
}

function sortLinks(links) {
  return [...links].sort((left, right) => {
    if (left.categoryId !== right.categoryId) {
      return String(left.categoryId).localeCompare(String(right.categoryId));
    }

    const orderDiff = (left.order ?? 0) - (right.order ?? 0);
    if (orderDiff !== 0) return orderDiff;

    return left.name.localeCompare(right.name, "zh-CN");
  });
}

function resequenceCategories(categories) {
  sortCategories(categories).forEach((category, index) => {
    category.order = index;
  });
}

function resequenceLinks(links) {
  const grouped = new Map();

  sortLinks(links).forEach((link) => {
    if (!grouped.has(link.categoryId)) {
      grouped.set(link.categoryId, []);
    }

    grouped.get(link.categoryId).push(link);
  });

  grouped.forEach((group) => {
    group.forEach((link, index) => {
      link.order = index;
    });
  });
}

function syncNormalizedFields(link) {
  const normalized = normalizeUrl(link.url);
  link.url = normalized.href;
  link.normalizedUrl = normalized.normalizedUrl;
  return link;
}

function sanitizeCategoryRecord(category, fallbackOrder = 0) {
  const name = String(category?.name ?? "").trim();
  if (!name) return null;

  return {
    id: String(category?.id ?? createId("cat")),
    name,
    order: Number.isFinite(category?.order) ? category.order : fallbackOrder,
    createdAt: category?.createdAt ?? timestamp(),
    updatedAt: category?.updatedAt ?? timestamp(),
  };
}

function sanitizeLinkRecord(link, availableCategoryIds, fallbackOrder = 0) {
  const name = String(link?.name ?? "").trim();
  if (!name) return null;

  let normalized;

  try {
    normalized = normalizeUrl(link.url);
  } catch {
    return null;
  }

  const candidateCategoryId = String(link?.categoryId ?? "");
  const categoryId = availableCategoryIds.has(candidateCategoryId)
    ? candidateCategoryId
    : [...availableCategoryIds][0] ?? "";

  if (!categoryId) return null;

  const iconMode = ["upload", "preset"].includes(link?.iconMode)
    ? link.iconMode
    : "auto";

  return {
    id: String(link?.id ?? createId("link")),
    name,
    url: normalized.href,
    normalizedUrl: normalized.normalizedUrl,
    categoryId,
    order: Number.isFinite(link?.order) ? link.order : fallbackOrder,
    description: String(link?.description ?? "").trim(),
    tags: Array.isArray(link?.tags)
      ? link.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : parseTags(link?.tags),
    note: String(link?.note ?? "").trim(),
    iconMode,
    iconAssetId: iconMode === "upload" ? String(link?.iconAssetId ?? "") : "",
    iconPresetKey:
      iconMode === "preset" && PRESET_ICONS[link?.iconPresetKey]
        ? link.iconPresetKey
        : "",
    createdAt: link?.createdAt ?? timestamp(),
    updatedAt: link?.updatedAt ?? timestamp(),
  };
}

function sanitizeAssetRecord(asset, kindHint = "") {
  const kind = ["icon", "wallpaper"].includes(asset?.kind) ? asset.kind : kindHint;
  const data = String(asset?.data ?? "");

  if (!kind || !data.startsWith("data:")) return null;

  return {
    id: String(asset?.id ?? createId("asset")),
    kind,
    mimeType: String(asset?.mimeType ?? "application/octet-stream"),
    name: String(asset?.name ?? `${kind}.bin`),
    data,
  };
}

function cloneAssetMap(map) {
  return new Map([...map.entries()].map(([id, asset]) => [id, { ...asset }]));
}

function getReferencedAssetIds(links, settings) {
  const ids = new Set();

  links.forEach((link) => {
    if (link.iconMode === "upload" && link.iconAssetId) {
      ids.add(link.iconAssetId);
    }
  });

  if (settings.wallpaperMode === "upload" && settings.wallpaperAssetId) {
    ids.add(settings.wallpaperAssetId);
  }

  return ids;
}

function pruneOrphanAssets(assetMap, links, settings) {
  const usedIds = getReferencedAssetIds(links, settings);

  [...assetMap.keys()].forEach((id) => {
    if (!usedIds.has(id)) {
      assetMap.delete(id);
    }
  });
}

function deriveIconLabel(link) {
  if (link.iconMode === "upload") return "上传图标";
  if (link.iconMode === "preset") return "默认图标";
  return "自动 favicon";
}

function buildSiteMeta(link) {
  const parts = [];

  if (link.description) {
    parts.push(link.description);
  } else if (Array.isArray(link.tags) && link.tags.length) {
    parts.push(link.tags.slice(0, 2).join(" · "));
  } else if (link.note) {
    parts.push(link.note);
  }

  parts.push(deriveIconLabel(link));
  return parts.join(" · ");
}

function pickVariant(value) {
  const palette = ["is-blue", "is-dark", "is-sand"];
  const source = String(value ?? "");
  let total = 0;

  for (const char of source) {
    total += char.charCodeAt(0);
  }

  return palette[total % palette.length];
}

function getMonogram(name) {
  const parts = String(name ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.slice(0, 2);
  }

  return String(name ?? "").replace(/[^\p{L}\p{N}]/gu, "").slice(0, 2) || "AD";
}

function createElement(tag, className = "") {
  const element = document.createElement(tag);
  if (className) element.className = className;
  return element;
}

function applyText(element, text) {
  element.textContent = text;
  return element;
}

function setThemeToggleMarkup() {
  if (!themeToggle || !themeIcon) return;

  const isDark = state.settings.theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "切换白天模式" : "切换夜间模式",
  );
  themeIcon.innerHTML = isDark ? sunIconMarkup : moonIconMarkup;
}

function getWallpaperCssValue() {
  if (
    state.settings.wallpaperMode === "upload" &&
    state.settings.wallpaperAssetId &&
    state.assets.has(state.settings.wallpaperAssetId)
  ) {
    return `url("${state.assets.get(state.settings.wallpaperAssetId).data}")`;
  }

  const themeKey = state.settings.theme === "dark" ? "dark" : "light";
  const presetKey = WALLPAPERS[themeKey][state.settings.wallpaperPresetKey]
    ? state.settings.wallpaperPresetKey
    : DEFAULT_SETTINGS.wallpaperPresetKey;

  return WALLPAPERS[themeKey][presetKey];
}

function applySettingsToBody() {
  body.dataset.theme = state.settings.theme;
  body.dataset.density = state.settings.density;
  body.dataset.cardStyle = state.settings.cardStyle;
  body.dataset.openMode = state.settings.openMode;
  body.dataset.wallpaper = state.settings.wallpaperPresetKey;
  body.dataset.wallpaperMode = state.settings.wallpaperMode;
  body.style.setProperty("--wallpaper", getWallpaperCssValue());
  document.documentElement.style.colorScheme = state.settings.theme;
  setThemeToggleMarkup();
}

function updateWallpaperStatus() {
  if (!wallpaperStatus) return;

  if (
    state.settings.wallpaperMode === "upload" &&
    state.settings.wallpaperAssetId &&
    state.assets.has(state.settings.wallpaperAssetId)
  ) {
    const asset = state.assets.get(state.settings.wallpaperAssetId);
    wallpaperStatus.textContent = `当前使用上传壁纸：${asset.name}`;
    return;
  }

  wallpaperStatus.textContent = `当前使用预设壁纸：${
    WALLPAPER_LABELS[state.settings.wallpaperPresetKey] ?? "晨雾"
  }。`;
}

function syncAppearanceControls() {
  themeInputs.forEach((input) => {
    input.checked = input.value === state.settings.theme;
  });

  densityInputs.forEach((input) => {
    input.checked = input.value === state.settings.density;
  });

  cardStyleInputs.forEach((input) => {
    input.checked = input.value === state.settings.cardStyle;
  });

  openModeInputs.forEach((input) => {
    input.checked = input.value === state.settings.openMode;
  });

  wallpaperButtons.forEach((button) => {
    const selected =
      state.settings.wallpaperMode === "preset" &&
      button.dataset.wallpaperValue === state.settings.wallpaperPresetKey;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  updateWallpaperStatus();
}

function setActiveCategory(categoryId) {
  state.activeCategoryId = categoryId;

  [...document.querySelectorAll("[data-category-link]")].forEach((link) => {
    const selected = link.dataset.categoryId === categoryId;
    link.classList.toggle("is-active", selected);
    link.setAttribute("aria-current", selected ? "true" : "false");
  });
}

function getGroupedLinks() {
  const normalizedQuery = normalizeText(state.search);
  const categoryIds = new Set(state.categories.map((category) => category.id));
  const sortedCategories = sortCategories(state.categories);
  const sortedLinksByCategory = new Map();

  sortLinks(state.links)
    .filter((link) => categoryIds.has(link.categoryId))
    .forEach((link) => {
      if (!sortedLinksByCategory.has(link.categoryId)) {
        sortedLinksByCategory.set(link.categoryId, []);
      }

      sortedLinksByCategory.get(link.categoryId).push(link);
    });

  const groups = sortedCategories.map((category) => {
    const allLinks = sortedLinksByCategory.get(category.id) ?? [];
    const visibleLinks = normalizedQuery
      ? allLinks.filter((link) =>
          matchesQuery(
            normalizedQuery,
            `${normalizeText(link.name)} ${normalizeText(link.url)}`,
          ),
        )
      : allLinks;

    return {
      category,
      allLinks,
      visibleLinks,
      totalCount: allLinks.length,
      visibleCount: visibleLinks.length,
    };
  });

  return {
    groups,
    hasSearch: Boolean(normalizedQuery),
    hasCategories: sortedCategories.length > 0,
    totalLinks: state.links.length,
    hasVisibleResults: groups.some((group) => group.visibleCount > 0),
  };
}

function renderSidebar(view) {
  categoryList.textContent = "";

  if (!view.hasCategories) {
    const item = createElement("li", "sidebar-empty");
    const note = createElement("p", "micro-copy");
    note.textContent = "还没有分类，先通过“管理分组”创建你的第一组导航。";
    item.append(note);
    categoryList.append(item);
    sidebarHint.textContent = "支持分类管理、拖拽排序和模糊搜索。";
    return;
  }

  sidebarHint.textContent = view.hasSearch
    ? "搜索过程中，无匹配结果的分类会自动置灰。"
    : "通过分组整理常用网站，搜索只匹配名称和网址。";

  view.groups.forEach((group) => {
    const item = document.createElement("li");
    const link = createElement("a", "category-link");
    const muted = view.hasSearch && group.visibleCount === 0;
    const count = view.hasSearch ? group.visibleCount : group.totalCount;

    link.href = `#section-${group.category.id}`;
    link.dataset.categoryId = group.category.id;
    link.dataset.categoryLink = "true";
    link.classList.toggle("is-muted", muted);
    link.setAttribute("aria-disabled", String(muted));
    link.setAttribute(
      "aria-current",
      state.activeCategoryId === group.category.id ? "true" : "false",
    );
    if (state.activeCategoryId === group.category.id) {
      link.classList.add("is-active");
    }

    const label = createElement("span");
    label.textContent = group.category.name;
    const pill = createElement("span", "count-pill");
    pill.textContent = formatCount(count);

    link.append(label, pill);
    item.append(link);
    categoryList.append(item);
  });
}

function attachIconFallback(container, text, variant) {
  container.innerHTML = "";
  container.classList.add(variant);
  container.textContent = text;
}

function createSiteIcon(link) {
  const icon = createElement("span", `site-icon ${pickVariant(link.name)}`);
  icon.setAttribute("aria-hidden", "true");

  const uploadAsset =
    link.iconMode === "upload" && link.iconAssetId
      ? state.assets.get(link.iconAssetId)
      : null;

  if (uploadAsset?.data) {
    const image = document.createElement("img");
    image.alt = "";
    image.src = uploadAsset.data;
    image.addEventListener(
      "error",
      () => attachIconFallback(icon, getMonogram(link.name), pickVariant(link.name)),
      { once: true },
    );
    icon.textContent = "";
    icon.append(image);
    return icon;
  }

  if (link.iconMode === "preset" && PRESET_ICONS[link.iconPresetKey]) {
    icon.classList.add("is-preset");
    icon.innerHTML = PRESET_ICONS[link.iconPresetKey].svg;
    icon.classList.remove("is-blue", "is-dark", "is-sand");
    icon.classList.add(PRESET_ICONS[link.iconPresetKey].variant);
    return icon;
  }

  if (link.iconMode === "auto") {
    try {
      const origin = new URL(link.url).origin;
      const iconState = faviconStateCache.get(origin);

      if (iconState === "failed") {
        attachIconFallback(icon, getMonogram(link.name), pickVariant(link.name));
        return icon;
      }

      const image = document.createElement("img");
      image.alt = "";
      image.src = `${origin}/favicon.ico`;
      faviconStateCache.set(origin, "pending");
      image.addEventListener(
        "load",
        () => {
          faviconStateCache.set(origin, "success");
        },
        { once: true },
      );
      image.addEventListener(
        "error",
        () => {
          faviconStateCache.set(origin, "failed");
          attachIconFallback(icon, getMonogram(link.name), pickVariant(link.name));
        },
        { once: true },
      );
      icon.textContent = "";
      icon.append(image);
      return icon;
    } catch {
      // Fall through to monogram.
    }
  }

  attachIconFallback(icon, getMonogram(link.name), pickVariant(link.name));
  return icon;
}

function createSiteCard(link, isSorting) {
  const item = createElement("li", "site-card");
  item.dataset.linkId = link.id;
  item.dataset.categoryId = link.categoryId;
  item.draggable = isSorting;
  item.classList.toggle("is-sortable", isSorting);

  const anchor = createElement("a", "site-link");
  anchor.href = link.url;
  anchor.target = state.settings.openMode === "new" ? "_blank" : "_self";
  anchor.rel = state.settings.openMode === "new" ? "noreferrer noopener" : "";

  const siteBody = createElement("div", "site-body");
  const title = document.createElement("strong");
  title.textContent = link.name;
  const url = createElement("span", "site-url");
  url.textContent = normalizeUrl(link.url).displayUrl;
  const meta = createElement("span", "site-meta");
  meta.textContent = buildSiteMeta(link);

  siteBody.append(title, url, meta);
  anchor.append(createSiteIcon(link), siteBody);

  const actions = createElement("div", "site-actions");
  const editButton = createElement("button", "site-action");
  editButton.type = "button";
  editButton.dataset.action = "edit-site";
  editButton.dataset.linkId = link.id;
  editButton.setAttribute("aria-label", `编辑 ${link.name}`);
  editButton.innerHTML = `
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M4 20L8.5 19L18 9.5L14.5 6L5 15.5L4 20Z"></path>
      <path d="M12.5 8L16 11.5"></path>
    </svg>
  `;

  const deleteButton = createElement("button", "site-action");
  deleteButton.type = "button";
  deleteButton.dataset.action = "delete-site";
  deleteButton.dataset.linkId = link.id;
  deleteButton.setAttribute("aria-label", `删除 ${link.name}`);
  deleteButton.innerHTML = `
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M5 7.5H19"></path>
      <path d="M9.5 7.5V5.75C9.5 5.06 10.06 4.5 10.75 4.5H13.25C13.94 4.5 14.5 5.06 14.5 5.75V7.5"></path>
      <path d="M8.25 9.5V17"></path>
      <path d="M12 9.5V17"></path>
      <path d="M15.75 9.5V17"></path>
      <path d="M6.5 7.5L7.1 18.2C7.15 19.06 7.86 19.75 8.72 19.75H15.28C16.14 19.75 16.85 19.06 16.9 18.2L17.5 7.5"></path>
    </svg>
  `;

  actions.append(editButton, deleteButton);
  item.append(anchor, actions);
  return item;
}

function renderSections(view) {
  sectionsRoot.textContent = "";

  if (!view.totalLinks || (view.hasSearch && !view.hasVisibleResults)) {
    sectionsRoot.hidden = true;
    state.sectionRecords = [];
    return;
  }

  sectionsRoot.hidden = false;

  view.groups.forEach((group, index) => {
    if (view.hasSearch && group.visibleCount === 0) return;

    const article = createElement("article", "glass-panel section-card");
    article.dataset.sectionId = group.category.id;
    article.id = `section-${group.category.id}`;
    article.classList.toggle("is-sorting", state.sortSectionId === group.category.id);

    const header = createElement("header", "panel-heading");
    const titleWrap = document.createElement("div");
    const eyebrow = createElement("p", "eyebrow");
    eyebrow.textContent = `Category ${String(index + 1).padStart(2, "0")}`;
    const title = document.createElement("h2");
    title.textContent = group.category.name;
    titleWrap.append(eyebrow, title);

    const actions = createElement("div", "section-actions");
    const meta = createElement("span", "section-meta");
    const count = view.hasSearch ? group.visibleCount : group.totalCount;
    meta.textContent = `${count} 个站点`;

    const sortButton = createElement("button", "button button-ghost");
    sortButton.type = "button";
    sortButton.dataset.action = "toggle-sort";
    sortButton.dataset.categoryId = group.category.id;
    sortButton.textContent =
      state.sortSectionId === group.category.id ? "完成排序" : "拖拽排序";

    const addButton = createElement("button", "button button-ghost");
    addButton.type = "button";
    addButton.dataset.action = "new-site";
    addButton.dataset.categoryId = group.category.id;
    addButton.textContent = "新增站点";

    actions.append(meta, sortButton, addButton);
    header.append(titleWrap, actions);
    article.append(header);

    if (!group.allLinks.length && !view.hasSearch) {
      const empty = createElement("div", "section-empty");
      const message = createElement("p", "text-pretty");
      message.textContent = "这个分类还没有站点，可以直接新增，或者稍后从 JSON 导入。";
      const button = createElement("button", "button button-secondary");
      button.type = "button";
      button.dataset.action = "new-site";
      button.dataset.categoryId = group.category.id;
      button.textContent = "新增第一条站点";
      empty.append(message, button);
      article.append(empty);
      sectionsRoot.append(article);
      return;
    }

    const renderedLinks = view.hasSearch ? group.visibleLinks : group.allLinks;
    const grid = createElement(
      "ul",
      renderedLinks.length <= 3 ? "site-grid compact-grid" : "site-grid",
    );
    grid.dataset.categoryId = group.category.id;
    grid.setAttribute("aria-label", `${group.category.name}站点`);

    renderedLinks.forEach((link) => {
      grid.append(createSiteCard(link, state.sortSectionId === group.category.id));
    });

    article.append(grid);
    sectionsRoot.append(article);
  });

  state.sectionRecords = [
    ...sectionsRoot.querySelectorAll(".section-card[data-section-id]"),
  ];
}

function renderEmptyStates(view) {
  const hasAnyLinks = view.totalLinks > 0;
  const showSearchEmpty = view.hasSearch && !view.hasVisibleResults;
  const showEmpty = !view.hasSearch && !hasAnyLinks;

  emptyStateCard.hidden = !showEmpty;
  searchEmptyState.hidden = !showSearchEmpty;

  if (!showEmpty) return;

  const hasCategories = view.hasCategories;
  const title = emptyStateCard.querySelector("h2");
  const bodyText = emptyStateCard.querySelector("p");

  if (!hasCategories) {
    title.textContent = "你的随意门还没有站点";
    bodyText.textContent =
      "可以从零开始整理分类和常用网址，或者先导入示例数据确认布局与交互方式。";
    emptyManageCategoriesButton.textContent = "管理分组";
  } else {
    title.textContent = "分类已经就绪，开始添加第一条站点";
    bodyText.textContent =
      "当前浏览器里已经有分类，但还没有保存任何网址。你可以直接新增站点，或者导入示例数据查看完整效果。";
    emptyManageCategoriesButton.textContent = "新增第一条站点";
  }
}

function renderTransferFeedback() {
  if (!state.importFeedback) {
    importFeedbackCard.hidden = true;
    importFeedbackSummary.textContent = "";
    importFeedbackList.textContent = "";
    return;
  }

  importFeedbackCard.hidden = false;
  importFeedbackSummary.textContent = "";
  importFeedbackList.textContent = "";

  const metrics = [
    { label: "成功", value: state.importFeedback.success, warning: false },
    { label: "覆盖", value: state.importFeedback.overridden, warning: false },
    { label: "失败", value: state.importFeedback.failed, warning: true },
  ];

  metrics.forEach((metric) => {
    const item = createElement(
      "div",
      metric.warning ? "feedback-pill is-warning" : "feedback-pill",
    );
    const label = document.createElement("span");
    label.textContent = metric.label;
    const strong = document.createElement("strong");
    strong.textContent = formatCount(metric.value);
    item.append(label, strong);
    importFeedbackSummary.append(item);
  });

  const messages = state.importFeedback.messages.length
    ? state.importFeedback.messages
    : ["导入完成，没有额外警告。"];

  messages.forEach((message) => {
    const item = document.createElement("li");
    item.textContent = message;
    importFeedbackList.append(item);
  });
}

function renderCategoryDialog() {
  categoryManagerList.textContent = "";
  categoryManagerEmpty.hidden = state.categories.length > 0;

  sortCategories(state.categories).forEach((category) => {
    const row = createElement("li", "category-manager-item");
    row.dataset.categoryId = category.id;
    row.draggable = true;

    const handle = createElement("button", "drag-handle");
    handle.type = "button";
    handle.setAttribute("aria-label", `拖拽排序 ${category.name}`);
    handle.innerHTML = `
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M8 6.5H8.01"></path>
        <path d="M8 12H8.01"></path>
        <path d="M8 17.5H8.01"></path>
        <path d="M16 6.5H16.01"></path>
        <path d="M16 12H16.01"></path>
        <path d="M16 17.5H16.01"></path>
      </svg>
    `;

    const field = createElement("label", "category-row-field");
    const input = document.createElement("input");
    input.type = "text";
    input.value = category.name;
    input.dataset.categoryId = category.id;
    input.setAttribute("aria-label", `${category.name} 分类名称`);
    field.append(input);

    const countPill = createElement("span", "count-pill");
    countPill.textContent = formatCount(
      state.links.filter((link) => link.categoryId === category.id).length,
    );

    const saveButton = createElement("button", "button button-ghost button-small");
    saveButton.type = "button";
    saveButton.dataset.action = "save-category";
    saveButton.dataset.categoryId = category.id;
    saveButton.textContent = "保存";

    const deleteButton = createElement("button", "button button-ghost button-small");
    deleteButton.type = "button";
    deleteButton.dataset.action = "delete-category";
    deleteButton.dataset.categoryId = category.id;
    deleteButton.textContent = "删除";

    const message = createElement("p", "micro-copy category-row-message");
    const hasMessage = state.categoryRowFeedback.id === category.id;
    message.hidden = !hasMessage;
    message.textContent = hasMessage ? state.categoryRowFeedback.message : "";

    row.append(handle, field, countPill, saveButton, deleteButton, message);
    categoryManagerList.append(row);
  });
}

function renderEditorCategoryOptions(selectedCategoryId = "") {
  editorCategorySelect.textContent = "";

  if (!state.categories.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "请先创建分类";
    editorCategorySelect.append(option);
    editorCategorySelect.value = "";
    return;
  }

  sortCategories(state.categories).forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    editorCategorySelect.append(option);
  });

  editorCategorySelect.value =
    selectedCategoryId && state.categories.some((item) => item.id === selectedCategoryId)
      ? selectedCategoryId
      : sortCategories(state.categories)[0]?.id ?? "";
}

function renderPresetIconGrid() {
  presetIconGrid.textContent = "";

  Object.entries(PRESET_ICONS).forEach(([key, preset]) => {
    const button = createElement(
      "button",
      "preset-icon-button" +
        (state.editor.presetKey === key ? " is-selected" : ""),
    );
    button.type = "button";
    button.dataset.action = "select-preset-icon";
    button.dataset.iconPresetKey = key;
    button.setAttribute("aria-pressed", String(state.editor.presetKey === key));

    const preview = createElement("span", `site-icon is-preset ${preset.variant}`);
    preview.setAttribute("aria-hidden", "true");
    preview.innerHTML = preset.svg;

    const label = createElement("span", "preset-icon-label");
    label.textContent = preset.label;

    button.append(preview, label);
    presetIconGrid.append(button);
  });
}

function renderEditorPanels() {
  iconModeButtons.forEach((button) => {
    const selected = button.dataset.iconMode === state.editor.iconMode;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  editorUploadPanel.hidden = state.editor.iconMode !== "upload";
  editorPresetPanel.hidden = state.editor.iconMode !== "preset";

  renderPresetIconGrid();

  editorUploadPreview.hidden = true;
  editorUploadPreview.textContent = "";

  if (state.editor.uploadAsset) {
    const preview = createElement("span", "asset-preview-icon");
    const image = document.createElement("img");
    image.src = state.editor.uploadAsset.data;
    image.alt = "";
    preview.append(image);
    editorUploadPreview.append(preview);
    editorUploadPreview.hidden = false;
    editorUploadStatus.textContent = `待保存图标：${state.editor.uploadAsset.name}`;
    return;
  }

  if (
    state.editor.existingUploadAssetId &&
    state.assets.has(state.editor.existingUploadAssetId)
  ) {
    const asset = state.assets.get(state.editor.existingUploadAssetId);
    const preview = createElement("span", "asset-preview-icon");
    const image = document.createElement("img");
    image.src = asset.data;
    image.alt = "";
    preview.append(image);
    editorUploadPreview.append(preview);
    editorUploadPreview.hidden = false;
    editorUploadStatus.textContent = `当前已使用上传图标：${asset.name}`;
    return;
  }

  editorUploadStatus.textContent = "未选择文件。";
}

function clearEditorErrors() {
  Object.values(editorErrorElements).forEach((element) => {
    element.hidden = true;
    element.textContent = "";
  });

  [editorNameInput, editorUrlInput, editorCategorySelect].forEach((field) => {
    field.removeAttribute("aria-invalid");
  });
}

function setFieldError(field, message) {
  const mapping = {
    [editorNameInput.id]: editorErrorElements.name,
    [editorUrlInput.id]: editorErrorElements.url,
    [editorCategorySelect.id]: editorErrorElements.category,
  };

  const target = mapping[field.id];
  if (!target) return;

  target.hidden = false;
  target.textContent = message;
  field.setAttribute("aria-invalid", "true");
}

function resetEditorStatus(message = "") {
  state.editor.status = message;
  editorFormStatus.textContent = message;
}

function openEditorDialog({ linkId = "", categoryId = "", trigger = null } = {}) {
  if (!state.categories.length) {
    categoryCreateStatus.textContent = "请先创建至少一个分类，再添加站点。";
    openDialog("category-dialog", trigger ?? newSiteButton);
    return;
  }

  clearEditorErrors();
  state.editor.uploadAsset = null;
  editorIconFileInput.value = "";

  const link = linkId ? state.links.find((item) => item.id === linkId) : null;
  const isEdit = Boolean(link);
  const selectedCategoryId = isEdit
    ? link.categoryId
    : categoryId || sortCategories(state.categories)[0]?.id || "";

  state.editor.mode = isEdit ? "edit" : "create";
  state.editor.linkId = link?.id ?? "";
  state.editor.categoryId = selectedCategoryId;
  state.editor.iconMode = link?.iconMode ?? "auto";
  state.editor.presetKey = link?.iconPresetKey || "grid";
  state.editor.existingUploadAssetId = link?.iconAssetId ?? "";

  editorEyebrow.textContent = isEdit ? "编辑站点" : "新增站点";
  document.querySelector("#editor-title").textContent = isEdit
    ? "修改导航项"
    : "创建导航项";

  editorLinkIdInput.value = link?.id ?? "";
  editorNameInput.value = link?.name ?? "";
  editorUrlInput.value = link?.url ?? "";
  editorDescriptionInput.value = link?.description ?? "";
  editorTagsInput.value = Array.isArray(link?.tags) ? link.tags.join(", ") : "";
  editorNoteInput.value = link?.note ?? "";

  renderEditorCategoryOptions(selectedCategoryId);
  renderEditorPanels();
  resetEditorStatus(isEdit ? "修改后会立即写入当前浏览器。" : "");
  openDialog("editor-dialog", trigger ?? newSiteButton);
  requestAnimationFrame(() => editorNameInput.focus());
}

function syncDialogLayout(dialog) {
  if (!(dialog instanceof HTMLDialogElement)) return;

  const shell = dialog.querySelector(".dialog-form");
  if (!(shell instanceof HTMLElement)) return;

  const maxHeight = Math.max(window.innerHeight - 32, 320);
  const naturalHeight = shell.scrollHeight + 2;
  dialog.style.blockSize = `${Math.min(naturalHeight, maxHeight)}px`;
}

function openDialog(dialogId, trigger = null) {
  const dialog = document.querySelector(`#${dialogId}`);
  if (!dialog || dialog.open) return;

  if (trigger) {
    dialogReturnFocus.set(dialog, trigger);
  }

  if (dialogId === "appearance-dialog") {
    syncAppearanceControls();
  }

  if (dialogId === "transfer-dialog") {
    renderTransferFeedback();
    void updateExportSizePreview();
  }

  if (dialogId === "category-dialog") {
    renderCategoryDialog();
  }

  dialog.showModal();
  syncDialogLayout(dialog);
  closeOverflowMenu();
}

function closeDialog(dialogId) {
  const dialog = document.querySelector(`#${dialogId}`);
  if (dialog?.open) dialog.close();
}

function closeOverflowMenu() {
  if (!overflowMenu) return;
  overflowMenu.open = false;
  overflowSummary?.setAttribute("aria-expanded", "false");
}

function restoreDialogFocus(dialog) {
  const trigger = dialogReturnFocus.get(dialog);
  if (trigger instanceof HTMLElement) {
    trigger.focus();
  }
}

function updateActiveCategoryByViewport() {
  if (!state.sectionRecords.length) return;

  let currentId = state.sectionRecords[0]?.dataset.sectionId ?? "";
  let bestDistance = Number.POSITIVE_INFINITY;

  state.sectionRecords.forEach((section) => {
    const top = section.getBoundingClientRect().top;
    const distance = Math.abs(top - SCROLL_OFFSET);

    if (top <= SCROLL_OFFSET && distance < bestDistance) {
      currentId = section.dataset.sectionId ?? currentId;
      bestDistance = distance;
    }
  });

  if (currentId) {
    setActiveCategory(currentId);
  }
}

function renderApplication() {
  applySettingsToBody();

  const view = getGroupedLinks();
  const firstVisibleGroup = view.groups.find((group) =>
    view.hasSearch ? group.visibleCount > 0 : true,
  );

  if (view.hasSearch && !view.hasVisibleResults) {
    state.activeCategoryId = "";
  }

  if (
    !state.activeCategoryId ||
    !view.groups.some((group) => group.category.id === state.activeCategoryId)
  ) {
    state.activeCategoryId = firstVisibleGroup?.category.id ?? "";
  }

  renderSidebar(view);
  renderSections(view);
  renderEmptyStates(view);
  renderTransferFeedback();
  syncAppearanceControls();
  renderEditorCategoryOptions(state.editor.categoryId);

  if (state.activeCategoryId) {
    setActiveCategory(state.activeCategoryId);
  }

  requestAnimationFrame(() => {
    if (view.hasSearch || !state.sectionRecords.length) return;
    updateActiveCategoryByViewport();
  });
}

function schedulePersist() {
  persistQueue = persistQueue
    .catch(() => {})
    .then(async () => {
      pruneOrphanAssets(state.assets, state.links, state.settings);
      resequenceCategories(state.categories);
      resequenceLinks(state.links);

      await replaceAllData({
        categories: sortCategories(state.categories).map((item) => ({ ...item })),
        links: sortLinks(state.links).map((item) => ({ ...item })),
        settings: cloneSettings(state.settings),
        assets: [...state.assets.values()].map((item) => ({ ...item })),
      });
      return true;
    })
    .catch((error) => {
      console.error(error);
      sidebarHint.textContent =
        "最近一次本地保存失败，请检查浏览器存储权限或可用空间。";
      return false;
    });

  return persistQueue;
}

async function setSetting(key, value) {
  state.settings[key] = value;
  renderApplication();
  await schedulePersist();
}

async function updateExportSizePreview() {
  if (!exportSizeNote) return;

  const payload = await buildExportPayload({
    includeIcons: exportIconsInput.checked,
    includeWallpaper: exportWallpaperInput.checked,
  });
  const json = JSON.stringify(payload, null, 2);
  const size = new Blob([json], { type: "application/json" }).size;
  exportSizeNote.textContent = exportWallpaperInput.checked
    ? `预计导出大小：${formatBytes(size)}。当前已包含上传壁纸资源。`
    : `预计导出大小：${formatBytes(size)}。默认不包含上传壁纸。`;
}

async function initializeState() {
  const [categories, links, settingsRecord, assets] = await Promise.all([
    getAllRecords(STORE_CATEGORIES),
    getAllRecords(STORE_LINKS),
    getRecord(STORE_SETTINGS, SETTINGS_ID),
    getAllRecords(STORE_ASSETS),
  ]);

  let shouldPersist = false;
  const sanitizedCategories = categories
    .map((category, index) => sanitizeCategoryRecord(category, index))
    .filter(Boolean);

  if (sanitizedCategories.length !== categories.length) {
    shouldPersist = true;
  }

  resequenceCategories(sanitizedCategories);
  state.categories = sortCategories(sanitizedCategories);

  const categoryIds = new Set(state.categories.map((category) => category.id));
  const sanitizedLinks = links
    .map((link, index) => sanitizeLinkRecord(link, categoryIds, index))
    .filter(Boolean)
    .map((link) => syncNormalizedFields(link));

  if (sanitizedLinks.length !== links.length) {
    shouldPersist = true;
  }

  resequenceLinks(sanitizedLinks);
  state.links = sortLinks(sanitizedLinks);

  const sanitizedAssets = new Map();
  assets.forEach((asset) => {
    const sanitized = sanitizeAssetRecord(asset);
    if (sanitized) {
      sanitizedAssets.set(sanitized.id, sanitized);
    } else {
      shouldPersist = true;
    }
  });

  state.assets = sanitizedAssets;

  if (settingsRecord) {
    state.settings = cloneSettings(settingsRecord);
  } else {
    const migrated = readPrototypeSettings();
    state.settings = cloneSettings(migrated ?? DEFAULT_SETTINGS);
    shouldPersist = true;

    if (migrated) {
      try {
        localStorage.removeItem(PROTOTYPE_STORAGE_KEY);
      } catch {
        // Ignore migration cleanup failure.
      }
    }
  }

  if (
    state.settings.wallpaperMode === "upload" &&
    (!state.settings.wallpaperAssetId ||
      !state.assets.has(state.settings.wallpaperAssetId))
  ) {
    state.settings.wallpaperMode = "preset";
    state.settings.wallpaperAssetId = "";
    shouldPersist = true;
  }

  state.links.forEach((link) => {
    if (link.iconMode === "upload" && !state.assets.has(link.iconAssetId)) {
      link.iconMode = "auto";
      link.iconAssetId = "";
      shouldPersist = true;
    }
  });

  pruneOrphanAssets(state.assets, state.links, state.settings);

  if (shouldPersist) {
    await schedulePersist();
  }
}

function buildSamplePayload() {
  return {
    version: 1,
    exportedAt: timestamp(),
    settings: cloneSettings(SAMPLE_DATA.settings),
    categories: SAMPLE_DATA.categories.map((item) => ({ ...item })),
    links: SAMPLE_DATA.links.map((item) => ({
      ...syncNormalizedFields({ ...item }),
      tags: [...(item.tags ?? [])],
    })),
  };
}

function cloneLinkForExport(link) {
  return {
    id: link.id,
    name: link.name,
    url: link.url,
    categoryId: link.categoryId,
    order: link.order,
    description: link.description,
    tags: [...(link.tags ?? [])],
    note: link.note,
    iconMode: link.iconMode,
    iconAssetId: link.iconAssetId,
    iconPresetKey: link.iconPresetKey,
    createdAt: link.createdAt,
    updatedAt: link.updatedAt,
  };
}

async function buildExportPayload({ includeIcons, includeWallpaper }) {
  const assets = [];
  const settings = cloneSettings(state.settings);
  const links = sortLinks(state.links).map((link) => cloneLinkForExport(link));

  const allowedIconAssetIds = new Set();

  if (includeIcons) {
    links.forEach((link) => {
      if (link.iconMode === "upload" && link.iconAssetId) {
        allowedIconAssetIds.add(link.iconAssetId);
      }
    });
  } else {
    links.forEach((link) => {
      if (link.iconMode === "upload") {
        link.iconMode = "auto";
        link.iconAssetId = "";
      }
    });
  }

  if (includeIcons) {
    allowedIconAssetIds.forEach((id) => {
      const asset = state.assets.get(id);
      if (asset?.kind === "icon") {
        assets.push({ ...asset });
      }
    });
  }

  if (
    includeWallpaper &&
    settings.wallpaperMode === "upload" &&
    settings.wallpaperAssetId
  ) {
    const asset = state.assets.get(settings.wallpaperAssetId);
    if (asset?.kind === "wallpaper") {
      assets.push({ ...asset });
    } else {
      settings.wallpaperMode = "preset";
      settings.wallpaperAssetId = "";
    }
  } else if (settings.wallpaperMode === "upload") {
    settings.wallpaperMode = "preset";
    settings.wallpaperAssetId = "";
  }

  const payload = {
    version: 1,
    exportedAt: timestamp(),
    settings,
    categories: sortCategories(state.categories).map((category) => ({ ...category })),
    links,
  };

  if (assets.length) {
    payload.assets = assets;
  }

  return payload;
}

function downloadJson(filename, content) {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function makeFeedback() {
  return {
    success: 0,
    overridden: 0,
    failed: 0,
    messages: [],
  };
}

function sanitizeImportedCategories(rawCategories, feedback) {
  const categories = [];
  const seenNames = new Set();

  if (!Array.isArray(rawCategories)) return categories;

  rawCategories.forEach((category, index) => {
    const sanitized = sanitizeCategoryRecord(category, index);
    if (!sanitized) {
      feedback.failed += 1;
      feedback.messages.push(`第 ${index + 1} 个分类名称为空，已忽略。`);
      return;
    }

    const key = normalizeText(sanitized.name);
    if (seenNames.has(key)) {
      feedback.messages.push(`分类“${sanitized.name}”重复，已忽略后续重复项。`);
      return;
    }

    seenNames.add(key);
    categories.push(sanitized);
  });

  return categories;
}

function buildImportedAssetMap(rawAssets, feedback) {
  const assetMap = new Map();
  const legacyMap = new Map();

  if (!Array.isArray(rawAssets)) {
    return { assetMap, legacyMap };
  }

  rawAssets.forEach((asset, index) => {
    const sanitized = sanitizeAssetRecord(asset);
    if (!sanitized) {
      feedback.messages.push(`第 ${index + 1} 个资源无效，已忽略。`);
      return;
    }

    const nextId = createId("asset");
    sanitized.id = nextId;
    assetMap.set(nextId, sanitized);
    legacyMap.set(String(asset?.id ?? nextId), nextId);
  });

  return { assetMap, legacyMap };
}

function buildImportSettings(rawSettings, assetMap, feedback) {
  const settings = cloneSettings(rawSettings);

  if (
    settings.wallpaperMode === "upload" &&
    (!settings.wallpaperAssetId || !assetMap.has(settings.wallpaperAssetId))
  ) {
    settings.wallpaperMode = "preset";
    settings.wallpaperAssetId = "";
    feedback.messages.push("上传壁纸未包含或已损坏，已回退到预设壁纸。");
  }

  if (!WALLPAPERS.light[settings.wallpaperPresetKey]) {
    settings.wallpaperPresetKey = DEFAULT_SETTINGS.wallpaperPresetKey;
  }

  return settings;
}

function remapLinkAsset(link, importedAssetIds, feedback) {
  const nextLink = { ...link };

  if (nextLink.iconMode === "upload") {
    const remappedId = importedAssetIds.get(nextLink.iconAssetId);
    if (!remappedId) {
      nextLink.iconMode = "auto";
      nextLink.iconAssetId = "";
      feedback.messages.push(`站点“${nextLink.name}”缺少上传图标，已回退到自动 favicon。`);
    } else {
      nextLink.iconAssetId = remappedId;
    }
  }

  return nextLink;
}

async function importPayload(payload, mode) {
  const feedback = makeFeedback();
  const nextCategories = mode === "replace"
    ? []
    : sortCategories(state.categories).map((category) => ({ ...category }));
  const nextLinks = mode === "replace"
    ? []
    : sortLinks(state.links).map((link) => ({ ...link, tags: [...(link.tags ?? [])] }));
  const nextAssets = mode === "replace" ? new Map() : cloneAssetMap(state.assets);
  let nextSettings = mode === "replace"
    ? cloneSettings(DEFAULT_SETTINGS)
    : cloneSettings(state.settings);

  const importedCategories = sanitizeImportedCategories(payload?.categories, feedback);
  const { assetMap, legacyMap } = buildImportedAssetMap(payload?.assets, feedback);
  const remappedAssetIds = new Map();

  assetMap.forEach((asset, id) => {
    nextAssets.set(id, { ...asset });
    remappedAssetIds.set(id, id);
  });

  legacyMap.forEach((newId, oldId) => {
    remappedAssetIds.set(oldId, newId);
  });

  const categoryIdMap = new Map();
  const existingNameMap = new Map(
    nextCategories.map((category) => [normalizeText(category.name), category]),
  );

  importedCategories.forEach((category) => {
    const key = normalizeText(category.name);

    if (mode === "merge" && existingNameMap.has(key)) {
      categoryIdMap.set(category.id, existingNameMap.get(key).id);
      return;
    }

    const nextCategory = {
      ...category,
      id:
        mode === "replace" || !nextCategories.some((item) => item.id === category.id)
          ? category.id
          : createId("cat"),
      createdAt: category.createdAt ?? timestamp(),
      updatedAt: timestamp(),
    };

    nextCategories.push(nextCategory);
    categoryIdMap.set(category.id, nextCategory.id);
    existingNameMap.set(key, nextCategory);
  });

  if (!nextCategories.length && Array.isArray(payload?.links) && payload.links.length) {
    const fallbackCategory = {
      id: createId("cat"),
      name: "未分类",
      order: 0,
      createdAt: timestamp(),
      updatedAt: timestamp(),
    };

    nextCategories.push(fallbackCategory);
    feedback.messages.push("导入文件未包含分类，已自动创建“未分类”。");
  }

  const availableCategoryIds = new Set(nextCategories.map((category) => category.id));
  const fallbackCategoryId = nextCategories[0]?.id ?? "";
  const seenNormalizedUrls = new Map(
    nextLinks.map((link, index) => [link.normalizedUrl, { link, index }]),
  );
  const rawLinks = Array.isArray(payload?.links) ? payload.links : [];

  rawLinks.forEach((rawLink, index) => {
    const originalCategoryId = String(rawLink?.categoryId ?? "");
    const mappedCategoryId =
      categoryIdMap.get(originalCategoryId) ||
      (availableCategoryIds.has(originalCategoryId) ? originalCategoryId : fallbackCategoryId);

    const sanitized = sanitizeLinkRecord(
      {
        ...rawLink,
        categoryId: mappedCategoryId,
      },
      availableCategoryIds,
      index,
    );

    if (!sanitized) {
      feedback.failed += 1;
      feedback.messages.push(
        `第 ${index + 1} 个站点缺少名称或网址无效，未导入。`,
      );
      return;
    }

    const remappedLink = remapLinkAsset(sanitized, remappedAssetIds, feedback);
    remappedLink.updatedAt = timestamp();

    if (mode === "merge" && seenNormalizedUrls.has(remappedLink.normalizedUrl)) {
      const existing = seenNormalizedUrls.get(remappedLink.normalizedUrl);
      const preservedId = existing.link.id;
      const preservedCreatedAt = existing.link.createdAt;

      nextLinks[existing.index] = {
        ...existing.link,
        ...remappedLink,
        id: preservedId,
        createdAt: preservedCreatedAt,
        updatedAt: timestamp(),
      };

      seenNormalizedUrls.set(remappedLink.normalizedUrl, {
        link: nextLinks[existing.index],
        index: existing.index,
      });

      feedback.success += 1;
      feedback.overridden += 1;
      feedback.messages.push(`站点“${remappedLink.name}”与本地重复，已使用导入数据覆盖。`);
      return;
    }

    const nextLink = {
      ...remappedLink,
      id: mode === "replace" ? remappedLink.id : createId("link"),
      createdAt: remappedLink.createdAt ?? timestamp(),
      updatedAt: timestamp(),
    };

    nextLinks.push(nextLink);
    seenNormalizedUrls.set(nextLink.normalizedUrl, {
      link: nextLink,
      index: nextLinks.length - 1,
    });
    feedback.success += 1;
  });

  if (mode === "replace") {
    nextSettings = buildImportSettings(payload?.settings, remappedAssetIds, feedback);

    if (
      nextSettings.wallpaperMode === "upload" &&
      nextSettings.wallpaperAssetId
    ) {
      nextSettings.wallpaperAssetId =
        remappedAssetIds.get(nextSettings.wallpaperAssetId) ?? "";

      if (!nextSettings.wallpaperAssetId) {
        nextSettings.wallpaperMode = "preset";
      }
    }
  }

  resequenceCategories(nextCategories);
  resequenceLinks(nextLinks);
  pruneOrphanAssets(nextAssets, nextLinks, nextSettings);

  state.categories = sortCategories(nextCategories);
  state.links = sortLinks(nextLinks);
  state.assets = nextAssets;
  state.settings = cloneSettings(nextSettings);
  state.importFeedback = feedback;
  state.sortSectionId = "";

  renderApplication();
  await schedulePersist();
}

async function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(reader.error ?? new Error("读取文件失败"));
    reader.readAsDataURL(file);
  });
}

async function createAssetFromFile(file, kind) {
  const data = await readFileAsDataUrl(file);
  return {
    id: createId("asset"),
    kind,
    mimeType: file.type || "application/octet-stream",
    name: file.name || `${kind}.bin`,
    data,
  };
}

function scrollToCategory(categoryId) {
  const target = document.querySelector(`#section-${categoryId}`);
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
  setActiveCategory(categoryId);
}

function getFirstVisibleSiteLink() {
  return sectionsRoot.querySelector(".site-link");
}

function requestDeleteSite(linkId) {
  const link = state.links.find((item) => item.id === linkId);
  if (!link) return;

  state.pendingDelete = {
    type: "site",
    id: linkId,
  };
  confirmMessage.textContent = `确认删除“${link.name}”？该站点会从当前浏览器中移除。`;
  confirmSubmit.textContent = "确认删除";
  openDialog("confirm-dialog");
}

function requestDeleteCategory(categoryId) {
  const category = state.categories.find((item) => item.id === categoryId);
  if (!category) return;

  const count = state.links.filter((link) => link.categoryId === categoryId).length;
  if (count > 0) {
    state.categoryRowFeedback = {
      id: categoryId,
      message: "该分类下仍有站点，请先迁移或删除站点后再删除分类。",
    };
    renderCategoryDialog();
    return;
  }

  state.pendingDelete = {
    type: "category",
    id: categoryId,
  };
  confirmMessage.textContent = `确认删除分类“${category.name}”？该操作无法撤销。`;
  confirmSubmit.textContent = "确认删除";
  openDialog("confirm-dialog", categoryDialog);
}

async function handleConfirmDelete() {
  if (!state.pendingDelete) return;

  if (state.pendingDelete.type === "site") {
    state.links = state.links.filter((link) => link.id !== state.pendingDelete.id);
    resequenceLinks(state.links);
  }

  if (state.pendingDelete.type === "category") {
    state.categories = state.categories.filter(
      (category) => category.id !== state.pendingDelete.id,
    );
    resequenceCategories(state.categories);
    state.categoryRowFeedback = { id: "", message: "" };
  }

  state.pendingDelete = null;
  closeDialog("confirm-dialog");
  renderApplication();
  await schedulePersist();
}

async function handleEditorSubmit(event) {
  event.preventDefault();
  clearEditorErrors();
  resetEditorStatus("");

  const name = editorNameInput.value.trim();
  const urlValue = editorUrlInput.value.trim();
  const categoryId = editorCategorySelect.value;

  if (!name) {
    setFieldError(editorNameInput, "请输入站点名称");
  }

  let normalized;

  if (!urlValue) {
    setFieldError(editorUrlInput, "请输入网址");
  } else {
    try {
      normalized = normalizeUrl(urlValue);
    } catch (error) {
      setFieldError(editorUrlInput, error.message);
    }
  }

  if (!categoryId) {
    setFieldError(editorCategorySelect, "请先选择一个分类");
  }

  if (
    state.editor.iconMode === "upload" &&
    !state.editor.uploadAsset &&
    !state.editor.existingUploadAssetId
  ) {
    resetEditorStatus("上传图标模式下，请先选择一个图标文件。");
  }

  const hasError = [...Object.values(editorErrorElements)].some(
    (element) => !element.hidden,
  );
  if (hasError || (!state.editor.uploadAsset && !state.editor.existingUploadAssetId && state.editor.iconMode === "upload")) {
    return;
  }

  const now = timestamp();
  const existingLink = state.links.find((item) => item.id === state.editor.linkId);
  const nextIconMode = state.editor.iconMode;
  let nextIconAssetId = "";
  let nextIconPresetKey = "";

  if (nextIconMode === "upload") {
    if (state.editor.uploadAsset) {
      nextIconAssetId = state.editor.uploadAsset.id;
      state.assets.set(state.editor.uploadAsset.id, { ...state.editor.uploadAsset });
    } else {
      nextIconAssetId = state.editor.existingUploadAssetId;
    }
  }

  if (nextIconMode === "preset") {
    nextIconPresetKey = state.editor.presetKey;
  }

  const nextLink = {
    id: existingLink?.id ?? createId("link"),
    name,
    url: normalized.href,
    normalizedUrl: normalized.normalizedUrl,
    categoryId,
    order: existingLink?.order ?? state.links.filter((link) => link.categoryId === categoryId).length,
    description: editorDescriptionInput.value.trim(),
    tags: parseTags(editorTagsInput.value),
    note: editorNoteInput.value.trim(),
    iconMode: nextIconMode,
    iconAssetId: nextIconAssetId,
    iconPresetKey: nextIconPresetKey,
    createdAt: existingLink?.createdAt ?? now,
    updatedAt: now,
  };

  if (existingLink) {
    const previousCategoryId = existingLink.categoryId;
    const index = state.links.findIndex((item) => item.id === existingLink.id);

    if (previousCategoryId !== categoryId) {
      nextLink.order = state.links.filter((link) => link.categoryId === categoryId).length;
    }

    state.links.splice(index, 1, nextLink);
    resequenceLinks(state.links);
  } else {
    state.links.push(nextLink);
    resequenceLinks(state.links);
  }

  renderApplication();

  const persisted = await schedulePersist();
  if (persisted) {
    closeDialog("editor-dialog");
  } else {
    resetEditorStatus("保存失败，浏览器本地存储可能不可用。");
  }
}

async function handleWallpaperUploadChange(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const asset = await createAssetFromFile(file, "wallpaper");
    state.assets.set(asset.id, asset);
    state.settings.wallpaperMode = "upload";
    state.settings.wallpaperAssetId = asset.id;
    renderApplication();
    const persisted = await schedulePersist();
    if (!persisted) {
      wallpaperStatus.textContent = "壁纸上传后保存失败，请检查浏览器存储空间。";
    }
  } catch {
    wallpaperStatus.textContent = "壁纸上传失败，请重试。";
  } finally {
    wallpaperUploadInput.value = "";
  }
}

async function handleIconUploadChange(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    state.editor.uploadAsset = await createAssetFromFile(file, "icon");
    renderEditorPanels();
    resetEditorStatus("图标将在保存站点后写入当前浏览器。");
  } catch {
    resetEditorStatus("图标读取失败，请换一个文件重试。");
  } finally {
    editorIconFileInput.value = "";
  }
}

async function handleCategoryCreate(event) {
  event.preventDefault();
  const name = categoryCreateInput.value.trim();

  if (!name) {
    categoryCreateStatus.textContent = "请输入新的分类名称。";
    return;
  }

  const duplicate = state.categories.some(
    (category) => normalizeText(category.name) === normalizeText(name),
  );

  if (duplicate) {
    categoryCreateStatus.textContent = `分类“${name}”已存在。`;
    return;
  }

  state.categories.push({
    id: createId("cat"),
    name,
    order: state.categories.length,
    createdAt: timestamp(),
    updatedAt: timestamp(),
  });

  categoryCreateInput.value = "";
  categoryCreateStatus.textContent = `已新增分类“${name}”。`;
  state.categoryRowFeedback = { id: "", message: "" };

  renderApplication();
  renderCategoryDialog();
  await schedulePersist();
}

async function saveCategoryName(categoryId) {
  const row = categoryManagerList.querySelector(`[data-category-id="${categoryId}"]`);
  const input = row?.querySelector("input");
  const category = state.categories.find((item) => item.id === categoryId);
  if (!row || !input || !category) return;

  const name = input.value.trim();

  if (!name) {
    state.categoryRowFeedback = { id: categoryId, message: "分类名称不能为空。" };
    renderCategoryDialog();
    return;
  }

  const duplicate = state.categories.some(
    (item) =>
      item.id !== categoryId && normalizeText(item.name) === normalizeText(name),
  );

  if (duplicate) {
    state.categoryRowFeedback = { id: categoryId, message: "分类名称重复，请换一个名称。" };
    renderCategoryDialog();
    return;
  }

  category.name = name;
  category.updatedAt = timestamp();
  state.categoryRowFeedback = { id: categoryId, message: "已保存。" };
  renderApplication();
  renderCategoryDialog();
  await schedulePersist();
}

function setImportMode(mode) {
  state.importMode = mode === "merge" ? "merge" : "replace";

  importModeCards.forEach((card) => {
    const selected = card.dataset.importMode === state.importMode;
    card.classList.toggle("is-selected", selected);
    card.setAttribute("aria-pressed", String(selected));
  });
}

async function handleImportFileChange(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const text = await file.text();
    const payload = JSON.parse(text);
    await importPayload(payload, state.importMode);
  } catch (error) {
    state.importFeedback = {
      success: 0,
      overridden: 0,
      failed: 1,
      messages: [error instanceof Error ? error.message : "导入失败，请检查 JSON 文件。"],
    };
    renderTransferFeedback();
  } finally {
    importFileInput.value = "";
  }
}

async function importSampleData(mode = "replace") {
  await importPayload(buildSamplePayload(), mode);
}

function removeDropMarkers() {
  [...document.querySelectorAll(".is-drop-target")].forEach((element) => {
    element.classList.remove("is-drop-target");
  });
}

function clearDragState() {
  state.drag = {
    type: "",
    sourceId: "",
    categoryId: "",
    overId: "",
  };

  removeDropMarkers();
  [...document.querySelectorAll(".is-dragging")].forEach((element) => {
    element.classList.remove("is-dragging");
  });
}

async function reorderLinksWithinCategory(categoryId, sourceId, targetId = "") {
  const links = sortLinks(state.links).filter((link) => link.categoryId === categoryId);
  const sourceIndex = links.findIndex((link) => link.id === sourceId);
  if (sourceIndex === -1) return;

  const [moved] = links.splice(sourceIndex, 1);

  if (!targetId) {
    links.push(moved);
  } else {
    const targetIndex = links.findIndex((link) => link.id === targetId);
    if (targetIndex === -1) {
      links.push(moved);
    } else {
      links.splice(targetIndex, 0, moved);
    }
  }

  const nextIds = new Set(links.map((link) => link.id));
  const otherLinks = state.links.filter(
    (link) => link.categoryId !== categoryId || !nextIds.has(link.id),
  );
  state.links = [...otherLinks, ...links];
  resequenceLinks(state.links);
  renderApplication();
  await schedulePersist();
}

async function reorderCategories(sourceId, targetId = "") {
  const categories = sortCategories(state.categories);
  const sourceIndex = categories.findIndex((category) => category.id === sourceId);
  if (sourceIndex === -1) return;

  const [moved] = categories.splice(sourceIndex, 1);

  if (!targetId) {
    categories.push(moved);
  } else {
    const targetIndex = categories.findIndex((category) => category.id === targetId);
    if (targetIndex === -1) {
      categories.push(moved);
    } else {
      categories.splice(targetIndex, 0, moved);
    }
  }

  state.categories = categories;
  resequenceCategories(state.categories);
  renderApplication();
  renderCategoryDialog();
  await schedulePersist();
}

function handleDialogBackdropClick(dialog, event) {
  const rect = dialog.getBoundingClientRect();
  const inside =
    rect.top <= event.clientY &&
    event.clientY <= rect.bottom &&
    rect.left <= event.clientX &&
    event.clientX <= rect.right;

  if (!inside) dialog.close();
}

function isEditingTarget(target) {
  return (
    target instanceof HTMLElement &&
    (target.closest("input, textarea, select") || target.isContentEditable)
  );
}

function bindStaticEvents() {
  searchForm?.addEventListener("submit", (event) => event.preventDefault());

  searchInput?.addEventListener("input", () => {
    state.search = searchInput.value;
    renderApplication();
  });

  searchInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const firstLink = getFirstVisibleSiteLink();
      if (firstLink) {
        event.preventDefault();
        firstLink.click();
      }
    }

    if (event.key === "Escape") {
      searchInput.value = "";
      state.search = "";
      renderApplication();
      searchInput.blur();
    }
  });

  clearSearchButton?.addEventListener("click", () => {
    searchInput.value = "";
    state.search = "";
    renderApplication();
    searchInput.focus();
  });

  newSiteButton?.addEventListener("click", () => openEditorDialog({ trigger: newSiteButton }));
  manageCategoriesButton?.addEventListener("click", () =>
    openDialog("category-dialog", manageCategoriesButton),
  );
  emptyManageCategoriesButton?.addEventListener("click", () => {
    if (state.categories.length) {
      openEditorDialog({ trigger: emptyManageCategoriesButton });
      return;
    }

    openDialog("category-dialog", emptyManageCategoriesButton);
  });
  loadSampleButton?.addEventListener("click", () => void importSampleData("replace"));

  themeToggle?.addEventListener("click", async () => {
    await setSetting(
      "theme",
      state.settings.theme === "dark" ? "light" : "dark",
    );
  });

  themeInputs.forEach((input) => {
    input.addEventListener("change", async () => {
      await setSetting("theme", input.value === "dark" ? "dark" : "light");
    });
  });

  densityInputs.forEach((input) => {
    input.addEventListener("change", async () => {
      const next = ["relaxed", "compact"].includes(input.value)
        ? input.value
        : "standard";
      await setSetting("density", next);
    });
  });

  cardStyleInputs.forEach((input) => {
    input.addEventListener("change", async () => {
      const next = ["clear", "solid"].includes(input.value) ? input.value : "mist";
      await setSetting("cardStyle", next);
    });
  });

  openModeInputs.forEach((input) => {
    input.addEventListener("change", async () => {
      await setSetting("openMode", input.value === "self" ? "self" : "new");
    });
  });

  wallpaperButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      state.settings.wallpaperMode = "preset";
      state.settings.wallpaperPresetKey =
        button.dataset.wallpaperValue && WALLPAPERS.light[button.dataset.wallpaperValue]
          ? button.dataset.wallpaperValue
          : DEFAULT_SETTINGS.wallpaperPresetKey;
      state.settings.wallpaperAssetId = "";
      renderApplication();
      await schedulePersist();
    });
  });

  uploadWallpaperButton?.addEventListener("click", () => wallpaperUploadInput.click());
  resetWallpaperButton?.addEventListener("click", async () => {
    state.settings.wallpaperMode = "preset";
    state.settings.wallpaperAssetId = "";
    renderApplication();
    await schedulePersist();
  });
  wallpaperUploadInput?.addEventListener("change", handleWallpaperUploadChange);

  exportIconsInput?.addEventListener("change", () => void updateExportSizePreview());
  exportWallpaperInput?.addEventListener("change", () => void updateExportSizePreview());

  exportJsonButton?.addEventListener("click", async () => {
    const payload = await buildExportPayload({
      includeIcons: exportIconsInput.checked,
      includeWallpaper: exportWallpaperInput.checked,
    });
    downloadJson(
      `anywhere-door-${new Date().toISOString().slice(0, 10)}.json`,
      JSON.stringify(payload, null, 2),
    );
  });

  importModeCards.forEach((card) => {
    const chooseMode = () => setImportMode(card.dataset.importMode);

    card.addEventListener("click", chooseMode);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        chooseMode();
      }
    });
  });

  importJsonButton?.addEventListener("click", () => importFileInput.click());
  importSampleButton?.addEventListener("click", () =>
    void importSampleData(state.importMode),
  );
  importFileInput?.addEventListener("change", handleImportFileChange);

  iconModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.editor.iconMode = button.dataset.iconMode || "auto";
      renderEditorPanels();
    });
  });

  uploadIconButton?.addEventListener("click", () => editorIconFileInput.click());
  clearIconUploadButton?.addEventListener("click", () => {
    state.editor.uploadAsset = null;
    state.editor.existingUploadAssetId = "";
    renderEditorPanels();
    resetEditorStatus("已清除上传图标，可切换为自动 favicon 或默认图标。");
  });
  editorIconFileInput?.addEventListener("change", handleIconUploadChange);

  editorForm?.addEventListener("submit", (event) => void handleEditorSubmit(event));

  presetIconGrid?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-icon-preset-key]");
    if (!(button instanceof HTMLElement)) return;
    state.editor.presetKey = button.dataset.iconPresetKey || "grid";
    renderPresetIconGrid();
  });

  categoryCreateForm?.addEventListener("submit", (event) =>
    void handleCategoryCreate(event),
  );

  categoryManagerList?.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]");
    if (!(action instanceof HTMLElement)) return;

    const categoryId = action.dataset.categoryId || "";

    if (action.dataset.action === "save-category") {
      void saveCategoryName(categoryId);
    }

    if (action.dataset.action === "delete-category") {
      requestDeleteCategory(categoryId);
    }
  });

  categoryManagerList?.addEventListener("keydown", (event) => {
    const input = event.target.closest("input[data-category-id]");
    if (!(input instanceof HTMLInputElement)) return;

    if (event.key === "Enter") {
      event.preventDefault();
      void saveCategoryName(input.dataset.categoryId || "");
    }
  });

  confirmSubmit?.addEventListener("click", () => void handleConfirmDelete());

  sectionsRoot?.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]");
    if (!(action instanceof HTMLElement)) return;

    const categoryId = action.dataset.categoryId || "";
    const linkId = action.dataset.linkId || "";

    if (action.dataset.action === "toggle-sort") {
      state.sortSectionId = state.sortSectionId === categoryId ? "" : categoryId;
      renderApplication();
      return;
    }

    if (action.dataset.action === "new-site") {
      openEditorDialog({ categoryId, trigger: action });
      return;
    }

    if (action.dataset.action === "edit-site") {
      openEditorDialog({ linkId, trigger: action });
      return;
    }

    if (action.dataset.action === "delete-site") {
      requestDeleteSite(linkId);
    }
  });

  sectionsRoot?.addEventListener("dragstart", (event) => {
    const card = event.target.closest(".site-card[data-link-id]");
    if (!(card instanceof HTMLElement)) return;

    if (state.sortSectionId !== card.dataset.categoryId) {
      event.preventDefault();
      return;
    }

    state.drag = {
      type: "site",
      sourceId: card.dataset.linkId || "",
      categoryId: card.dataset.categoryId || "",
      overId: "",
    };

    card.classList.add("is-dragging");
    event.dataTransfer?.setData("text/plain", state.drag.sourceId);
    event.dataTransfer?.setDragImage(card, 24, 24);
  });

  sectionsRoot?.addEventListener("dragover", (event) => {
    if (state.drag.type !== "site") return;

    const targetCard = event.target.closest(".site-card[data-link-id]");
    const targetGrid = event.target.closest(".site-grid[data-category-id]");

    if (
      !(targetCard instanceof HTMLElement) &&
      !(targetGrid instanceof HTMLElement)
    ) {
      return;
    }

    const targetCategoryId =
      targetCard?.dataset.categoryId || targetGrid?.dataset.categoryId || "";
    if (targetCategoryId !== state.drag.categoryId) return;

    event.preventDefault();
    removeDropMarkers();

    if (targetCard instanceof HTMLElement && targetCard.dataset.linkId !== state.drag.sourceId) {
      targetCard.classList.add("is-drop-target");
      state.drag.overId = targetCard.dataset.linkId || "";
    } else {
      state.drag.overId = "";
    }
  });

  sectionsRoot?.addEventListener("drop", (event) => {
    if (state.drag.type !== "site") return;
    event.preventDefault();
    void reorderLinksWithinCategory(
      state.drag.categoryId,
      state.drag.sourceId,
      state.drag.overId,
    ).finally(clearDragState);
  });

  sectionsRoot?.addEventListener("dragend", clearDragState);

  categoryManagerList?.addEventListener("dragstart", (event) => {
    const row = event.target.closest(".category-manager-item[data-category-id]");
    const handle = event.target.closest(".drag-handle");

    if (!(row instanceof HTMLElement) || !(handle instanceof HTMLElement)) {
      event.preventDefault();
      return;
    }

    state.drag = {
      type: "category",
      sourceId: row.dataset.categoryId || "",
      categoryId: "",
      overId: "",
    };

    row.classList.add("is-dragging");
    event.dataTransfer?.setData("text/plain", state.drag.sourceId);
  });

  categoryManagerList?.addEventListener("dragover", (event) => {
    if (state.drag.type !== "category") return;

    const row = event.target.closest(".category-manager-item[data-category-id]");
    if (!(row instanceof HTMLElement)) return;

    event.preventDefault();
    removeDropMarkers();
    if (row.dataset.categoryId !== state.drag.sourceId) {
      row.classList.add("is-drop-target");
      state.drag.overId = row.dataset.categoryId || "";
    }
  });

  categoryManagerList?.addEventListener("drop", (event) => {
    if (state.drag.type !== "category") return;
    event.preventDefault();
    void reorderCategories(state.drag.sourceId, state.drag.overId).finally(clearDragState);
  });

  categoryManagerList?.addEventListener("dragend", clearDragState);

  categoryList?.addEventListener("click", (event) => {
    const link = event.target.closest("[data-category-link]");
    if (!(link instanceof HTMLAnchorElement)) return;

    const categoryId = link.dataset.categoryId || "";
    if (
      link.classList.contains("is-muted") ||
      link.getAttribute("aria-disabled") === "true"
    ) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    scrollToCategory(categoryId);
  });

  document.querySelectorAll("[data-dialog-target]").forEach((trigger) => {
    trigger.addEventListener("click", () =>
      openDialog(trigger.dataset.dialogTarget, trigger),
    );
  });

  document.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => closeDialog(button.dataset.closeDialog));
  });

  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => handleDialogBackdropClick(dialog, event));
    dialog.addEventListener("close", () => {
      dialog.style.removeProperty("block-size");
      restoreDialogFocus(dialog);
    });
  });

  if (overflowMenu) {
    overflowMenu.addEventListener("mouseenter", () => {
      overflowMenu.open = true;
      overflowSummary?.setAttribute("aria-expanded", "true");
    });

    overflowMenu.addEventListener("mouseleave", () => {
      if (!overflowMenu.matches(":focus-within")) {
        closeOverflowMenu();
      }
    });

    overflowMenu.addEventListener("focusout", () => {
      requestAnimationFrame(() => {
        if (!overflowMenu.matches(":focus-within") && !overflowMenu.matches(":hover")) {
          closeOverflowMenu();
        }
      });
    });

    overflowSummary?.addEventListener("click", () => {
      const next = !overflowMenu.open;
      overflowSummary.setAttribute("aria-expanded", String(next));
    });
  }

  document.addEventListener("keydown", (event) => {
    const editing = isEditingTarget(event.target);

    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      searchInput.focus();
      searchInput.select();
      return;
    }

    if (!editing && !event.metaKey && !event.ctrlKey && !event.altKey && event.key === "/") {
      event.preventDefault();
      searchInput.focus();
      searchInput.select();
      return;
    }

    if (!editing && !event.metaKey && !event.ctrlKey && !event.altKey && event.key.toLowerCase() === "n") {
      event.preventDefault();
      openEditorDialog({ trigger: newSiteButton });
      return;
    }

    if (!editing && event.key === "Escape" && !document.querySelector("dialog[open]")) {
      if (state.search) {
        searchInput.value = "";
        state.search = "";
        renderApplication();
      }
    }
  });

  window.addEventListener("scroll", () => {
    if (scrollTicking) return;
    scrollTicking = true;

    requestAnimationFrame(() => {
      updateActiveCategoryByViewport();
      scrollTicking = false;
    });
  });

  window.addEventListener("resize", () => {
    document.querySelectorAll("dialog[open]").forEach((dialog) => {
      syncDialogLayout(dialog);
    });
  });
}

async function init() {
  if (!("indexedDB" in window)) {
    sidebarHint.textContent = "当前浏览器不支持 IndexedDB，无法保存站点数据。";
    return;
  }

  bindStaticEvents();
  await initializeState();
  renderApplication();
  await updateExportSizePreview();
  setImportMode("replace");
}

void init();
