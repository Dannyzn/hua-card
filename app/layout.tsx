import type { Metadata } from "next";
import { Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

const notoSerif = Noto_Serif_SC({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "华笺 Hua Card — 海外华人的节日贺卡",
  description:
    "春节、中秋与节气主题贺卡：编辑祝福语、AI 辅助、下载图片或生成分享链接。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${notoSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#fdfaf3] text-stone-900">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-amber-900/10 py-6 text-center text-xs text-amber-900/45">
          MVP · 数据仅存于本机服务器 data 目录 · 生产环境请换数据库
        </footer>
      </body>
    </html>
  );
}
