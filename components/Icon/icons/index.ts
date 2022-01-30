import Books from "./books.svg";
import Fill from "./fill.svg";
import Home from "./home.svg";
import Instagram from "./instagram.svg";
import Mail from "./mail.svg";
import MapPoint from "./map-point.svg";
import Phone from "./phone.svg";
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
} as const;

type IconType = keyof typeof icons;

const isIconName = (value: string): value is IconType => {
  const key = value as IconType;
  return Object.prototype.hasOwnProperty.call(icons, key) && icons[key] != null;
};

export { icons, isIconName };
export type { IconType };
