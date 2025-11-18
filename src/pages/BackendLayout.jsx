import { useState, useEffect } from 'react'
import {
  BsGrid,
  BsBoxSeam,
  BsTicketPerforated,
  BsDiagram3,
  BsPeople,
  BsBag,
  BsMegaphone,
  BsPcDisplay,
  BsGear,
  BsGlobe,
  BsWifi,
  BsGraphUp,
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsSearch,
  BsArrowClockwise,
  BsBell,
  BsGridFill,
  BsX,
} from 'react-icons/bs'
import { PiTShirtLight } from 'react-icons/pi'
import { menuData } from '../mock/menuData'
import MemberPage from './member/MemberPage'
import PlaceholderPage from './common/PlaceholderPage'
import logoImg from '../img/logo.png'

function BackendLayout() {
  const [activeMenu, setActiveMenu] = useState('member') // 当前激活的一级菜单
  const [activeSubPage, setActiveSubPage] = useState('member-feedback') // 当前激活的页面（可能是二级或三级）
  const [expandedSubMenus, setExpandedSubMenus] = useState(new Set()) // 展开的二级菜单集合
  const [openTabs, setOpenTabs] = useState([{ id: 'member-feedback', label: '会员反馈', menuId: 'member' }]) // 已打开的标签页列表

  // 自定义样式：隐藏滚动条但保持滚动功能
  const scrollbarHideStyle = {
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE and Edge
    WebkitOverflowScrolling: 'touch', // iOS smooth scrolling
  }

  // 获取当前激活的菜单项
  const activeMenuItem = menuData.find(item => item.id === activeMenu)
  
  // 判断当前菜单是否有子菜单
  const hasSubMenu = activeMenuItem?.type === 'expandable' && activeMenuItem?.children

  // 获取所有可展开的二级菜单ID
  const getExpandableSubMenuIds = (menuItem) => {
    if (!menuItem?.children) return []
    return menuItem.children
      .filter(child => child.type === 'expandable' && child.children?.length > 0)
      .map(child => child.id)
  }

  // 页面加载时默认展开所有可展开的二级菜单
  useEffect(() => {
    const currentMenuItem = menuData.find(item => item.id === activeMenu)
    if (currentMenuItem?.type === 'expandable' && currentMenuItem?.children) {
      const expandableIds = getExpandableSubMenuIds(currentMenuItem)
      if (expandableIds.length > 0) {
        setExpandedSubMenus(new Set(expandableIds))
      } else {
        setExpandedSubMenus(new Set())
      }
    } else {
      setExpandedSubMenus(new Set())
    }
  }, [activeMenu]) // 当 activeMenu 改变时重新初始化

  // 递归查找页面ID（支持二级和三级菜单）
  const findPageId = (items, targetId) => {
    for (const item of items) {
      if (item.id === targetId) {
        return item.id
      }
      if (item.children) {
        const found = findPageId(item.children, targetId)
        if (found) return found
      }
    }
    return null
  }

  // 递归查找页面标签（根据页面ID）
  const findPageLabel = (items, targetId) => {
    for (const item of items) {
      if (item.id === targetId) {
        return item.label
      }
      if (item.children) {
        const found = findPageLabel(item.children, targetId)
        if (found) return found
      }
    }
    return null
  }

  // 获取页面标签
  const getPageLabel = (pageId, menuId) => {
    if (!pageId) return null
    const menuItem = menuData.find(item => item.id === menuId)
    if (!menuItem?.children) return null
    return findPageLabel(menuItem.children, pageId) || menuItem.label
  }

  // 添加标签页
  const addTab = (pageId, menuId) => {
    if (!pageId) return
    const label = getPageLabel(pageId, menuId)
    if (!label) return
    
    setOpenTabs(prevTabs => {
      // 检查标签是否已存在
      const exists = prevTabs.some(tab => tab.id === pageId && tab.menuId === menuId)
      if (exists) return prevTabs
      
      // 添加新标签
      return [...prevTabs, { id: pageId, label, menuId }]
    })
  }

  // 关闭标签页
  const closeTab = (pageId, menuId, e) => {
    e.stopPropagation() // 阻止事件冒泡
    setOpenTabs(prevTabs => {
      const newTabs = prevTabs.filter(tab => !(tab.id === pageId && tab.menuId === menuId))
      
      // 如果关闭的是当前激活的标签，切换到其他标签
      if (activeSubPage === pageId && activeMenu === menuId) {
        if (newTabs.length > 0) {
          const nextTab = newTabs[newTabs.length - 1]
          setActiveMenu(nextTab.menuId)
          setActiveSubPage(nextTab.id)
        } else {
          // 如果没有其他标签，重置到默认
          setActiveMenu('member')
          setActiveSubPage('member-feedback')
        }
      }
      
      return newTabs
    })
  }

  // 切换标签页
  const switchTab = (pageId, menuId) => {
    setActiveMenu(menuId)
    setActiveSubPage(pageId)
  }

  // 处理一级菜单点击
  const handleMenuClick = (menuId) => {
    const menuItem = menuData.find(item => item.id === menuId)
    setActiveMenu(menuId)
    
    // 如果是有子菜单的项，默认选中第一个子菜单
    if (menuItem?.type === 'expandable' && menuItem?.children?.length > 0) {
      const firstChild = menuItem.children[0]
      let targetPageId = null
      // 如果是可展开的二级菜单，选中第一个三级菜单
      if (firstChild.type === 'expandable' && firstChild.children?.length > 0) {
        targetPageId = firstChild.children[0].id
      } else {
        targetPageId = firstChild.id
      }
      setActiveSubPage(targetPageId)
      addTab(targetPageId, menuId)
    } else {
      setActiveSubPage(null)
    }
    // 注意：展开状态会在 useEffect 中自动处理
  }

  // 处理二级菜单点击（展开/收放）
  const handleSubMenuToggle = (subMenuId, subMenuItem) => {
    const newExpanded = new Set(expandedSubMenus)
    if (newExpanded.has(subMenuId)) {
      newExpanded.delete(subMenuId)
    } else {
      newExpanded.add(subMenuId)
      // 如果展开，默认选中第一个三级菜单
      if (subMenuItem.children?.length > 0) {
        const firstThirdPageId = subMenuItem.children[0].id
        setActiveSubPage(firstThirdPageId)
        addTab(firstThirdPageId, activeMenu)
      }
    }
    setExpandedSubMenus(newExpanded)
  }

  // 处理二级单页菜单点击
  const handleSubPageClick = (subPageId) => {
    setActiveSubPage(subPageId)
    addTab(subPageId, activeMenu)
  }

  // 处理三级菜单点击
  const handleThirdLevelClick = (thirdPageId) => {
    setActiveSubPage(thirdPageId)
    addTab(thirdPageId, activeMenu)
  }

  // 渲染页面内容
  const renderPageContent = () => {
    switch (activeMenu) {
      case 'member':
        return <MemberPage subPage={activeSubPage} />
      case 'dashboard':
        return <PlaceholderPage title="日常" icon="bi-grid" />
      case 'package':
        return <PlaceholderPage title="套餐" icon="bi-box-seam" />
      case 'ticket':
        return <PlaceholderPage title="门票" icon="bi-ticket-perforated" />
      case 'distributor':
        return <PlaceholderPage title="分销商" icon="bi-diagram-3" />
      case 'product':
        return <PlaceholderPage title="商品" icon="bi-bag" />
      case 'marketing':
        return <PlaceholderPage title="营销" icon="bi-megaphone" />
      case 'equipment':
        return <PlaceholderPage title="设备" icon="bi-pc-display" />
      case 'system':
        return <PlaceholderPage title="系统" icon="bi-gear" />
      case 'heqiu':
        return <PlaceholderPage title="台球" icon="bi-globe" />
      case 'online':
        return <PlaceholderPage title="线上" icon="bi-wifi" />
      case 'report':
        return <PlaceholderPage title="报表" icon="bi-graph-up" />
      default:
        return <PlaceholderPage title="页面" icon="bi-layout-text-window-reverse" />
    }
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* 顶部导航栏 */}
      <div className="bg-blue-500 shadow-md px-6 py-2 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logoImg} alt="Logo" className="w-10 h-10 object-contain" />
            <span className="text-white font-bold text-lg">鲸舰-门店控制中心</span>
          </div>

          {/* 店铺选择 */}
          <div className="flex items-center space-x-2 bg-blue-600 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
            <span className="text-white text-sm">翠花科技3157号店</span>
            <BsChevronDown className="text-white text-xs" />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {/* 搜索框 */}
          <div className="relative">
            <input
              type="text"
              placeholder="搜索菜单"
              className="bg-blue-400 bg-opacity-50 text-white placeholder-blue-200 px-4 py-2 pl-10 rounded-lg focus:outline-none focus:bg-white focus:text-gray-800 transition-colors w-64"
            />
            <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200" />
          </div>

          {/* 工具图标 */}
          <button className="text-white hover:text-blue-200 transition-colors">
            <BsArrowClockwise className="text-xl" />
          </button>
          <button className="text-white hover:text-blue-200 transition-colors">
            <PiTShirtLight className="text-2xl" />
          </button>
          <button className="text-white hover:text-blue-200 transition-colors relative">
            <BsBag className="text-xl" />
          </button>
          <button className="text-white hover:text-blue-200 transition-colors relative">
            <BsBell className="text-xl" />
          </button>

          {/* 用户信息 */}
          <div className="flex items-center space-x-2 px-3 py-1 rounded-lg cursor-pointer ">
            <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">张</span>
            </div>
            <span className="text-white text-sm">张用户</span>
            <BsChevronDown className="text-white text-xs" />
          </div>
        </div>
      </div>

      {/* 主体内容区 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 一级导航 - 蓝色背景，图标在上文字在下 */}
        <div 
          className="w-15 bg-blue-500 shadow-lg flex flex-col hide-scrollbar"
          style={scrollbarHideStyle}
        >
          <nav className="flex-1 overflow-y-auto py-4 hide-scrollbar" style={scrollbarHideStyle}>
            {menuData.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex flex-col items-center justify-center py-4 px-2 transition-colors ${
                  activeMenu === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-100 hover:bg-blue-600 hover:text-white'
                }`}
              >
                {(() => {
                  let IconComponent = null
                  switch (item.icon) {
                    case 'dashboard': IconComponent = BsGrid; break
                    case 'package': IconComponent = BsBoxSeam; break
                    case 'ticket': IconComponent = BsTicketPerforated; break
                    case 'distributor': IconComponent = BsDiagram3; break
                    case 'member': IconComponent = BsPeople; break
                    case 'product': IconComponent = BsBag; break
                    case 'marketing': IconComponent = BsMegaphone; break
                    case 'equipment': IconComponent = BsPcDisplay; break
                    case 'system': IconComponent = BsGear; break
                    case 'heqiu': IconComponent = BsGlobe; break
                    case 'online': IconComponent = BsWifi; break
                    case 'report': IconComponent = BsGraphUp; break
                    default: IconComponent = null
                  }
                  return IconComponent ? <IconComponent className="text-xl mb-2" /> : null
                })()}
                <span className="text-xs font-medium text-center leading-tight">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* 版本信息 - 固定在底部 */}
          <div className="px-2 py-4 border-t border-blue-400 flex-shrink-0">
            <div className="flex flex-col items-center space-y-1 text-blue-100">
              <span className="text-xs text-center leading-tight">旗舰版</span>
              <span className="text-xs">10.26.1</span>
            </div>
          </div>
        </div>

        {/* 二级导航 - 白色背景，单独一列 */}
        <div 
          className="w-32 bg-white border-r border-gray-200 overflow-y-auto shadow-sm hide-scrollbar"
          style={scrollbarHideStyle}
        >
          {hasSubMenu ? (
            <div className="py-4">
              {activeMenuItem.children.map((child) => {
                const isExpanded = expandedSubMenus.has(child.id)
                const hasChildren = child.type === 'expandable' && child.children?.length > 0
                const isActive = activeSubPage === child.id || (hasChildren && child.children.some(c => c.id === activeSubPage))
                
                return (
                  <div key={child.id}>
                    {/* 二级菜单项 */}
                    <button
                      onClick={() => {
                        if (hasChildren) {
                          handleSubMenuToggle(child.id, child)
                        } else {
                          handleSubPageClick(child.id)
                        }
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="font-bold">{child.label}</span>
                      {hasChildren && (
                        <BsChevronRight 
                          className={`text-xs transition-transform ${
                            isExpanded ? 'transform rotate-90' : ''
                          }`}
                        />
                      )}
                    </button>
                    
                    {/* 三级菜单（展开时显示） */}
                    {hasChildren && isExpanded && (
                      <div className="bg-gray-50">
                        {child.children.map((thirdChild) => (
                          <button
                            key={thirdChild.id}
                            onClick={() => handleThirdLevelClick(thirdChild.id)}
                            className={`w-full text-left px-8 py-2 text-sm transition-colors ${
                              activeSubPage === thirdChild.id
                                ? 'bg-blue-100 text-blue-600 font-medium'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {thirdChild.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            // 空白占位
            <div className="py-4"></div>
          )}
        </div>

        {/* 右侧内容区 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* 标签页 - 固定不滚动 */}
          <div className="bg-white h-10 border-b border-gray-200 p-2 flex items-center justify-between flex-shrink-0">
            {/* 左侧滚动按钮 */}
            <button className="text-gray-600 hover:text-gray-800 transition-colors px-2">
              <BsChevronLeft className="text-lg" />
            </button>
            
            {/* 标签页列表 */}
            <div className="flex-1 flex items-center overflow-x-auto hide-scrollbar" style={scrollbarHideStyle}>
              {openTabs.map((tab) => {
                const isActive = tab.id === activeSubPage && tab.menuId === activeMenu
                return (
                  <div
                    key={`${tab.menuId}-${tab.id}`}
                    onClick={() => switchTab(tab.id, tab.menuId)}
                    className={`flex items-center px-3 py-1 mx-1 rounded-sm cursor-pointer transition-colors min-w-fit ${
                      isActive
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    <span className="text-sm whitespace-nowrap">{tab.label}</span>
                    <button
                      onClick={(e) => closeTab(tab.id, tab.menuId, e)}
                      className={`ml-2 hover:bg-opacity-20 rounded p-0.5 transition-colors ${
                        isActive ? 'hover:bg-white' : 'hover:bg-gray-400'
                      }`}
                    >
                      <BsX className="text-lg" />
                    </button>
                  </div>
                )
              })}
            </div>
            
            {/* 右侧操作按钮 */}
            <div className="flex items-center space-x-2 px-2">
              <button className="text-gray-600 hover:text-gray-800 transition-colors">
                <BsChevronRight className="text-lg" />
              </button>
              <button className="text-gray-600 hover:text-gray-800 transition-colors">
                <BsGridFill className="text-base" />
              </button>
            </div>
          </div>

          {/* 主要工作区 */}
          <div className="bg-gray-100 flex-1 overflow-hidden">
            {renderPageContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BackendLayout

