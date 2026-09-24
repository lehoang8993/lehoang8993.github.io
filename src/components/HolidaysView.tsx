import React, { useState, useMemo } from 'react';
import { Holiday, HolidayType } from '../types/lunar';
import { VIETNAMESE_HOLIDAYS } from '../data/holidays';
import { convertLunar2Solar } from '../utils/lunarSolarEngine';
import { Search, Calendar, BookOpen, Utensils, AlertTriangle, ScrollText, Copy, Check, X, Clock } from 'lucide-react';
import festivalsBanner from '../assets/images/festivals_banner_1790151089336.jpg';

interface HolidaysViewProps {
  currentYear: number;
}

export const HolidaysView: React.FC<HolidaysViewProps> = ({ currentYear }) => {
  const [filterType, setFilterType] = useState<'all' | HolidayType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const [copiedPrayer, setCopiedPrayer] = useState(false);

  // Compute actual solar date and days remaining for each holiday this year
  const holidaysWithCalculations = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return VIETNAMESE_HOLIDAYS.map((h) => {
      let solarDate: { day: number; month: number; year: number } | null = null;

      if (h.type === 'solar') {
        solarDate = { day: h.day, month: h.month, year: currentYear };
      } else {
        // Lunar holiday converted to solar date in currentYear
        const s = convertLunar2Solar(h.day, h.month, currentYear, false, 7);
        solarDate = s;
      }

      let daysRemaining: number | null = null;
      if (solarDate) {
        let eventDate = new Date(solarDate.year, solarDate.month - 1, solarDate.day);
        // If event has passed this year, check next year
        if (eventDate.getTime() < today.getTime()) {
          if (h.type === 'solar') {
            eventDate = new Date(solarDate.year + 1, solarDate.month - 1, solarDate.day);
          } else {
            const nextSolar = convertLunar2Solar(h.day, h.month, currentYear + 1, false, 7);
            if (nextSolar) {
              eventDate = new Date(nextSolar.year, nextSolar.month - 1, nextSolar.day);
            }
          }
        }
        const diffMs = eventDate.getTime() - today.getTime();
        daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
      }

      return {
        ...h,
        calculatedSolar: solarDate,
        daysRemaining,
      };
    });
  }, [currentYear]);

  // Filter and search
  const filteredHolidays = useMemo(() => {
    return holidaysWithCalculations.filter((h) => {
      const matchType = filterType === 'all' || h.type === filterType;
      const matchSearch =
        h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.food.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
        h.customs.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchType && matchSearch;
    });
  }, [holidaysWithCalculations, filterType, searchQuery]);

  const handleCopyPrayer = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrayer(true);
    setTimeout(() => setCopiedPrayer(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-amber-900/20 shadow-md bg-stone-900 text-white min-h-[160px] flex flex-col justify-end p-6">
        <img
          src={festivalsBanner}
          alt="Lễ hội truyền thống Việt Nam"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10">
          <div className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1">
            BẢO TỒN NỀN VĂN HÓA DÂN TỘC
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight">
            Các Ngày Lễ & Lễ Hội Trong Năm
          </h2>
          <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-2xl">
            Cẩm nang tra cứu ngày lễ truyền thống Âm lịch, ngày quốc lễ Dương lịch, nguồn gốc lịch sử, phong tục cúng bái và văn khấn cổ truyền.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FAF7F2] border border-stone-300 rounded-xl p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              filterType === 'all'
                ? 'bg-amber-900 text-white'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            Tất cả ({holidaysWithCalculations.length})
          </button>
          <button
            onClick={() => setFilterType('lunar')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              filterType === 'lunar'
                ? 'bg-amber-900 text-white'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            Lễ Âm Lịch
          </button>
          <button
            onClick={() => setFilterType('solar')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              filterType === 'solar'
                ? 'bg-amber-900 text-white'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            Lễ Dương Lịch
          </button>
          <button
            onClick={() => setFilterType('traditional_festival')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              filterType === 'traditional_festival'
                ? 'bg-amber-900 text-white'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            Lễ Hội Dân Gian
          </button>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên lễ, phong tục, món ăn..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-700"
          />
        </div>
      </div>

      {/* Holidays Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHolidays.map((holiday) => {
          return (
            <div
              key={holiday.id}
              className="bg-[#FAF7F2] border border-stone-300 hover:border-amber-600/70 rounded-xl p-5 shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-editorial text-lg font-bold text-stone-900 leading-snug">
                    {holiday.title}
                  </h3>
                  {holiday.isOfficialOffDay && (
                    <span className="text-[10px] uppercase tracking-wider text-rose-800 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded font-semibold shrink-0">
                      Nghỉ Lễ
                    </span>
                  )}
                </div>

                {/* Date Display */}
                <div className="text-xs text-amber-950 font-medium mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  <span>
                    {holiday.type === 'lunar' || holiday.type === 'traditional_festival'
                      ? `Ngày ${holiday.day}/${holiday.month} Âm lịch`
                      : `Ngày ${holiday.day}/${holiday.month} Dương lịch`}
                  </span>
                  {holiday.calculatedSolar && (
                    <span className="text-stone-400">
                      · (DL: {holiday.calculatedSolar.day}/{holiday.calculatedSolar.month})
                    </span>
                  )}
                </div>

                {/* Countdown pill */}
                {holiday.daysRemaining !== null && (
                  <div className="text-[11px] text-stone-500 mb-3 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-stone-400" />
                    <span>
                      {holiday.daysRemaining === 0
                        ? 'Hôm nay là ngày lễ!'
                        : `Còn ${holiday.daysRemaining} ngày nữa`}
                    </span>
                  </div>
                )}

                {/* Short description */}
                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                  {holiday.shortDescription}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setSelectedHoliday(holiday)}
                className="w-full py-2 px-3 text-xs font-semibold text-amber-950 bg-white hover:bg-amber-100/70 border border-stone-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                <span>Xem Chi Tiết & Phong Tục</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal Detail for Selected Holiday */}
      {selectedHoliday && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] border border-stone-300 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative space-y-6">
            {/* Close button */}
            <button
              onClick={() => setSelectedHoliday(null)}
              className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-stone-200 text-stone-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
                {selectedHoliday.type === 'lunar'
                  ? 'LỄ HỘI CỔ TRUYỀN ÂM LỊCH'
                  : selectedHoliday.type === 'solar'
                  ? 'NGÀY LỄ DƯƠNG LỊCH'
                  : 'LỄ HỘI DÂN GIAN VÙNG MIỀN'}
              </div>
              <h3 className="font-editorial text-2xl font-bold text-stone-900">
                {selectedHoliday.title}
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                {selectedHoliday.type === 'lunar' || selectedHoliday.type === 'traditional_festival'
                  ? `Ngày ${selectedHoliday.day}/${selectedHoliday.month} Âm lịch hàng năm`
                  : `Ngày ${selectedHoliday.day}/${selectedHoliday.month} Dương lịch`}
              </p>
            </div>

            {/* Historical Significance */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                <BookOpen className="w-4 h-4 text-amber-800" />
                <span>Nguồn Gốc Lịch Sử & Ý Nghĩa</span>
              </div>
              <p className="text-stone-700 leading-relaxed pl-5">
                {selectedHoliday.historicalSignificance}
              </p>
            </div>

            {/* Customs */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                <ScrollText className="w-4 h-4 text-amber-800" />
                <span>Phong Tục Tập Quán & Nghi Thức</span>
              </div>
              <ul className="list-disc pl-9 text-stone-700 space-y-1 marker:text-amber-700">
                {selectedHoliday.customs.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Traditional Food */}
            {selectedHoliday.food.length > 0 && (
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                  <Utensils className="w-4 h-4 text-amber-800" />
                  <span>Món Ăn Truyền Thống Đặc Trưng</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pl-5">
                  {selectedHoliday.food.map((f, i) => (
                    <span
                      key={i}
                      className="bg-white border border-stone-200 px-2.5 py-1 rounded-md text-stone-800"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Taboos */}
            {selectedHoliday.taboos.length > 0 && (
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-red-900">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Những Điều Kiêng Kỵ Cần Tránh</span>
                </div>
                <ul className="list-disc pl-9 text-stone-700 space-y-1 marker:text-red-500">
                  {selectedHoliday.taboos.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prayer Text if exists */}
            {selectedHoliday.prayerText && (
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-amber-950 font-serif text-sm">
                    {selectedHoliday.prayerText.title}
                  </span>
                  <button
                    onClick={() => handleCopyPrayer(selectedHoliday.prayerText!.content)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-white border border-amber-300 rounded text-amber-900 hover:bg-amber-100/50 cursor-pointer"
                  >
                    {copiedPrayer ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Đã chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép văn khấn</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="font-serif whitespace-pre-wrap text-stone-800 leading-relaxed max-h-48 overflow-y-auto bg-white/70 p-3 rounded border border-amber-200/50 text-[11px]">
                  {selectedHoliday.prayerText.content}
                </pre>
              </div>
            )}

            {/* Footer */}
            <div className="border-t border-stone-200 pt-3 text-right">
              <button
                onClick={() => setSelectedHoliday(null)}
                className="px-4 py-1.5 text-xs font-semibold bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg cursor-pointer"
              >
                Đóng lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
