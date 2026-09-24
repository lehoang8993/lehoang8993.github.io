import React, { useState } from 'react';
import { SolarDate, DayDetailedInfo } from '../types/lunar';
import { ZODIAC_SIGNS, calculateDailyHoroscope } from '../data/horoscope';
import { Star, Sparkles, TrendingUp, DollarSign, Heart, Activity, Compass, Calendar } from 'lucide-react';
import astrologyBanner from '../assets/images/astrology_banner_1790151099720.jpg';

interface DailyHoroscopeViewProps {
  selectedDate: SolarDate;
  dayInfo: DayDetailedInfo;
  onSelectDate: (date: SolarDate) => void;
}

export const DailyHoroscopeView: React.FC<DailyHoroscopeViewProps> = ({
  selectedDate,
  dayInfo,
  onSelectDate,
}) => {
  const [selectedZodiacId, setSelectedZodiacId] = useState('thin'); // Default to Dragon / Thìn
  const horoscope = calculateDailyHoroscope(selectedZodiacId, selectedDate, dayInfo);
  const activeSign = ZODIAC_SIGNS.find((z) => z.id === selectedZodiacId) || ZODIAC_SIGNS[0];

  const renderStars = (score: number) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < score ? 'text-amber-500 fill-amber-500' : 'text-stone-300'
            }`}
          />
        ))}
        <span className="text-xs font-semibold text-stone-700 ml-1 tabular-nums">
          {score}/5
        </span>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner Card */}
      <div className="relative rounded-2xl overflow-hidden border border-amber-900/20 shadow-md bg-stone-900 text-white min-h-[160px] flex flex-col justify-end p-6">
        <img
          src={astrologyBanner}
          alt="Bản đồ sao Tử Vi 12 Con Giáp"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10">
          <div className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1">
            TỬ VI ĐẨU SỐ & BÁT TỰ PHƯƠNG ĐÔNG
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight">
            Tử Vi 12 Con Giáp Hàng Ngày
          </h2>
          <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-2xl">
            Luận giải cát hung về công danh sự nghiệp, tài vận, tình duyên và sức khỏe theo can chi ngày {dayInfo.canChi.day.name} (Ngày {selectedDate.day}/{selectedDate.month}/{selectedDate.year} Dương lịch).
          </p>
        </div>
      </div>

      {/* 12 Zodiac Animal Selector Grid */}
      <div className="bg-[#FAF7F2] border border-stone-300 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3 border-b border-stone-200/80 pb-2">
          <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
            Chọn con giáp bản mệnh của bạn
          </span>
          <span className="text-xs text-stone-500">
            Xem ngày: {selectedDate.day}/{selectedDate.month}/{selectedDate.year}
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {ZODIAC_SIGNS.map((sign) => {
            const isSelected = sign.id === selectedZodiacId;
            return (
              <button
                key={sign.id}
                onClick={() => setSelectedZodiacId(sign.id)}
                className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-100 border-amber-700 ring-1 ring-amber-700 shadow-xs'
                    : 'bg-white hover:bg-stone-100 border-stone-200'
                }`}
              >
                <div className="font-editorial text-lg font-bold text-stone-900 leading-none">
                  {sign.name}
                </div>
                <div className="text-xs text-amber-900 font-medium mt-0.5">
                  ({sign.animalNameVi})
                </div>
                <div className="text-[10px] text-stone-500 mt-1">
                  Mệnh {sign.element}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Reading Section for Selected Zodiac */}
      <div className="bg-[#FAF7F2] border border-stone-300 rounded-xl p-6 shadow-sm space-y-6">
        {/* Header of reading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-900 text-amber-100 flex items-center justify-center font-editorial text-2xl font-bold shadow-xs">
              {activeSign.name}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-editorial text-2xl font-bold text-stone-900">
                  Tuổi {activeSign.name} ({activeSign.animalNameVi})
                </h3>
                <span className="text-xs text-amber-900 bg-amber-100 px-2 py-0.5 rounded font-medium">
                  {activeSign.element} · {activeSign.yinYang}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Các năm sinh tiêu biểu: {activeSign.years.join(', ')}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-stone-500 block mb-1">Đánh giá chung hôm nay</span>
            {renderStars(horoscope.scoreOverall)}
          </div>
        </div>

        {/* Overview Summary Box */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-950 mb-1">
                Tổng Quan Vận Trình
              </h4>
              <p className="text-sm text-stone-800 leading-relaxed font-sans">
                {horoscope.summary}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Daily Fortune */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sự nghiệp */}
          <div className="bg-white border border-stone-200 rounded-xl p-4.5 space-y-2">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-700" />
                <span className="font-semibold text-sm text-stone-900">Công Danh Sự Nghiệp</span>
              </div>
              {renderStars(horoscope.careerScore)}
            </div>
            <p className="text-xs text-stone-600 leading-relaxed pt-1">
              {horoscope.careerAdvice}
            </p>
          </div>

          {/* Tài lộc */}
          <div className="bg-white border border-stone-200 rounded-xl p-4.5 space-y-2">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-700" />
                <span className="font-semibold text-sm text-stone-900">Tài Vận Tiền Bạc</span>
              </div>
              {renderStars(horoscope.wealthScore)}
            </div>
            <p className="text-xs text-stone-600 leading-relaxed pt-1">
              {horoscope.wealthAdvice}
            </p>
          </div>

          {/* Tình duyên */}
          <div className="bg-white border border-stone-200 rounded-xl p-4.5 space-y-2">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-600" />
                <span className="font-semibold text-sm text-stone-900">Tình Duyên Gia Đạo</span>
              </div>
              {renderStars(horoscope.loveScore)}
            </div>
            <p className="text-xs text-stone-600 leading-relaxed pt-1">
              {horoscope.loveAdvice}
            </p>
          </div>

          {/* Sức khỏe */}
          <div className="bg-white border border-stone-200 rounded-xl p-4.5 space-y-2">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-700" />
                <span className="font-semibold text-sm text-stone-900">Sức Khỏe Thể Chất</span>
              </div>
              {renderStars(horoscope.healthScore)}
            </div>
            <p className="text-xs text-stone-600 leading-relaxed pt-1">
              {horoscope.healthAdvice}
            </p>
          </div>
        </div>

        {/* Lucky Indicators Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-t border-stone-200 pt-4">
          <div className="p-3 bg-white rounded-lg border border-stone-200 text-center">
            <span className="text-stone-400 block mb-1">Con số may mắn:</span>
            <span className="text-base font-bold text-amber-950 tabular-nums">
              {horoscope.luckyNumbers.join(' · ')}
            </span>
          </div>

          <div className="p-3 bg-white rounded-lg border border-stone-200 text-center">
            <span className="text-stone-400 block mb-1">Màu sắc cát tường:</span>
            <span className="text-sm font-semibold text-stone-800">
              {horoscope.luckyColors.join(', ')}
            </span>
          </div>

          <div className="p-3 bg-white rounded-lg border border-stone-200 text-center">
            <span className="text-stone-400 block mb-1">Quý nhân tương trợ:</span>
            <span className="text-sm font-semibold text-emerald-800">
              Tuổi {horoscope.compatibleZodiac}
            </span>
          </div>

          <div className="p-3 bg-white rounded-lg border border-stone-200 text-center">
            <span className="text-stone-400 block mb-1">Cẩn trọng tuổi xung:</span>
            <span className="text-sm font-semibold text-rose-700">
              Tuổi {horoscope.incompatibleZodiac}
            </span>
          </div>
        </div>

        {/* Quick Date Switcher for Horoscope */}
        <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-200/80">
          <span>Xem ngày khác:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const today = new Date();
                onSelectDate({ day: today.getDate(), month: today.getMonth() + 1, year: today.getFullYear() });
              }}
              className="text-stone-700 hover:text-stone-900 underline cursor-pointer"
            >
              Hôm nay
            </button>
            <span>·</span>
            <button
              onClick={() => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                onSelectDate({ day: tomorrow.getDate(), month: tomorrow.getMonth() + 1, year: tomorrow.getFullYear() });
              }}
              className="text-stone-700 hover:text-stone-900 underline cursor-pointer"
            >
              Ngày mai
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
