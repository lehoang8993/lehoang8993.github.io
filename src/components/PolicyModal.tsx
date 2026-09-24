import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Mail, Info } from 'lucide-react';

export type PolicyTab = 'privacy' | 'terms' | 'contact';

interface PolicyModalProps {
  initialTab?: PolicyTab;
  isOpen: boolean;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  initialTab = 'privacy',
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] border border-stone-300 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col relative animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white/80">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-800" />
            <h2 className="font-editorial text-xl font-bold text-stone-900">
              Thông Tin Pháp Lý & Điều Khoản
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-stone-200 bg-[#F5F1E9] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-2.5 px-2 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'privacy'
                ? 'border-amber-800 text-amber-900'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Chính Sách Bảo Mật (Privacy Policy)</span>
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-2.5 px-2 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'terms'
                ? 'border-amber-800 text-amber-900'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Điều Khoản Sử Dụng (Terms of Service)</span>
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`pb-2.5 px-2 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'contact'
                ? 'border-amber-800 text-amber-900'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Liên Hệ & Hợp Tác Quảng Cáo</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-stone-700 leading-relaxed font-sans flex-1">
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-1">
                  1. Cam Kết Bảo Vệ Quyền Riêng Tư
                </h3>
                <p>
                  Sự riêng tư của người truy cập là một trong những ưu tiên hàng đầu của <strong>Lịch Âm Việt & Tử Vi Trọn Năm</strong>. Văn bản này mô tả rõ ràng các loại thông tin được tiếp nhận, thu thập và cách thức sử dụng khi bạn truy cập website của chúng tôi.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-1">
                  2. Tập Tin Nhật Ký (Log Files)
                </h3>
                <p>
                  Giống như hầu hết các máy chủ web tiêu chuẩn, chúng tôi có thể sử dụng các tệp nhật ký để phân tích xu hướng và quản trị trang web. Các thông tin này bao gồm địa chỉ IP, loại trình duyệt (browser), nhà cung cấp dịch vụ Internet (ISP), ngày/giờ truy cập, các trang giới thiệu/thoát và số lần nhấp chuột. Các thông tin này hoàn toàn ẩn danh và không liên kết với thông tin nhận dạng cá nhân của bạn.
                </p>
              </div>

              <div className="bg-amber-50/70 border border-amber-200/80 p-3.5 rounded-lg space-y-1.5">
                <h3 className="text-sm font-bold text-amber-950 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-800" />
                  <span>3. Cookies & Mạng Quảng Cáo Google AdSense (Bắt buộc theo chuẩn Google)</span>
                </h3>
                <p className="text-stone-800">
                  - <strong>Google</strong>, với tư cách là nhà cung cấp bên thứ ba, sử dụng cookie để phân phát quảng cáo trên website này.
                </p>
                <p className="text-stone-800">
                  - Việc Google sử dụng cookie DART cho phép Google phân phát quảng cáo đến người dùng dựa trên lượt truy cập của họ vào website này cũng như các trang web khác trên Internet.
                </p>
                <p className="text-stone-800">
                  - Người dùng có thể chọn không sử dụng cookie DART bằng cách truy cập chính sách bảo mật của mạng nội dung và quảng cáo Google tại: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-amber-900 font-semibold underline">Chính sách quảng cáo Google</a>.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-1">
                  4. Các Đối Tác Quảng Cáo Bên Thứ Ba & Tiếp Thị Liên Kết
                </h3>
                <p>
                  Một số đối tác quảng cáo hoặc tiếp thị liên kết (như Shopee, Lazada, Accesstrade) có thể sử dụng cookie và web beacon trên trang web của chúng tôi khi bạn nhấp vào liên kết giới thiệu vật phẩm phong thủy, sách tử vi hay lịch Tết. Mỗi đối tác đều có Chính sách bảo mật riêng đối với dữ liệu người dùng.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-1">
                  5. Quyền Riêng Tư Của Trẻ Em
                </h3>
                <p>
                  Chúng tôi không cố ý thu thập bất kỳ thông tin nhận dạng cá nhân nào từ trẻ em dưới 13 tuổi. Nếu bạn tin rằng con bạn đã cung cấp loại thông tin này trên trang web của chúng tôi, vui lòng liên hệ ngay để chúng tôi tiến hành gỡ bỏ kịp thời.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-1">
                  1. Chấp Nhận Điều Khoản
                </h3>
                <p>
                  Bằng việc truy cập và sử dụng website <strong>Lịch Âm Việt</strong>, bạn đồng ý tuân thủ và chịu sự ràng buộc bởi các Điều khoản sử dụng này. Nếu không đồng ý, xin vui lòng ngừng truy cập trang web.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-1">
                  2. Mục Đích Cung Cấp Thông Tin & Miễn Trừ Trách Nhiệm
                </h3>
                <p>
                  - Mọi dữ liệu về <strong>Âm Lịch, Tiết Khí, Can Chi, 12 Trực và Nhị Thập Bát Tú</strong> được tính toán dựa trên các công trình nghiên cứu thiên văn học cổ truyền của TS. Hồ Ngọc Đức theo kinh tuyến Hà Nội.
                </p>
                <p className="mt-1">
                  - Nội dung về <strong>Tử vi 12 con giáp, giờ hoàng đạo, hướng xuất hành và phong thủy</strong> chỉ mang tính chất tham khảo văn hóa dân gian, chiêm nghiệm đời sống, không phải là lời khuyên mang tính pháp lý, y tế hay đầu tư tài chính bắt buộc. Chúng tôi không chịu trách nhiệm đối với các quyết định cá nhân dựa trên các thông tin dự đoán này.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-1">
                  3. Quyền Sở Hữu Trí Tuệ & Sử Dụng Hợp Lý
                </h3>
                <p>
                  Giao diện, mã nguồn, thiết kế đồ họa và hệ thống phân tích ngày lễ được xây dựng độc quyền. Bạn được tự do tra cứu, chia sẻ liên kết phục vụ mục đích phi thương mại hoặc nghiên cứu học tập.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-1">
                  4. Thay Đổi Điều Khoản
                </h3>
                <p>
                  Chúng tôi có quyền điều chỉnh, sửa đổi nội dung điều khoản bất kỳ lúc nào để phù hợp với quy định pháp luật và định hướng phát triển của website.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-1">
                  Thông Tin Ban Quản Trị Website
                </h3>
                <p>
                  Chúng tôi luôn lắng nghe các góp ý của quý độc giả để hoàn thiện thuật toán lịch pháp cũng như chào đón các đối tác truyền thông, nhãn hàng muốn hợp tác quảng cáo hoặc đặt banner tài trợ.
                </p>
              </div>

              <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-900 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Email liên hệ & Đặt quảng cáo:</span>
                    <a
                      href="mailto:lehoang8993@gmail.com"
                      className="font-semibold text-stone-900 hover:text-amber-800 text-sm underline"
                    >
                      lehoang8993@gmail.com
                    </a>
                  </div>
                </div>

                <div className="border-t border-stone-100 pt-3">
                  <span className="text-stone-500 block text-[11px]">Các hình thức hợp tác khả dụng:</span>
                  <ul className="list-disc pl-5 text-stone-700 mt-1 space-y-1">
                    <li>Đặt banner quảng cáo hiển thị chuẩn (Leaderboard 728x90, Chữ nhật 300x250).</li>
                    <li>Tài trợ vị trí độc quyền theo chuyên mục (Tử vi hàng ngày, Lịch vạn niên).</li>
                    <li>Tiếp thị liên kết sản phẩm văn hóa, sách kinh thư, vật phẩm phong thủy hộ mệnh.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs">
          <span className="text-stone-500">
            Cập nhật lần cuối: Tháng 9 Năm 2026
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-semibold bg-stone-900 hover:bg-stone-800 text-white rounded-lg cursor-pointer transition-colors"
          >
            Đã Hiểu & Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
