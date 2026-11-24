import React from 'react';
import { LegalDisclaimer } from '../components/LegalDisclaimer';
import { 
  User, 
  Award, 
  Building2, 
  GraduationCap, 
  Users, 
  Globe, 
  Target, 
  CheckCircle, 
  Sparkles,
  ShieldCheck,
  FileCode,
  Heart
} from 'lucide-react';

interface Props {
  isLargeFont: boolean;
}

export const AboutScreen: React.FC<Props> = ({ isLargeFont }) => {
  return (
    <div className="space-y-8 pb-10">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-red-700 block">
          Màn hình 4 • Giới thiệu dự án
        </span>
        <h1 className={`font-black text-stone-900 tracking-tight ${
          isLargeFont ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
        }`}>
          Về Ứng Dụng "Tín Ngưỡng Văn Minh"
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed max-w-3xl">
          Công trình công nghệ thông tin phục vụ cộng đồng, nâng cao nhận thức pháp luật và bài trừ các hủ tục mê tín dị đoan trong đời sống hiện đại.
        </p>
      </div>

      {/* Primary Internship & Student Identification Card */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-red-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-stone-800 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-800/80 text-amber-300 text-xs font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>BÁO CÁO KẾT QUẢ THỰC TẬP</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Thông Tin Sinh Viên & Đề Tài
            </h2>
          </div>
          <div className="text-xs text-stone-400 font-mono">
            Hệ thống: tinnguongvanminh.ai.studio
          </div>
        </div>

        {/* 4 Core Required Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Field 1: Sinh viên */}
          <div className="bg-stone-800/70 border border-stone-700/80 p-5 rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-red-900/60 text-red-400 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-stone-400 block uppercase tracking-wider">
              Sinh viên thực hiện
            </span>
            <div className="text-lg font-black text-white">
              [Trương Văn Quý]
            </div>
          </div>

          {/* Field 2: Mã SV */}
          <div className="bg-stone-800/70 border border-stone-700/80 p-5 rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-900/60 text-amber-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-stone-400 block uppercase tracking-wider">
              Mã sinh viên
            </span>
            <div className="text-lg font-black text-amber-300 font-mono">
              [PH68121]
            </div>
          </div>

          {/* Field 3: Nhóm */}
          <div className="bg-stone-800/70 border border-stone-700/80 p-5 rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-900/60 text-blue-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-stone-400 block uppercase tracking-wider">
              Nhóm nghiên cứu
            </span>
            <div className="text-lg font-black text-white">
              [Nhóm 2]
            </div>
          </div>

          {/* Field 4: Chương trình */}
          <div className="bg-stone-800/70 border border-stone-700/80 p-5 rounded-2xl space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/60 text-emerald-400 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-stone-400 block uppercase tracking-wider">
              Chương trình thực tập
            </span>
            <div className="text-sm font-bold text-white leading-snug">
              Chương trình Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH
            </div>
          </div>
        </div>

        {/* Organizations partnership */}
        <div className="pt-4 border-t border-stone-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-300">
          <div className="flex items-start gap-3 bg-stone-800/40 p-4 rounded-xl border border-stone-700/50">
            <Building2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block text-sm">Trường Cao đẳng FPT Polytechnic</strong>
              <p className="text-stone-400 mt-0.5">Đơn vị đào tạo thực hành - Triết lý "Thực học - Thực nghiệp".</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-stone-800/40 p-4 rounded-xl border border-stone-700/50">
            <Building2 className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block text-sm">Công ty IMTA TECH</strong>
              <p className="text-stone-400 mt-0.5">Doanh nghiệp đồng hành, cố vấn kỹ thuật và hướng dẫn thực tập.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Purpose & Value Proposition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="w-11 h-11 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-stone-900 text-lg">
            Mục Đích & Ý Nghĩa Của Đề Tài
          </h3>
          <ul className="space-y-3 text-stone-700 text-sm leading-relaxed">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Bình dân hóa pháp luật:</strong> Giúp người dân không có kiến thức pháp lý chuyên sâu dễ dàng tra cứu, nắm rõ mức phạt và chế tài đối với các hành vi mê tín dị đoan.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Bảo vệ người dân trước lừa đảo:</strong> Cung cấp căn cứ pháp lý để người dân nhận diện, từ chối và tố giác các hành vi trục lợi tâm linh, dọa dẫm tai ương đòi tiền cúng bái.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Lan tỏa văn hóa đẹp:</strong> Khuyến khích thực hành tín ngưỡng thanh tịnh, tôn trọng an toàn PCCC, bảo vệ cảnh quan di tích và trật tự an toàn xã hội.
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-stone-900 text-lg">
            Đặc Điểm Kỹ Thuật Nổi Bật
          </h3>
          <ul className="space-y-3 text-stone-700 text-sm leading-relaxed">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Trí tuệ nhân tạo có kiểm soát:</strong> Mô hình Gemini chỉ đối chiếu duy nhất với tệp 16 lỗi đã biên soạn; nếu không đủ căn cứ sẽ trả lời trung thực, không tự suy đoán mức phạt.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Kiến trúc an toàn:</strong> Toàn bộ lệnh gọi API AI được bảo vệ nghiêm ngặt ở phía máy chủ Express (server-side), không để lộ khoá API ở trình duyệt.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Khả năng tiếp cận cao:</strong> Giao diện tối ưu cho người lớn tuổi với chế độ phóng to chữ (A+), tương thích hoàn hảo trên điện thoại và máy tính.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Domain and official deployment */}
      <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wide block">
              Tên miền chính thức của ứng dụng
            </span>
            <a
              href="https://tinnguongvanminh.ai.studio/"
              target="_blank"
              rel="noreferrer"
              className="font-mono font-bold text-red-700 hover:text-red-900 text-sm sm:text-base underline"
            >
              https://tinnguongvanminh.ai.studio/
            </a>
          </div>
        </div>
        <div className="text-xs text-stone-500 text-right">
          Bản quyền đề tài © 2026 • Trương Văn Quý
        </div>
      </div>

      {/* Mandatory Legal Disclaimer */}
      <LegalDisclaimer />
    </div>
  );
};
