import { useState, useRef, useEffect } from 'react'
import MiniAppIcon from '../components/MiniAppIcon'
import qrcodeImg from '../img/qrcode.png'
import {
  BsChevronLeft,
  BsX,
  BsPlusLg,
  BsPerson,
  BsWechat,
  BsChatSquareText
} from 'react-icons/bs'
import { 
  CUSTOMER_FEEDBACK_SETTINGS_KEY,
  DEFAULT_FEEDBACK_METHODS,
} from '../constants/customerFeedback'

function CustomerServicePage({ onBack }) {
  const [feedbackText, setFeedbackText] = useState('')
  const [feedbackImages, setFeedbackImages] = useState([])
  const fileInputRef = useRef(null)
  const [showQRMenu, setShowQRMenu] = useState(false)
  const longPressTimer = useRef(null)
  
  // 从 localStorage 读取设置
  const [feedbackMethods, setFeedbackMethods] = useState({
    ...DEFAULT_FEEDBACK_METHODS,
  })
  const [qrDescription, setQrDescription] = useState('长按二维码添加客服微信')

  // 加载设置
  useEffect(() => {
    if (typeof window === 'undefined' || !window.localStorage) {
      return
    }
    try {
      const saved = window.localStorage.getItem(CUSTOMER_FEEDBACK_SETTINGS_KEY)
      if (!saved) {
        return
      }
      const parsed = JSON.parse(saved)
      if (parsed.feedbackMethods) {
        setFeedbackMethods(prev => ({
          ...prev,
          ...parsed.feedbackMethods,
        }))
      }
      if (parsed.qrDescription) {
        setQrDescription(parsed.qrDescription)
      }
    } catch (error) {
      console.error('加载客服配置失败', error)
    }
  }, [])


  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="relative flex h-full w-full max-w-[434px] flex-col bg-gray-100 shadow-2xl">
        {/* 顶部导航栏 */}
        <div className="flex flex-shrink-0 items-center justify-between bg-white/80 px-4 py-3 backdrop-blur-sm">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-colors"
          >
            <BsChevronLeft className="text-xl" />
          </button>
          <div className="flex items-center">
            <span className="pl-4 font-medium text-gray-800">客服与反馈</span>
          </div>
          <MiniAppIcon />
        </div>

        {/* 主内容区 */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            {/* 联系客服区域 - 根据设置控制显示 */}
            {feedbackMethods.wechat && (
              <div>
                <div className="rounded-xl bg-orange-50 p-4">
                  {/* 标题 */}
                  <div className="mb-4 flex items-center gap-2">
                    <BsWechat className="text-xl text-orange-500" />
                    <h2 className="text-lg font-semibold text-orange-500">联系客服</h2>
                  </div>
                  <div className="flex flex-col items-center">
                  <img
                      src={qrcodeImg}
                      alt="客服微信二维码"
                      className="w-56 rounded-2xl cursor-pointer select-none object-contain"
                      onContextMenu={(e) => {
                        e.preventDefault()
                        setShowQRMenu(true)
                      }}
                      onMouseDown={(e) => {
                        // PC端鼠标按下开始长按计时
                        if (e.button === 0) {
                          // 左键
                          longPressTimer.current = setTimeout(() => {
                            setShowQRMenu(true)
                          }, 500)
                        }
                      }}
                      onMouseUp={() => {
                        // PC端鼠标释放取消长按
                        if (longPressTimer.current) {
                          clearTimeout(longPressTimer.current)
                          longPressTimer.current = null
                        }
                      }}
                      onMouseLeave={() => {
                        // PC端鼠标移出取消长按
                        if (longPressTimer.current) {
                          clearTimeout(longPressTimer.current)
                          longPressTimer.current = null
                        }
                      }}
                      onTouchStart={(e) => {
                        // 移动端触摸开始长按计时
                        longPressTimer.current = setTimeout(() => {
                          setShowQRMenu(true)
                        }, 500)
                      }}
                      onTouchEnd={() => {
                        // 移动端触摸结束取消长按
                        if (longPressTimer.current) {
                          clearTimeout(longPressTimer.current)
                          longPressTimer.current = null
                        }
                      }}
                      onTouchMove={() => {
                        // 移动端触摸移动取消长按
                        if (longPressTimer.current) {
                          clearTimeout(longPressTimer.current)
                          longPressTimer.current = null
                        }
                      }}
                    />
                    <p className="w-full text-sm text-center text-gray-600 mt-4 border-t border-gray-200">
                      {qrDescription}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 我要反馈区域 - 根据设置控制显示 */}
            {feedbackMethods.messageboard && (
              <div>
                <div className="space-y-4 rounded-xl bg-white p-4">
                  {/* 标题 */}
                  <div className="flex items-center gap-2">
                    <BsChatSquareText className="text-xl text-orange-500" />
                    <h2 className="text-lg font-semibold text-orange-500">我要反馈</h2>
                  </div>
                  {/* 文字输入框 */}
                  <div>
                    <textarea
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="请输入您的反馈内容（至少10个字）"
                      maxLength={200}
                      className="min-h-[140px] w-full resize-none rounded-lg border border-gray-200 bg-gray-100 p-3 text-base focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    {/* 字数统计 */}
                    <div className="mt-1 flex justify-end">
                      <span
                        className={`text-sm ${
                          feedbackText.length >= 200
                            ? 'text-red-500'
                            : feedbackText.length >= 150
                            ? 'text-orange-500'
                            : 'text-gray-400'
                        }`}
                      >
                        {feedbackText.length}/200
                      </span>
                    </div>
                  </div>

                  {/* 图片上传区域 */}
                  <div>
                    {/* 上传数量提示 */}
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">上传图片</span>
                      <span className="text-sm text-gray-400">{feedbackImages.length}/3</span>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files)
                        const remainingSlots = 3 - feedbackImages.length
                        const filesToAdd = files.slice(0, remainingSlots)
                        const newImages = filesToAdd.map((file) => ({
                          id: Date.now() + Math.random(),
                          file,
                          preview: URL.createObjectURL(file),
                        }))
                        setFeedbackImages([...feedbackImages, ...newImages])
                        // 重置 input，允许重复选择相同文件
                        e.target.value = ''
                      }}
                    />

                    {/* 图片预览网格（包含上传按钮） */}
                    <div className="grid max-w-[320px] grid-cols-3 gap-1.5">
                      {/* 已上传的图片 */}
                      {feedbackImages.map((image) => (
                        <div key={image.id} className="group relative aspect-square">
                          <img
                            src={image.preview}
                            alt="预览"
                            className="h-full w-full rounded-lg object-cover"
                          />
                          <button
                            onClick={() => {
                              setFeedbackImages(feedbackImages.filter((img) => img.id !== image.id))
                              URL.revokeObjectURL(image.preview)
                            }}
                            className="absolute right-0.5 top-0.5 rounded-full bg-black/50 p-0.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <BsX className="text-xs" />
                          </button>
                        </div>
                      ))}

                      {/* 上传按钮（最多3张，未达到3张时显示） */}
                      {feedbackImages.length < 3 && (
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white transition-colors hover:border-orange-500 hover:bg-orange-50"
                        >
                          <BsPlusLg className="text-2xl text-gray-400" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 发送按钮 */}
                  <button
                    onClick={() => {
                      if (!feedbackText.trim() && feedbackImages.length === 0) {
                        alert('请输入反馈内容或上传图片')
                        return
                      }
                      // TODO: 实现发送反馈功能
                      console.log('发送反馈', { text: feedbackText, images: feedbackImages })
                      alert('反馈已提交，感谢您的反馈！')
                      setFeedbackText('')
                      setFeedbackImages([])
                    }}
                    className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 font-medium text-white shadow-md transition-all hover:from-orange-600 hover:to-orange-700 active:scale-95"
                  >
                    发送
                  </button>
                </div>
              </div>
            )}

            {/* 当两个卡片都不显示时的提示 */}
            {!feedbackMethods.wechat && !feedbackMethods.messageboard && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-gray-400 text-lg mb-2">暂无可用的客服功能</div>
                <div className="text-gray-400 text-sm">请联系管理员开启相关功能</div>
              </div>
            )}
          </div>
        </div>

        {/* 二维码长按菜单弹窗 */}
        {showQRMenu && (
          <>
            {/* 遮罩层 */}
            <div
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowQRMenu(false)}
            />
            {/* 菜单内容 */}
            <div
              className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[434px] bg-white rounded-t-2xl shadow-2xl z-50 animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 上方功能按钮全部居中 */}
              <div className="flex flex-col items-center gap-1 pt-2 pb-1">
                {/* 转发给朋友 */}
                <button
                  onClick={() => {
                    // TODO: 实现转发功能
                    console.log('转发给朋友')
                    setShowQRMenu(false)
                  }}
                  className="px-8 py-3 text-gray-800 hover:bg-gray-50 rounded-lg transition-colors text-center w-auto min-w-[180px]"
                  style={{ display: 'block' }}
                >
                  转发给朋友
                </button>
                {/* 保存到手机 */}
                <button
                  onClick={() => {
                    // TODO: 实现保存功能
                    const link = document.createElement('a')
                    link.href = qrcodeImg
                    link.download = '客服二维码.png'
                    link.click()
                    setShowQRMenu(false)
                  }}
                  className="px-8 py-3 text-gray-800 hover:bg-gray-50 rounded-lg transition-colors text-center w-auto min-w-[180px]"
                  style={{ display: 'block' }}
                >
                  保存到手机
                </button>
                {/* 收藏 */}
                <button
                  onClick={() => {
                    // TODO: 实现收藏功能
                    console.log('收藏')
                    setShowQRMenu(false)
                  }}
                  className="px-8 py-3 text-gray-800 hover:bg-gray-50 rounded-lg transition-colors text-center w-auto min-w-[180px]"
                  style={{ display: 'block' }}
                >
                  收藏
                </button>
              </div>

              {/* 分隔线 */}
              <div className="border-t border-gray-200 my-1" />

              {/* 描述文字 */}
              <div className="flex justify-center px-4 py-2">
                <p className="text-xs text-gray-400 text-center">打开对方的企业微信名片</p>
              </div>

              {/* 联系人卡片 */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    // TODO: 实现打开名片功能
                    console.log('打开企业微信名片')
                    setShowQRMenu(false)
                  }}
                  className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors rounded-lg w-auto"
                >
                  <div className="w-5 h-5 rounded-sm bg-gradient-to-br from-purple-400 via-blue-400 to-yellow-400 flex items-center justify-center flex-shrink-0">
                    <BsPerson className="text-white text-lg" />
                  </div>
                  <div className="flex-1 text-left flex items-center">
                    <div className="text-gray-800 font-medium mr-2">运营客服</div>
                    <div className="text-xs text-orange-500">@某某公司</div>
                  </div>
                </button>
              </div>

              {/* 分隔线 */}
              <div className="border-t border-gray-200 my-1" />

              {/* 取消按钮居中 */}
              <div className="flex justify-center pb-2">
                <button
                  onClick={() => setShowQRMenu(false)}
                  className="px-8 py-3 text-gray-800 hover:bg-gray-50 transition-colors rounded-lg text-center w-auto min-w-[180px]"
                  style={{ display: 'block' }}
                >
                  取消
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CustomerServicePage

