import React, { useEffect, useState } from 'react';
import { ExternalLink, Sparkles, Eye, CheckCircle2 } from 'lucide-react';

interface AdBannerProps {
  slotType: 'leaderboard' | 'rectangle' | 'horizontal';
  className?: string;
  adClient?: string; // e.g. "ca-pub-4920887314704074"
  adSlot?: string;   // e.g. "1234567890"
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slotType,
  className = '',
  adClient = 'ca-pub-4920887314704074',
  adSlot,
}) => {
  const [showSimulatedAd, setShowSimulatedAd] = useState(true);

  useEffect(() => {
    if (adClient) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense script status:', err);
      }
    }
  }, [adClient, adSlot]);

  // Size constraints based on standard IAB ad dimensions
  const getContainerStyle = () => {
    switch (slotType) {
      case 'leaderboard':
        return 'w-full min-h-[90px] max-w-[728px] mx-auto';
      case 'rectangle':
        return 'w-full max-w-[336px] min-h-[250px] sm:min-h-[280px] mx-auto';
      case 'horizontal':
        return 'w-full min-h-[100px] max-w-[970px] mx-auto';
    }
  };

  return (
    <div className={`my-4 overflow-hidden rounded-xl transition-all ${className}`}>
      {/* Top tiny label required by Google AdSense and advertising regulations */}
      <div className="flex items-center justify-between max-w-[728px] mx-auto px-1 mb-1.5 text-[10px] text-stone-500">
        <div className="flex items-center gap-1.5">
          <span className="uppercase tracking-widest font-semibold text-stone-600">
            Quảng Cáo Google / Tài Trợ
          </span>
          <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-medium text-[9px] flex items-center gap-0.5">
            <CheckCircle2 className="w-2.5 h-2.5" /> ca-pub-4920887314704074
          </span>
        </div>

        <button
          onClick={() => setShowSimulatedAd(!showSimulatedAd)}
          className="text-stone-600 hover:text-amber-800 underline flex items-center gap-1 cursor-pointer transition-colors"
          title="Chuyển đổi giữa chế độ xem thử quảng cáo mẫu và chế độ mã thẻ AdSense"
        >
          <Eye className="w-3 h-3" />
          <span>{showSimulatedAd ? 'Xem mã thẻ kỹ thuật' : 'Xem trước banner mẫu'}</span>
        </button>
      </div>

      <div
        className={`${getContainerStyle()} border border-stone-200/90 bg-white rounded-xl overflow-hidden relative shadow-xs flex flex-col justify-between`}
      >
        {/* Real Google AdSense Tag (always rendered so Google crawler detects it, with data-adtest="on" for test safety) */}
        <ins
          className="adsbygoogle"
          style={{ display: showSimulatedAd ? 'none' : 'block' }}
          data-ad-client={adClient}
          data-ad-slot={adSlot || '1234567890'}
          data-adtest="on"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />

        {showSimulatedAd ? (
          /* Realistic Google Ad Preview (Mô phỏng chân thực hiển thị quảng cáo) */
          slotType === 'rectangle' ? (
            /* 300x250 Medium Rectangle Demo */
            <div className="p-4 bg-gradient-to-br from-amber-50/80 via-white to-stone-50 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    囍
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 font-medium block">Tài Trợ Phong Thủy</span>
                    <h4 className="text-xs font-bold text-stone-900 line-clamp-1">Vòng Trầm Hương & Đá Hộ Mệnh 2026</h4>
                  </div>
                </div>
                <span className="text-[9px] px-1 py-0.5 border border-stone-200 text-stone-600 rounded bg-white">Ad</span>
              </div>

              <div className="my-2 text-[11px] text-stone-600 leading-snug">
                Khám phá vật phẩm phong thủy hợp Can Chi ngày hôm nay. Trợ mệnh bình an, chiêu tài lộc cho gia chủ 12 con giáp.
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> Miễn phí xem mệnh
                </span>
                <button
                  type="button"
                  onClick={() => alert("Đây là bản demo xem trước quảng cáo! Khi website được Google AdSense duyệt chính thức, quảng cáo thật của Google sẽ hiển thị tại đây.")}
                  className="px-3 py-1 bg-amber-800 hover:bg-amber-900 text-white text-[11px] font-semibold rounded-lg shadow-xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Tìm Hiểu Ngay</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          ) : (
            /* 728x90 Leaderboard / Horizontal Banner Demo */
            <div className="p-3 bg-gradient-to-r from-stone-50 via-amber-50/60 to-white h-full flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-800 text-amber-100 flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                  2026
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] px-1 py-0.5 border border-stone-300 text-stone-600 rounded bg-white font-medium">Ad</span>
                    <h4 className="text-xs font-bold text-stone-900">Lịch Bloc & Sách Tử Vi Bính Ngọ 2026 Trọn Đời</h4>
                  </div>
                  <p className="text-[11px] text-stone-600 line-clamp-1 mt-0.5">
                    Đặt trước ấn phẩm Lịch Vạn Niên cao cấp, cẩm nang xem ngày tốt xấu, xuất hành đầu xuân.
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert("Đây là bản demo xem trước quảng cáo! Khi website được Google AdSense duyệt chính thức, quảng cáo thật của Google sẽ hiển thị tại đây.")}
                  className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>Xem Chi Tiết</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          )
        ) : (
          /* Technical Tag State */
          <div className="p-4 flex flex-col items-center justify-center text-center space-y-2 h-full bg-stone-50">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-stone-200 text-stone-800 rounded text-[11px] font-mono">
              data-ad-client="{adClient}" (data-adtest="on")
            </div>
            <p className="text-xs text-stone-600 max-w-md">
              Thẻ <code>&lt;ins class="adsbygoogle"&gt;</code> đang hoạt động ngầm. Khi Google duyệt tên miền của bạn, banner quảng cáo tự động sẽ được đẩy vào đây.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
