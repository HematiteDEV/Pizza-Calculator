const CACHE_NAME = 'pizza-dough-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192x192.png',
  './icon-512x512.png'
];

// نصب سرویس ورکر و کش کردن فایل‌های اولیه
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('فایل‌ها با موفقیت کش شدند');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// فعال‌سازی و پاک کردن کش‌های قدیمی
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('کش قدیمی پاک شد:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// رهگیری درخواست‌ها و خواندن از کش (برای حالت آفلاین)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // اگر فایل در کش بود آن را برگردان، در غیر این صورت از شبکه بگیر
      return response || fetch(event.request);
    })
  );
});
