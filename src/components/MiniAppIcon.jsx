function MiniAppIcon() {
  return (
    <button className="bg-white border border-gray-100 rounded-full px-3 py-1.5 flex items-center">
      {/* 左侧三个点 */}
      <div className="flex items-center space-x-0.5 pr-1.5">
        <div className="w-1  h-1 bg-black rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
        <div className="w-1 h-1 bg-black rounded-full"></div>
      </div>
      {/* 分隔线 */}
      <div className="w-px h-3 bg-gray-200 mx-1"></div>
      {/* 右侧同心圆 */}
      <div className="relative w-3.5 h-3.5 pl-1.5">
        <div className="absolute inset-0 border border-black rounded-full"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
        </div>
      </div>
    </button>
  )
}

export default MiniAppIcon

