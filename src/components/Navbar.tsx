import React from 'react';
import { Download } from 'lucide-react';

interface NavbarProps {
  activeTab: 'calendar' | 'converter' | 'horoscope' | 'holidays';
  setActiveTab: (tab: 'calendar' | 'converter' | 'horoscope' | 'holidays') => void;
  onJumpToday: () => void;
  currentDateText: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onJumpToday,
  currentDateText,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('calendar')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="font-editorial text-2xl font-bold tracking-tight text-amber-950 group-hover:text-red-800 transition-colors">
                Lịch Âm Việt
              </span>
            </button>
            <span className="hidden sm:inline-block text-xs text-stone-500 font-sans border-l border-stone-300 pl-3">
              {currentDateText}
            </span>
          </div>

          {/* Zone 2: 4 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`pb-1 transition-all border-b-2 cursor-pointer ${
                activeTab === 'calendar'
                  ? 'border-red-800 text-red-900 font-semibold'
                  : 'border-transparent text-stone-600 hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              Lịch Vạn Niên
            </button>
            <button
              onClick={() => setActiveTab('converter')}
              className={`pb-1 transition-all border-b-2 cursor-pointer ${
                activeTab === 'converter'
                  ? 'border-red-800 text-red-900 font-semibold'
                  : 'border-transparent text-stone-600 hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              Đổi Ngày Âm Dương
            </button>
            <button
              onClick={() => setActiveTab('horoscope')}
              className={`pb-1 transition-all border-b-2 cursor-pointer ${
                activeTab === 'horoscope'
                  ? 'border-red-800 text-red-900 font-semibold'
                  : 'border-transparent text-stone-600 hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              Tử Vi 12 Con Giáp
            </button>
            <button
              onClick={() => setActiveTab('holidays')}
              className={`pb-1 transition-all border-b-2 cursor-pointer ${
                activeTab === 'holidays'
                  ? 'border-red-800 text-red-900 font-semibold'
                  : 'border-transparent text-stone-600 hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              Ngày Lễ Trong Năm
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onJumpToday}
              className="px-3.5 py-1.5 text-xs font-medium text-amber-950 bg-amber-100 hover:bg-amber-200/80 rounded border border-amber-300/60 transition-colors whitespace-nowrap cursor-pointer shadow-xs"
            >
              Về Hôm Nay
            </button>
            <a
              href="/lich-am-viet-source.zip"
              download="lich-am-viet-source.zip"
              className="px-3 py-1.5 text-xs font-semibold text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded flex items-center gap-1.5 transition-colors shadow-xs"
              title="Tải toàn bộ mã nguồn website về máy (.ZIP)"
            >
              <Download className="w-3.5 h-3.5 text-amber-800 shrink-0" />
              <span className="hidden sm:inline">Tải Code (.ZIP)</span>
              <span className="sm:hidden">Tải Code</span>
            </a>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around border-t border-stone-200/70 py-2 text-xs">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-2 py-1 rounded transition-colors ${
              activeTab === 'calendar' ? 'text-red-900 font-bold bg-amber-100/70' : 'text-stone-600'
            }`}
          >
            Lịch Tháng
          </button>
          <button
            onClick={() => setActiveTab('converter')}
            className={`px-2 py-1 rounded transition-colors ${
              activeTab === 'converter' ? 'text-red-900 font-bold bg-amber-100/70' : 'text-stone-600'
            }`}
          >
            Đổi Ngày
          </button>
          <button
            onClick={() => setActiveTab('horoscope')}
            className={`px-2 py-1 rounded transition-colors ${
              activeTab === 'horoscope' ? 'text-red-900 font-bold bg-amber-100/70' : 'text-stone-600'
            }`}
          >
            Tử Vi
          </button>
          <button
            onClick={() => setActiveTab('holidays')}
            className={`px-2 py-1 rounded transition-colors ${
              activeTab === 'holidays' ? 'text-red-900 font-bold bg-amber-100/70' : 'text-stone-600'
            }`}
          >
            Ngày Lễ
          </button>
        </div>
      </div>
    </header>
  );
};
