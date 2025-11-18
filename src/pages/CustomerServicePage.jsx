import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import MiniAppIcon from '../components/MiniAppIcon'
import qrcodeImg from '../img/qrcode.png'
import {
  BsChevronLeft,
  BsWechat,
  BsChatSquareText,
  BsX,
  BsPlusLg,
  BsShare,
  BsDownload,
  BsStar,
  BsPerson
} from 'react-icons/bs'
import { mockFAQs } from '../mock/faqData'
import {
  CUSTOMER_FEEDBACK_SETTINGS_KEY,
  DEFAULT_FEEDBACK_METHODS,
} from '../constants/customerFeedback'

// FAQ 接口定义
// FAQItem {
//   id: number - 问题ID
//   title: string - 问题标题
//   content: string - 问题内容（Markdown格式）
//   category?: string - 问题分类（可选）
//   order?: number - 显示顺序（可选）
// }

function CustomerServicePage({ onBack }) {
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: 'system',
      content: '您好，欢迎使用客服服务！有什么可以帮助您的吗？',
      time: '10:30',
    },
  ])
  const [expandedFAQ, setExpandedFAQ] = useState(null)
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [feedbackImages, setFeedbackImages] = useState([])
  const fileInputRef = useRef(null)
  const [showQRMenu, setShowQRMenu] = useState(false)
  const longPressTimer = useRef(null)
  const [feedbackMethods, setFeedbackMethods] = useState(() => ({
    ...DEFAULT_FEEDBACK_METHODS,
  }))
  const hasWechatEntry = Boolean(feedbackMethods.wechat)
  const hasFeedbackEntry = Boolean(feedbackMethods.messageboard)
  const hasAnyEntry = hasWechatEntry || hasFeedbackEntry

  useEffect(() => {
    if (typeof window === 'undefined' || !window.localStorage) {
      return
    }

    const loadSettings = () => {
      try {
        const saved = window.localStorage.getItem(CUSTOMER_FEEDBACK_SETTINGS_KEY)
        if (!saved) {
          setFeedbackMethods({ ...DEFAULT_FEEDBACK_METHODS })
          return
        }
        const parsed = JSON.parse(saved)
        if (parsed.feedbackMethods) {
          setFeedbackMethods({
            ...DEFAULT_FEEDBACK_METHODS,
            ...parsed.feedbackMethods,
          })
        } else {
          setFeedbackMethods({ ...DEFAULT_FEEDBACK_METHODS })
        }
      } catch (error) {
        console.error('加载客服入口设置失败', error)
      }
    }

    loadSettings()
    window.addEventListener('storage', loadSettings)

    return () => {
      window.removeEventListener('storage', loadSettings)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-[434px] min-h-screen bg-gray-100 relative shadow-2xl">
        {/* 顶部导航栏 */}
        <div className="px-4 py-3 flex items-center justify-between bg-white/80 backdrop-blur-sm">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-colors"
          >
            <BsChevronLeft className="text-xl" />
          </button>
          <div className="flex items-center">
            <span className="font-medium text-gray-800 pl-4">客服与反馈</span>
          </div>
          <MiniAppIcon />
        </div>

        {/* 主内容区 */}
        <div className="px-4 py-6 pb-32">
          {/* 常见问题标题 */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">常见问题FAQ</h2>
          </div>

          {/* 常见问题列表 */}
          <div className="space-y-3">
            {mockFAQs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all"
              >
                {/* 问题标题 */}
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-800 flex-1">{faq.title}</span>
                  <BsChevronLeft
                    className={`text-gray-400 transition-transform ${
                      expandedFAQ === faq.id ? 'rotate-90' : '-rotate-90'
                    }`}
                  />
                </button>

                {/* 问题内容（Markdown渲染） */}
                {expandedFAQ === faq.id && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="pt-3">
                      <ReactMarkdown
                        components={{
                          h2: ({ node, ...props }) => (
                            <h2 className="text-base font-semibold text-gray-800 mt-3 mb-2" {...props} />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3 className="text-sm font-semibold text-gray-700 mt-2 mb-1" {...props} />
                          ),
                          p: ({ node, ...props }) => (
                            <p className="text-sm text-gray-600 leading-relaxed mb-2" {...props} />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mb-2" {...props} />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1 mb-2" {...props} />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="text-sm text-gray-600" {...props} />
                          ),
                          strong: ({ node, ...props }) => (
                            <strong className="font-semibold text-gray-800" {...props} />
                          ),
                          table: ({ node, ...props }) => (
                            <div className="overflow-x-auto my-2">
                              <table className="min-w-full text-xs border-collapse border border-gray-300" {...props} />
                            </div>
                          ),
                          thead: ({ node, ...props }) => (
                            <thead className="bg-gray-100" {...props} />
                          ),
                          tbody: ({ node, ...props }) => (
                            <tbody {...props} />
                          ),
                          tr: ({ node, ...props }) => (
                            <tr className="border-b border-gray-200" {...props} />
                          ),
                          th: ({ node, ...props }) => (
                            <th className="border border-gray-300 px-2 py-1 text-left font-semibold text-gray-700" {...props} />
                          ),
                          td: ({ node, ...props }) => (
                            <td className="border border-gray-300 px-2 py-1 text-gray-600" {...props} />
                          ),
                        }}
                      >
                        {faq.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 底部操作按钮 */}
        {hasAnyEntry && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
            <div className="flex gap-3">
              {/* 联系客服按钮 */}
              {hasWechatEntry && (
                <button
                  onClick={() => setShowServiceModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:from-orange-600 hover:to-orange-700 transition-all active:scale-95"
                >
                  <BsWechat className="text-2xl" />
                  <span>联系客服</span>
                </button>
              )}

              {/* 我要反馈按钮 */}
              {hasFeedbackEntry && (
                <button
                  onClick={() => setShowFeedbackModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:from-orange-600 hover:to-orange-700 transition-all active:scale-95"
                >
                  <BsChatSquareText className="text-xl" />
                  <span>我要反馈</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* 联系客服抽屉弹窗 */}
        {showServiceModal && (
          <>
            {/* 遮罩层 */}
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowServiceModal(false)}
            />
            {/* 抽屉内容 */}
            <div
              className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[434px] bg-white rounded-t-2xl shadow-2xl z-50 animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-4">
                {/* 标题栏 */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">联系客服</h3>
                  <button
                    onClick={() => setShowServiceModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <BsX className="text-xl text-gray-600" />
                  </button>
                </div>
                {/* 二维码区域 */}
                <div className="flex flex-col items-center py-6">
                  <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <img
                      src={qrcodeImg}
                      alt="客服微信二维码"
                      className="w-48 h-48 object-contain select-none cursor-pointer"
                      onContextMenu={(e) => {
                        e.preventDefault()
                        setShowQRMenu(true)
                      }}
                      onMouseDown={(e) => {
                        // PC端鼠标按下开始长按计时
                        if (e.button === 0) { // 左键
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
                  </div>
                  <p className="text-sm text-gray-600">长按二维码添加客服</p>
                </div>
              </div>
            </div>
          </>
        )}

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

        {/* 我要反馈抽屉弹窗 */}
        {showFeedbackModal && (
          <>
            {/* 遮罩层 */}
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowFeedbackModal(false)}
            />
            {/* 抽屉内容 */}
            <div
              className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[434px] bg-white rounded-t-2xl shadow-2xl z-50 animate-slide-up max-h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-4 flex-shrink-0">
                {/* 标题栏 */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">我要反馈</h3>
                  <button
                    onClick={() => {
                      setShowFeedbackModal(false)
                      setFeedbackText('')
                      setFeedbackImages([])
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <BsX className="text-xl text-gray-600" />
                  </button>
                </div>
              </div>

              {/* 内容区域 */}
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                {/* 文字输入框 */}
                <div className="mb-4 mt-2">
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="请输入您的反馈内容（至少10个字）"
                    maxLength={200}
                    className="w-full min-h-[180px] px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                  />
                  {/* 字数统计 */}
                  <div className="flex justify-end mt-1">
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
                <div className="mb-2">
                  {/* 上传数量提示 */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">上传图片</span>
                    <span className="text-sm text-gray-400">
                      {feedbackImages.length}/3
                    </span>
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
                  <div className="grid grid-cols-3 gap-1.5 max-w-[320px]">
                    {/* 已上传的图片 */}
                    {feedbackImages.map((image) => (
                      <div key={image.id} className="relative group aspect-square">
                        <img
                          src={image.preview}
                          alt="预览"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          onClick={() => {
                            setFeedbackImages(
                              feedbackImages.filter((img) => img.id !== image.id)
                            )
                            URL.revokeObjectURL(image.preview)
                          }}
                          className="absolute top-0.5 right-0.5 bg-black/50 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <BsX className="text-xs" />
                        </button>
                      </div>
                    ))}
                    
                    {/* 上传按钮（最多3张，未达到3张时显示） */}
                    {feedbackImages.length < 3 && (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-white hover:border-orange-500 hover:bg-orange-50 transition-colors"
                      >
                        <BsPlusLg className="text-2xl text-gray-400" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 底部发送按钮 */}
              <div className="px-4 py-4 flex-shrink-0">
                <button
                  onClick={() => {
                    if (!feedbackText.trim() && feedbackImages.length === 0) {
                      alert('请输入反馈内容或上传图片')
                      return
                    }
                    // TODO: 实现发送反馈功能
                    console.log('发送反馈', { text: feedbackText, images: feedbackImages })
                    alert('反馈已提交，感谢您的反馈！')
                    setShowFeedbackModal(false)
                    setFeedbackText('')
                    setFeedbackImages([])
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:from-orange-600 hover:to-orange-700 transition-all active:scale-95"
                >
                  发送
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

