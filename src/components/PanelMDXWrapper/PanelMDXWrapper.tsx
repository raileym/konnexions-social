const PanelMDXWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="panel-right panel-mdx-wrapper absolute bl bw1 z-1 top-0 left-10 w-90 h-100 bg-white transition-transform translate-x-full">
    {children}
  </div>
)

export default PanelMDXWrapper