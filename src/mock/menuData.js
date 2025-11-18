/**
 * 菜单配置数据
 * 统一管理后台系统的菜单结构
 */

export const menuData = [
  { 
    id: 'dashboard', 
    icon: 'dashboard', 
    label: '日常', 
    type: 'single',
    component: 'DashboardPage'
  },
  { 
    id: 'package', 
    icon: 'package', 
    label: '套餐', 
    type: 'single',
    component: 'PackagePage'
  },
  { 
    id: 'ticket', 
    icon: 'ticket', 
    label: '门票', 
    type: 'single',
    component: 'TicketPage'
  },
  { 
    id: 'distributor', 
    icon: 'distributor', 
    label: '分销商', 
    type: 'single',
    component: 'DistributorPage'
  },
  {
    id: 'member',
    icon: 'member',
    label: '会员',
    type: 'expandable',
    component: 'MemberPage',
    children: [
      { 
        id: 'member-overview', 
        label: '会员概况',
        type: 'single'
      },
      { 
        id: 'member-info', 
        label: '会员信息',
        type: 'expandable',
        children: [
          { id: 'member-query', label: '会员查询' },
          { id: 'tourist-query', label: '游客查询' },
          { id: 'member-ranking', label: '会员排行' },
          { id: 'member-tags', label: '会员标签' },
        ]
      },
      { 
        id: 'member-management', 
        label: '会员管理',
        type: 'expandable',
        children: [
          { id: 'level-management', label: '等级管理' },
          { id: 'card-management', label: '卡片管理' },
          { id: 'agreement-management', label: '协议管理' },
          { id: 'member-feedback', label: '会员反馈' },
          { id: 'advanced-settings', label: '高级设置' },
        ]
      },
      { 
        id: 'member-records', 
        label: '会员记录',
        type: 'expandable',
        children: [
          { id: 'join-record', label: '入会记录' },
          { id: 'card-receive-record', label: '领卡记录' },
          { id: 'card-return-record', label: '退卡记录' },
          { id: 'card-exchange-record', label: '换卡记录' },
          { id: 'transfer-record', label: '过户记录' },
          { id: 'deposit-change-record', label: '储值变更' },
          { id: 'level-change-record', label: '等级变更' },
          { id: 'profile-change-record', label: '资料变更' },
          { id: 'complaint-record', label: '客诉记录' },
          { id: 'extension-record', label: '延期记录' },
          { id: 'deposit-balance', label: '储值余额' },
          { id: 'cancellation-record', label: '注销记录' },
          { id: 'wristband-record', label: '腕带记录' },
        ]
      },
    ],
  },
  { 
    id: 'product', 
    icon: 'product', 
    label: '商品', 
    type: 'single',
    component: 'ProductPage'
  },
  { 
    id: 'marketing', 
    icon: 'marketing', 
    label: '营销', 
    type: 'single',
    component: 'MarketingPage'
  },
  { 
    id: 'equipment', 
    icon: 'equipment', 
    label: '设备', 
    type: 'single',
    component: 'EquipmentPage'
  },
  { 
    id: 'system', 
    icon: 'system', 
    label: '系统', 
    type: 'single',
    component: 'SystemPage'
  },
  { 
    id: 'heqiu', 
    icon: 'heqiu', 
    label: '台球', 
    type: 'single',
    component: 'HeqiuPage'
  },
  { 
    id: 'online', 
    icon: 'online', 
    label: '线上', 
    type: 'single',
    component: 'OnlinePage'
  },
  { 
    id: 'report', 
    icon: 'report', 
    label: '报表', 
    type: 'single',
    component: 'ReportPage'
  },
]

// 图标映射配置
export const iconMapping = {
  'dashboard': 'BsGrid',
  'package': 'BsBoxSeam',
  'ticket': 'BsTicketPerforated',
  'distributor': 'BsDiagram3',
  'member': 'BsPeople',
  'product': 'BsBag',
  'marketing': 'BsMegaphone',
  'equipment': 'BsPcDisplay',
  'system': 'BsGear',
  'heqiu': 'BsGlobe',
  'online': 'BsWifi',
  'report': 'BsGraphUp',
}

