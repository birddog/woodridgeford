<?php
  // SET CLIENT SPECIFIC INFORMATION
  $wID =  'd38757be6c1579eb4310fc319acd6d92';
  $zID =  '14950';

  $vins = $_GET['vin'];
  $ids = $_GET['ids'];

  if($vins != ''){
    // GET VINS FROM 'VIN' PARAM

    // PARSE VINS AND ADD REFORMAT URL
    $array = explode(",", $vins);
    $vinstr = implode("&vID=", $array);
    $vinstr = rtrim($vinstr, "&vID=");

    // DEFINE URL AND PULL JSON DATA FROM AIS
    $url = "http://onecar.aisrebates.com/dlr2/inline/AISBriefInlineIncentives.php?json=yes&wID=" . $wID . "&zID=" . $zID . "&vID=" . $vinstr;
    $data = file_get_contents($url);

    // DISPLAY AIS DATA ARRAY
    print ($data);

  }elseif($ids != ''){
    // DISPLAY AIS IDS
    print('zID="' . $zID . '";wID="' . $wID . '";');
  }
?>