import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Sparkles, Eye, CheckCircle2 } from 'lucide-react';

interface SideSkyscraperAdsProps {
  adClient?: string;
  leftSlot?: string;
  rightSlot?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export const SideSkyscraperAds: React.FC<SideSkyscraperAdsProps> = ({
  adClient = 'ca-pub-4920887314704074',
  leftSlot,
  rightSlot,
}) => {
  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    if (adClient) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense side skyscraper error:', err);
      }
    }
  }, [adClient, leftSlot, rightSlot]);

  return (
    <>
      {/* LEFT SKYSCRAPER BANNER (140px / 160px x 600px) */}
      {showLeft && (
        <aside
          aria-label="Quảng cáo bên trái"
          className="fixed top-24 left-1.5 xl:left-3 2xl:left-6 z-30 hidden min-[1400px]:flex flex-col w-[130px] 2xl:w-[150px] transition-all animate-in fade-in slide-in-from-left-4 duration-300"
        >
          {/* Header controls */}
          <div className="flex items-center justify-between bg-stone-900 text-stone-200 px-2 py-1 rounded-t-lg text-[9px]">
            <span className="font-semibold uppercase tracking-wider text-amber-300">Quảng Cáo</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowPreview(!showPreview)}
                title="Đổi chế độ xem code/preview"
                className="hover:text-white cursor-pointer"
              >
                <Eye className="w-2.5 h-2.5" />
              </button>
              <button
                onClick={() => setShowLeft(false)}
                title="Đóng quảng cáo"
                className="hover:text-red-300 cursor-pointer ml-0.5"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>

          {/* Banner Container */}
          <div className="w-full h-[580px] bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F2] to-amber-50/50 border border-stone-300/80 rounded-b-lg shadow-md p-2.5 flex flex-col justify-between text-center relative overflow-hidden">
            {/* Background traditional subtle pattern */}
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-20 h-20 rounded-full bg-amber-500/10 pointer-events-none blur-sm" />

            {/* Google AdSense Code Unit (Always rendered for AdSense spider) */}
            <ins
              className="adsbygoogle"
              style={{ display: showPreview ? 'none' : 'block', width: '100%', height: '540px' }}
              data-ad-client={adClient}
              data-ad-slot={leftSlot || '1234567891'}
              data-adtest="on"
              data-ad-format="vertical"
            />

            {showPreview ? (
              <div className="h-full flex flex-col justify-between py-1 relative z-10">
                {/* Top Badge */}
                <div className="space-y-1">
                  <span className="inline-block px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 text-[9px] font-bold border border-amber-300">
                    PHONG THỦY 2026
                  </span>
                  <div className="w-12 h-12 mx-auto rounded-full bg-amber-800 text-amber-100 flex items-center justify-center font-bold text-lg shadow-sm border-2 border-amber-200">
                    福
                  </div>
                  <h4 className="text-[11px] font-bold text-stone-900 leading-tight">
                    Vòng Trầm Hương & Đá Chiêu Tài
                  </h4>
                </div>

                {/* Middle Content */}
                <div className="my-2 space-y-1.5 text-[10px] text-stone-600 leading-tight border-y border-stone-200/80 py-2">
                  <p className="font-medium text-amber-950">Hợp Mệnh 12 Con Giáp</p>
                  <p className="text-[9px] text-stone-500">
                    Khai quang bình an, tẩy uế trừ tà, hóa giải sao hạn Bính Ngọ.
                  </p>
                  <div className="inline-flex items-center gap-1 text-[9px] text-emerald-700 font-semibold">
                    <Sparkles className="w-2.5 h-2.5 text-amber-500" /> Miễn Phí Vận Chuyển
                  </div>
                </div>

                {/* Bottom Call to action */}
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => alert("Đây là banner mô phỏng vị trí quảng cáo bên trái! Khi bạn có đơn vị quảng cáo Google AdSense, banner của Google hoặc đối tác tiếp thị sẽ hiện tại đây.")}
                    className="w-full py-1.5 bg-amber-800 hover:bg-amber-900 text-white text-[10px] font-bold rounded shadow-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Thỉnh Ngay</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                  <span className="text-[8px] text-stone-600 block">
                    Google Ads · ca-pub-4920...
                  </span>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-[10px] text-stone-600 space-y-2">
                <span className="font-mono text-[9px] bg-stone-200 px-1 py-0.5 rounded">data-adtest="on"</span>
                <p>Thẻ vertical adsbygoogle đang kích hoạt.</p>
              </div>
            )}
          </div>
        </aside>
      )}

      {/* RIGHT SKYSCRAPER BANNER (140px / 160px x 600px) */}
      {showRight && (
        <aside
          aria-label="Quảng cáo bên phải"
          className="fixed top-24 right-1.5 xl:right-3 2xl:right-6 z-30 hidden min-[1400px]:flex flex-col w-[130px] 2xl:w-[150px] transition-all animate-in fade-in slide-in-from-right-4 duration-300"
        >
          {/* Header controls */}
          <div className="flex items-center justify-between bg-stone-900 text-stone-200 px-2 py-1 rounded-t-lg text-[9px]">
            <span className="font-semibold uppercase tracking-wider text-amber-300">Tài Trợ</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowPreview(!showPreview)}
                title="Đổi chế độ xem code/preview"
                className="hover:text-white cursor-pointer"
              >
                <Eye className="w-2.5 h-2.5" />
              </button>
              <button
                onClick={() => setShowRight(false)}
                title="Đóng quảng cáo"
                className="hover:text-red-300 cursor-pointer ml-0.5"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>

          {/* Banner Container */}
          <div className="w-full h-[580px] bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F2] to-red-50/50 border border-stone-300/80 rounded-b-lg shadow-md p-2.5 flex flex-col justify-between text-center relative overflow-hidden">
            {/* Background traditional subtle pattern */}
            <div className="absolute top-0 left-0 -ml-6 -mt-6 w-20 h-20 rounded-full bg-red-500/10 pointer-events-none blur-sm" />

            {/* Google AdSense Code Unit */}
            <ins
              className="adsbygoogle"
              style={{ display: showPreview ? 'none' : 'block', width: '100%', height: '540px' }}
              data-ad-client={adClient}
              data-ad-slot={rightSlot || '1234567892'}
              data-adtest="on"
              data-ad-format="vertical"
            />

            {showPreview ? (
              <div className="h-full flex flex-col justify-between py-1 relative z-10">
                {/* Top Badge */}
                <div className="space-y-1">
                  <span className="inline-block px-1.5 py-0.5 rounded bg-red-100 text-red-900 text-[9px] font-bold border border-red-300">
                    LỊCH TẾT ĐỘC BẢN
                  </span>
                  <div className="w-12 h-12 mx-auto rounded-full bg-red-800 text-red-100 flex items-center justify-center font-bold text-lg shadow-sm border-2 border-amber-300">
                    禄
                  </div>
                  <h4 className="text-[11px] font-bold text-stone-900 leading-tight">
                    Lịch Bloc & Sách Tử Vi Bính Ngọ
                  </h4>
                </div>

                {/* Middle Content */}
                <div className="my-2 space-y-1.5 text-[10px] text-stone-600 leading-tight border-y border-stone-200/80 py-2">
                  <p className="font-medium text-red-950">Ưu Đãi Đặt Trước 35%</p>
                  <p className="text-[9px] text-stone-500">
                    Trọn bộ lịch bloc cực đại, cẩm nang xem ngày xuất hành, làm nhà, cưới hỏi.
                  </p>
                  <div className="inline-flex items-center gap-1 text-[9px] text-amber-800 font-semibold">
                    <Sparkles className="w-2.5 h-2.5 text-red-500" /> Tặng Sổ Tử Vi Trọn Đời
                  </div>
                </div>

                {/* Bottom Call to action */}
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => alert("Đây là banner mô phỏng vị trí quảng cáo bên phải! Khi bạn có đơn vị quảng cáo Google AdSense, banner của Google hoặc đối tác tiếp thị sẽ hiện tại đây.")}
                    className="w-full py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-[10px] font-bold rounded shadow-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Xem Ưu Đãi</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                  <span className="text-[8px] text-stone-600 block">
                    Google Ads · ca-pub-4920...
                  </span>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-[10px] text-stone-600 space-y-2">
                <span className="font-mono text-[9px] bg-stone-200 px-1 py-0.5 rounded">data-adtest="on"</span>
                <p>Thẻ vertical adsbygoogle đang kích hoạt.</p>
              </div>
            )}
          </div>
        </aside>
      )}
    </>
  );
};
