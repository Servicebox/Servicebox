<?php
$curl = curl_init(); 
$arParams = array( 
	'auth_id' => '5948',
	'auth_key' => 'y7rd32EeTZ2xej1rtsya8vSFiMC7wCdp', 
	'method' => 'catalog.getElementList', 
	'limit' => 10, 
	'page' => 1 
); 
curl_setopt($curl, CURLOPT_URL, 'https://optfm.ru/api/');
curl_setopt($curl, CURLOPT_RETURNTRANSFER,true); 
curl_setopt($curl, CURLOPT_POST, true); 
curl_setopt($curl, CURLOPT_POSTFIELDS, $arParams);
curl_setopt ($curl, CURLOPT_SSL_VERIFYPEER, FALSE);

$answer = curl_exec($curl); 
curl_close($curl); 
$arResult = json_decode($answer,true);
foreach($arResult['response']['items'] as $arItem){ 
	// обработка полученных данных по конкретному товару
}

// Пример скрипта получения изображений
$arParams = array(
	'auth_id' => '5948',
	'auth_key' => 'y7rd32EeTZ2xej1rtsya8vSFiMC7wCdp',
	'method' => 'catalog.getImage',
	'element_id' => 63005, // изображение для товара с id=63005
);
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, 'https://optfm.ru/api/');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $arParams);
curl_setopt($curl,CURLOPT_HEADER,true);
$answer = curl_exec($curl);
curl_close($curl);

// Обработка ответа на запрос изображения
$arAnswer = parseAnswer($answer);
if ($arAnswer['TYPE'] == 'error') {
	echo 'Ошибка формата';
} elseif ($arAnswer['TYPE'] == 'application/json; charset=utf-8') {
 	print_r(json_decode($arAnswer['CONTENT'], true));
} else {
	file_put_contents($arAnswer['FILENAME'], $arAnswer['CONTENT']);
	echo 'Файл сохранен с именем ' . $arAnswer['FILENAME'];
}

function parseAnswer($data) {
	$arResult = ['TYPE' => 'error', 'FILENAME' => '', 'CONTENT' => ''];
	$data = preg_replace("#^.*HTTP/1.1 200 OK[\r\n]+#is",'',$data);
	$arMatches = [];
	preg_match("/Content-Type: ([^\r\n]+)/", $data,$arMatches);
	if (count($arMatches) == 2){
		$arResult['TYPE'] = $arMatches[1];
		$arResult['CONTENT'] = preg_replace("/^.*\r?\n\r?\n/Uis",'' ,$data);
		if ($arResult['TYPE'] != 'application/json; charset=utf-8') {
			preg_match("/Content-Disposition: attachment; filename=([^\r\n]+)/", $data,$arMatches);
			if (count($arMatches) == 2){
				$arResult['FILENAME'] = $arMatches[1];
			} else {
				$arResult['type']='error';
			}
		}
	}
	return $arResult;
}
?>