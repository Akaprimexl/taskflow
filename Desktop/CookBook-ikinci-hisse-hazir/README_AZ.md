# CookBook — ikinci hissə

Bu, mövcud CookBook layihənizin hazır nüsxəsidir. Birinci hissənin Azərbaycan reseptləri və kateqoriyaları saxlanılıb; sənəddəki ikinci hissə funksiyaları və TheMealDB internet axtarışı əlavə olunub.

## Başlatmaq

1. ZIP-i açın və VS Code-da içində `package.json` olan `CookBook-ikinci-hisse-hazir` qovluğunu açın.
2. Terminalda `npm install` yazın.
3. Sonra `npm run dev` yazın.
4. Terminalın göstərdiyi localhost ünvanını brauzerdə açın.

## İnternetdən resept axtarışı

`/reseptler` səhifəsində axtarış sahəsinə ingiliscə yemək adı yazın, məsələn `chicken`, `pasta` və ya `soup`. Axtarış TheMealDB API-sinə sorğu göndərir. Tapılan nəticə kartını seçəndə API-dən tam resept, inqrediyentlər, addımlar və şəkil yüklənir. Yerli Azərbaycan reseptləri də siyahıda qalır.

Axtarış üçün TheMealDB-nin öyrənmə/test açarı `1` istifadə olunur. İnternet bağlantısı olmadıqda onlayn axtarış işləməyəcək; yerli reseptlər yenə açılmalıdır.

## DOCX tələbləri

- `components/ReseptDetallari.js`: porsiya sayğacı, porsiyaya uyğun inqrediyent miqdarı, checkbox-lı hazırlanma addımları və tamamlanma sayı.
- `app/reseptler/loading.js`: avtomatik yüklənmə ekranı.
- `app/reseptler/error.js`: Client Component xəta sərhədi və yenidən cəhd düyməsi.
- `app/not-found.js` və `notFound()`: olmayan resept üçün 404.
- `app/reseptler/layout.js`: resept bölməsi üçün iç-içə layout.
- `components/Navbar.js`: `usePathname` ilə aktiv keçid.
- Resept şəkilləri, rəngli kart dizaynı və internetdən TheMealDB axtarışı.

## Nümunə ünvanları

- `/` — ana səhifə
- `/reseptler` — yerli reseptlər və internet axtarışı
- `/reseptler/merci-sorbasi` — porsiya və hazırlıq addımları olan yerli resept
- `/reseptler/52772` — TheMealDB-dən ID ilə resept nümunəsi
- `/reseptler/olmayan` — 404 səhifəsi
