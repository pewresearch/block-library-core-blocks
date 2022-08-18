<?php
/**
 * @wordpress-plugin
 * Plugin Name:       Core Block Library by Pew Research Center
 * Plugin URI:        https://github.com/pewresearch/core-block-library/
 * Description:       A starting point for anyone looking to add functionality, extra control to and or create your own custom block library using core/blocks. Built with easier extensibility in mind.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Seth Rubenstein and Ben Wormald
 * Author URI:        https://github.com/sethrubenstein, https://github.com/benwormald
 * Text Domain:       prc-core-block-library
 * License:           GPL v2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'PRC_CORE_BLOCK_LIBRARY_FILE', __FILE__ );
define( 'PRC_CORE_BLOCK_LIBRARY_DIR', __DIR__ );

class PRC_Core_Block_Library {
	public function __construct($init = false) {
		require_once plugin_dir_path( __FILE__ ) . '/src/home-link/index.php';
		require_once plugin_dir_path( __FILE__ ) . '/src/navigation-link/index.php';
		require_once plugin_dir_path( __FILE__ ) . '/src/navigation-submenu/index.php';

		$this->init_blocks();
	}

	public function init_blocks() {
		// Example
		add_filter( 'prc_cbl__icon__library', function($icons){
			if ( false === $icons ) {
				$icons = array();
			}
			return array_merge($icons, array(
				array(
					'label' => "Home",
					'value' => "home"
				),
				array(
					'label' => "Facebook",
					'value' => "facebook"
				),
			));
		}, 10, 1 );

		add_filter('prc_cbl__icon__return_slug', array($this, 'output_icon'), 10, 1);

		new Home_Link(true);
		new Navigation_Link(true);
		new Navigation_Submenu(true);
	}

	public function output_icon($slug) {
		// return '<i class="icon icon-' . $slug . '"></i>';
		return $slug;
	}

	public function dynamically_change_block_theme_style_variation($style_variation_name = false) {
		// Something like this...
		// $dark_mode = get_query_arg('style_variation') === 'dark';
		// $this->dynamically_change_block_theme_style_variation('dark-mode');
	}

}

new PRC_Core_Block_Library();
