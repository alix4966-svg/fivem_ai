# FiveM AI — شلون تشغله وتستضيفه مجاناً

## شنو يسوي
- واجهة شبيهة بكلاود، تدعم العربي (RTL) والوضع الغامق
- رفع صور (يفهمها) وملفات (lua, js, json, sql, cfg...)
- خبير ببرمجة FiveM (ESX / QBCore / ox_lib / NUI)
- يحفظ المحادثات بمتصفحك

## الخطوة 1: مفتاح API مجاني (الذكاء الاصطناعي)
1. ادخل https://console.groq.com وسوّي حساب (مجاني، بدون بطاقة).
2. API Keys ← Create API Key ← انسخ المفتاح (يبدأ بـ gsk_).

## الخطوة 2: الاستضافة المجانية (Cloudflare Pages)
**الطريقة الأسهل (من GitHub):**
1. سوّي حساب على github.com وارفع محتويات هذا المجلد (index.html + مجلد functions) بمستودع جديد.
2. سوّي حساب على https://dash.cloudflare.com
3. Workers & Pages ← Create ← Pages ← Connect to Git ← اختر المستودع.
4. Build command: اتركه فارغ. Output directory: `/` أو اتركه فارغ.
5. Settings ← Variables and Secrets ← أضف:
   - Name: `GROQ_API_KEY`  Value: المفتاح اللي نسخته (نوعه Secret)
6. سوّي Redeploy. موقعك يشتغل على رابط مثل `fivem-ai.pages.dev`.

**طريقة ثانية (بدون GitHub):** ثبّت Node.js ثم داخل المجلد:
```
npx wrangler login
npx wrangler pages deploy . --project-name fivem-ai
```
وبعدها ضيف المتغير GROQ_API_KEY من لوحة Cloudflare.

## تشغيله على جهازك للتجربة
1. ثبّت Node.js من nodejs.org
2. داخل المجلد سوّي ملف اسمه `.dev.vars` وبداخله:
```
GROQ_API_KEY=gsk_المفتاح_هنا
```
3. شغّل: `npx wrangler pages dev .`
4. افتح http://localhost:8788

## ملاحظات مهمة
- المفتاح يبقى بالسيرفر (Function) ولا يظهر للمستخدمين. لا تحطه داخل index.html أبداً.
- مجاني فعلاً، لكن Groq عنده حدود استخدام يومية/بالدقيقة. إذا كثر المستخدمين راح يطلع لك خطأ rate limit.
- تغيير الموديل: عدّل أول سطرين في functions/api/chat.js.
- تغيير شخصية البوت: عدّل المتغير SYSTEM بنفس الملف.
- الصور تتصغّر تلقائياً قبل الإرسال، والملفات النصية الحد 300KB.
