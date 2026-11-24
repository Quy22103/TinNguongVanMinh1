import React from 'react';
import { X, ShieldAlert, BookOpen, Lightbulb, AlertCircle, FileText, Scale } from 'lucide-react';
import { Violation } from '../data/violations';
import { LegalDisclaimer } from './LegalDisclaimer';

interface Props {
  violation: Violation | null;
  onClose: () => void;
}

export const ViolationDetailModal: React.FC<Props> = ({ violation, onClose }) => {
  if (!violation) return null;

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-100 bg-stone-50 flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-red-100 text-red-700 tracking-wide">
                MÃ: {violation.id}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                {violation.nhomLoi}
              </span>
              <span className={`px-2 py-0.5 text-xs font-bold rounded-md ${
                violation.loaiCheTai === 'Hình sự' 
                  ? 'bg-rose-600 text-white' 
                  : 'bg-blue-600 text-white'
              }`}>
                {violation.loaiCheTai}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
              {violation.tenLoi}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-full transition-colors shrink-0"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-stone-800 text-sm sm:text-base">
          {/* Mức phạt tiền */}
          <div className="p-4 bg-red-50/80 border border-red-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-red-800 font-bold text-sm tracking-wide uppercase">
              <Scale className="w-5 h-5 text-red-600" />
              <span>Khung Phạt Tiền / Chế Tài Áp Dụng</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-white p-3 rounded-lg border border-red-100 shadow-xs">
                <span className="text-xs text-stone-500 font-medium block">Mức phạt thấp nhất:</span>
                <span className="text-lg font-bold text-red-700">{formatVND(violation.mucPhatThapNhat)}</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-red-100 shadow-xs">
                <span className="text-xs text-stone-500 font-medium block">Mức phạt cao nhất:</span>
                <span className="text-lg font-bold text-red-700">{formatVND(violation.mucPhatCaoNhat)}</span>
              </div>
            </div>
            {violation.loaiCheTai === 'Hình sự' && (
              <p className="text-xs text-red-600 font-medium mt-1">
                * Hành vi này có thể bị truy cứu trách nhiệm hình sự với hình phạt tù có thời hạn hoặc cải tạo không giam giữ.
              </p>
            )}
          </div>

          {/* Hình phạt bổ sung */}
          <div className="space-y-1.5 p-3.5 bg-orange-50/70 border border-orange-200 rounded-xl">
            <div className="flex items-center gap-2 text-orange-900 font-bold text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-orange-600" />
              <span>Hình Phạt Bổ Sung / Biện Pháp Khắc Phục Hậu Quả</span>
            </div>
            <p className="text-stone-800 leading-relaxed font-medium">
              {violation.hinhPhatBoSung}
            </p>
          </div>

          {/* Căn cứ pháp lý */}
          <div className="space-y-2 p-3.5 bg-blue-50/60 border border-blue-200 rounded-xl">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Căn Cứ Pháp Lý Áp Dụng</span>
            </div>
            <div className="space-y-1 text-stone-800">
              <div className="font-semibold text-blue-950 flex items-start gap-1.5">
                <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                <span>{violation.tenVanBan}</span>
              </div>
              <div className="text-sm font-medium text-blue-800 pl-5.5">
                Điều khoản: <strong>{violation.dieuKhoan}</strong>
              </div>
            </div>
          </div>

          {/* Diễn giải chi tiết */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-stone-900 flex items-center gap-2 text-sm uppercase tracking-wide">
              <AlertCircle className="w-4 h-4 text-stone-600" />
              <span>Diễn giải hành vi cho người dân</span>
            </h4>
            <p className="text-stone-700 leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-200/80">
              {violation.moTaChiTiet}
            </p>
          </div>

          {/* Tình huống thực tế */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-stone-900 flex items-center gap-2 text-sm uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Tình huống thực tế đời sống</span>
            </h4>
            <div className="p-3.5 bg-amber-50/50 border border-amber-200/80 rounded-xl text-stone-800 italic leading-relaxed">
              "{violation.tinhHuongThucTe}"
            </div>
          </div>

          {/* Lời khuyên văn minh */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm tracking-wide">
              <Lightbulb className="w-5 h-5 text-emerald-600" />
              <span>Khuyến nghị thực hành tín ngưỡng văn minh</span>
            </div>
            <p className="text-emerald-900/90 leading-relaxed font-medium">
              {violation.khuyenNghiVanMinh}
            </p>
          </div>

          {/* Lưu ý pháp lý */}
          <LegalDisclaimer compact />
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-stone-100 bg-stone-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-lg font-medium text-sm transition-colors cursor-pointer"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
