import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { VIOLATIONS_DATA } from './src/data/violations.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI on the server side
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API endpoint to get all violations
app.get('/api/violations', (_req: Request, res: Response) => {
  res.json({ violations: VIOLATIONS_DATA });
});

// Helper for local keyword matching fallback if Gemini is offline or lacks key
function localAnalyzeSituation(situation: string) {
  const norm = situation.toLowerCase();
  const matched = VIOLATIONS_DATA.filter((v) => {
    const keywords = [
      ...v.tenLoi.toLowerCase().split(/\s+/),
      ...v.nhomLoi.toLowerCase().split(/\s+/),
      ...v.moTaChiTiet.toLowerCase().split(/\s+/),
    ];
    // Check key terms
    if (norm.includes('vàng mã') || norm.includes('đốt mã') || norm.includes('hóa vàng')) {
      return v.id === 'L02' || v.id === 'L03';
    }
    if (norm.includes('bói') || norm.includes('bùa') || norm.includes('quẻ') || norm.includes('trục vong') || norm.includes('trừ tà') || norm.includes('đồng bóng')) {
      return v.id === 'L01' || v.id === 'L04' || v.id === 'L05' || v.id === 'L06';
    }
    if (norm.includes('vỉa hè') || norm.includes('lòng đường') || norm.includes('bàn thờ') || norm.includes('rạp')) {
      return v.id === 'L08';
    }
    if (norm.includes('tiền lẻ') || norm.includes('giọt dầu') || norm.includes('ném tiền') || norm.includes('công đức')) {
      return v.id === 'L10';
    }
    if (norm.includes('livestream') || norm.includes('mạng xã hội') || norm.includes('facebook') || norm.includes('tiktok') || norm.includes('youtube')) {
      return v.id === 'L12';
    }
    if (norm.includes('cướp lộc') || norm.includes('đánh nhau') || norm.includes('hoa tre') || norm.includes('xô đẩy')) {
      return v.id === 'L13';
    }
    if (norm.includes('mồ mả') || norm.includes('bát hương') || norm.includes('phá mộ')) {
      return v.id === 'L15';
    }
    if (norm.includes('ép') || norm.includes('cưỡng ép') || norm.includes('bỏ đạo')) {
      return v.id === 'L16';
    }
    return false;
  });

  if (matched.length > 0) {
    return {
      hasLegalGround: true,
      matchedViolationIds: matched.map((m) => m.id),
      analysis: `Qua phân tích đối chiếu với tệp dữ liệu quy định, tình huống của bạn có dấu hiệu liên quan đến ${matched.length} hành vi vi phạm pháp luật đã được quy định cụ thể.`,
      civilizedAdvice: 'Nên tuân thủ nếp sống văn minh, thực hành tín ngưỡng thanh tịnh, tôn trọng không gian chung và tuân theo các quy định của pháp luật.',
      disclaimer: 'Thông tin chỉ mang tính tham khảo, không thay thế văn bản pháp luật chính thức hoặc kết luận của cơ quan nhà nước có thẩm quyền.',
    };
  }

  return {
    hasLegalGround: false,
    matchedViolationIds: [],
    analysis: 'Chưa đủ căn cứ trong bộ dữ liệu để xác định hành vi vi phạm và mức xử phạt. Theo quy định pháp luật và nguyên tắc hệ thống, tuyệt đối không được tự suy đoán mức phạt. Nếu cần tư vấn thêm, bạn vui lòng liên hệ cơ quan tư pháp hoặc chính quyền địa phương.',
    civilizedAdvice: 'Bạn hãy kiểm tra lại thông tin tình huống hoặc mô tả cụ thể hơn các hành vi liên quan đến thực hành tín ngưỡng, văn hóa tâm linh.',
    disclaimer: 'Thông tin chỉ mang tính tham khảo, không thay thế văn bản pháp luật chính thức hoặc kết luận của cơ quan nhà nước có thẩm quyền.',
  };
}

// API endpoint to analyze situation using Gemini
app.post('/api/consult', async (req: Request, res: Response) => {
  try {
    const { situation } = req.body;

    if (!situation || typeof situation !== 'string' || situation.trim().length === 0) {
      return res.status(400).json({ error: 'Vui lòng cung cấp mô tả tình huống.' });
    }

    if (!ai) {
      // Local fallback
      const result = localAnalyzeSituation(situation);
      return res.json(result);
    }

    const systemPrompt = `Bạn là Chuyên gia Cố vấn Pháp luật về Tín ngưỡng Văn minh tại Việt Nam.
Nhiệm vụ của bạn là đọc mô tả tình huống của người dân và ĐỐI CHIẾU DUY NHẤT VỚI TỆP DỮ LIỆU GỒM 16 LỖI VI PHẠM DƯỚI ĐÂY:

DANH SÁCH 16 LỖI VI PHẠM TRONG BỘ DỮ LIỆU:
${JSON.stringify(
  VIOLATIONS_DATA.map((v) => ({
    id: v.id,
    tenLoi: v.tenLoi,
    nhomLoi: v.nhomLoi,
    mucPhatThapNhat: v.mucPhatThapNhat,
    mucPhatCaoNhat: v.mucPhatCaoNhat,
    hinhPhatBoSung: v.hinhPhatBoSung,
    tenVanBan: v.tenVanBan,
    dieuKhoan: v.dieuKhoan,
    loaiCheTai: v.loaiCheTai,
    moTaChiTiet: v.moTaChiTiet,
  })),
  null,
  2
)}

QUY TẮC BẮT BUỘC (TUYỆT ĐỐI TUÂN THỦ):
1. NẾU KHÔNG TÌM THẤY CĂN CỨ TRONG TỆP DỮ LIỆU NÓI TRÊN (ví dụ: tình huống không liên quan đến 16 lỗi, hoặc tình huống không đủ tình tiết pháp lý):
   - Bạn PHẢI trả lời 'hasLegalGround': false.
   - 'matchedViolationIds': [] (mảng rỗng).
   - 'analysis': BẮT BUỘC PHẢI KHẲNG ĐỊNH rằng: "Chưa đủ căn cứ trong bộ dữ liệu để xác định hành vi vi phạm và mức xử phạt. Theo nguyên tắc pháp lý, tuyệt đối không được tự suy đoán mức phạt."
   - TUYỆT ĐỐI KHÔNG ĐƯỢC TỰ SUY ĐOÁN MỨC PHẠT ngoài bộ dữ liệu đã cung cấp.

2. NẾU TÌM THẤY CĂN CỨ PHÙ HỢP TRONG TỆP DỮ LIỆU:
   - 'hasLegalGround': true.
   - 'matchedViolationIds': Danh sách các mã ID (ví dụ ["L02", "L03"]) tương ứng từ bộ dữ liệu.
   - 'analysis': Trình bày mạch lạc, dễ hiểu cho người dân bình dân, chỉ rõ hành vi nào trong tình huống vi phạm, mức phạt thấp nhất đến cao nhất (bằng tiền VNĐ hoặc hình phạt tù nếu hình sự), hình phạt bổ sung và CĂN CỨ PHÁP LÝ (Tên văn bản, điều khoản áp dụng) được trích chuẩn xác từ bộ dữ liệu.
   - 'civilizedAdvice': Đưa ra lời khuyên thực hành tín ngưỡng văn minh, đúng mực, tránh vi phạm.

3. Luôn luôn kèm theo 'disclaimer': "Thông tin chỉ mang tính tham khảo, không thay thế văn bản pháp luật chính thức hoặc kết luận của cơ quan nhà nước có thẩm quyền."`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Mô tả tình huống từ người dân: "${situation}"\nHãy đối chiếu cẩn trọng với tệp dữ liệu 16 lỗi vi phạm và trả về kết quả JSON theo đúng schema.`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hasLegalGround: {
              type: Type.BOOLEAN,
              description: 'True nếu tìm thấy căn cứ khớp trong bộ dữ liệu, False nếu không tìm thấy hoặc chưa đủ căn cứ.',
            },
            matchedViolationIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Danh sách ID các lỗi vi phạm trong bộ dữ liệu (ví dụ L01, L02). Rỗng nếu chưa đủ căn cứ.',
            },
            analysis: {
              type: Type.STRING,
              description: 'Phân tích chi tiết hành vi, đối chiếu quy định, mức phạt và điều khoản áp dụng. Nếu không tìm thấy căn cứ phải ghi rõ chưa đủ căn cứ và không tự suy đoán mức phạt.',
            },
            civilizedAdvice: {
              type: Type.STRING,
              description: 'Lời khuyên cụ thể giúp người dân thực hành tín ngưỡng văn minh, đúng mực.',
            },
            disclaimer: {
              type: Type.STRING,
              description: 'Lưu ý pháp lý bắt buộc.',
            },
          },
          required: ['hasLegalGround', 'matchedViolationIds', 'analysis', 'civilizedAdvice', 'disclaimer'],
        },
      },
    });

    const text = response.text;
    if (!text) {
      const fallbackResult = localAnalyzeSituation(situation);
      return res.json(fallbackResult);
    }

    try {
      const parsed = JSON.parse(text);
      return res.json(parsed);
    } catch {
      const fallbackResult = localAnalyzeSituation(situation);
      return res.json(fallbackResult);
    }
  } catch (error) {
    console.error('Error during situation consultation:', error);
    const { situation } = req.body;
    const fallbackResult = localAnalyzeSituation(situation || '');
    return res.json(fallbackResult);
  }
});

// Setup dev server with Vite or static serving in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer();
