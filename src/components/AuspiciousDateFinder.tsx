import React, { useState, useMemo } from 'react';
import { SolarDate } from '../types/lunar';
import { convertSolar2Lunar, getDayHoangDao, getDayTruc } from '../utils/lunarSolarEngine';
import { Sparkles, CalendarCheck, ArrowRight } from 'lucide-react';

interface AuspiciousDateFinderProps {
  currentMonth: number;
  currentYear: number;
  onSelectDate: (date: SolarDate) => void;
}

type ActivityType = 'khai_truong' | 'cuoi_hoi' | 'dong_tho' | 'xuat_hanh' | 'ky_hop_dong' | 'nhap_trach';

interface ActivityOption {
  id: ActivityType;
  label: string;
  goodTruc: string[];
  description: string;
}

const ACTIVITIES: ActivityOption[] = [
  {
    id: 'khai_truong',
    label: 'Khai trương, Mở hàng',
    goodTruc: ['Khai', 'Mãn', 'Thành'],
    description: 'Chọn ngày Hoàng Đạo mang lại buôn may bán đắt, tài lộc hanh thông.',
  },
  {
    id: 'cuoi_hoi',
    label: 'Cưới hỏi, Đính hôn',
    goodTruc: ['Thành', 'Định', 'Kiến'],
    description: 'Chọn ngày cát lợi cho nhân duyên trăm năm viên mãn, gia đạo bình an.',
  },
  {
    id: 'dong_tho',
    label: 'Động thổ, Xây dựng',
    goodTruc: ['Kiến', 'Bình', 'Định'],
    description: 'Chọn ngày tốt bắt đầu khởi công, an toàn thuận lợi.',
  },
  {
    id: 'xuat_hanh',
    label: 'Xuất hành, Đi xa',
    goodTruc: ['Kiến', 'Mãn', 'Thành'],
    description: 'Thượng lộ bình an, gặp nhiều may mắn, đắc tài đắc lộc.',
  },
  {
    id: 'ky_hop_dong',
    label: 'Ký hợp đồng, Giao dịch',
    goodTruc: ['Định', 'Thành', 'Mãn'],
    description: 'Đối tác tin cậy, hợp tác đôi bên cùng có lợi bền lâu.',
  },
  {
    id: 'nhap_trach',
    label: 'Nhập trạch, Nhà mới',
    goodTruc: ['Khai', 'Thành', 'Định'],
    description: 'Về nhà mới đón vượng khí, an cư lạc nghiệp thịnh vượng.',
  },
];

export const AuspiciousDateFinder: React.FC<AuspiciousDateFinderProps> = ({
  currentMonth,
  currentYear,
  onSelectDate,
}) => {
  const [selectedActivity, setSelectedActivity] = useState<ActivityType>('khai_truong');

  const daysInMonth = useMemo(() => {
    return new Date(currentYear, currentMonth, 0).getDate();
  }, [currentYear, currentMonth]);

  const activeOption = ACTIVITIES.find((a) => a.id === selectedActivity) || ACTIVITIES[0];

  // Scan all days in the month that match criteria (Hoàng Đạo + good Trực)
  const auspiciousDays = useMemo(() => {
    const list = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const lunar = convertSolar2Lunar(d, currentMonth, currentYear, 7);
      const jd = lunar.jd;
      const dayChiIndex = (jd + 1) % 12;
      const hoangDao = getDayHoangDao(lunar.month, dayChiIndex);
      const truc = getDayTruc(lunar.month, dayChiIndex);

      if (hoangDao.isHoangDao && activeOption.goodTruc.includes(truc.name)) {
        list.push({
          solar: { day: d, month: currentMonth, year: currentYear },
          lunar,
          hoangDaoName: hoangDao.name,
          trucName: truc.name,
        });
      }
    }
    return list;
  }, [currentMonth, currentYear, daysInMonth, activeOption]);

  return (
    <div className="bg-[#FAF7F2] border border-stone-300 rounded-xl p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2">
          <CalendarCheck className="w-5 h-5 text-amber-700" />
          <h3 className="font-editorial text-lg font-bold text-stone-900">
            Tra Cứu Ngày Tốt Khởi Sự Trong Tháng {currentMonth}/{currentYear}
          </h3>
        </div>
        <span className="text-xs text-stone-500">
          Lọc ngày Hoàng Đạo kết hợp Thập Nhị Trực
        </span>
      </div>

      {/* Activity selection chips */}
      <div className="flex flex-wrap gap-1.5">
        {ACTIVITIES.map((act) => (
          <button
            key={act.id}
            onClick={() => setSelectedActivity(act.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedActivity === act.id
                ? 'bg-amber-900 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            {act.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-stone-500 italic">
        {activeOption.description} (Ưu tiên Trực {activeOption.goodTruc.join(', ')})
      </p>

      {/* Result list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
        {auspiciousDays.length > 0 ? (
          auspiciousDays.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onSelectDate(item.solar)}
              className="p-3 bg-white hover:bg-amber-50/70 border border-stone-200 hover:border-amber-600 rounded-lg text-left transition-all group flex items-center justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-stone-900 tabular-nums">
                    Ngày {item.solar.day}/{item.solar.month}
                  </span>
                  <span className="text-xs text-amber-900 font-medium">
                    (ÂL: {item.lunar.day}/{item.lunar.month})
                  </span>
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  Trực {item.trucName} · {item.hoangDaoName.split(' ')[0]}
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-800 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))
        ) : (
          <div className="col-span-full py-4 text-center text-xs text-stone-500">
            Không có ngày thỏa mãn điều kiện hoàn hảo trong tháng này, bạn có thể chuyển tháng tiếp theo.
          </div>
        )}
      </div>
    </div>
  );
};
