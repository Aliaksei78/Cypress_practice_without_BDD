# Cypress_practice_without_BDD

Задание 1 REQ_01: User is able to add single and multiple color product to the card

Navigate to https://store.google.com/us/collection/accessories_wall?hl=en-US
Прочитать данные о продукте из файла
Найти продукт в приложении и запомнить его имя
Кликнуть Buy на следующей странице
Кликнуть Add to Cart, если для продукта доступен выбор цвета (цвет выбрать случайно и запомнить выбор)
В корзине проверить данные о продукте: наименование, цвет, количество, цену, общую цену. Убедиться что продукт в корзине один.

Данные для теста - выберита два продукта. Один из них должен быть представлен в магазине в различных цветах, другой же - только в одном. В зависимости от этого будет отличаться количество шагов при добавлении продукта. Однако тест у Вас должен быть один, параметризованный для запуска с двумя наборами данных. Также у вас должна быть гибкая реализация метода для добавления продуктов.
