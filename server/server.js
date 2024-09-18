const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); // Для разрешения запросов с клиентской части
app.use(bodyParser.json());

// Маршрут для записи данных в JSON-файл
app.post('/api/cube', (req, res) => {
  const cubeData = req.body;
  const filePath = path.join(__dirname, 'cubeData.json');

  // Записываем данные в файл cubeData.json
  fs.writeFile(filePath, JSON.stringify(cubeData, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка записи данных' });
    }
    res.json({ message: 'Данные успешно сохранены', data: cubeData });
  });
});

// Маршрут для получения данных из JSON-файла
app.get('/api/cube', (req, res) => {
  const filePath = path.join(__dirname, 'cubeData.json');

  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Ошибка чтения данных' });
      }
      res.json(JSON.parse(data));
    });
  } else {
    res.status(404).json({ message: 'Файл данных не найден' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
