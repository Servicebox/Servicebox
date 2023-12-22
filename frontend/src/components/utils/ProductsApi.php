<?php
function getProducts($authId, $authKey, $limit, $page){
  $curl = curl_init(); 
  $arParams = array( 
    'auth_id' => $authId,
    'auth_key' => $authKey, 
    'method' => 'catalog.getElementList', 
    'limit' => $limit, 
    'page' => $page 
  ); 
  curl_setopt($curl, CURLOPT_URL, 'https://optfm.ru/api/');
  curl_setopt($curl, CURLOPT_RETURNTRANSFER,true); 
  curl_setopt($curl, CURLOPT_POST, true); 
  curl_setopt($curl, CURLOPT_POSTFIELDS, $arParams);
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);

  $answer = curl_exec($curl); 
  curl_close($curl); 
  $arResult = json_decode($answer, true);
  return $arResult['response']['items'];
}

function getImage($authId, $authKey, $elementId){
  $arParams = array(
    'auth_id' => $authId,
    'auth_key' => $authKey,
    'method' => 'catalog.getImage',
    'element_id' => $elementId,
  );
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, 'https://optfm.ru/api/');
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_POST, true);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $arParams);
  curl_setopt($curl,CURLOPT_HEADER, true);
  $answer = curl_exec($curl);
  curl_close($curl);

  $arAnswer = parseAnswer($answer);
  return $arAnswer;
}

function parseAnswer($data) {
  $arResult = ['TYPE' => 'error', 'FILENAME' => '', 'CONTENT' => ''];
  $data = preg_replace("#^.*HTTP/1.1 200 OK[\r\n]+#is",'',$data);
  $arMatches = [];
  preg_match("/Content-Type: ([^\r\n]+)/", $data, $arMatches);
  if (count($arMatches) == 2){
    $arResult['TYPE'] = $arMatches[1];
    $arResult['CONTENT'] = preg_replace("/^.*\r?\n\r?\n/Uis",'' ,$data);
    if ($arResult['TYPE'] != 'application/json; charset=utf-8') {
      preg_match("/Content-Disposition: attachment; filename=([^\r\n]+)/", $data, $arMatches);
      if (count($arMatches) == 2){
        $arResult['FILENAME'] = $arMatches[1];
      } else {
        $arResult['type'] = 'error';
      }
    }
  }
  return $arResult;
}
?>