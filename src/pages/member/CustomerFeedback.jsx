import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { getFAQsAsHTML } from '../../mock/faqData'
import { 
  CUSTOMER_FEEDBACK_SETTINGS_KEY,
  DEFAULT_FEEDBACK_METHODS,
} from '../../constants/customerFeedback'

// 输入框组件 - 带标签的输入框
function InputWithLabel({ label, type = 'text', placeholder, value, onChange, className = '' }) {
  return (
    <div className={`flex items-center ${className}`}>
      <label className="text-sm bg-gray-50 p-1.5 text-gray-600 border border-gray-200 rounded-l-md whitespace-nowrap">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 px-3 py-1.5 border border-l-0 border-gray-200 rounded-r-md text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-gray-300"
      />
    </div>
  )
}

// 下拉框组件 - 带标签的下拉框
function SelectWithLabel({ label, options, value, onChange, placeholder, className = '' }) {
  return (
    <div className={`flex items-center ${className}`}>
      <label className="text-sm bg-gray-50 p-1.5 text-gray-600 border border-gray-200 rounded-l-md whitespace-nowrap">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="flex-1 px-3 py-1.5 border border-l-0 border-gray-200 rounded-r-md text-sm text-gray-400 focus:outline-none focus:bg-white focus:border-gray-300"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

// 时间范围选择器组件 - 带标签和开始/结束时间
function DateRangeWithLabel({ label, startValue, endValue, onStartChange, onEndChange, className = '' }) {
  return (
    <div className={`flex items-center ${className}`}>
      <label className="text-sm bg-gray-50 p-1.5 text-gray-600 border border-gray-200 rounded-l-md whitespace-nowrap">
        {label}
      </label>
      <input
        type="date"
        value={startValue}
        onChange={onStartChange}
        placeholder="开始时间"
        className="px-3 py-1.5 border-t border-b border-gray-200 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-gray-300"
      />
      <span className="text-gray-400 text-sm">-</span>
      <input
        type="date"
        value={endValue}
        onChange={onEndChange}
        placeholder="结束时间"
        className="px-3 py-1.5 border border-l-0 border-gray-200 rounded-r-md text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-gray-300"
      />
    </div>
  )
}

// 开关组件
function ToggleSwitch({ label, checked, onChange }) {
  return (
    <label className="flex items-center space-x-3 cursor-pointer select-none">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-blue-500' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
            checked ? 'translate-x-5' : 'translate-x-1'
          }`}
        />
      </button>
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  )
}

// 数据表格组件 - 使用 @tanstack/react-table
function DataTable({ columns, data = [], onExport }) {
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  })

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const totalPages = table.getPageCount()
  const currentPage = pagination.pageIndex + 1

  return (
    <div className="flex flex-col h-full">
      {/* 数据表格 - 可滚动区域 */}
      <div className="flex-1 overflow-auto border border-gray-200" >
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-gray-50 z-10">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b border-gray-200">
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={`px-4 py-2 text-left text-sm font-semibold text-gray-700 ${
                      index < headerGroup.headers.length - 1 ? 'border-r border-gray-200' : ''
                    }`}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={header.column.getCanSort() ? 'flex items-center space-x-1 cursor-pointer' : ''}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <div className="flex flex-col">
                            <i className="bi bi-caret-up-fill text-xs text-gray-400 -mb-1"></i>
                            <i className="bi bi-caret-down-fill text-xs text-gray-400"></i>
                          </div>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-20 text-center text-gray-400">
                  暂无数据
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50">
                  {row.getVisibleCells().map((cell, index) => (
                    <td
                      key={cell.id}
                      className={`px-4 py-3 text-sm text-gray-600 ${
                        index < row.getVisibleCells().length - 1 ? 'border-r border-gray-200' : ''
                      }`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 分页和页脚 - 固定在底部 */}
      <div className="flex-shrink-0 px-4 py-2 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center gap-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">共 {data.length} 条</span>
          <select
            value={pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="20">20条/页</option>
            <option value="50">50条/页</option>
            <option value="100">100条/页</option>
          </select>
        </div>

        <div className="flex items-center space-x-2 flex-1">
          <button
            className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          {Array.from({ length: Math.min(6, totalPages) }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => table.setPageIndex(page - 1)}
              className={`px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors ${
                currentPage === page ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-white'
              }`}
            >
              {page}
            </button>
          ))}

          {totalPages > 6 && (
            <>
              <span className="px-2 text-gray-400 text-sm">...</span>
              <button
                className="px-3 py-1 border border-gray-300 rounded-md bg-white text-sm hover:bg-gray-100 transition-colors"
                onClick={() => table.setPageIndex(totalPages - 1)}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <i className="bi bi-chevron-right"></i>
          </button>

          <div className="flex items-center space-x-1 ml-2">
            <span className="text-sm text-gray-600">前往</span>
            <input
              type="number"
              min="1"
              max={totalPages}
              defaultValue={currentPage}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  const page = Number(e.target.value)
                  if (page >= 1 && page <= totalPages) {
                    table.setPageIndex(page - 1)
                  }
                }
              }}
              className="w-12 px-2 py-1 border border-gray-300 rounded-md text-sm text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">页</span>
          </div>
        </div>

        {onExport && (
          <div className="ml-auto">
            <button
              onClick={onExport}
              className="text-blue-500 text-sm rounded-md transition-colors flex items-center space-x-2"
            >
              <i className="bi bi-download"></i>
              <span>导出</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function CustomerFeedback() {
  // tab 标签状态
  const [activeTab, setActiveTab] = useState('feedback')
  
  // 弹窗状态
  const [showModal, setShowModal] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState(null)

  // 设置页面状态
  const [feedbackMethods, setFeedbackMethods] = useState(() => ({
    ...DEFAULT_FEEDBACK_METHODS,
  }))
  const [faqContent, setFaqContent] = useState(getFAQsAsHTML())
  const [qrPreview, setQrPreview] = useState('')
  const uploadInputRef = useRef(null)
  const [saveResult, setSaveResult] = useState(null)

  const handleUploadChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (qrPreview) {
      URL.revokeObjectURL(qrPreview)
    }
    const url = URL.createObjectURL(file)
    setQrPreview(url)
  }

  useEffect(() => {
    return () => {
      if (qrPreview) {
        URL.revokeObjectURL(qrPreview)
      }
    }
  }, [qrPreview])

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
      if (parsed.faqContent) {
        setFaqContent(parsed.faqContent)
      }
    } catch (error) {
      console.error('加载客服配置失败', error)
    }
  }, [])

  const handleSaveSettings = useCallback(() => {
    if (typeof window === 'undefined' || !window.localStorage) {
      setSaveResult({
        type: 'error',
        message: '当前环境无法保存设置，请稍后再试。',
      })
      return
    }
    try {
      const payload = {
        feedbackMethods,
        faqContent,
        updatedAt: Date.now(),
      }
      window.localStorage.setItem(
        CUSTOMER_FEEDBACK_SETTINGS_KEY,
        JSON.stringify(payload)
      )
      setSaveResult({
        type: 'success',
        message: '保存成功，客服端入口将按照新设置显示。',
      })
    } catch (error) {
      console.error('保存客服配置失败', error)
      setSaveResult({
        type: 'error',
        message: '保存失败，请稍后重试。',
      })
    }
  }, [faqContent, feedbackMethods])

  const closeSaveResult = useCallback(() => {
    setSaveResult(null)
  }, [])

  const [feedbackData, setFeedbackData] = useState([
    {
      id: 1,
      createTime: '2025-01-15 10:30:00',
      phone: '13812348888',
      nickname: '张三',
      content: '周末高峰时段机台排队时间很长，希望能开放更多热门赛车机或者提供预约排队功能。',
      images: ['https://picsum.photos/200/300', 'https://picsum.photos/200/200','https://picsum.photos/200/100'],
      handleStatus: 'pending',
    },
    {
      id: 2,
      createTime: '2025-01-14 15:20:00',
      phone: '13956786666',
      nickname: '李四',
      content: '娃娃机里的公仔样式有点少，能否定期更换主题或者引进联名款，增加消费动力。',
      images: ['https://picsum.photos/200/300', 'https://picsum.photos/200/200'],
      handleStatus: 'pending',
    },
    {
      id: 3,
      createTime: '2025-01-13 09:15:00',
      phone: '18890129999',
      nickname: '王五',
      content: '积分兑换很实用，但页面经常卡顿，建议优化自助机操作体验，方便快速兑换饮料券。',
      images: [],
      handleStatus: 'handled',
    },
  ])

  const toggleFeedbackStatus = useCallback((id) => {
    setFeedbackData(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, handleStatus: item.handleStatus === 'handled' ? 'pending' : 'handled' }
          : item
      )
    )
  }, [])

  // 定义表格列
  const columns = useMemo(() => [
    {
      accessorKey: 'createTime',
      header: '创建时间',
      enableSorting: true,
    },
    {
      accessorKey: 'phone',
      header: '手机号码',
      enableSorting: true,
    },
    {
      accessorKey: 'nickname',
      header: '会员昵称',
      enableSorting: true,
    },
    {
      accessorKey: 'content',
      header: '反馈内容',
      enableSorting: false,
    },
    {
      accessorKey: 'handleStatus',
      header: '处理状态',
      enableSorting: true,
      cell: ({ getValue }) => {
        const value = getValue()
        const isHandled = value === 'handled'
        return (
          <span className={`text-sm font-medium ${isHandled ? 'text-green-600' : 'text-red-500'}`}>
            {isHandled ? '已处理' : '未处理'}
          </span>
        )
      }
    },
    {
      accessorKey: 'images',
      header: '是否有图片',
      enableSorting: false,
      cell: ({ row }) => {
        const hasImages = row.original.images?.length > 0
        return (
          <span className={`text-sm font-medium ${hasImages ? 'text-green-600' : 'text-gray-500'}`}>
            {hasImages ? '是' : '否'}
          </span>
        )
      },
    },
    {
      accessorKey: 'actions',
      header: '操作',
      enableSorting: false,
      cell: ({ row }) => {
        const isHandled = row.original.handleStatus === 'handled'
        const actionLabel = isHandled ? '未处理' : '已处理'
        const actionClasses = isHandled
          ? 'bg-green-500 hover:bg-green-600'
          : 'bg-red-500 hover:bg-red-600'
        return (
          <div className="flex gap-2">
            <button 
              className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
              onClick={() => {
                setSelectedFeedback(row.original)
                setShowModal(true)
              }}
            >
              查看
            </button>
            <button
              className={`px-3 py-1 text-sm text-white rounded transition-colors ${actionClasses}`}
              onClick={() => toggleFeedbackStatus(row.original.id)}
            >
              {actionLabel}
            </button>
          </div>
        )
      }
    },
  ], [toggleFeedbackStatus])

  return (
    <div className="h-full p-2 bg-white rounded-lg relative">
      <div className="flex flex-col h-full overflow-hidden">
        {/* Tab 标签区域 */}
        <div className="flex-shrink-0 mb-4 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('feedback')}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === 'feedback'
                  ? 'text-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              反馈记录
              {activeTab === 'feedback' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === 'settings'
                  ? 'text-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              设置
              {activeTab === 'settings' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
              )}
            </button>
          </div>
        </div>

        {/* 内容区域 - 根据 activeTab 显示不同内容 */}
        {activeTab === 'feedback' ? (
          <>
            {/* 搜索和筛选区域 */}
            <div className="flex-shrink-0 mb-2">
              <div className="flex flex-wrap items-center gap-4">
                <InputWithLabel label="会员手机号" placeholder="请输入会员手机号" className="flex-shrink-0" />
                <DateRangeWithLabel label="创建时间" className="flex-shrink-0" />
                <SelectWithLabel 
                  label="处理状态" 
                  placeholder="请选择处理状态"
                  options={[
                    { value: 'normal', label: '已处理' },
                    { value: 'invalid', label: '未处理' }
                  ]}
                  className="flex-shrink-0"
                />
                <button className="px-6 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors ml-auto">
                  查询
                </button>
              </div>
            </div>
            
            {/* 表格 + 页脚 */}
            <div className="flex-1 min-h-0 bg-white">
              <DataTable 
                columns={columns} 
                data={feedbackData}
                onExport={() => console.log('导出数据')}
              />
            </div>
          </>
        ) : (
          <>
            {/* 设置页面 */}
            <div className="flex-1 overflow-auto">
              <div className="max-w-4xl">
                {/* 反馈方式 + 保存 */}
                <div className="mb-4 border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-medium text-gray-700">反馈方式（可多选）</h3>
                    <button 
                      onClick={handleSaveSettings}
                      className="px-6 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
                    >
                      保存
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-8">
                    <ToggleSwitch
                      label="微信/企微客服"
                      checked={feedbackMethods.wechat}
                      onChange={(checked) => setFeedbackMethods({ ...feedbackMethods, wechat: checked })}
                    />
                    <ToggleSwitch
                      label="留言反馈"
                      checked={feedbackMethods.messageboard}
                      onChange={(checked) => setFeedbackMethods({ ...feedbackMethods, messageboard: checked })}
                    />
                  </div>

                  {/* 上传二维码 */}
                  <div className="mt-4">
                    <input
                      type="file"
                      accept="image/*"
                      ref={uploadInputRef}
                      className="hidden"
                      onChange={handleUploadChange}
                    />
                    <div
                      onClick={() => uploadInputRef.current?.click()}
                      className="w-28 h-28 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-3xl text-gray-300 cursor-pointer hover:border-blue-400 hover:text-blue-400 transition-colors"
                    >
                      {qrPreview ? (
                        <img src={qrPreview} alt="微信/企微二维码" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        '+'
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-3">上传微信/企微二维码</p>
                  </div>
                </div>

                {/* 常见问题 */}
                <div className="mb-6">
                  <h3 className="text-base font-medium text-gray-700 mb-4">常见问题FAQ</h3>
                  <div className=" rounded-lg overflow-hidden bg-white" style={{ minHeight: '400px' }}>
                    <ReactQuill
                      value={faqContent}
                      onChange={setFaqContent}
                      placeholder="请输入常见问题内容..."
                      style={{ height: '400px' }}
                      modules={{
                        toolbar: [
                          [{ 'header': [1, 2, 3, false] }],
                          ['bold', 'italic', 'underline', 'strike'],
                          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                          [{ 'color': [] }, { 'background': [] }],
                          ['link', 'image'],
                          ['clean']
                        ]
                      }}
                      formats={[
                        'header',
                        'bold', 'italic', 'underline', 'strike',
                        'list', 'bullet',
                        'color', 'background',
                        'link', 'image'
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 右侧滑出弹窗 */}
      {showModal && (
        <div className="absolute top-0 right-0 h-full w-[600px] bg-white rounded-lg shadow-[0_0_40px_rgba(15,23,42,0.18)] z-50 transform transition-transform duration-300 ease-in-out ">
          <div className="flex flex-col h-full">
            {/* 标题栏 */}
            <div className="flex items-center justify-between p-2 border-b border-gray-200">
              <h3 className="text-base text-gray-600">反馈详情</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                <i className="bi bi-x text-xl"></i>
              </button>
            </div>

            {/* 内容区域 */}
            <div className="flex-1 overflow-y-auto p-6">
              {selectedFeedback && (
                <div className="space-y-3">
                  {[
                    { label: '创建时间', value: selectedFeedback.createTime },
                    { label: '手机号码', value: selectedFeedback.phone },
                    { label: '会员昵称', value: selectedFeedback.nickname },
                    { label: '反馈内容', value: selectedFeedback.content, multiline: true },
                    { 
                      label: '处理状态', 
                      value: selectedFeedback.handleStatus === 'handled' ? '已处理' : '未处理',
                      statusColor: selectedFeedback.handleStatus === 'handled' ? 'text-green-600' : 'text-red-500'
                    },
                    { label: '图片', isImage: true }
                  ].map((field, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-sm font-medium text-gray-500 flex-shrink-0">
                        {field.label}：
                      </span>
                      {field.isImage ? (
                        <div className="flex-1">
                          {selectedFeedback.images?.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {selectedFeedback.images.map((img, imgIndex) => (
                                <img 
                                  key={imgIndex}
                                  src={img}
                                  alt={`反馈图片${imgIndex + 1}`}
                                  className="object-cover rounded-md border border-gray-200"
                                />
                              ))}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">无</span>
                          )}
                        </div>
                      ) : field.multiline ? (
                        <div className="flex-1 text-sm text-gray-800 whitespace-pre-wrap border border-gray-200 rounded-md px-3 py-2">
                          {field.value}
                        </div>
                      ) : (
                        <span className={`flex-1 text-sm text-gray-800 ${field.statusColor || ''}`}>
                          {field.value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 底部按钮 */}
            <div className="p-4 flex justify-end">
              {selectedFeedback && (
                <button 
                  onClick={() => {
                    toggleFeedbackStatus(selectedFeedback.id)
                    setShowModal(false)
                  }}
                  className={`w-32 py-3 text-white rounded-lg transition-colors font-medium ${
                    selectedFeedback.handleStatus === 'handled'
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {selectedFeedback.handleStatus === 'handled' ? '未处理' : '已处理'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {saveResult && (
        <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div
              className={`text-lg font-semibold ${
                saveResult.type === 'success' ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {saveResult.type === 'success' ? '保存成功' : '保存失败'}
            </div>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              {saveResult.message}
            </p>
            <button
              onClick={closeSaveResult}
              className="mt-5 px-6 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
            >
              知道了
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerFeedback

