import PlaceholderPage from '../common/PlaceholderPage'
import CustomerFeedback from './CustomerFeedback'

function MemberPage({ subPage }) {
  // 根据 subPage 显示不同的内容
  const renderContent = () => {
    switch (subPage) {
      case 'member-overview':
        return <PlaceholderPage title="会员概况" icon="bi-people" />
      
      case 'member-query':
        return <PlaceholderPage title="会员查询" icon="bi-search" />
      
      case 'tourist-query':
        return <PlaceholderPage title="游客查询" icon="bi-people" />
      
      case 'member-ranking':
        return <PlaceholderPage title="会员排行" icon="bi-trophy" />
      
      case 'member-tags':
        return <PlaceholderPage title="会员标签" icon="bi-tags" />
      
      // 会员管理 - 三级菜单
      case 'level-management':
        return <PlaceholderPage title="等级管理" icon="bi-star" />
      
      case 'card-management':
        return <PlaceholderPage title="卡片管理" icon="bi-credit-card" />
      
      case 'agreement-management':
        return <PlaceholderPage title="协议管理" icon="bi-file-earmark-text" />
      
      case 'member-feedback':
        return <CustomerFeedback />
      
      case 'advanced-settings':
        return <PlaceholderPage title="高级设置" icon="bi-gear" />
      
      // 会员记录 - 三级菜单
      case 'join-record':
        return <PlaceholderPage title="入会记录" icon="bi-person-plus" />
      
      case 'card-receive-record':
        return <PlaceholderPage title="领卡记录" icon="bi-credit-card-2-front" />
      
      case 'card-return-record':
        return <PlaceholderPage title="退卡记录" icon="bi-credit-card-2-back" />
      
      case 'card-exchange-record':
        return <PlaceholderPage title="换卡记录" icon="bi-arrow-left-right" />
      
      case 'transfer-record':
        return <PlaceholderPage title="过户记录" icon="bi-arrow-repeat" />
      
      case 'deposit-change-record':
        return <PlaceholderPage title="储值变更" icon="bi-cash-stack" />
      
      case 'level-change-record':
        return <PlaceholderPage title="等级变更" icon="bi-arrow-up-circle" />
      
      case 'profile-change-record':
        return <PlaceholderPage title="资料变更" icon="bi-pencil-square" />
      
      case 'complaint-record':
        return <PlaceholderPage title="客诉记录" icon="bi-chat-left-text" />
      
      case 'extension-record':
        return <PlaceholderPage title="延期记录" icon="bi-calendar-plus" />
      
      case 'deposit-balance':
        return <PlaceholderPage title="储值余额" icon="bi-wallet2" />
      
      case 'cancellation-record':
        return <PlaceholderPage title="注销记录" icon="bi-x-circle" />
      
      case 'wristband-record':
        return <PlaceholderPage title="腕带记录" icon="bi-watch" />
      
      default:
        return <PlaceholderPage title="会员概况" icon="bi-people" />
    }
  }

  return (
    <div className="p-2 h-full">
      {renderContent()}
    </div>
  )
}

export default MemberPage

