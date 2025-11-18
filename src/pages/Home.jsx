import { Link } from 'react-router-dom'

function Home() {
  const adminPreviewUrl = `${import.meta.env.BASE_URL}admin`
  const customerPreviewUrl = `${import.meta.env.BASE_URL}customer`
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* 页面标题 */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">客服反馈原型</h1>
      </div>

      {/* 预览框容器 */}
      <div className="mx-auto flex gap-4 justify-center" style={{ maxWidth: '1800px' }}>
        {/* B端后台预览框 */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 预览区域 */}
            <div className="relative bg-white border-2 border-gray-200" style={{ height: 'calc(100vh - 180px)', minHeight: '600px', minWidth: '1000px' }}>
              <iframe 
                src={adminPreviewUrl} 
                className="w-full h-full"
                title="B端后台预览"
                style={{ border: 'none' }}
              />
            </div>
            {/* 说明区域 */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-800">鲸舰后台</h3>
                <Link 
                  to="/admin"
                  className="text-white text-base bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full font-semibold transition-colors text-sm"
                >
                  点击查看完整页面
                </Link>
              </div>
              <div className="text-gray-700">
                <p className="text-base font-semibold mb-1">原型说明</p>
                <ul className="list-disc list-inside space-y-0.5 text-sm text-gray-600">
                  <li>在 会员》会员管理 下新增功能【会员反馈】</li>
                  <li>包含【反馈记录】、【设置】两个标签页</li>
                  <li>在设置中，可设置反馈方式，通过【微信/企微客服】、【留言反馈】的开关控制C端小程序【联系客服】和【我要反馈】按钮的显隐</li>
                  <li>可在富文本编辑框中输入常见问题FAQ，小程序可识别Markdown格式，转化为列表显示</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 小程序预览框 - 固定宽度 max-w-md (448px) */}
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 预览区域 */}
            <div className="relative bg-white border-2 border-gray-200" style={{ height: 'calc(100vh - 180px)', minHeight: '600px', minWidth: '373px' }}>
              <iframe 
                src={customerPreviewUrl} 
                className="w-full h-full"
                title="小程序预览"
                style={{ border: 'none' }}
              />
            </div>
            {/* 说明区域 */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-800">C端小程序</h3>
                <Link 
                  to="/customer"
                  className="text-white text-base bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-full font-semibold transition-colors text-sm"
                >
                  点击查看完整页面
                </Link>
              </div>
              <div className="text-gray-700">
                <p className="text-base font-semibold mb-1">原型说明</p>
                <ul className="list-disc list-inside space-y-0.5 text-sm text-gray-600">
                  <li>在【我的】页面新增【客服与反馈】入口</li>
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

