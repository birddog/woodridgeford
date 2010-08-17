<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>>
  <head profile="http://gmpg.org/xfn/11">
    <title><?php wp_title(); ?></title>
    <meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
    <meta http-equiv="X-UA-Compatible" content="IE=8" />
    <meta name="Copyright" content="DealerTrend Framework Theme: Copyright (c) 2010 DealerTrend, Inc., All Rights Reserved." />
    <?php dt_google_site_verify(); ?>
    <link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/css/reset.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/css/960.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />
    <?php dt_css_includes(); ?>
    <?php wp_head(); ?>
    <?php dt_js_includes(); ?>
  </head>
  <body <?php body_class(); ?>>
    <div id="website" class="container_12">

      <div id="header">
        <div id="header-text"><a href="/"><?php dt_header(); ?></a></div>
        <div id="header-zones">
          <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("header") ) : ?><?php endif; ?>
          <div class="clear"></div>
        </div>
        <div class="clear"></div>
      </div>

      <?php $dm_page = get_page_by_title('Directory Menu'); ?>
      <div id="menubar" class="grid_12 alpha omega">
        <div class='nav'>
          <ul>
          <?php
            //wp_list_pages('child_of='.$dm_page->ID.'&depth=1&title_li=&sort_column=menu_order');
            $toppages = wp_list_pages('echo=0&child_of='.$dm_page->ID.'&depth=1&title_li=&sort_column=menu_order');
            $menuitem = explode('<li class',$toppages); 
            $n = count($menuitem);
            for ($i = 1;$i<$n;$i++){
                preg_match('/page-item-[0-9]*/', $menuitem[$i],$id); 
                $id2 = str_replace("page-item-","",$id);
                $x = $id2[0];
                $submenu = wp_list_pages('echo=0&title_li=&depth=2&child_of='.$x);
                echo '<li id="kwick_'.$i.'">
                        <div class="wrapper">
                                <div class="col1"><h3><li class'.$menuitem[$i].'</h3>
                                <ul class="menu2">'.$submenu.'</ul></div> 
                                 <div id="info_'.$x.'" class="col2" style="display: none;"> This is an info area. </div>
                        </div>
                      </li>';
            }
          ?>
          </ul>
        </div>
      </div>

      <div class="clear"></div>

      <div id="submenu" class="subnav">
        <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("submenu") ) : ?><?php endif; ?>
      </div>

      <div class="clear"></div>

      <div id="top-banner-ad">
        <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("top-banner-ad") ) : ?><?php endif; ?>
      </div>

      <div class="clear"></div>
