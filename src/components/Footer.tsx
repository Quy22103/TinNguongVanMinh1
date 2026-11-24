import React from 'react';
import { ScreenId } from '../types';
import { Scale, Heart, Shield } from 'lucide-react';
import { LegalDisclaimer } from './LegalDisclaimer';

interface Props {
  onNavigate: (screen: ScreenId) => void;
}

export const Footer: React.FC<Props> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mandatory Legal Disclaimer Box in Footer */}
        <div className="mb-10">
          <LegalDisclaimer />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-sm">
          {/* Col 1: Brand & Domain */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-700 flex items-center justify-center text-white">
                <Scale className="w-5 h-5" />
              </div>
              <span className="font-bold text-white text-base">Tín Ngưỡng Văn Minh</span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Ứng dụng phổ biến giáo dục pháp luật, hỗ trợ người dân thực hành tín ngưỡng tôn giáo văn minh, lành mạnh và tuân thủ pháp luật Việt Nam.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Các Chuyên Mục</h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Trang chủ & Tra cứu nhanh
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('search')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Danh mục 16 lỗi vi phạm & Mức phạt
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('consult')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Hỏi đáp tình huống thực tế bằng AI
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('references')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Nguồn văn bản pháp luật chính thức
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Internship & Credit Info */}
          <div className="space-y-2.5 md:col-span-2 bg-stone-800/60 p-4 rounded-xl border border-stone-700/60">
            <h4 className="text-amber-400 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Thông Tin Đề Tài Thực Tập</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
              <div>
                <span className="text-stone-400">Sinh viên thực hiện:</span>{' '}
                <strong className="text-white">Trương Văn Quý</strong>
              </div>
              <div>
                <span className="text-stone-400">Mã sinh viên:</span>{' '}
                <strong className="text-amber-300 font-mono">PH68121</strong>
              </div>
              <div>
                <span className="text-stone-400">Nhóm đề tài:</span>{' '}
                <strong className="text-white">Nhóm 2</strong>
              </div>
              <div>
                <span className="text-stone-400">Chương trình:</span>{' '}
                <strong className="text-white">Thực tập sinh Đợt 15</strong>
              </div>
            </div>
            <p className="text-xs text-stone-400 pt-1 border-t border-stone-700">
              Hợp tác đào tạo và hướng dẫn giữa <strong>Trường Cao đẳng FPT Polytechnic</strong> và <strong>Công ty IMTA TECH</strong>.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-stone-800 text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Tín Ngưỡng Văn Minh • Hệ thống giáo dục pháp luật cộng đồng.</p>
          <p className="flex items-center gap-1">
            Xây dựng vì cộng đồng văn minh, thượng tôn pháp luật <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
