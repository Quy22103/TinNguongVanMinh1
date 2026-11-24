import React from 'react';
import { Violation } from '../data/violations';
import { Scale, ShieldAlert, BookOpen, ChevronRight, FileText } from 'lucide-react';

interface Props {
  violation: Violation;
  onSelect: (violation: Violation) => void;
  isLargeFont?: boolean;
}

export const ViolationCard: React.FC<Props> = ({ violation, onSelect, isLargeFont = false }) => {
  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
  };

  const isCriminal = violation.loaiCheTai === 'Hình sự';

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-200 hover:shadow-lg flex flex-col justify-between overflow-hidden ${
      isCriminal ? 'border-rose-200 hover:border-rose-300' : 'border-stone-200 hover:border-stone-300'
    }`}>
      {/* Top Tag & Code */}
      <div className="p-5 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-stone-100 text-stone-700">
              {violation.id}
            </span>
            <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
              isCriminal ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {violation.nhomLoi}
            </span>
          </div>
          <span className={`px-2 py-0.5 text-xs font-bold rounded-md ${
            isCriminal ? 'bg-rose-600 text-white' : 'bg-blue-600 text-white'
          }`}>
            {violation.loaiCheTai}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-bold text-stone-900 leading-snug line-clamp-2 ${
          isLargeFont ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
        }`}>
          {violation.tenLoi}
        </h3>
      </div>

      {/* Middle: Penalties & Legal Grounds */}
      <div className="px-5 space-y-3">
        {/* Khung Mức Phạt Tiền */}
        <div className="p-3 bg-red-50/70 border border-red-100 rounded-xl">
          <div className="flex items-center gap-1.5 text-red-800 text-xs font-bold uppercase tracking-wider mb-1">
            <Scale className="w-3.5 h-3.5 text-red-600" />
            <span>Mức Phạt Tiền</span>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="text-xs text-stone-500 block">Thấp nhất:</span>
              <span className={`font-extrabold text-red-700 ${isLargeFont ? 'text-base' : 'text-sm'}`}>
                {formatVND(violation.mucPhatThapNhat)}
              </span>
            </div>
            <span className="text-stone-300 font-light text-lg">→</span>
            <div className="text-right">
              <span className="text-xs text-stone-500 block">Cao nhất:</span>
              <span className={`font-extrabold text-red-700 ${isLargeFont ? 'text-base' : 'text-sm'}`}>
                {formatVND(violation.mucPhatCaoNhat)}
              </span>
            </div>
          </div>
          {isCriminal && (
            <div className="mt-1.5 pt-1.5 border-t border-red-100 text-[11px] font-semibold text-rose-700">
              * Xử lý hình sự: Phạt tù giam theo Bộ luật Hình sự
            </div>
          )}
        </div>

        {/* Hình Phạt Bổ Sung */}
        <div className="text-xs space-y-1">
          <div className="flex items-center gap-1 text-orange-800 font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-orange-600" />
            <span>Hình phạt bổ sung / Khắc phục</span>
          </div>
          <p className="text-stone-700 line-clamp-2 leading-relaxed bg-orange-50/40 p-2 rounded-lg border border-orange-100/60 font-medium">
            {violation.hinhPhatBoSung}
          </p>
        </div>

        {/* Căn Cứ Pháp Lý */}
        <div className="text-xs space-y-1">
          <div className="flex items-center gap-1 text-blue-800 font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Căn cứ pháp lý</span>
          </div>
          <div className="bg-blue-50/40 p-2 rounded-lg border border-blue-100/60 text-stone-800 space-y-0.5">
            <p className="font-semibold text-blue-950 line-clamp-1 flex items-center gap-1">
              <FileText className="w-3 h-3 text-blue-600 shrink-0" />
              <span>{violation.tenVanBan}</span>
            </p>
            <p className="text-blue-900 font-medium pl-4">
              {violation.dieuKhoan}
            </p>
          </div>
        </div>
      </div>

      {/* Button to view details */}
      <div className="p-5 pt-4 mt-2">
        <button
          onClick={() => onSelect(violation)}
          className="w-full py-2.5 px-4 bg-stone-900 hover:bg-red-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer group shadow-xs"
        >
          <span>Xem chi tiết & lời khuyên</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
