
<?php
include 'productsApi.php'; // Подключаем файл с функциями API

// Получаем список продуктов
$products = getProducts('5948', 'y7rd32EeTZ2xej1rtsya8vSFiMC7wCdp', 10, 1);

foreach($products as $product){ 
  // обработка полученных данных по конкретному товару
}

// Пример получения изображения
$image = getImage('5948', 'y7rd32EeTZ2xej1rtsya8vSFiMC7wCdp', 63005); // Получаем изображение для товара с id=63005
file_put_contents($image['FILENAME'], $image['CONTENT']);
echo 'Файл сохранен с именем ' . $image['FILENAME'];
?>