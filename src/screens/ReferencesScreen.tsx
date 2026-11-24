import React, { useState } from 'react';
import { LegalDisclaimer } from '../components/LegalDisclaimer';
import { 
  BookOpen, 
  FileText, 
  ExternalLink, 
  ShieldCheck, 
  Search, 
  Calendar, 
  Building,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Props {
  isLargeFont: boolean;
}

interface LawDoc {
  id: string;
  soHieu: string;
  tenVanBan: string;
  coQuanBanHanh: string;
  ngayBanHanh: string;
  noiDungChinh: string;
  cacDieuKhoanChinh: {
    dieu: string;
    noiDung: string;
  }[];
}

const LEGAL_DOCUMENTS: LawDoc[] = [
  {
    id: 'DOC-01',
    soHieu: 'Hiến pháp năm 2013',
    tenVanBan: 'Hiến pháp nước Cộng hòa Xã hội Chủ nghĩa Việt Nam năm 2013',
    coQuanBanHanh: 'Quốc hội nước Cộng hòa Xã hội Chủ nghĩa Việt Nam',
    ngayBanHanh: '28/11/2013 (Có hiệu lực từ 01/01/2014)',
    noiDungChinh: 'Đạo luật cơ bản của Nhà nước, ghi nhận và bảo hộ quyền tự do tín ngưỡng, tôn giáo của mọi công dân, đồng thời nghiêm cấm lợi dụng tín ngưỡng, tôn giáo để vi phạm pháp luật.',
    cacDieuKhoanChinh: [
      {
        dieu: 'Điều 24',
        noiDung: '1. Mọi người có quyền tự do tín ngưỡng, tôn giáo, theo hoặc không theo một tôn giáo nào. Các tôn giáo bình đẳng trước pháp luật. 2. Nhà nước tôn trọng và bảo hộ quyền tự do tín ngưỡng, tôn giáo. 3. Không ai được xâm phạm tự do tín ngưỡng, tôn giáo hoặc lợi dụng tín ngưỡng, tôn giáo để vi phạm pháp luật.',
      },
    ],
  },
  {
    id: 'DOC-02',
    soHieu: 'Luật số 02/2016/QH14',
    tenVanBan: 'Luật Tín ngưỡng, tôn giáo năm 2016',
    coQuanBanHanh: 'Quốc hội nước Cộng hòa Xã hội Chủ nghĩa Việt Nam',
    ngayBanHanh: '18/11/2016 (Có hiệu lực từ 01/01/2018)',
    noiDungChinh: 'Quy định về quyền tự do tín ngưỡng, tôn giáo; hoạt động tín ngưỡng, tôn giáo; tổ chức tôn giáo; quyền và nghĩa vụ của cơ quan, tổ chức, cá nhân có liên quan.',
    cacDieuKhoanChinh: [
      {
        dieu: 'Điều 5 (Các hành vi bị nghiêm cấm)',
        noiDung: 'Nghiêm cấm lợi dụng hoạt động tín ngưỡng, tôn giáo để trục lợi, hoạt động mê tín dị đoan; phân biệt đối xử, kỳ thị vì lý do tín ngưỡng, tôn giáo; ép buộc, mua chuộc hoặc cản trở người khác theo hoặc không theo tín ngưỡng, tôn giáo.',
      },
      {
        dieu: 'Điều 12 & Điều 13',
        noiDung: 'Quy định về đăng ký hoạt động tín ngưỡng và thông báo về việc tổ chức lễ hội tín ngưỡng định kỳ, lễ hội tín ngưỡng diễn ra lần đầu.',
      },
    ],
  },
  {
    id: 'DOC-03',
    soHieu: 'Bộ luật số 100/2015/QH13 (sửa đổi 2017)',
    tenVanBan: 'Bộ luật Hình sự năm 2015 (sửa đổi, bổ sung năm 2017)',
    coQuanBanHanh: 'Quốc hội nước Cộng hòa Xã hội Chủ nghĩa Việt Nam',
    ngayBanHanh: '27/11/2015 (sửa đổi 20/06/2017, có hiệu lực 01/01/2018)',
    noiDungChinh: 'Quy định các tội phạm và hình phạt nghiêm khắc đối với các hành vi xâm phạm tính mạng, sức khỏe, tài sản và trật tự công cộng dưới vỏ bọc mê tín dị đoan.',
    cacDieuKhoanChinh: [
      {
        dieu: 'Điều 320 (Tội hành nghề mê tín, dị đoan)',
        noiDung: 'Người nào dùng bói toán, đồng bóng hoặc các hình thức mê tín, dị đoan khác đã bị xử phạt vi phạm hành chính về hành vi này hoặc đã bị kết án về tội này, chưa được xóa án tích mà còn vi phạm, thì bị phạt tiền từ 10.000.000 đến 100.000.000 đồng, phạt cải tạo không giam giữ đến 03 năm hoặc phạt tù từ 06 tháng đến 03 năm. Khung tăng nặng (gây chết người, thu lợi bất chính từ 200 triệu trở lên...) bị phạt tù từ 03 năm đến 10 năm.',
      },
      {
        dieu: 'Điều 174 (Tội lừa đảo chiếm đoạt tài sản)',
        noiDung: 'Xử lý hình sự hành vi lợi dụng tâm linh, bịa đặt chuyện vong nhập, ma ám, tai ương để chiếm đoạt tài sản của nạn nhân. Mức phạt từ cải tạo không giam giữ đến tù chung thân.',
      },
      {
        dieu: 'Điều 319 (Tội xâm phạm thi thể, mồ mả, hài cốt)',
        noiDung: 'Xử phạt người đào, phá mồ mả, chiếm đoạt đồ vật trong mộ hoặc xâm phạm nơi an nghỉ tâm linh. Mức phạt tù lên đến 07 năm.',
      },
      {
        dieu: 'Điều 164 (Tội xâm phạm quyền tự do tín ngưỡng, tôn giáo)',
        noiDung: 'Người nào dùng vũ lực, đe dọa dùng vũ lực hoặc thủ đoạn khác cản trở hoặc ép buộc người khác thực hiện quyền tự do tín ngưỡng, tôn giáo.',
      },
    ],
  },
  {
    id: 'DOC-04',
    soHieu: 'Nghị định số 38/2021/NĐ-CP (sửa đổi bởi NĐ 129/2021/NĐ-CP)',
    tenVanBan: 'Nghị định quy định xử phạt vi phạm hành chính trong lĩnh vực văn hóa và quảng cáo',
    coQuanBanHanh: 'Chính phủ nước Cộng hòa Xã hội Chủ nghĩa Việt Nam',
    ngayBanHanh: '29/03/2021 (Có hiệu lực từ 01/06/2021)',
    noiDungChinh: 'Quy định chi tiết các mức phạt đối với các hành vi vi phạm nếp sống văn minh và mê tín dị đoan trong tổ chức lễ hội và di tích văn hóa.',
    cacDieuKhoanChinh: [
      {
        dieu: 'Điều 14 Khoản 1 Điểm a',
        noiDung: 'Phạt cảnh cáo hoặc phạt tiền từ 200.000 đồng đến 500.000 đồng đối với hành vi đốt vàng mã không đúng nơi quy định tại nơi tổ chức lễ hội, di tích lịch sử - văn hóa.',
      },
      {
        dieu: 'Điều 14 Khoản 1 Điểm b',
        noiDung: 'Phạt tiền từ 200.000 đồng đến 500.000 đồng đối với hành vi ném, thả tiền xuống giếng, ao hồ; gài tiền vào tượng Phật, bia đá, cây cổ thụ làm mất mỹ quan di tích.',
      },
      {
        dieu: 'Điều 14 Khoản 2 Điểm c',
        noiDung: 'Phạt tiền từ 1.000.000 đồng đến 3.000.000 đồng đối với hành vi ép buộc du khách mua hàng mã, sách bói toán, đồ thờ cúng tại nơi tổ chức lễ hội.',
      },
      {
        dieu: 'Điều 14 Khoản 7 Điểm đ',
        noiDung: 'Phạt tiền từ 3.000.000 đồng đến 5.000.000 đồng đối với hành vi tổ chức hoạt động mê tín dị đoan trong lễ hội. Biện pháp khắc phục: Buộc nộp lại số lợi bất hợp pháp.',
      },
    ],
  },
  {
    id: 'DOC-05',
    soHieu: 'Nghị định số 144/2021/NĐ-CP',
    tenVanBan: 'Nghị định quy định xử phạt VPHC trong lĩnh vực an ninh trật tự, tệ nạn xã hội, PCCC và CNCH',
    coQuanBanHanh: 'Chính phủ nước Cộng hòa Xã hội Chủ nghĩa Việt Nam',
    ngayBanHanh: '31/12/2021 (Có hiệu lực từ 01/01/2022)',
    noiDungChinh: 'Điều chỉnh các hành vi vi phạm trật tự công cộng, phòng cháy chữa cháy khi thắp hương, đốt vàng mã và xử phạt hành nghề mê tín dị đoan tại cộng đồng.',
    cacDieuKhoanChinh: [
      {
        dieu: 'Điều 15 Khoản 4 Điểm đ',
        noiDung: 'Phạt tiền từ 3.000.000 đồng đến 5.000.000 đồng đối với hành vi hoạt động mê tín dị đoan. Hình thức xử phạt bổ sung: Tịch thu tang vật, phương tiện vi phạm và buộc nộp lại số lợi bất hợp pháp.',
      },
      {
        dieu: 'Điều 35 Khoản 2 Điểm a & Điều 37',
        noiDung: 'Xử phạt từ 1.000.000 đồng đến 5.000.000 đồng đối với hành vi sử dụng nguồn lửa, nguồn nhiệt (đốt vàng mã) vi phạm khoảng cách an toàn về phòng cháy chữa cháy hoặc để xảy ra cháy lan.',
      },
      {
        dieu: 'Điều 7 Khoản 2 Điểm a',
        noiDung: 'Phạt tiền từ 1.000.000 đồng đến 2.000.000 đồng đối với hành vi gây rối trật tự công cộng, chen lấn xô đẩy cướp lộc tại nơi tổ chức lễ hội, nơi thờ tự.',
      },
    ],
  },
  {
    id: 'DOC-06',
    soHieu: 'Nghị định số 15/2020/NĐ-CP (sửa đổi bởi NĐ 14/2022/NĐ-CP)',
    tenVanBan: 'Nghị định quy định xử phạt trong lĩnh vực bưu chính, viễn thông, CNTT và mạng xã hội',
    coQuanBanHanh: 'Chính phủ nước Cộng hòa Xã hội Chủ nghĩa Việt Nam',
    ngayBanHanh: '03/02/2020 (sửa đổi 27/01/2022)',
    noiDungChinh: 'Ngăn chặn và xử phạt hành vi truyền bá mê tín dị đoan, bói toán hoang đường trên không gian mạng và các nền tảng mạng xã hội (Facebook, TikTok, YouTube).',
    cacDieuKhoanChinh: [
      {
        dieu: 'Điều 101 Khoản 1 Điểm b',
        noiDung: 'Phạt tiền từ 10.000.000 đồng đến 20.000.000 đồng (đối với tổ chức) hoặc từ 5.000.000 đồng đến 10.000.000 đồng (đối với cá nhân) về hành vi cung cấp, chia sẻ thông tin cổ súy các hủ tục, mê tín, dị đoan, dâm ô, đồi trụy, không phù hợp với thuần phong, mỹ tục của dân tộc.',
      },
    ],
  },
  {
    id: 'DOC-07',
    soHieu: 'Nghị định số 100/2019/NĐ-CP (sửa đổi bởi NĐ 123/2021/NĐ-CP)',
    tenVanBan: 'Nghị định quy định xử phạt VPHC trong lĩnh vực giao thông đường bộ và đường sắt',
    coQuanBanHanh: 'Chính phủ nước Cộng hòa Xã hội Chủ nghĩa Việt Nam',
    ngayBanHanh: '30/12/2019 (sửa đổi 28/12/2021)',
    noiDungChinh: 'Xử lý các hành vi lấn chiếm vỉa hè, lòng đường để dựng rạp thờ cúng, bày đồ cúng lễ gây cản trở và mất an toàn giao thông.',
    cacDieuKhoanChinh: [
      {
        dieu: 'Điều 12 Khoản 5 Điểm a',
        noiDung: 'Phạt tiền từ 2.000.000 đồng đến 3.000.000 đồng đối với cá nhân, từ 4.000.000 đồng đến 6.000.000 đồng đối với tổ chức thực hiện hành vi chiếm dụng lòng đường đô thị, hè phố để bày đồ lễ cúng, dựng rạp cản trở giao thông.',
      },
    ],
  },
  {
    id: 'DOC-08',
    soHieu: 'Chỉ thị số 41-CT/TW & Công văn Giáo hội Phật giáo Việt Nam',
    tenVanBan: 'Chỉ thị số 41-CT/TW của Ban Bí thư và Công văn số 31/CV-HĐTS của GHPGVN',
    coQuanBanHanh: 'Ban Bí thư Trung ương Đảng & Hội đồng Trị sự GHPGVN',
    ngayBanHanh: 'Văn bản định hướng nếp sống văn minh',
    noiDungChinh: 'Định hướng toàn xã hội tăng cường nếp sống văn minh, hạn chế lãng phí, loại bỏ tục đốt vàng mã tại các cơ sở tự viện Phật giáo và bảo vệ môi trường sinh thái.',
    cacDieuKhoanChinh: [
      {
        dieu: 'Định hướng văn hóa',
        noiDung: 'Không đốt vàng mã tại nơi thờ tự Phật giáo; hướng dẫn phật tử và người dân giữ gìn truyền thống văn hóa hiếu thảo, tri ân bằng việc làm thiện nguyện thiết thực thay vì đốt hình mã tốn kém, nguy hiểm.',
      },
    ],
  },
];

export const ReferencesScreen: React.FC<Props> = ({ isLargeFont }) => {
  const [expandedDoc, setExpandedDoc] = useState<string | null>('DOC-04');
  const [searchDoc, setSearchDoc] = useState('');

  const toggleDoc = (id: string) => {
    setExpandedDoc(expandedDoc === id ? null : id);
  };

  const filteredDocs = LEGAL_DOCUMENTS.filter((doc) => {
    if (!searchDoc.trim()) return true;
    const q = searchDoc.toLowerCase().trim();
    return (
      doc.soHieu.toLowerCase().includes(q) ||
      doc.tenVanBan.toLowerCase().includes(q) ||
      doc.coQuanBanHanh.toLowerCase().includes(q) ||
      doc.noiDungChinh.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 pb-10">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block">
          Màn hình 5 • Thư viện pháp luật
        </span>
        <h1 className={`font-black text-stone-900 tracking-tight ${
          isLargeFont ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
        }`}>
          Nguồn Văn Bản Pháp Luật Tham Khảo
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed max-w-3xl">
          Danh mục đầy đủ các văn bản quy phạm pháp luật của Quốc hội và Chính phủ nước Cộng hòa Xã hội Chủ nghĩa Việt Nam được sử dụng làm cơ sở đối chiếu và tra cứu trong ứng dụng.
        </p>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchDoc}
            onChange={(e) => setSearchDoc(e.target.value)}
            placeholder="Tìm theo số hiệu nghị định, luật, cơ quan ban hành..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-stone-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm sm:text-base text-stone-900 placeholder-stone-400 font-medium"
          />
        </div>
      </div>

      {/* List of Legal Documents */}
      <div className="space-y-4">
        {filteredDocs.map((doc) => {
          const isExpanded = expandedDoc === doc.id;
          return (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-stone-300 transition-all"
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleDoc(doc.id)}
                className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-stone-50/70 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-blue-100 text-blue-800">
                      {doc.soHieu}
                    </span>
                    <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-stone-400" />
                      <span>{doc.coQuanBanHanh}</span>
                    </span>
                  </div>
                  <h3 className={`font-bold text-stone-900 leading-snug ${
                    isLargeFont ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
                  }`}>
                    {doc.tenVanBan}
                  </h3>
                  <p className="text-xs text-stone-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <span>Ban hành: {doc.ngayBanHanh}</span>
                  </p>
                </div>

                <div className="p-2 rounded-full bg-stone-100 text-stone-600 shrink-0 mt-1">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-stone-100 space-y-4 text-sm text-stone-800 bg-stone-50/40">
                  {/* Phạm vi điều chỉnh */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                      Nội dung điều chỉnh trọng tâm:
                    </span>
                    <p className="text-stone-700 leading-relaxed font-medium">
                      {doc.noiDungChinh}
                    </p>
                  </div>

                  {/* Trích dẫn điều khoản */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>Các điều khoản trích dẫn áp dụng trong ứng dụng:</span>
                    </span>
                    <div className="space-y-2">
                      {doc.cacDieuKhoanChinh.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 bg-white rounded-xl border border-stone-200/90 shadow-2xs space-y-1"
                        >
                          <strong className="text-blue-950 block text-xs sm:text-sm">
                            {item.dieu}
                          </strong>
                          <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                            {item.noiDung}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mandatory Legal Disclaimer */}
      <LegalDisclaimer />
    </div>
  );
};
