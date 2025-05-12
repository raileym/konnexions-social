export default function PanelHome({ onNavigate }: { onNavigate: (panel: 'settings' | 'help') => void }) {
  return (
    <div className="pa4">
      <h2 className="f3">Home</h2>
      <button onClick={() => onNavigate('settings')}>Go to Settings</button>
      <button onClick={() => onNavigate('help')}>Go to Help</button>
    </div>
  )
}
