export interface App {
  id: string;
  name: string;
  icon: string;
  winget: string | null;
  choco: string | null;
  directUrl: string | null;
  silentArgs: string;
  note?: string;
}

export interface CategoryInfo {
  title: string;
  description: string;
  icon: string;
}

export type ProgramCategory =
  | "browsers"
  | "messaging"
  | "media"
  | "videoEditing"
  | "runtime"
  | "development"
  | "ides"
  | "databases"
  | "compression"
  | "security"
  | "documents"
  | "imaging"
  | "utilities"
  | "terminals"
  | "gaming"
  | "cloudStorage"
  | "virtualization"
  | "backup";

export type Programs = Record<ProgramCategory, App[]>;

export type CategoryInfoMap = Record<ProgramCategory, CategoryInfo>;

export type InstallMethod = "auto" | "winget" | "choco" | "direct";
