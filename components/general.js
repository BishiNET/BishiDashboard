export const BSLogo = () => (
    <div className="pl-3 px-2 mx-7 lg:block hidden text-white antialiased">
        <div className="flex justify-center ">
            <h1 className="font-extrabold text-3xl italic  font-sans mr-2" >B</h1>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
        </div>
        <p className="text-xs tracking-wide font-sans font-bold ">DASHBOARD</p>
    </div>
)

export const Ok = () => (
    <svg viewBox="00 00 64 64" style={{ height: '100%', width: '100%' }} className=" text-green-400" >
        <path d="M6,32a26,26 0 1,0 52,0a26,26 0 1,0 -52,0" fill="none" stroke="currentColor" strokeLinejoin="round" strokeDasharray="163.38575744628906px 163.38575744628906px" strokeWidth="12" strokeDashoffset="0px"></path>
        <path d="M22.668 33.333l5.333 5.334 13.334-13.334" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinejoin="round" strokeDasharray="26.399829864501953px 26.399829864501953px" opacity="1" strokeDashoffset="0px"></path>
    </svg>
)

export const Fail = () => (
    <svg viewBox="00 00 64 64" style={{ height: '100%', width: '100%' }} className=" text-red-500" >
        <path d="M6,32a26,26 0 1,0 52,0a26,26 0 1,0 -52,0" fill="none" stroke="currentColor" strokeLinejoin="round" strokeDasharray="163.38575744628906px 163.38575744628906px" strokeWidth="12" strokeDashoffset="0px"></path>
    </svg>
)


export const MobileMenuContainer = (props) => (
    <div className="px-2 dropdown lg:hidden inline-block text-gray-400 ">
        <div tabIndex="0" className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </div>
        <ul tabIndex="0" className="p-1 shadow menu dropdown-content bg-base-100 rounded-md w-52 transition duration-200">
            {props.children}
        </ul>
    </div>
)

export const MobileMenuItem = (props) => (
    <li className="hover:text-indigo-500">
        <a>{props.children}</a>
    </li>
)

export const PCMenuContainer = (props) => (
    <div className="items-stretch hidden lg:flex">
        {props.children}
    </div>
)

export const PCMenuItem = (props) => (
    <a href={props.link ? props.link : "/dash"} className={`cursor-pointer transition duration-200 text-xl  font-medium ${props.isActive ? "text-white pr-5" : " text-gray-100 px-5 hover:text-white"}`}>
        {props.children}
    </a>
)

export const AvatarsMemuContainer = (props) => (
    <ul tabIndex="0" className="p-1 shadow menu dropdown-content bg-base-100 rounded-md w-52 text-gray-400 transition duration-200">
{props.children}
  </ul>
)

export const AvatarsMemuItem = (props) => (
    <li className="hover:text-blue-400 focus:text-blue-400">

    <a href={props.link}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span className="ml-5 text-center">{props.children}</span>
    </a>
  </li>
)