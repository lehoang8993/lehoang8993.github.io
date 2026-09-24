import React, { useState } from 'react';
import { DayDetailedInfo, SolarDate } from '../types/lunar';
import { jdFromDate, jdToDate } from '../utils/lunarSolarEngine';
import { ChevronLeft, ChevronRight, Clock, Compass, ShieldAlert, Sparkles, AlertCircle, Quote } from 'lucide-react';

interface CalendarDailyBlockProps {
  dayInfo: DayDetailedInfo;
  onSelectDate: (date: SolarDate) => void;
}

export const CalendarDailyBlock: React.FC<CalendarDailyBlockProps> = ({
  dayInfo,
  onSelectDate,
}) => {
  const [showAllHours, setShowAllHours] = useState(false);
  const { solar, lunar, canChi, tietKhi, isHoangDao, hoangDaoName, napAm, auspiciousHours, travelDirection, conflictingAges, goodActivities, badActivities, proverb } = dayInfo;

  // Day of week in Vietnamese
  const dateObj = new Date(solar.year, solar.month - 1, solar.day);
  const dayOfWeekIndex = dateObj.getDay();
  const DAY_OF_WEEK_NAMES = [
    'Chủ Nhật',
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ Sáu',
    'Thứ Bảy',
  ];
  const dayOfWeekName = DAY_OF_WEEK_NAMES[dayOfWeekIndex];
  const isWeekend = dayOfWeekIndex === 0 || dayOfWeekIndex === 6;

  // Step -1 and +1 day
  const handlePrevDay = () => {
    const prevJd = jdFromDate(solar.day, solar.month, solar.year) - 1;
    onSelectDate(jdToDate(prevJd));
  };

  const handleNextDay = () => {
    const nextJd = jdFromDate(solar.day, solar.month, solar.year) + 1;
    onSelectDate(jdToDate(nextJd));
  };

  const hoangDaoHours = auspiciousHours.filter((h) => h.isAuspicious);

  return (
    <div className="bg-[#FCFAF7] border border-stone-300 rounded-xl shadow-md overflow-hidden flex flex-col">
      {/* Top Banner - Traditional Calendar Header */}
      <div className="bg-[#8E1F1F] text-amber-50 px-5 py-3 border-b-2 border-amber-500/40 relative">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevDay}
            className="p-1.5 rounded-full hover:bg-black/20 text-amber-200 transition-colors cursor-pointer"
            title="Ngày trước"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-amber-200 font-medium">
              Tháng {solar.month} Năm {solar.year} Dương Lịch
            </p>
            <p className="text-sm font-semibold tracking-wide text-white">
              Năm {canChi.year.name}
            </p>
          </div>

          <button
            onClick={handleNextDay}
            className="p-1.5 rounded-full hover:bg-black/20 text-amber-200 transition-colors cursor-pointer"
            title="Ngày tiếp theo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Block Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
        {/* Solar & Lunar Central Presentation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center border-b border-stone-200 pb-6">
          {/* Dương lịch (Solar) */}
          <div className="text-center sm:border-r sm:border-stone-200 sm:pr-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1">
              DƯƠNG LỊCH
            </span>
            <div className={`text-6xl sm:text-7xl font-bold font-editorial leading-none tracking-tight my-1 ${isWeekend ? 'text-red-700' : 'text-stone-900'}`}>
              {solar.day}
            </div>
            <div className="text-sm font-semibold text-stone-700 mt-2">
              {dayOfWeekName}
            </div>
            <div className="text-xs text-stone-500 mt-0.5">
              Tháng {solar.month} · Năm {solar.year}
            </div>
          </div>

          {/* Âm lịch (Lunar) */}
          <div className="text-center sm:pl-4 bg-amber-50/70 sm:bg-transparent rounded-lg p-3 sm:p-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 block mb-1">
              ÂM LỊCH
            </span>
            <div className="text-5xl sm:text-6xl font-bold font-editorial leading-none text-amber-950 my-1">
              {lunar.day}
            </div>
            <div className="text-sm font-semibold text-amber-900 mt-2">
              Tháng {lunar.month} {lunar.isLeap ? '(Nhuận)' : ''} ({canChi.month.name})
            </div>
            <div className="text-xs text-amber-800 mt-0.5">
              Ngày {canChi.day.name} · Năm {canChi.year.name}
            </div>
          </div>
        </div>

        {/* Cát Hung Status & Tiết Khí */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-stone-200/80 pb-3">
            <div className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${isHoangDao ? 'bg-emerald-600' : 'bg-stone-500'}`} />
              <span className="font-semibold text-stone-900">{hoangDaoName}</span>
            </div>
            <div className="text-stone-600">
              <span className="text-stone-400">Tiết khí: </span>
              <span className="font-medium text-amber-900">{tietKhi}</span>
            </div>
            <div className="text-stone-600">
              <span className="text-stone-400">Trực: </span>
              <span className="font-medium text-stone-900">{dayInfo.truc.name}</span>
            </div>
          </div>

          {/* Ngũ hành nạp âm */}
          <div className="text-xs text-stone-600 flex items-center justify-between py-1">
            <span className="text-stone-500">Ngũ hành nạp âm:</span>
            <span className="font-medium text-stone-900">{napAm}</span>
          </div>

          {/* Nhị thập bát tú */}
          <div className="text-xs text-stone-600 flex items-center justify-between py-1">
            <span className="text-stone-500">Sao trực (28 sao):</span>
            <span className="font-medium text-stone-900">
              Sao {dayInfo.nhiThapBatTu.name} ({dayInfo.nhiThapBatTu.quality})
            </span>
          </div>
        </div>

        {/* Giờ Hoàng Đạo Section */}
        <div className="bg-stone-100/80 rounded-lg p-3.5 border border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800">
              <Clock className="w-4 h-4 text-amber-700" />
              <span>Giờ Hoàng Đạo ({hoangDaoHours.length} giờ cát)</span>
            </div>
            <button
              onClick={() => setShowAllHours(!showAllHours)}
              className="text-xs text-amber-800 hover:text-amber-950 font-medium underline cursor-pointer"
            >
              {showAllHours ? 'Thu gọn' : 'Xem đủ 12 giờ'}
            </button>
          </div>

          {!showAllHours ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
              {hoangDaoHours.map((h, i) => (
                <div
                  key={i}
                  className="bg-white/90 border border-stone-200/80 rounded px-2 py-1 text-stone-800"
                >
                  <span className="font-semibold text-amber-950">{h.chi.split(' ')[0]}</span>
                  <span className="text-[11px] text-stone-500 block">{h.timeRange}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs mt-2 max-h-48 overflow-y-auto pr-1">
              {auspiciousHours.map((h, i) => (
                <div
                  key={i}
                  className={`border rounded px-2 py-1 ${
                    h.isAuspicious
                      ? 'bg-amber-50/90 border-amber-200/80 text-stone-900'
                      : 'bg-stone-50/70 border-stone-200 text-stone-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-stone-900">{h.chi.split(' ')[0]}</span>
                    <span className={`text-[10px] font-semibold ${h.isAuspicious ? 'text-emerald-700' : 'text-stone-400'}`}>
                      {h.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-500 block">{h.timeRange}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hướng Xuất Hành & Tuổi Xung */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-white rounded-lg border border-stone-200">
            <div className="flex items-center gap-1 font-semibold text-stone-800 mb-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-700" />
              <span>Hướng Xuất Hành</span>
            </div>
            <p className="text-stone-600">
              <span className="text-stone-500">Hỉ Thần: </span>
              <strong className="text-stone-800 font-semibold">{travelDirection.hiThan}</strong>
            </p>
            <p className="text-stone-600 mt-0.5">
              <span className="text-stone-500">Tài Thần: </span>
              <strong className="text-emerald-700 font-semibold">{travelDirection.taiThan}</strong>
            </p>
            <p className="text-stone-400 text-[11px] mt-0.5">
              Hạc Thần (tránh): {travelDirection.hacThan}
            </p>
          </div>

          <div className="p-3 bg-white rounded-lg border border-stone-200">
            <div className="flex items-center gap-1 font-semibold text-stone-800 mb-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-red-700" />
              <span>Tuổi Xung Khắc</span>
            </div>
            <p className="text-stone-700 leading-tight">
              {conflictingAges.slice(0, 3).join(', ')}
            </p>
            <p className="text-[11px] text-stone-400 mt-1">
              Người tuổi xung nên giữ thái độ khiêm nhường.
            </p>
          </div>
        </div>

        {/* Việc nên làm & Việc kiêng cữ */}
        <div className="space-y-2 text-xs border-t border-stone-200 pt-3">
          <div>
            <div className="flex items-center gap-1 text-emerald-800 font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Việc nên làm:</span>
            </div>
            <ul className="text-stone-600 space-y-0.5 pl-4 list-disc marker:text-emerald-500">
              {goodActivities.map((act, idx) => (
                <li key={idx}>{act}</li>
              ))}
            </ul>
          </div>

          <div className="pt-1">
            <div className="flex items-center gap-1 text-red-800 font-semibold mb-1">
              <AlertCircle className="w-3.5 h-3.5 text-red-600" />
              <span>Việc kiêng kỵ:</span>
            </div>
            <ul className="text-stone-600 space-y-0.5 pl-4 list-disc marker:text-red-400">
              {badActivities.map((act, idx) => (
                <li key={idx}>{act}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ca dao, Tục ngữ Việt Nam */}
        <div className="bg-amber-50/60 rounded-lg p-3 border border-amber-200/60 text-xs">
          <div className="flex items-start gap-2">
            <Quote className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="italic font-serif text-stone-800 text-[13px] leading-relaxed">
                "{proverb.text}"
              </p>
              <p className="text-[11px] text-amber-900 font-medium text-right mt-1">
                — {proverb.authorOrSource}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
