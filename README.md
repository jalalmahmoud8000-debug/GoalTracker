# GoalTracker

تطبيق كامل لإدارة وتتبع الأهداف باستخدام FastAPI + SQLite للـ Backend و React للـ Frontend.

## هيكلية المشروع

```
GoalTracker/
├─ backend/
│  ├─ app/
│  │  ├─ main.py
│  │  ├─ database.py
│  │  ├─ models.py
│  │  ├─ schemas.py
│  │  ├─ crud.py
│  │  ├─ utils.py
│  │  └─ routers/
│  │     ├─ goals.py
│  │     └─ tasks.py
│  └─ requirements.txt
└─ frontend/
   ├─ index.html
   ├─ package.json
   ├─ vite.config.js
   └─ src/
      ├─ App.jsx
      ├─ api.js
      ├─ main.jsx
      ├─ styles/
      │  └─ app.css
      ├─ components/
      └─ pages/
```

## التشغيل (Run Instructions)

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

افتح المتصفح على: `http://localhost:5173`.

## أمثلة REST API

### إنشاء هدف

```bash
curl -X POST http://localhost:8000/goals \
  -H "Content-Type: application/json" \
  -d '{
    "title": "تعلم FastAPI",
    "description": "إنهاء دورة متقدمة",
    "start_date": "2024-01-01",
    "end_date": "2024-02-01"
  }'
```

**Response**

```json
{
  "id": 1,
  "title": "تعلم FastAPI",
  "description": "إنهاء دورة متقدمة",
  "start_date": "2024-01-01",
  "end_date": "2024-02-01",
  "progress": 0,
  "tasks": []
}
```

### إضافة مهمة لهدف

```bash
curl -X POST http://localhost:8000/goals/1/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "مشاهدة الدروس",
    "description": "الوحدات من 1 إلى 5",
    "is_completed": false
  }'
```

**Response**

```json
{
  "id": 1,
  "goal_id": 1,
  "title": "مشاهدة الدروس",
  "description": "الوحدات من 1 إلى 5",
  "is_completed": false
}
```

### تحديث حالة المهمة

```bash
curl -X PUT http://localhost:8000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "is_completed": true
  }'
```

**Response**

```json
{
  "id": 1,
  "goal_id": 1,
  "title": "مشاهدة الدروس",
  "description": "الوحدات من 1 إلى 5",
  "is_completed": true
}
```

## ملاحظات حول الواجهة

- صفحة رئيسية تعرض كل الأهداف ونسبة التقدم.
- صفحة تفاصيل الهدف تعرض المهام مع إمكانية التحديث والحذف.
- نماذج لإضافة وتعديل الأهداف والمهام.

## اقتراحات للتطوير مستقبلًا

- إضافة نظام تسجيل دخول ومستخدمين متعددين.
- لوحات رسوم بيانية لقياس الإنجاز عبر الزمن.
- تنبيهات وإشعارات عبر البريد أو الهاتف.
- دعم التكرار التلقائي للمهام.
- تصنيفات وأولويات للمهام.
