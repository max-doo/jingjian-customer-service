/**
 * 占位页面组件
 * 用于尚未开发的功能模块
 */

function PlaceholderPage({ title, icon = 'bi-layout-text-window-reverse' }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center py-20">
          <i className={`${icon} text-6xl text-gray-300 mb-4`}></i>
          <h3 className="text-xl font-medium text-gray-600 mb-2">{title}</h3>
          <p className="text-gray-400">功能开发中，敬请期待...</p>
        </div>
      </div>
    </div>
  )
}

export default PlaceholderPage

