import UbeswapDarkImage from "assets/partners/Ubeswap_dark.png";
import UbeswapLightImage from "assets/partners/Ubeswap_light.png";
import CeloTrackerImage from "assets/partners/CeloTracker.jpeg";
import MobiusDarkImage from "assets/partners/Mobius_dark.png";
import MobiusLightImage from "assets/partners/Mobius_light.png";
import MoolaImage from "assets/partners/Moola.jpeg";
import ImmortalImage from "assets/partners/Immortal.png";
import CeloTaxImage from "assets/partners/CeloTax.jpeg";
import ValoraImage from "assets/partners/Valora.png";
import SymmetricImage from "assets/partners/Symmetric.png";

type Partner = {
  href: string;
  lightImageSrc: string;
  darkImageSrc: string;
  text?: string;
};

export const PARTNER_LIST: Partner[] = [
  {
    href: "https://valoraapp.com",
    lightImageSrc: ValoraImage,
    darkImageSrc: ValoraImage,
    text: "Valora",
  },
  {
    href: "https://ubeswap.org",
    lightImageSrc: UbeswapLightImage,
    darkImageSrc: UbeswapDarkImage,
  },
  {
    href: "https://mobius.money",
    lightImageSrc: MobiusLightImage,
    darkImageSrc: MobiusDarkImage,
  },
  {
    href: "https://celotracker.com",
    lightImageSrc: CeloTrackerImage,
    darkImageSrc: CeloTrackerImage,
    text: "Celotracker",
  },
  {
    href: "https://moola.market",
    lightImageSrc: MoolaImage,
    darkImageSrc: MoolaImage,
  },
  {
    href: "https://www.symmetric.finance",
    lightImageSrc: SymmetricImage,
    darkImageSrc: SymmetricImage,
    text: "Symmetric",
  },
  {
    href: "https://www.immortaldao.finance",
    lightImageSrc: ImmortalImage,
    darkImageSrc: ImmortalImage,
    text: "Immortal",
  },
  {
    href: "https://www.celo.tax",
    lightImageSrc: CeloTaxImage,
    darkImageSrc: CeloTaxImage,
  },
];
