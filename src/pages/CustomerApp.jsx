import { useState } from 'react'
import avatarImg from '../img/avatar.png'
import CustomerServicePage from './CustomerServicePage'
import MiniAppIcon from '../components/MiniAppIcon'
import {
  BsGeoAlt,
  BsChevronRight,
  BsCoin,
  BsHouseDoor,
  BsQrCodeScan,
  BsPerson,
  BsPersonBadge,
  BsKey,
  BsWallet2,
  BsReceipt,
  BsEnvelope,
  BsGift,
  BsPeople,
  BsTicketPerforated,
  BsStopwatch,
  BsPersonPlus,
  BsCreditCard,
  BsCalendar2Check,
  BsCashCoin,
  BsShop,
  BsCheck2Square,
  BsTrophy,
  BsGraphDown,
  BsShopWindow,
  BsFileText,
  BsChatDots,
} from 'react-icons/bs'

function CustomerApp() {
  const [activeTab, setActiveTab] = useState('profile')
  const [currentPage, setCurrentPage] = useState(null)

  const menuItems = [
    { id: 'member-info', icon: BsPersonBadge, label: '会员信息' },
    { id: 'password-reset', icon: BsKey, label: '密码重置' },
    { id: 'balance-detail', icon: BsWallet2, label: '储值明细' },
    { id: 'my-orders', icon: BsReceipt, label: '我的订单' },
    { id: 'coupons', icon: BsEnvelope, label: '优惠券' },
    { id: 'lottery', icon: BsGift, label: '抽奖券' },
    { id: 'group-buy', icon: BsPeople, label: '拼团记录' },
    { id: 'share-coupon', icon: BsTicketPerforated, label: '分享券' },
    { id: 'seckill', icon: BsStopwatch, label: '秒杀记录' },
    { id: 'distribution', icon: BsPersonPlus, label: '二级分销' },
    { id: 'physical-card', icon: BsCreditCard, label: '实体卡' },
    { id: 'ticket-setting', icon: BsCalendar2Check, label: '出票设置' },
    { id: 'red-packet', icon: BsCashCoin, label: '发红包' },
    { id: 'alliance', icon: BsShop, label: '联盟商家' },
    { id: 'group-verify', icon: BsCheck2Square, label: '团购核销' },
    { id: 'referral', icon: BsTrophy, label: '拉新有奖' },
    { id: 'bargain', icon: BsGraphDown, label: '砍价记录' },
    { id: 'mall', icon: BsShopWindow, label: '自营商城' },
    { id: 'invoice', icon: BsFileText, label: '发票开具' },
    { id: 'customer-service', icon: BsChatDots, label: '客服与反馈' },
  ]

  const handleMenuItemClick = (itemId) => {
    if (itemId === 'customer-service') {
      setCurrentPage('customer-service')
    }
    // 可以在这里添加其他功能的页面跳转逻辑
  }

  // 如果当前在客服页面，显示客服页面
  if (currentPage === 'customer-service') {
    return <CustomerServicePage onBack={() => setCurrentPage(null)} />
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-[434px] min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-orange-100 relative shadow-2xl">
        {/* 顶部导航栏 */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BsGeoAlt className="text-gray-700 text-lg" />
            <span className="font-medium text-gray-800">翠花科技3157号店</span>
            <BsChevronRight className="text-gray-800 text-sm" />
          </div>
          <div className="flex items-center space-x-4">
            <MiniAppIcon />
          </div>
        </div>

        {/* 主内容区 */}
        <div className="px-4 py-6 pb-20">
          {/* 用户信息卡片 */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img src={avatarImg} alt="头像" className="w-full h-full object-cover" style={{ transform: 'scale(1.15)' }} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-800">某某用户</h2>
                  <p className="text-sm text-gray-500">181****8866</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg px-1 py-2 shadow-md flex items-center justify-center">
                  <BsCoin className="text-white text-xl" />
                </div>
                <div className="bg-white text-orange-400 text-xs rounded-full p-1 border border-orange-400">
                  优惠券：2
                </div>
              </div>
            </div>

            {/* 资产统计 */}
            <div className="flex justify-around py-4 px-2">
              <div className="text-center">
                <div className="text-xl font-medium text-blue-600 underline">200</div>
                <div className="text-sm text-gray-800 mt-1">本币</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-medium text-blue-600 underline">0</div>
                <div className="text-sm text-gray-800 mt-1">计时票</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-medium text-blue-600 underline">0</div>
                <div className="text-sm text-gray-800 mt-1">期限票</div>
              </div>
            </div>
          </div>

          {/* 会员等级卡片 */}
          <div className="mb-6 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-20">
              <BsTrophy className="text-8xl" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl">集团-青铜</span>
              </div>
              <div className="bg-white/30 rounded-full h-2 overflow-hidden">
                <div className="bg-yellow-300 h-full" style={{ width: '15%' }}></div>
              </div>
              <div className="text-sm opacity-90 mb-2">
                还需18成长值，可升级<span className="font-bold text-yellow-300">集团-黄铜</span>
                <span className="text-sm opacity-90 float-right">18/201</span>
              </div>
            </div>
          </div>

          {/* 功能网格 */}
          <div className="grid grid-cols-4 gap-4 bg-white rounded-xl shadow-sm p-4">
            {menuItems.map((item) => {
              const IconComponent = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`flex flex-col items-center justify-center space-y-2 p-1 hover:bg-orange-50 rounded-lg transition-colors ${
                    item.id === 'customer-service' ? 'border-2 border-red-500' : ''
                  }`}
                >
                  <IconComponent className="text-2xl text-orange-500" />
                  <span className="text-xs text-gray-700 text-center leading-tight">
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 底部导航 */}
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg">
          <div className="flex justify-around items-center py-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center justify-center py-2 px-6 ${
                activeTab === 'home' ? 'text-orange-500' : 'text-gray-500'
              }`}
            >
              <BsHouseDoor className="text-2xl mb-1" />
              <span className="text-xs">首页</span>
            </button>
            
            <button
              onClick={() => setActiveTab('scan')}
              className="relative -mt-8"
            >
              <div className="bg-gradient-to-br from-pink-500 to-orange-500 rounded-full p-4 shadow-lg">
                <BsQrCodeScan className="text-white text-3xl" />
              </div>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center justify-center py-2 px-6 ${
                activeTab === 'profile' ? 'text-orange-500' : 'text-gray-500'
              }`}
            >
              <BsPerson className="text-2xl mb-1" />
              <span className="text-xs">我的</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerApp

