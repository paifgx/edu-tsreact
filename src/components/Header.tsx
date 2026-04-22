import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";

type NavLinkState = { isActive: boolean };

const navLinkClass = ({ isActive }: NavLinkState) =>
  isActive
    ? "page-header__nav-link page-header__nav-link--active"
    : "page-header__nav-link";

export function Header() {
  const { appearance, toggleAppearance } = useTheme();
  const { currentUser, isLoadingUsers } = useUser();

  return (
    <header className="page-header">
      <div className="page-header__brand">
        <p className="page-header__eyebrow">Internal Tooling</p>
        <h1 className="page-header__title">Incident Dashboard</h1>
        <p className="page-header__subtitle">
          Incident Dashboard for internal use.
        </p>
        <p className="page-header__user-line">
          {isLoadingUsers
            ? "Loading workspace user…"
            : currentUser
              ? `Workspace user: ${currentUser.name} (${currentUser.team})`
              : "No workspace user selected — pick one in Settings."}
        </p>
      </div>

      <nav className="page-header__nav" aria-label="Primary">
        <button
          type="button"
          className="page-header__theme-toggle"
          onClick={toggleAppearance}
          aria-pressed={appearance === "dark"}
          aria-label="Toggle color theme"
        >
          Theme
        </button>
        <ul className="page-header__nav-list">
          <li>
            <NavLink to="/" end className={navLinkClass}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/incidents" className={navLinkClass}>
              Incidents
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={navLinkClass}>
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
