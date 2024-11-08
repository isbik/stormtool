import {
  Laptop,
  Pencil,
  Code,
  SmileIcon,
  WholeWord,
  QrCode,
  CameraIcon,
  Text,
  Mic,
  Regex,
  FileJson,
  CodeXml,
  Link2Icon,
  ScanFace,
  Clock,
  BetweenHorizonalEnd,
  Image,
  GalleryThumbnailsIcon,
  Images,
} from "lucide-react";

export const CONVERTER_TOOLS = [
  {
    name: "CSS TO JS (React styles)",
    description: "Конвертирует CSS код в JS код",
    url: "/css-to-js",
    icon: Laptop,
  },

  {
    name: "HTML to JSX",
    description: "Конвертирует HTML код в JSX код",
    url: "/html-to-jsx",
    icon: Pencil,
  },
  {
    name: "JSON to XML",
    description: "Конвертирует JSON данные в XML",
    url: "/json-to-xml",
    icon: Code,
  },
  {
    name: "CSV to JSON",
    description: "Конвертирует файл CSV в JSON",
    url: "/csv-to-json",
    icon: Code,
  },
  {
    name: "XML to JSON",
    description: "Конвертирует файл XML в JSON",
    url: "/xml-to-json",
    icon: Code,
  },
  {
    name: "JavaScript to TypeScript",
    description: "Конвертирует JavaScript код в TypeScript",
    url: "/js-object-to-typescript",
    icon: Code,
  },
  {
    name: "JavaScript to JSON",
    description: "Конвертирует JavaScript объект в JSON",
    url: "/js-object-to-json",
    icon: Code,
  },
  {
    name: "SCSS TO CSS",
    description: "Конвертирует SCSS код в CSS код",
    url: "/scss-to-css",
    icon: Code,
  },
  {
    name: "SASS TO CSS",
    description: "Конвертирует SASS код в CSS код",
    url: "/sass-to-css",
    icon: Code,
  },
];

export const OTHER_TOOLS = [
  {
    name: "URL parser",
    description: "Парсит URL адрес",
    url: "/url-parser",
    icon: Code,
  },
  {
    name: "JWT decoder",
    description: "Декодирует JWT токен",
    url: "/jwt",
    icon: Code,
  },
  {
    name: "Text analyze",
    description: "Анализирует текст",
    url: "/text-analyze",
    icon: WholeWord,
  },
  {
    name: "Diff Text",
    description: "Выявляет различия между текстами",
    url: "/diff-text",
    icon: Text,
  },
  {
    name: "Emoji",
    description: "Набор эмодзи",
    url: "/emoji",
    icon: SmileIcon,
  },
  {
    name: "Генератор слага",
    description: "Генератор слага",
    url: "/slug-generator",
    icon: Link2Icon,
  },
  {
    url: "/fake-data",
    name: "Генератор данных",
    description: "Генератор данных",
    icon: ScanFace,
  },
  {
    url: "/placeholders",
    name: "Плейсхолдеры",
    description: "Плейсхолдеры",
    icon: Image,
  },
  // External tools
  {
    url: "https://qrcodescanneronline.com",
    name: "QR code scanner",
    description: "Сканирование QR кода",
    icon: QrCode,
  },
  {
    url: "https://webcammictest.com/check-mic",
    name: "Проверка микрофона",
    description: "Проверка микрофона",
    icon: Mic,
  },
  {
    url: "https://webcammictest.com",
    name: "Проверка камеры",
    description: "Проверка камеры",
    icon: CameraIcon,
  },
  {
    url: "https://regex101.com/",
    name: "Регулярные выражения",
    description: "Проверка регулярных выражений",
    icon: Regex,
  },
  {
    url: "https://jsoncrack.com/editor",
    name: "Редактор JSON",
    description: "Редактор JSON",
    icon: FileJson,
  },
  {
    url: "https://xml-formatter.com/xml-viewer",
    name: "XML formatter",
    description: "Форматирование XML",
    icon: CodeXml,
  },
  {
    url: "https://crontab.online/",
    name: "Crontab online",
    description: "Визуальный редактор Cron",
    icon: Clock,
  },
  {
    url: "https://www.red-gate.com/website/sql-formatter",
    name: "SQL formatter",
    description: "Форматирование SQL",
    icon: BetweenHorizonalEnd,
  },
  {
    url: "https://picflow.com/image-converter",
    name: "Image converter",
    description: "Конвертер изображений",
    icon: Images,
  },
];

export const ALL_TOOLS = [...CONVERTER_TOOLS, ...OTHER_TOOLS];
