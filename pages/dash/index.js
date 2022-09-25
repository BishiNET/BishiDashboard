import Head from 'next/head'
import Circle from 'react-circle';
import { useState, useEffect } from 'react';
import { BSLogo, Ok, Fail, MobileMenuContainer, MobileMenuItem, PCMenuContainer, PCMenuItem, AvatarsMemuContainer, AvatarsMemuItem} from '../../components/general';
import { useRouter } from 'next/router';



function Dash({ stats }) {
  const [trafficusage, settraffic] = useState(0)
  const router = useRouter()
               	const refreshData = () => router.replace(router.asPath);

  useEffect(() => {
    const handler = () => settraffic(stats.trafficusage)
    if (document.readyState === "complete" && trafficusage != 0) {
      handler();
    } else if (trafficusage != 0) {
      window.addEventListener('load', handler);
      return () => document.removeEventListener('load', handler);
    }
  })
       setInterval(()=>{
        	refreshData()
	}, 15000)



  return (
    <div>
      <Head>
        <title>碧狮面板</title>
        <link rel="icon" href="/logo.ico" />
        <link href="https://fonts.googleapis.com/css?family=Noto%20Sans%20SC|Inter" rel="stylesheet" type="text/css" />
      </Head>
      <div className="navbar font-bishi pt-3 from-indigo-500 to-blue-400 bg-gradient-to-r">
        <BSLogo />
        <MobileMenuContainer>
          <MobileMenuItem>
            主面板
          </MobileMenuItem>
          <MobileMenuItem>
          流量监控
          </MobileMenuItem>
          <MobileMenuItem>
            订阅管理
          </MobileMenuItem>
        </MobileMenuContainer>


        <div className="flex-1 px-2 mx-2">
          <PCMenuContainer>
            <PCMenuItem  isActive={true}>
            主面板
            </PCMenuItem>
            <PCMenuItem>
            流量监控
            </PCMenuItem>
            <PCMenuItem>
            订阅管理
            </PCMenuItem>
          </PCMenuContainer>
        </div>

        <div style={{ display: 'inline-block' }} className="px-2 dropdown dropdown-end">
          <div tabIndex="0" className="btn btn-ghost hover:bg-transparent">
            <div className="avatar">
              <div className="mb-8 rounded-full lg:w-11 lg:h-11 w-10 h-10">
                <img src={stats.avatar} />
              </div>
            </div>
          </div>
          <AvatarsMemuContainer>
            <AvatarsMemuItem link="/dash.php?a=signout">
            登出
            </AvatarsMemuItem>
          </AvatarsMemuContainer>
        </div>
      </div>

      <div className="h-full flex-grow font-bishi text-primary-content from-indigo-500 to-blue-400 bg-gradient-to-r">
        <div className="flex  justify-center ml-10 tracking-widest">
          <p className="text-3xl sm:text-5xl lg:text-6xl leading-none font-extrabold tracking-wide mt-10 mb-8 sm:mt-14 sm:mb-10 font-sans">{stats.username}, </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl leading-none font-extrabold tracking-wide mt-10 mb-8 sm:mt-14 sm:mb-10">欢迎来到</h1>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl leading-none font-extrabold bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-200 to-white text-transparent  tracking-wide  mt-10 mb-8 sm:mt-14 sm:mb-10 font-sans" >碧狮</h1>
        </div>

        <div className="px-10 py-3 text-neutral-content grid lg:grid-flow-col gap-4  lg:grid-cols-4 grid-cols-1 	auto-cols-max md:auto-cols-min" >

          <div className="flex justify-center hover:shadow-2xl  transition duration-400 text-gray-700 mx-6  card shadow-lg lg:card-side bg-gray-50 backdrop-filter backdrop-blur-xl ">
            <div className="card-body">
              <h2 className="lg:text-2xl text-xl font-bold">流量使用率/ 连接数量</h2>
              <p className="lg:text-lg text-md text-gray-600"> {stats.trafficused} GB / {stats.trafficall} GB </p>
	      <p className="lg:text-lg text-md text-gray-600"> 实时连接: {stats.conns} </p>
              <div className="justify-end card-actions">

                <Circle
                  animate={true} // Boolean: Animated/Static progress
                  animationDuration="3s" // String: Length of animation
                  responsive={true} // Boolean: Make SVG adapt to parent size
                  size="100" // String: Defines the size of the circle.
                  lineWidth="50" // String: Defines the thickness of the circle's stroke.
                  progress={trafficusage} // String: Update to change the progress and percentage.
                  progressColor="#6EE7B7" // String: Color of "progress" portion of circle.
                  bgColor="" // String: Color of "empty" portion of circle.
                  textColor="#374151" // String: Color of percentage text color.
                  textStyle={{
                    fontFamily: 'Inter',
                    fontSize: '50px',
                  }}
                  percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
                  roundedStroke={true} // Boolean: Rounded/Flat line ends
                  showPercentage={true} // Boolean: Show/hide percentage.
                  showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                />

              </div>
            </div>

          </div>
          <div className="flex hover:shadow-2xl  transition duration-400 text-gray-700  mx-6  card lg:card-side  shadow-lg  bg-gray-50 backdrop-filter backdrop-blur-xl border-b-0	border-r-0	 ">
            <div className=" card-body">
              <h2 className=" lg:text-2xl text-xl font-bold">您的套餐详情</h2>
              <div className="mt-10 grid grid-cols-1">
                <div>

                  {(stats.userstatus && stats.abuse == 0)  ? <Ok /> : <Fail />}


                </div>
                <div className="mt-6">
                  <p className="lg:text-lg text-md text-gray-600 ">到期：{(stats.expire != "0000-00-00") ? stats.expire : "无限期"}</p>
                  <p className="lg:text-lg text-md text-gray-600 ">状态：<span className={(stats.userstatus && stats.abuse == 0) ? "text-green-400 font-semibold" : "text-red-500 font-semibold"}>{(stats.userstatus && stats.abuse == 0) ? "良好" : (stats.abuse == 0 ? "强制停止" : "滥用警告")}</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className=" lg:col-span-2 hover:shadow-2xl  transition duration-400 text-gray-700  mx-6  card lg:card-side  shadow-lg  bg-gray-50 backdrop-filter backdrop-blur-xl border-b-0	border-r-0	 ">
            <div className="card-body">
              <h2 className=" lg:text-2xl text-xl font-bold">订阅链接</h2>
              <div className="grid lg:grid-cols-4 grid-cols-1 mt-6">
                <div className="card">
                  <figure>
                    <img src="https://network.tw/clash.png" />
                  </figure>
                  <div className="justify-end card-body">
                    <h2 className="text-center card-title font-sans" style={{ color: 'rgb(25,55,98)' }}>Clash</h2>
                    <button onClick={() => { navigator.clipboard.writeText("https://network.tw/clash.php?name=" + stats.username + "&token=" + stats.utk) }} class="btn font-sans text-lg hover:bg-gray-900" style={{ backgroundColor: 'rgb(25,55,98)' }}>复制</button>

                  </div>
                </div>
                <div className="card">
                  <div className="flex justify-center">
                    <figure>
                      <img src="https://network.tw/surge.png" />
                    </figure>
                  </div>
                  <div className="justify-end card-body">
                    <h2 className="text-center card-title font-sans text-transparent bg-clip-text  bg-gradient-to-tr from-fakeblue-400  to-purple-500 ">Surge 3</h2>

                    <button onClick={() => { navigator.clipboard.writeText("https://network.tw/surge3.php?name=" + stats.username + "&token=" + stats.utk) }} class="btn font-sans bg-gradient-to-tr from-fakeblue-400  to-purple-500 border-0 text-lg" >复制</button>


                  </div>
                </div>
              </div>

            </div>
          </div>



        </div>

      </div>



    </div>
  )
}

export async function getServerSideProps(ctx) {
  const res = await fetch('',
    {
      headers: {
        'Content-Type': 'application/json',
        'cookie': ctx.req.headers.cookie
      },
      method: 'POST'
    })
  const stats = await res.json()

  if (stats.status != 0) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      stats
    }, // will be passed to the page component as props
  }
}
export default Dash

