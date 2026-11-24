import React, { useState } from 'react';
import { ConsultationResponse } from '../types';
import { VIOLATIONS_DATA, Violation } from '../data/violations';
import { LegalDisclaimer } from '../components/LegalDisclaimer';
import { ViolationDetailModal } from '../components/ViolationDetailModal';
import { 
  Send, 
  Sparkles, 
  Scale, 
  ShieldAlert, 
  AlertCircle, 
  Lightbulb, 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  HelpCircle,
  FileText,
  ChevronRight
} from 'lucide-react';

interface Props {
  isLargeFont: boolean;
}

export const ConsultScreen: React.FC<Props> = ({ isLargeFont }) => {
  const [situationText, setSituationText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ConsultationResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(null);

  // Pre-configured realistic sample situations
  const sampleSituations = [
    {
      title: 'Đốt vàng mã suýt cháy chung cư',
      desc: 'Hàng xóm nhà tôi thường xuyên đốt cả đống vàng mã ở hành lang lối thoát hiểm chung cư, tàn lửa bay tứ tung và khói mù mịt làm chuông báo cháy reo.',
    },
    {
      title: 'Thầy bói đòi 25 triệu giải bùa vong',
      desc: 'Mẹ tôi đi xem bói thì bị thầy phán là nhà có vong hài nhi quấy phá, ép phải nộp 25 triệu làm lễ trừ tà giải hạn nếu không con cái sẽ gặp nạn.',
    },
    {
      title: 'Bày bàn thờ cúng lễ lấn chiếm vỉa hè',
      desc: 'Chủ cửa hàng bên cạnh kê bàn thờ cúng chúng sinh rằm tháng 7 chiếm trọn cả vỉa hè người đi bộ và tràn ra đường, khói hương nghi ngút gây cản trở giao thông.',
    },
    {
      title: 'Livestream bói online trên TikTok',
      desc: 'Một tài khoản mạng xã hội livestream bói bài tây, xem bói chỉ tay thu phí 300k mỗi lượt và hù dọa người xem về nghiệp chướng gia đình.',
    },
    {
      title: 'Tình huống không có trong bộ dữ liệu (Test chưa đủ căn cứ)',
      desc: 'Tôi đi làm bằng xe máy nhưng quên không bật đèn xi nhan khi rẽ phải vào ngõ nhỏ thì có bị phạt theo luật tín ngưỡng không?',
    },
  ];

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!situationText.trim()) {
      setErrorMsg('Vui lòng nhập nội dung tình huống bạn cần tư vấn.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setResult(null);

    try {
      const response = await fetch('/api/consult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ situation: situationText.trim() }),
      });

      if (!response.ok) {
        throw new Error('Lỗi máy chủ khi xử lý tình huống.');
      }

      const data: ConsultationResponse = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Không thể kết nối đến máy chủ phân tích. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSample = (text: string) => {
    setSituationText(text);
    setErrorMsg(null);
    setResult(null);
  };

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
  };

  // Find matched violation objects
  const matchedViolations: Violation[] = (result?.matchedViolationIds || [])
    .map((id) => VIOLATIONS_DATA.find((v) => v.id === id))
    .filter((v): v is Violation => Boolean(v));

  return (
    <div className="space-y-8 pb-10">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block">
              Màn hình 3 • Hỏi đáp tình huống AI
            </span>
            <h1 className={`font-black text-stone-900 tracking-tight ${
              isLargeFont ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
            }`}>
              Đối Chiếu Tình Huống Pháp Lý Bằng Lời Văn Đời Thường
            </h1>
          </div>
          <div className="px-3.5 py-1.5 bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Đối chiếu 16 lỗi quy định</span>
          </div>
        </div>
        <p className="text-stone-600 text-sm leading-relaxed max-w-3xl">
          Bạn không cần có chuyên môn luật hay thuộc lòng các điều khoản. Hãy mô tả lại tình huống bằng lời văn đời thường bạn gặp phải (ví dụ: đốt vàng mã, bị thầy bói dọa nạt, cúng lễ cản trở giao thông...). Hệ thống sẽ đối chiếu với tệp 16 lỗi vi phạm và chỉ rõ căn cứ pháp luật cùng mức phạt.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm sm:text-base font-bold text-stone-900">
            Mô tả tình huống thực tế của bạn:
          </label>
          <div className="relative">
            <textarea
              rows={4}
              value={situationText}
              onChange={(e) => {
                setSituationText(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              placeholder="Ví dụ: Ngày rằm vừa qua, người hàng xóm mang vàng mã ra đốt ngay ở cửa hành lang chung cư, khói bay mù mịt và lửa bốc rất to khiến mọi người xung quanh bức xúc..."
              className="w-full p-4 rounded-xl border border-stone-300 focus:border-red-600 focus:ring-2 focus:ring-red-100 text-sm sm:text-base text-stone-900 placeholder-stone-400 font-medium transition-all"
            />
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <span className="text-xs text-stone-400 font-medium">
              * Hệ thống bảo mật thông tin, xử lý an toàn tại máy chủ.
            </span>
            <button
              type="submit"
              disabled={isLoading || !situationText.trim()}
              className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-red-700 to-amber-700 hover:from-red-800 hover:to-amber-800 disabled:opacity-50 text-white font-bold rounded-xl text-sm sm:text-base transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Đang đối chiếu dữ liệu pháp luật...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Gửi phân tích tình huống</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Sample Situations Chips */}
        <div className="pt-4 border-t border-stone-100 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-600 uppercase tracking-wide">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Hoặc bấm chọn một tình huống mẫu để thử nghiệm:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {sampleSituations.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(sample.desc)}
                className="text-left p-3 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-amber-50/70 hover:border-amber-300 transition-colors text-xs space-y-1 cursor-pointer group"
              >
                <div className="font-bold text-stone-800 group-hover:text-amber-900 flex items-center justify-between">
                  <span>{sample.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-600" />
                </div>
                <p className="text-stone-500 line-clamp-2">
                  {sample.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading state indicator */}
      {isLoading && (
        <div className="bg-white rounded-2xl p-10 border border-stone-200 text-center space-y-4 shadow-sm animate-pulse">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-stone-800 text-base sm:text-lg">
              Đang phân tích và đối chiếu với 16 lỗi vi phạm...
            </h3>
            <p className="text-stone-500 text-xs sm:text-sm">
              Hệ thống đọc tình huống, kiểm tra mức phạt tiền, hình phạt bổ sung và trích dẫn điều khoản tương ứng.
            </p>
          </div>
        </div>
      )}

      {/* Analysis Result Box */}
      {result && !isLoading && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Main Status Header Card */}
          <div className={`p-6 sm:p-7 rounded-2xl border shadow-sm space-y-4 ${
            result.hasLegalGround
              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
              : 'bg-amber-50/90 border-amber-300 text-amber-950'
          }`}>
            <div className="flex items-start gap-3">
              {result.hasLegalGround ? (
                <div className="p-2 bg-emerald-600 text-white rounded-xl shrink-0 mt-0.5">
                  <CheckCircle className="w-6 h-6" />
                </div>
              ) : (
                <div className="p-2 bg-amber-600 text-white rounded-xl shrink-0 mt-0.5">
                  <AlertCircle className="w-6 h-6" />
                </div>
              )}
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider block">
                  {result.hasLegalGround
                    ? 'KẾT QUẢ ĐỐI CHIẾU: ĐÃ TÌM THẤY CĂN CỨ PHÁP LÝ TƯƠNG ỨNG'
                    : 'KẾT QUẢ ĐỐI CHIẾU: CHƯA ĐỦ CĂN CỨ TRONG BỘ DỮ LIỆU'}
                </span>
                <h3 className={`font-black tracking-tight ${
                  isLargeFont ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
                }`}>
                  {result.hasLegalGround
                    ? `Phát hiện dấu hiệu liên quan đến ${matchedViolations.length || 1} hành vi vi phạm pháp luật`
                    : 'Chưa đủ căn cứ pháp lý trong bộ dữ liệu để xác định mức phạt'}
                </h3>
              </div>
            </div>

            {/* Detailed Analysis Text */}
            <div className="p-4 bg-white/90 rounded-xl border border-stone-200 text-stone-800 space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-stone-600" />
                <span>Nội Dung Phân Tích Pháp Lý Chi Tiết:</span>
              </h4>
              <p className={`leading-relaxed font-medium whitespace-pre-line ${
                isLargeFont ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
              }`}>
                {result.analysis}
              </p>
            </div>

            {/* Civilized Recommendation */}
            <div className="p-4 bg-white/90 rounded-xl border border-emerald-200 text-emerald-950 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-800">
                <Lightbulb className="w-4 h-4 text-emerald-600" />
                <span>Khuyến Nghị Thực Hành Văn Minh & Hướng Xử Lý:</span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed font-medium text-emerald-900">
                {result.civilizedAdvice}
              </p>
            </div>
          </div>

          {/* If Matched Violations: Display Cards */}
          {result.hasLegalGround && matchedViolations.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-stone-900 text-base sm:text-lg flex items-center gap-2">
                  <Scale className="w-5 h-5 text-red-700" />
                  <span>Các Hành Vi Vi Phạm Cụ Thể Được Áp Dụng:</span>
                </h3>
                <span className="text-xs text-stone-500">
                  Nhấp vào thẻ để xem chi tiết
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchedViolations.map((violation) => (
                  <div
                    key={violation.id}
                    onClick={() => setSelectedViolation(violation)}
                    className="p-5 bg-white rounded-2xl border border-stone-200 hover:border-red-300 hover:shadow-md transition-all cursor-pointer space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-red-100 text-red-800">
                        MÃ: {violation.id}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                        {violation.nhomLoi}
                      </span>
                    </div>

                    <h4 className="font-bold text-stone-900 text-base leading-snug">
                      {violation.tenLoi}
                    </h4>

                    {/* Khung phạt tiền */}
                    <div className="p-3 bg-red-50/70 border border-red-100 rounded-xl text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-stone-500">Mức phạt tiền:</span>
                        <span className="font-bold text-red-700">
                          {formatVND(violation.mucPhatThapNhat)} - {formatVND(violation.mucPhatCaoNhat)}
                        </span>
                      </div>
                      <div className="text-stone-700 pt-1 border-t border-red-100">
                        <span className="font-semibold text-orange-900">Hình phạt bổ sung: </span>
                        <span>{violation.hinhPhatBoSung}</span>
                      </div>
                    </div>

                    {/* Căn cứ pháp lý */}
                    <div className="text-xs text-blue-900 bg-blue-50/60 p-2.5 rounded-lg border border-blue-100 space-y-0.5">
                      <div className="font-bold flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Căn cứ pháp lý:</span>
                      </div>
                      <p className="font-medium text-stone-800 pl-4">{violation.tenVanBan}</p>
                      <p className="font-bold text-blue-800 pl-4">Điều khoản: {violation.dieuKhoan}</p>
                    </div>

                    <div className="pt-1 flex items-center justify-end text-xs font-bold text-red-700 gap-1">
                      <span>Xem toàn bộ quy định</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mandatory disclaimer from AI response */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Lưu ý bắt buộc:</strong> {result.disclaimer || 'Thông tin chỉ mang tính tham khảo, không thay thế văn bản pháp luật chính thức hoặc kết luận của cơ quan nhà nước có thẩm quyền.'}
            </span>
          </div>
        </div>
      )}

      {/* Modal for violation details */}
      <ViolationDetailModal
        violation={selectedViolation}
        onClose={() => setSelectedViolation(null)}
      />

      {/* Legal Disclaimer */}
      <LegalDisclaimer />
    </div>
  );
};
