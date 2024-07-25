const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000; // Используйте PORT из окружения

console.log('Подготовка к запуску сервера...');

console.log('Подготовка к запуску сервера...');
console.log('Подготовка к запуску сервера...');
app.listen(port, () => {
    console.log(`Сервер запущен по адресу http://localhost:${port}`);
});



// Настройка CORS и парсинг JSON
app.use(cors());
app.use(express.json());

// Установка статической папки для обслуживания HTML и CSS файлов
app.use(express.static(path.join(__dirname, 'public')));

// Хранилище пользователей в памяти (замените на базу данных для продакшена)
let users = [];

// Обработчик для сохранения данных пользователя
app.post('/saveUserData', (req, res) => {
    const userData = req.body;

    // Проверка на дубликаты
    const duplicateEmail = users.find(user => user.email === userData.email);
    if (duplicateEmail) {
        return res.status(400).json({ error: 'Пользователь с таким email уже существует.' });
    }

    const duplicateUsername = users.find(user => user.username === userData.username);
    if (duplicateUsername) {
        return res.status(400).json({ error: 'Пользователь с таким username уже существует.' });
    }

    // Добавление нового пользователя
    users.push(userData);
    res.json({ message: 'Данные пользователя успешно сохранены!' });
});
