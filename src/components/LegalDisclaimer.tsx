import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface LegalDisclaimerProps {
  className?: string;
  compact?: boolean;
}

export const LegalDisclaimer: React.FC<LegalDisclaimerProps> = ({ className = '', compact = false }) => {
  if (compact) {
    return (
      <div className={`flex items-center gap-2 p-3 bg-amber-50/80 border border-amber-200/90 rounded-lg text-amber-900 text-xs sm:text-sm ${className}`}>
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>Lưu ý pháp lý:</strong> Toàn bộ thông tin chỉ mang tính chất tham khảo, tuyên truyền phổ biến pháp luật và không thay thế văn bản quy phạm pháp luật chính thức hoặc quyết định của cơ quan nhà nước có thẩm quyền.
        </span>
      </div>
    );
  }

  return (
    <div className={`p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-r-xl shadow-xs text-amber-950 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-100 text-amber-700 rounded-lg shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-amber-900 tracking-wide uppercase flex items-center gap-2">
            <span>Khuyến Cáo & Lưu Ý Pháp Lý Quan Trọng</span>
          </h4>
          <p className="text-sm leading-relaxed text-amber-900/90">
            Nội dung hiển thị trên ứng dụng được tổng hợp nhằm mục đích nâng cao nhận thức, hướng dẫn người dân thực hành tín ngưỡng văn minh, đúng pháp luật. Mọi thông tin <strong>chỉ mang tính tham khảo</strong>, không có giá trị thay thế văn bản pháp luật chính thức hoặc kết luận của cơ quan tư pháp, cơ quan nhà nước có thẩm quyền trong từng vụ việc cụ thể.
          </p>
        </div>
      </div>
    </div>
  );
};
