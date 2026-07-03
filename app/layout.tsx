import type {Metadata} from 'next';
import { Roboto } from 'next/font/google';
import './globals.css'; // Global styles
import ChatbotWidgets from '../components/ChatbotWidgets';

const roboto = Roboto({
  subsets: ['latin', 'vietnamese'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Viettel IDC — Nhà cung cấp dịch vụ Trung tâm dữ liệu & Điện toán đám mây hàng đầu',
  description: 'Cổng thông tin thương hiệu, dịch vụ, giải pháp hạ tầng số và điều hướng trung tâm của Viettel IDC. Hạ tầng số tin cậy cho doanh nghiệp Việt.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="vi" className={`${roboto.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var originalFetch = window.fetch;
                  if (originalFetch) {
                    var curFetch = originalFetch;
                    Object.defineProperty(window, 'fetch', {
                      get: function() { return curFetch; },
                      set: function(v) { curFetch = v; },
                      configurable: true,
                      enumerable: true
                    });
                  }
                } catch (e) {
                  console.warn('Failed to define fetch setter:', e);
                }
              })();
            `
          }}
        />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased text-[#5A5A5A] bg-[#F7F7F7]">
        {children}
        <ChatbotWidgets />
      </body>
    </html>
  );
}
