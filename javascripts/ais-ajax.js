// AIS REBATES PLUGIN V1.0 12-18-09 JASON ROCHE

//LOAD EXTERNAL SCRIPTS AND RUN AIS FUNCTION
jQuery.getScript("/wp-content/themes/dealertrend/javascripts/ais.php?ids=show", function(){
  jQuery.getScript('http://onecar.aisrebates.com/dlr2/inline/js/prototype.js');
  jQuery.getScript('http://onecar.aisrebates.com/dlr2/inline/js/effects.js');
  jQuery.getScript('http://onecar.aisrebates.com/dlr2/inline/js/lightwindow.js');
  jQuery('head').append('<link rel="stylesheet" href="http://media.s3.dealertrend.com/company-all/ais-plugin/ais-rebates.css" type="text/css" /><link rel="stylesheet" href="http://onecar.aisrebates.com/dlr2/inline/css/lightwindow.css" type="text/css" />');  
  doais();
 });

// AIS FUNCTION
function doais(){
  var vinlist = ""
  jQuery("div.vehicles").children("a").each(
    function(i) {      
      if ( jQuery("div.premium").length > 0 ) { var vinstr = jQuery("span.details", this).html(); }
      else if ( jQuery("div.center_stage").length > 0 ) { var vinstr = jQuery(jQuery("span.vin")[i]).text(); };
      
      var vin = vinstr.slice(vinstr.length - 17, vinstr.length);
      if (vin.match(" ")) { }
      else {
        jQuery(jQuery("span.title")[i]).append('<span class="loadingrebates"><br/>checking for rebates <img src="http://media.s3.dealertrend.com/company-all/ais-plugin/loading.gif" alt=""/></span>');
        vinlist += vin + ',';
      };
    }
  );
// GET AIS REBATES
  jQuery.getJSON("/wp-content/themes/dealertrend/javascripts/ais.php?vin=" + vinlist, 
      function (data) {
        jQuery("div.vehicles").children("a").each(
          function(i) {
            if ( jQuery("div.premium").length > 0 ) { var vinstr = jQuery("span.details", this).html(); }
            else if ( jQuery("div.center_stage").length > 0 ) { var vinstr = jQuery(jQuery("span.vin")[i]).text(); };    
            var vin = vinstr.slice(vinstr.length - 17, vinstr.length);        
            var rebateammount = '<br/><div class="rebatetext"><a href="http://onecar.aisrebates.com/dlr2/inline/IncentiveOutput.php?vID=' + vin + '&wID='+wID+'&zID='+zID+'" class="lightwindow page-options" params="lightwindow_width=750,lightwindow_height=600,lightwindow_type=external"><span class="rebatetext">' + data[i].incentives + '</span></a></div>';
            var incentivelink = '<br/><div class="rebatelink"><a href="http://onecar.aisrebates.com/dlr2/inline/IncentiveOutput.php?vID=' + vin + '&wID='+wID+'&zID='+zID+'" class="lightwindow page-options" params="lightwindow_width=750,lightwindow_height=600,lightwindow_type=external">VIEW AVAILABLE REBATES AND INCENTIVES</a></div>';
            jQuery(jQuery("span.loadingrebates")[i]).fadeOut(10, function () {
              jQuery(this).remove();
              if (data[i].incentives !== ''){
                if (data[i].vin == vin) { jQuery(jQuery("span.price")[i]).append(rebateammount); jQuery(jQuery("span.title")[i]).append(incentivelink) };  
              };
            });
          }
        );
      }
  );
};
