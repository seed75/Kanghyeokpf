export default function Nav() {
  const item = (label: string, active=false) => (
    <li>
      <a href={`#${label}`} className={`group/nav flex items-center space-x-6 transition-opacity hover:opacity-100 ${active ? '' : 'opacity-1'}`} aria-label={`View ${label} section`}>
        <div className={`h-px bg-black dark:bg-white transition-all ${active ? "w-16" : "w-8 group-hover:w-16"}`}></div>
        <span className="text-xs font-medium uppercase tracking-widest">{label}</span>
      </a>
    </li>
  );
  return (
    <nav className="mt-24 hidden lg:block">
      <ul className="space-y-6">
        {item('about', true)}
        {item('experience')}
        {item('projects')}
        
      </ul>
    </nav>
  )
}
