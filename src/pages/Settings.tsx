import type { Density, Palette } from "../context/ThemeContext";
import { useTheme } from "../context/ThemeContext";

type PaletteOption = {
  id: Palette;
  label: string;
  description: string;
  swatch: string;
};

const PALETTE_OPTIONS: PaletteOption[] = [
  {
    id: "teal",
    label: "Teal",
    description: "Default",
    swatch: "linear-gradient(135deg, #0f766e 0%, #2dd4bf 100%)",
  },
  {
    id: "ocean",
    label: "Ocean",
    description: "Calm blue",
    swatch: "linear-gradient(135deg, #1d4ed8 0%, #38bdf8 100%)",
  },
  {
    id: "ember",
    label: "Ember",
    description: "Warm glow",
    swatch: "linear-gradient(135deg, #b45309 0%, #f97316 100%)",
  },
];

const DENSITY_OPTIONS: { id: Density; label: string; hint: string }[] = [
  { id: "comfortable", label: "Comfortable", hint: "Mehr Luft" },
  { id: "compact", label: "Compact", hint: "Enger gepackt" },
];

export function SettingsPage() {
  const {
    appearance,
    setAppearance,
    palette,
    setPalette,
    density,
    setDensity,
  } = useTheme();

  return (
    <section className="panel">
      <h3>Settings</h3>
      <p>Profile and other personalization options can live here.</p>

      <div className="settings-block">
        <div className="settings-block__head">
          <h4 className="settings-block__title">Appearance</h4>
          <span className="settings-block__badge">
            {appearance === "dark" ? "Dark" : "Light"}
          </span>
        </div>
        <p className="settings-block__hint">
          Light or dark base (also affects system UI hints).
        </p>
        <div
          className="segmented"
          role="radiogroup"
          aria-label="Appearance"
        >
          <button
            type="button"
            role="radio"
            aria-checked={appearance === "light"}
            className={`segmented__option${
              appearance === "light" ? " segmented__option--active" : ""
            }`}
            onClick={() => setAppearance("light")}
          >
            <SunIcon />
            <span>Light</span>
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={appearance === "dark"}
            className={`segmented__option${
              appearance === "dark" ? " segmented__option--active" : ""
            }`}
            onClick={() => setAppearance("dark")}
          >
            <MoonIcon />
            <span>Dark</span>
          </button>
          <span
            className="segmented__thumb"
            data-position={appearance === "dark" ? "right" : "left"}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="settings-block">
        <div className="settings-block__head">
          <h4 className="settings-block__title">Accent palette</h4>
          <span className="settings-block__badge settings-block__badge--muted">
            {PALETTE_OPTIONS.find((p) => p.id === palette)?.label}
          </span>
        </div>
        <p className="settings-block__hint">
          Only brand colors change — layout stays the same.
        </p>
        <div className="palette-grid" role="radiogroup" aria-label="Accent palette">
          {PALETTE_OPTIONS.map((option) => {
            const isActive = option.id === palette;
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={isActive}
                className={`palette-card${
                  isActive ? " palette-card--active" : ""
                }`}
                onClick={() => setPalette(option.id)}
              >
                <span
                  className="palette-card__swatch"
                  style={{ background: option.swatch }}
                  aria-hidden="true"
                >
                  {isActive && <CheckIcon />}
                </span>
                <span className="palette-card__text">
                  <span className="palette-card__label">{option.label}</span>
                  <span className="palette-card__desc">{option.description}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="settings-block">
        <div className="settings-block__head">
          <h4 className="settings-block__title">Layout density</h4>
          <span className="settings-block__badge settings-block__badge--muted">
            {DENSITY_OPTIONS.find((d) => d.id === density)?.label}
          </span>
        </div>
        <p className="settings-block__hint">
          Tighter spacing — same content, different presentation.
        </p>
        <div
          className="segmented segmented--wide"
          role="radiogroup"
          aria-label="Layout density"
        >
          {DENSITY_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={density === option.id}
              className={`segmented__option segmented__option--stacked${
                density === option.id ? " segmented__option--active" : ""
              }`}
              onClick={() => setDensity(option.id)}
            >
              <DensityIcon variant={option.id} />
              <span className="segmented__option-label">
                <strong>{option.label}</strong>
                <small>{option.hint}</small>
              </span>
            </button>
          ))}
          <span
            className="segmented__thumb"
            data-position={density === "compact" ? "right" : "left"}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function DensityIcon({ variant }: { variant: Density }) {
  const gap = variant === "compact" ? 3 : 5;
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="4" y1={12 - gap} x2="20" y2={12 - gap} />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1={12 + gap} x2="20" y2={12 + gap} />
    </svg>
  );
}
