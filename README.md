# إبداعات Grok · Grok Creations (X-style)

تطبيق تجريبي + مكوّنات قابلة لإعادة الاستخدام تعرض إبداعات Grok Build كبطاقات غنية بأسلوب منصة X (تويتر سابقاً)، مع واجهة عربية واتجاه RTL.

A demo app and reusable components that present Grok Build creations as rich cards in a dark X-like timeline, with an Arabic RTL demo.

> **ملاحظة / Note:** هذا العرض مستوحى من تجربة مشاركة X + Grok Build — تكريم بصري، وليس منتجاً رسمياً.  
> Demo inspired by X + Grok Build sharing UX (homage, not official).

## التشغيل / Getting started

```bash
npm install
npm run dev
```

ثم افتح الرابط الذي يظهر في الطرفية (عادةً `http://localhost:5173`).

Then open the URL printed in the terminal (usually `http://localhost:5173`).

```bash
npm run test    # تشغيل الاختبارات الآلية / run tests
npm run lint    # فحص الكود / lint check
npm run build   # إنتاج / production build
npm run preview # معاينة البناء / preview the build
```

## التقنيات / Tech stack

- Vite + React + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Vitest + React Testing Library (للاختبارات)
- LocalStorage للتخزين المحلي المستمر

## هيكل المشروع / Project structure

```
src/
  components/
    GrokCreationCard.tsx        # بطاقة إبداع تفاعلية بأسلوب X
    GrokCreationsFeed.tsx       # الخط الزمني مع التصفية والبحث
    CreatePromptBar.tsx         # شريط الإنشاء وإعادة المزج
    InteractivePreviewModal.tsx # نافذة المعاينة التفاعلية والتشغيل
  data/
    mockCreations.ts            # بيانات تجريبية
  utils/
    storage.ts                  # إدارة حفظ واسترجاع البيانات محلياً
  types.ts                      # أنواع TypeScript
  App.tsx
  index.css                     # رموز تصميم X الداكنة
```

## المكوّنات والخصائص / Component props

### `GrokCreationCard`

| Prop | Type | Description |
|------|------|-------------|
| `creation` | `GrokCreation` | بيانات البطاقة (مؤلف، عنوان، نوع، تفاعل…) |
| `onRemix?` | `(creation) => void` | عند الضغط على «أعد المزج مع Grok» |
| `onPlay?` | `(creation) => void` | زر التشغيل للألعاب |

### `GrokCreationsFeed`

| Prop | Type | Description |
|------|------|-------------|
| `creations` | `GrokCreation[]` | قائمة البطاقات |
| `title?` | `string` | عنوان الرأس اللاصق (افتراضي: «إبداعات Grok») |
| `onRemix?` | `(creation) => void` | يُمرَّر للبطاقات |
| `onPlay?` | `(creation) => void` | يُمرَّر للبطاقات |

### `CreatePromptBar`

| Prop | Type | Description |
|------|------|-------------|
| `onBuild?` | `(prompt, type) => void` | عند الضغط على «بناء» |
| `placeholder?` | `string` | نص الحقل (افتراضي: «ماذا تريد أن يبني Grok؟») |

### أنواع الإبداع / Creation types

`website` → موقع · `app` → تطبيق · `game` → لعبة · `board` → لوحة

## رموز التصميم / Design tokens (X dark)

| Token | Value |
|-------|-------|
| Background | `#000000` |
| Border | `#2f3336` |
| Text | `#e7e9ea` |
| Muted | `#71767b` |
| Accent | `#1d9bf0` |
| Like | `#f91880` |

`dir="rtl"` و`lang="ar"` مضبوطان على `<html>` للعرض العربي.

## الترخيص / License

عرض توضيحي للأغراض التعليمية والتصميمية فقط.
