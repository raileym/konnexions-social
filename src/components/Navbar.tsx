type NavbarProps = {
  onToggleSettings: () => void
  onToggleHelp: () => void
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSettings, onToggleHelp }) => {
  return (
    <nav className="fixed top-0 left-0 w-100 bg-dark-gray white flex items-center justify-between ph3 pv2 z-999">
      <div className="f4 b">Let's Connect!</div>
      <div>
        <button
          className="mr2 bg-light-gray dark-gray pa2 br2 bn pointer"
          onClick={onToggleSettings}
        >
          Settings
        </button>
        <button
          className="bg-light-gray dark-gray pa2 br2 bn pointer"
          onClick={onToggleHelp}
        >
          Help
        </button>
      </div>
    </nav>
  )
}

export default Navbar
