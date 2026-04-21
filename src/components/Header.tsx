import { NavLink } from "react-router-dom";

type NavLinkState = { isActive: boolean };

const navLinkClass = ({ isActive }: NavLinkState) =>
  isActive
    ? "page-header__nav-link page-header__nav-link--active"
    : "page-header__nav-link";

export function Header() {
  return (
    <header className="page-header">
      <div className="page-header__brand">
        <p className="page-header__eyebrow">Internal Tooling</p>
        <h1 className="page-header__title">Incident Dashboard</h1>
        <p className="page-header__subtitle">
          Incident Dashboard for internal use.
        </p>
      </div>

      <nav className="page-header__nav" aria-label="Primary">
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
