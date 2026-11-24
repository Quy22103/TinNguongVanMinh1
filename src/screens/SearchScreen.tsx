import React, { useState, useMemo } from 'react';
import { VIOLATIONS_DATA, VIOLATION_CATEGORIES, Violation } from '../data/violations';
import { ViolationCard } from '../components/ViolationCard';
import { ViolationDetailModal } from '../components/ViolationDetailModal';
import { LegalDisclaimer } from '../components/LegalDisclaimer';
import { Search, Filter, X, RotateCcw, AlertCircle, Scale, ShieldAlert, BookOpen } from 'lucide-react';

interface Props {
  initialQuery?: string;
  isLargeFont: boolean;
}

export const SearchScreen: React.FC<Props> = ({ initialQuery = '', isLargeFont }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [selectedPenaltyType, setSelectedPenaltyType] = useState<string>('Tất cả');
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(null);

  // Sync if initialQuery changes
  React.useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  // Filtered and searched data
  const filteredViolations = useMemo(() => {
    return VIOLATIONS_DATA.filter((v) => {
      // Category filter
      if (selectedCategory !== 'Tất cả' && v.nhomLoi !== selectedCategory) {
        return false;
      }
      // Penalty type filter
      if (selectedPenaltyType !== 'Tất cả' && v.loaiCheTai !== selectedPenaltyType) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = v.tenLoi.toLowerCase().includes(query);
        const inCategory = v.nhomLoi.toLowerCase().includes(query);
        const inDesc = v.moTaChiTiet.toLowerCase().includes(query);
        const inArticle = v.dieuKhoan.toLowerCase().includes(query);
        const inLaw = v.tenVanBan.toLowerCase().includes(query);
        const inSituation = v.tinhHuongThucTe.toLowerCase().includes(query);
        const inId = v.id.toLowerCase().includes(query);
        return inTitle || inCategory || inDesc || inArticle || inLaw || inSituation || inId;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedPenaltyType]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Tất cả');
    setSelectedPenaltyType('Tất cả');
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-red-700 block">
              Màn hình 2 • Tra cứu danh mục
            </span>
            <h1 className={`font-black text-stone-900 tracking-tight ${
              isLargeFont ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
            }`}>
              Các Hành Vi Vi Phạm, Mức Phạt & Căn Cứ Pháp Lý
            </h1>
          </div>
          <div className="px-3 py-1.5 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs font-bold">
            Hiển thị: {filteredViolations.length} / {VIOLATIONS_DATA.length} hành vi
          </div>
        </div>
        <p className="text-stone-600 text-sm leading-relaxed max-w-3xl">
          Tra cứu toàn bộ các hành vi mê tín dị đoan và vi phạm nếp sống văn minh theo quy định pháp luật Việt Nam. Mọi mục đều hiển thị rõ ràng <strong>mức phạt tiền thấp nhất - cao nhất</strong>, <strong>hình phạt bổ sung</strong> và <strong>căn cứ pháp lý</strong> chuẩn xác.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên lỗi, hành vi (đốt vàng mã, bói toán, gọi hồn, vỉa hè...), điều khoản hoặc nghị định..."
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-stone-300 focus:border-red-600 focus:ring-2 focus:ring-red-100 text-sm sm:text-base text-stone-900 placeholder-stone-400 font-medium transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
              aria-label="Xóa tìm kiếm"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-600 uppercase tracking-wide">
            <Filter className="w-3.5 h-3.5 text-stone-500" />
            <span>Lọc theo nhóm lĩnh vực:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {VIOLATION_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-red-800 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Penalty Type Filter and Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-600">Loại chế tài:</span>
            {['Tất cả', 'Hành chính', 'Hình sự'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedPenaltyType(type)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  selectedPenaltyType === type
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {(searchQuery || selectedCategory !== 'Tất cả' || selectedPenaltyType !== 'Tất cả') && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-red-700 hover:text-red-900 font-semibold cursor-pointer py-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xóa bộ lọc</span>
            </button>
          )}
        </div>
      </div>

      {/* Violations Cards Grid */}
      {filteredViolations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredViolations.map((violation) => (
            <ViolationCard
              key={violation.id}
              violation={violation}
              onSelect={(v) => setSelectedViolation(v)}
              isLargeFont={isLargeFont}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-10 text-center border border-stone-200 shadow-xs space-y-4">
          <div className="w-14 h-14 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-stone-800">
              Không tìm thấy hành vi phù hợp
            </h3>
            <p className="text-stone-500 text-sm max-w-md mx-auto">
              Không có lỗi vi phạm nào khớp với từ khóa "{searchQuery}" trong bộ dữ liệu. Bạn hãy thử từ khóa khác hoặc bấm nút đặt lại bộ lọc.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-stone-900 text-white text-sm font-semibold rounded-xl hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Đặt lại tất cả bộ lọc
          </button>
        </div>
      )}

      {/* Modal detail */}
      <ViolationDetailModal
        violation={selectedViolation}
        onClose={() => setSelectedViolation(null)}
      />

      {/* Legal Disclaimer at bottom */}
      <LegalDisclaimer />
    </div>
  );
};
