import {
    FaArrowRightFromBracket,
    FaChartColumn,
    FaClipboardList,
    FaUserGraduate,
    FaUser
  } from 'react-icons/fa6'
  
  const navigation = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: FaChartColumn
    },
    {
      key: 'students',
      label: 'Students',
      icon: FaUserGraduate
    },
    {
      key: 'exams',
      label: 'Liste des exams',
      icon: FaClipboardList
    }
  ]
  
  const NavBarAdmin = ({
    currentPage,
    onNavigate,
    children,
    title,
    subtitle,
    action
  }) => {
    return (
      <div className="min-h-screen bg-[#f7f8fb] lg:flex">
        <aside className="flex w-full flex-col bg-[#0d7477] px-6 py-8 text-white lg:min-h-screen lg:w-[270px] lg:px-7">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-3xl text-[#6b7280]">
              <FaUser />
            </div>
  
            <div>
              <p className="text-xl font-bold">Username</p>
              <p className="mt-1 text-sm text-white/65">
                Administrator
              </p>
            </div>
          </div>
  
          <div className="my-10 h-px w-28 bg-[#8bd4d3]/70" />
  
          <nav className="flex gap-2 lg:flex-col">
            {navigation.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => onNavigate(key)}
                className={`flex items-center gap-4 rounded-xl px-5 py-4 text-left font-semibold transition ${
                  currentPage === key
                    ? 'bg-[#0a5f62] shadow-lg shadow-black/10'
                    : 'hover:bg-white/10'
                }`}
              >
                <Icon className="text-lg" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
  
          <div className="hidden flex-1 lg:block" />
  
          <div className="my-8 hidden h-px w-28 bg-[#8bd4d3]/70 lg:block" />
  
          <button
            type="button"
            className="flex items-center justify-center gap-4 rounded-lg bg-[#4e1f6e] px-5 py-4 font-bold shadow-lg shadow-[#4e1f6e]/20 transition hover:bg-[#3d1857]"
          >
            <FaArrowRightFromBracket />
            <span>Log out</span>
          </button>
        </aside>
  
        <section className="min-w-0 flex-1 p-5 md:p-8 lg:p-10">
          <header className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#1f2945] md:text-4xl">
                {title}
              </h1>
  
              {subtitle && (
                <p className="mt-2 text-base text-[#687087] md:text-lg">
                  {subtitle}
                </p>
              )}
            </div>
  
            {action}
          </header>
  
          {children}
        </section>
      </div>
    )
  }
  
  export default NavBarAdmin;