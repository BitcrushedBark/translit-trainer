import type { TranslitData } from "@/types";
import armenianCapital from './armenian-capital.json';
import armenianLowercase from './armenian-lowercase.json';
import armenianFull from './armenian-full.json';

export type PresetName =
  'Armenian (capital)' |
  'Armenian (lowercase)' |
  'Armenian (full)';

export const translitDataPresets: {
  [name in PresetName]: TranslitData
} = {
  'Armenian (capital)': armenianCapital,
  'Armenian (lowercase)': armenianLowercase,
  'Armenian (full)': armenianFull,
};
