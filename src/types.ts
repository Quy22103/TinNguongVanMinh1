import { Violation } from './data/violations';

export type ScreenId = 'home' | 'search' | 'consult' | 'about' | 'references';

export interface ConsultationResponse {
  hasLegalGround: boolean;
  matchedViolationIds: string[];
  analysis: string;
  civilizedAdvice: string;
  disclaimer: string;
  error?: string;
}

export interface LegalDocument {
  id: string;
  soHieu: string;
  tenVanBan: string;
  coQuanBanHanh: string;
  ngayHieuLuc: string;
  noiDungDieuChinh: string;
  dieuKhoanLienQuan: string[];
}
