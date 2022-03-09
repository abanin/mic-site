import ArrowLeft from "./arrow-left.svg";
import ArrowRight from "./arrow-right.svg";
import Books from "./books.svg";
import Caret from "./caret.svg";
import Check from "./check.svg";
import Fill from "./fill.svg";
import Home from "./home.svg";
import Instagram from "./instagram.svg";
import Mail from "./mail.svg";
import MapPoint from "./map-point.svg";
import Phone from "./phone.svg";
import Plus from "./plus.svg";
import Telegram from "./telegram.svg";
import User from "./user.svg";
import VK from "./vk.svg";

const icons = {
  books: Books,
  fill: Fill,
  home: Home,
  "map-point": MapPoint,
  phone: Phone,
  instagram: Instagram,
  mail: Mail,
  telegram: Telegram,
  vk: VK,
  user: User,
  "arrow-right": ArrowRight,
  "arrow-left": ArrowLeft,
  caret: Caret,
  check: Check,
  plus: Plus,
} as const;

type IconType = keyof typeof icons;

const isIconName = (value: string): value is IconType => {
  const key = value as IconType;
  return Object.prototype.hasOwnProperty.call(icons, key) && icons[key] != null;
};

export { icons, isIconName };
export type { IconType };
