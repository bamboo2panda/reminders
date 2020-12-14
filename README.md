# reminders
Django app for short reminders.

Чтобы запустить приложение, нужно: 
1. Установить docker и docker-compose;
2. Склонировать репозиторий и выполнить docker-compose up.

Для доставки уведомлений на почту нужно: 
1. Переименовать файл .env.demo в .env;
2. Заполнить переменные реальными данными для авторизации на почтовом сервере;
3. В директории проекта выполнить docker-compose run reminders sh -c "celery -A reminders worker -B -l INFO".
