import React, { useState } from 'react';
import { SolarDate } from '../types/lunar';
import {
  convertSolar2Lunar,
  convertLunar2Solar,
  getDayDetailedInfo,
} from '../utils/lunarSolarEngine';
import { ArrowRightLeft, Calendar, Sparkles, Check, Clock, Compass } from 'lucide-react';

interface DateConverterProps {
  onGoToDateInCalendar: (date: SolarDate) => void;
}

export const DateConverter: React.FC<DateConverterProps> = ({ onGoToDateInCalendar }) => {
  const today = new Date();
  const [mode, setMode] = useState<'solar2lunar' | 'lunar2solar'>('solar2lunar');

  // Solar input state
  const [solarDay, setSolarDay] = useState(today.getDate());
  const [solarMonth, setSolarMonth] = useState(today.getMonth() + 1);
  const [solarYear, setSolarYear] = useState(today.getFullYear());

  // Lunar input state
  const initialLunar = convertSolar2Lunar(today.getDate(), today.getMonth() + 1, today.getFullYear(), 7);
  const [lunarDay, setLunarDay] = useState(initialLunar.day);
  const [lunarMonth, setLunarMonth] = useState(initialLunar.month);
  const [lunarYear, setLunarYear] = useState(initialLunar.year);
  const [lunarIsLeap, setLunarIsLeap] = useState(initialLunar.isLeap);

  // Conversion error if date is invalid
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Compute calculated target
  const conversionResult = React.useMemo(() => {
    setErrorMsg(null);
    if (mode === 'solar2lunar') {
      try {
        const lunar = convertSolar2Lunar(solarDay, solarMonth, solarYear, 7);
        const detailedInfo = getDayDetailedInfo({ day: solarDay, month: solarMonth, year: solarYear });
        return {
          solar: { day: solarDay, month: solarMonth, year: solarYear },
          lunar,
          detailedInfo,
        };
      } catch {
        setErrorMsg('Ngày dương lịch không hợp lệ.');
        return null;
      }
    } else {
      try {
        const solar = convertLunar2Solar(lunarDay, lunarMonth, lunarYear, lunarIsLeap, 7);
        if (!solar) {
          setErrorMsg('Ngày âm lịch này không tồn tại trong tháng được chọn (hoặc tháng không nhuận).');
          return null;
        }
        const detailedInfo = getDayDetailedInfo(solar);
        return {
          solar,
          lunar: { day: lunarDay, month: lunarMonth, year: lunarYear, isLeap: lunarIsLeap, jd: detailedInfo.lunar.jd },
          detailedInfo,
        };
      } catch {
        setErrorMsg('Không thể chuyển đổi ngày âm lịch này.');
        return null;
      }
    }
  }, [mode, solarDay, solarMonth, solarYear, lunarDay, lunarMonth, lunarYear, lunarIsLeap]);

  // Quick preset helper
  const handleApplyPreset = (type: 'today' | 'tet' | 'ram_thang_gieng' | 'gio_to' | 'trung_thu') => {
    const curYear = new Date().getFullYear();
    if (type === 'today') {
      const now = new Date();
      setSolarDay(now.getDate());
      setSolarMonth(now.getMonth() + 1);
      setSolarYear(now.getFullYear());
      setMode('solar2lunar');
    } else if (type === 'tet') {
      setLunarDay(1);
      setLunarMonth(1);
      setLunarYear(curYear);
      setLunarIsLeap(false);
      setMode('lunar2solar');
    } else if (type === 'ram_thang_gieng') {
      setLunarDay(15);
      setLunarMonth(1);
      setLunarYear(curYear);
      setLunarIsLeap(false);
      setMode('lunar2solar');
    } else if (type === 'gio_to') {
      setLunarDay(10);
      setLunarMonth(3);
      setLunarYear(curYear);
      setLunarIsLeap(false);
      setMode('lunar2solar');
    } else if (type === 'trung_thu') {
      setLunarDay(15);
      setLunarMonth(8);
      setLunarYear(curYear);
      setLunarIsLeap(false);
      setMode('lunar2solar');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header card */}
      <div className="bg-[#FAF7F2] border border-stone-300 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <h2 className="font-editorial text-2xl font-bold text-stone-900">
              Công Cụ Chuyển Đổi Ngày Âm - Dương
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Thuật toán thiên văn Hồ Ngọc Đức (Múi giờ Hà Nội UTC+7), chính xác tuyệt đối từ năm 1900 đến 2100.
            </p>
          </div>

          {/* Mode switch button */}
          <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-lg self-start sm:self-auto">
            <button
              onClick={() => setMode('solar2lunar')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                mode === 'solar2lunar'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Dương → Âm Lịch
            </button>
            <button
              onClick={() => setMode('lunar2solar')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                mode === 'lunar2solar'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Âm → Dương Lịch
            </button>
          </div>
        </div>

        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5 items-end">
          {mode === 'solar2lunar' ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Ngày Dương Lịch
                </label>
                <select
                  value={solarDay}
                  onChange={(e) => setSolarDay(Number(e.target.value))}
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-700"
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      Ngày {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Tháng Dương Lịch
                </label>
                <select
                  value={solarMonth}
                  onChange={(e) => setSolarMonth(Number(e.target.value))}
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-700"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>
                      Tháng {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Năm Dương Lịch
                </label>
                <input
                  type="number"
                  min="1900"
                  max="2100"
                  value={solarYear}
                  onChange={(e) => setSolarYear(Number(e.target.value))}
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-700 tabular-nums"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1">
                  Ngày Âm Lịch
                </label>
                <select
                  value={lunarDay}
                  onChange={(e) => setLunarDay(Number(e.target.value))}
                  className="w-full bg-white border border-amber-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-700"
                >
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      Mùng {d} ({d})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1">
                  Tháng Âm Lịch
                </label>
                <select
                  value={lunarMonth}
                  onChange={(e) => setLunarMonth(Number(e.target.value))}
                  className="w-full bg-white border border-amber-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-700"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>
                      Tháng {m} {m === 1 ? '(Tháng Giêng)' : m === 12 ? '(Tháng Chạp)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-amber-950">
                    Năm Âm Lịch
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-stone-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={lunarIsLeap}
                      onChange={(e) => setLunarIsLeap(e.target.checked)}
                      className="rounded border-stone-300 text-amber-700 focus:ring-0"
                    />
                    <span>Tháng Nhuận</span>
                  </label>
                </div>
                <input
                  type="number"
                  min="1900"
                  max="2100"
                  value={lunarYear}
                  onChange={(e) => setLunarYear(Number(e.target.value))}
                  className="w-full bg-white border border-amber-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:border-amber-700 tabular-nums"
                />
              </div>
            </>
          )}
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-4 mt-4 border-t border-stone-200/70 text-xs">
          <span className="text-stone-500 font-medium">Chọn nhanh:</span>
          <button
            onClick={() => handleApplyPreset('today')}
            className="px-2.5 py-1 bg-white border border-stone-200 hover:bg-stone-100 rounded text-stone-700 cursor-pointer"
          >
            Hôm nay
          </button>
          <button
            onClick={() => handleApplyPreset('tet')}
            className="px-2.5 py-1 bg-white border border-stone-200 hover:bg-stone-100 rounded text-stone-700 cursor-pointer"
          >
            Tết Nguyên Đán (Mùng 1 Tết)
          </button>
          <button
            onClick={() => handleApplyPreset('ram_thang_gieng')}
            className="px-2.5 py-1 bg-white border border-stone-200 hover:bg-stone-100 rounded text-stone-700 cursor-pointer"
          >
            Rằm tháng Giêng
          </button>
          <button
            onClick={() => handleApplyPreset('gio_to')}
            className="px-2.5 py-1 bg-white border border-stone-200 hover:bg-stone-100 rounded text-stone-700 cursor-pointer"
          >
            Giỗ Tổ Hùng Vương (10/3)
          </button>
          <button
            onClick={() => handleApplyPreset('trung_thu')}
            className="px-2.5 py-1 bg-white border border-stone-200 hover:bg-stone-100 rounded text-stone-700 cursor-pointer"
          >
            Tết Trung Thu (15/8)
          </button>
        </div>
      </div>

      {/* Error notification if any */}
      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
          {errorMsg}
        </div>
      )}

      {/* Results View Card */}
      {conversionResult && !errorMsg && (
        <div className="bg-[#FAF7F2] border border-stone-300 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h3 className="font-editorial text-lg font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-700" />
              <span>Kết Quả Tra Cứu & Luận Giải Chi Tiết</span>
            </h3>
            <button
              onClick={() => onGoToDateInCalendar(conversionResult.solar)}
              className="text-xs font-semibold text-red-800 hover:text-red-950 flex items-center gap-1 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Xem trên Lịch Bloc Ngày</span>
            </button>
          </div>

          {/* Visual Pair Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dương lịch Card */}
            <div className="bg-white border border-stone-200 rounded-xl p-5 text-center relative overflow-hidden">
              <div className="text-xs uppercase tracking-wider font-semibold text-stone-500 mb-1">
                DƯƠNG LỊCH (SOLAR)
              </div>
              <div className="text-4xl sm:text-5xl font-bold font-editorial text-stone-900 my-2">
                {conversionResult.solar.day}
              </div>
              <p className="text-sm font-semibold text-stone-700">
                Tháng {conversionResult.solar.month} Năm {conversionResult.solar.year}
              </p>
              <p className="text-xs text-stone-400 mt-1">
                Múi giờ: GMT+7 (Hà Nội, Việt Nam)
              </p>
            </div>

            {/* Âm lịch Card */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-5 text-center relative overflow-hidden">
              <div className="text-xs uppercase tracking-wider font-semibold text-amber-900 mb-1">
                ÂM LỊCH (LUNAR)
              </div>
              <div className="text-4xl sm:text-5xl font-bold font-editorial text-amber-950 my-2">
                {conversionResult.lunar.day}
              </div>
              <p className="text-sm font-semibold text-amber-900">
                Tháng {conversionResult.lunar.month} {conversionResult.lunar.isLeap ? '(Tháng Nhuận)' : ''}
              </p>
              <p className="text-xs text-amber-800 mt-1 font-medium">
                Năm {conversionResult.detailedInfo.canChi.year.name}
              </p>
            </div>
          </div>

          {/* Detailed Astro Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="bg-white p-3.5 rounded-lg border border-stone-200">
              <span className="text-stone-400 block mb-1">Can Chi Ngày:</span>
              <strong className="text-stone-900 text-sm block">
                Ngày {conversionResult.detailedInfo.canChi.day.name}
              </strong>
              <span className="text-stone-500 text-[11px] mt-1 block">
                Tháng {conversionResult.detailedInfo.canChi.month.name}
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-stone-200">
              <span className="text-stone-400 block mb-1">Cát Hung / Hoàng Đạo:</span>
              <strong className="text-stone-900 text-sm block">
                {conversionResult.detailedInfo.hoangDaoName}
              </strong>
              <span className="text-stone-500 text-[11px] mt-1 block">
                Tiết khí: {conversionResult.detailedInfo.tietKhi}
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-stone-200">
              <span className="text-stone-400 block mb-1">Trực & Nhị Thập Bát Tú:</span>
              <strong className="text-stone-900 text-sm block">
                Trực {conversionResult.detailedInfo.truc.name} · Sao {conversionResult.detailedInfo.nhiThapBatTu.name}
              </strong>
              <span className="text-stone-500 text-[11px] mt-1 block">
                {conversionResult.detailedInfo.nhiThapBatTu.quality}
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-stone-200">
              <span className="text-stone-400 block mb-1">Ngũ Hành Nạp Âm:</span>
              <strong className="text-stone-900 text-sm block">
                {conversionResult.detailedInfo.napAm.split('(')[0]}
              </strong>
              <span className="text-stone-500 text-[11px] mt-1 block">
                {conversionResult.detailedInfo.napAm.split('(')[1]?.replace(')', '') || ''}
              </span>
            </div>
          </div>

          {/* Auspicious Hours & Direction in Result */}
          <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 text-xs space-y-3">
            <div className="flex items-center gap-1.5 font-semibold text-stone-800">
              <Clock className="w-4 h-4 text-amber-700" />
              <span>Giờ Hoàng Đạo trong ngày:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {conversionResult.detailedInfo.auspiciousHours
                .filter((h) => h.isAuspicious)
                .map((h, i) => (
                  <span
                    key={i}
                    className="bg-white border border-stone-200 rounded px-2.5 py-1 text-stone-700"
                  >
                    <strong>{h.chi.split(' ')[0]}</strong> ({h.timeRange})
                  </span>
                ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-stone-200/80 text-stone-600">
              <div className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  Hỉ Thần: <strong>{conversionResult.detailedInfo.travelDirection.hiThan}</strong>
                </span>
              </div>
              <div>
                <span>
                  Tài Thần: <strong>{conversionResult.detailedInfo.travelDirection.taiThan}</strong>
                </span>
              </div>
              <div className="text-stone-400">
                <span>Tránh Hạc Thần: {conversionResult.detailedInfo.travelDirection.hacThan}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
