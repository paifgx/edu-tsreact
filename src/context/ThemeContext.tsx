/* @refresh reset — Vite: avoids Fast Refresh issues when a file exports both a provider and a hook. */
/* eslint-disable react-refresh/only-export-components */
// Theme context, ThemeProvider, and useTheme live in one file for easier onboarding.
// Three separate concerns: appearance (light/dark), palette (accent colors), density (spacing).

import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

/** Light / dark — mainly background and contrast (see @media rules in styles.css). */
export type Appearance = 'light' | 'dark';

/** Accent palette — overrides brand CSS variables only; other tokens stay the same. */
export type Palette = 'teal' | 'ocean' | 'ember';

/** Tighter spacing and slightly smaller radii — layout-only. */
export type Density = 'comfortable' | 'compact';

export type ThemeContextValue = {
  appearance: Appearance;
  setAppearance: (value: Appearance) => void;
  toggleAppearance: () => void;

  palette: Palette;
  setPalette: (value: Palette) => void;

  density: Density;
  setDensity: (value: Density) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_APPEARANCE = 'incident-dashboard-appearance';
const STORAGE_PALETTE = 'incident-dashboard-palette';
const STORAGE_DENSITY = 'incident-dashboard-density';
/** Legacy storage key (light/dark only) — read once when the newer keys are missing. */
const STORAGE_LEGACY_THEME = 'incident-dashboard-theme';

const PALETTES: Palette[] = ['teal', 'ocean', 'ember'];
const DENSITIES: Density[] = ['comfortable', 'compact'];

function readAppearance(): Appearance {
  try {
    const v = localStorage.getItem(STORAGE_APPEARANCE);
    if (v === 'light' || v === 'dark') return v;
    const legacy = localStorage.getItem(STORAGE_LEGACY_THEME);
    if (legacy === 'light' || legacy === 'dark') return legacy;
  } catch {
    /* ignore */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function readPalette(): Palette {
  try {
    const v = localStorage.getItem(STORAGE_PALETTE);
    if (v && (PALETTES as string[]).includes(v)) return v as Palette;
  } catch {
    /* ignore */
  }
  return 'teal';
}

function readDensity(): Density {
  try {
    const v = localStorage.getItem(STORAGE_DENSITY);
    if (v && (DENSITIES as string[]).includes(v)) return v as Density;
  } catch {
    /* ignore */
  }
  return 'comfortable';
}

/** Syncs classes + data attributes on `document.documentElement` and persists to localStorage. */
function syncDocumentUi(appearance: Appearance, palette: Palette, density: Density) {
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.classList.toggle('theme-light', appearance === 'light' && prefersDark);
  root.classList.toggle('theme-dark', appearance === 'dark' && !prefersDark);
  root.dataset.palette = palette;
  root.dataset.density = density;
  try {
    localStorage.setItem(STORAGE_APPEARANCE, appearance);
    localStorage.setItem(STORAGE_PALETTE, palette);
    localStorage.setItem(STORAGE_DENSITY, density);
  } catch {
    /* ignore */
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [appearance, setAppearance] = useState<Appearance>(() => readAppearance());
  const [palette, setPalette] = useState<Palette>(() => readPalette());
  const [density, setDensity] = useState<Density>(() => readDensity());

  useLayoutEffect(() => {
    syncDocumentUi(appearance, palette, density);
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onPrefChange = () => syncDocumentUi(appearance, palette, density);
    mq.addEventListener('change', onPrefChange);
    return () => mq.removeEventListener('change', onPrefChange);
  }, [appearance, palette, density]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      appearance,
      setAppearance,
      toggleAppearance: () => setAppearance((a) => (a === 'light' ? 'dark' : 'light')),
      palette,
      setPalette,
      density,
      setDensity,
    }),
    [appearance, palette, density],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error(
      'useTheme must be used within a ThemeProvider — wrap the app tree in App.tsx (e.g. inside UserProvider).',
    );
  }
  return value;
}
