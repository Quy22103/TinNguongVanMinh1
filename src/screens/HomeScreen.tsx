import React, { useState } from 'react';
import { ScreenId } from '../types';
import { 
  Search, 
  Flame, 
  HelpCircle, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  BookOpen,
  Scale,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { LegalDisclaimer } from '../components/LegalDisclaimer';

interface Props {
  onNavigate: (screen: ScreenId) => void;
  onSearchQuery: (query: string) => void;
  isLargeFont: boolean;
}

export const HomeScreen: React.FC<Props> = ({ onNavigate, onSearchQuery, isLargeFont }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearchQuery(searchTerm.trim());
      onNavigate('search');
    } else {
      onNavigate('search');
    }
  };

  const popularKeywords = [
    'Đốt vàng mã',
    'Bói toán',
    'Trục vong thu phí',
    'Bùa ngải',
    'Lấn chiếm vỉa hè cúng',
    'Ném tiền lẻ vào giếng',
    'Livestream bói online',
    'Cướp lộc hoa tre',
    'Đập phá mồ mả',
  ];

  const handleQuickKeyword = (kw: string) => {
    setSearchTerm(kw);
    onSearchQuery(kw);
    onNavigate('search');
  };

  return (
    <div className="space-y-12 pb-8">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-stone-900 to-red-950 text-white rounded-3xl p-6 sm:p-10 lg:p-14 shadow-2xl border border-stone-800">
        {/* Subtle decorative background patterns */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-900/60 border border-red-700/60 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Chương trình Phổ biến Pháp luật Tín ngưỡng Cộng đồng</span>
          </div>

          <h1 className={`font-black tracking-tight text-white leading-tight ${
            isLargeFont ? 'text-3xl sm:text-5xl lg:text-6xl' : 'text-2xl sm:text-4xl lg:text-5xl'
          }`}>
            Thực Hành Tín Ngưỡng Văn Minh, Đúng Pháp Luật
          </h1>

          <p className={`text-stone-300 max-w-2xl mx-auto leading-relaxed font-normal ${
            isLargeFont ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
          }`}>
            Dành cho mọi công dân. Tra cứu nhanh chóng các hành vi vi phạm, khung phạt tiền, hình phạt bổ sung và tư vấn tình huống thực tế bằng trí tuệ nhân tạo.
          </p>

          {/* Prominent Search Bar (Màn hình 1 có ô tìm kiếm) */}
          <form 
            onSubmit={handleSearchSubmit}
            className="pt-2 max-w-2xl mx-auto"
          >
            <div className="relative flex items-center shadow-xl rounded-2xl bg-white p-2 border-2 border-amber-400/80 focus-within:border-amber-400 focus-within:ring-4 focus-within:ring-amber-400/30 transition-all">
              <div className="pl-3 pr-2 text-stone-400">
                <Search className="w-6 h-6 text-red-700" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nhập hành vi cần tra cứu (ví dụ: đốt vàng mã, bói toán, cúng lấn vỉa hè...)"
                className="w-full py-2.5 px-2 text-stone-900 placeholder-stone-400 text-sm sm:text-base font-medium focus:outline-hidden"
              />
              <button
                type="submit"
                className="shrink-0 px-5 sm:px-7 py-3 bg-gradient-to-r from-red-700 to-amber-700 hover:from-red-800 hover:to-amber-800 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <span>Tra cứu</span>
                <ArrowRight className="w-4 h-4 hidden sm:inline" />
              </button>
            </div>
          </form>

          {/* Quick Keywords Chips */}
          <div className="pt-2 space-y-2">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              Gợi ý tìm kiếm phổ biến:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {popularKeywords.map((kw) => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => handleQuickKeyword(kw)}
                  className="px-3 py-1 bg-stone-800/80 hover:bg-stone-700 text-stone-200 hover:text-white rounded-lg text-xs font-medium border border-stone-700 transition-colors cursor-pointer"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS & ACTION CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1 */}
        <div 
          onClick={() => onNavigate('search')}
          className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md hover:border-red-300 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className={`font-bold text-stone-900 group-hover:text-red-700 transition-colors ${
              isLargeFont ? 'text-xl' : 'text-lg'
            }`}>
              Bộ Dữ Liệu 16 Lỗi Vi Phạm
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Tổng hợp đầy đủ khung phạt tiền từ 200.000đ đến 100.000.000đ, hình phạt bổ sung và căn cứ pháp lý từ Nghị định 38, 144, 15 và Bộ luật Hình sự.
            </p>
          </div>
          <div className="pt-4 flex items-center gap-1.5 text-sm font-bold text-red-700 group-hover:translate-x-1 transition-transform">
            <span>Khám phá danh mục</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 2 */}
        <div 
          onClick={() => onNavigate('consult')}
          className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className={`font-bold text-amber-950 group-hover:text-amber-800 transition-colors ${
              isLargeFont ? 'text-xl' : 'text-lg'
            }`}>
              Hỏi Đáp Tình Huống AI
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed">
              Mô tả tình huống bạn gặp phải bằng lời văn đời thường. Trí tuệ nhân tạo Gemini sẽ đối chiếu chính xác với cơ sở dữ liệu pháp luật.
            </p>
          </div>
          <div className="pt-4 flex items-center gap-1.5 text-sm font-bold text-amber-800 group-hover:translate-x-1 transition-transform">
            <span>Hỏi đáp tình huống ngay</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 3 */}
        <div 
          onClick={() => onNavigate('references')}
          className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className={`font-bold text-stone-900 group-hover:text-blue-700 transition-colors ${
              isLargeFont ? 'text-xl' : 'text-lg'
            }`}>
              Nguồn Văn Bản Pháp Luật
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Minh bạch 100% nguồn tham khảo với các nghị định Chính phủ, luật chuyên ngành và điều khoản cụ thể để bạn kiểm chứng.
            </p>
          </div>
          <div className="pt-4 flex items-center gap-1.5 text-sm font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
            <span>Xem danh mục văn bản</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </section>

      {/* COMPARISON SECTION: Tín ngưỡng văn minh vs Mê tín dị đoan */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200 shadow-sm space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-700">
            Phân Biệt Ranh Giới Pháp Luật
          </span>
          <h2 className={`font-black text-stone-900 ${
            isLargeFont ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
          }`}>
            Tín Ngưỡng Đẹp Truyền Thống Khác Gì Mê Tín Dị Đoan?
          </h2>
          <p className="text-stone-600 text-sm">
            Nhiều người dân vì thiếu thông tin pháp lý đã vô tình tiếp tay cho các đối tượng lừa đảo hoặc vi phạm nếp sống văn minh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Tín ngưỡng văn minh */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-900 font-bold text-base sm:text-lg">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <span>Thực Hành Tín Ngưỡng Văn Minh (Được Pháp Luật Bảo Hộ)</span>
            </div>
            <ul className="space-y-3 text-stone-800 text-sm font-medium">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>Thờ cúng tổ tiên, tưởng nhớ công đức tiền nhân với tấm lòng thành kính, trang nghiêm.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>Hạn chế tối đa đốt vàng mã; nếu đốt thì tuân thủ đúng lò hóa sớ quy định an toàn PCCC.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>Đặt tiền công đức đúng hòm giọt dầu; giữ gìn vệ sinh và cảnh quan thanh tịnh nơi thờ tự.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>Tham gia lễ hội văn hóa trật tự, tôn trọng không gian chung của cộng đồng.</span>
              </li>
            </ul>
          </div>

          {/* Mê tín dị đoan */}
          <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-rose-900 font-bold text-base sm:text-lg">
              <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
              <span>Hành Vi Mê Tín Dị Đoan (Bị Xử Phạt Hoặc Xử Lý Hình Sự)</span>
            </div>
            <ul className="space-y-3 text-stone-800 text-sm font-medium">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                <span>Hành nghề bói toán, gieo quẻ, phán vận hạn, gọi vong, trục tà ma để thu tiền người khác.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                <span>Dọa nạt tai ương, bán bùa ngải, yêu cầu nộp tiền hàng chục triệu để giải nghiệp tiền kiếp.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                <span>Đốt vàng mã ngút trời ở ban công, hành lang gây nguy cơ cháy nổ chết người.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                <span>Bày bàn thờ lấn chiếm vỉa hè cản trở giao thông; livestream bói toán hoang đường trên mạng.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* BANNER KHUYẾN NGHỊ VĂN HÓA */}
      <section className="bg-gradient-to-r from-red-800 to-amber-800 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-black">
            Bạn Đang Băn Khoăn Về Một Tình Huống Cụ Thể?
          </h3>
          <p className="text-stone-200 text-sm max-w-xl">
            Hãy sử dụng trợ lý hỏi đáp AI để được đối chiếu ngay với 16 hành vi vi phạm chuẩn theo pháp luật Việt Nam.
          </p>
        </div>
        <button
          onClick={() => onNavigate('consult')}
          className="shrink-0 px-6 py-3.5 bg-white text-red-900 hover:bg-stone-100 font-bold rounded-xl text-sm sm:text-base shadow-md transition-all cursor-pointer flex items-center gap-2"
        >
          <span>Hỏi đáp tình huống ngay</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Mandatory Legal Disclaimer */}
      <LegalDisclaimer />
    </div>
  );
};
