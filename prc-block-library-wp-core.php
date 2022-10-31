<?php
/**
 * PRC Core Block Library
 *
 * @package           PRC_Block_Library_Core_Blocks
 * @author            Seth Rubenstein
 * @copyright         2022 Pew Research Center
 * @license           GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:       Core Block Library by Pew Research Center
 * Plugin URI:        https://github.com/pewresearch/block-library-core-blocks
 * Description:       A starting point for anyone looking to add functionality, extra control to and or create your own custom block library using core/blocks. Built with easier extensibility in mind.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Pew Research Center
 * Author URI:        https://github.com/pewresearch
 * Text Domain:       prc-block-library-core-blocks
 * License:           GPL v2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

namespace PRC;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'PRC_BLOCK_LIBRARY_CORE_BLOCKS_DIR', __DIR__ );

class PRC_Block_Library_Core_Blocks {
	/**
	 * Easily accessible variable that points to the plugin filepath.
	 *
	 * @var string
	 */
	public static $plugin_file = __FILE__;

	/**
	 * Version, change whenever you push a change to production otherwise script concatenation will break Gutenberg.
	 *
	 * @var string
	 */
	public static $version = '1.0.5';

	public function __construct() {
		require_once plugin_dir_path( __FILE__ ) . '/src/cover/index.php';
		require_once plugin_dir_path( __FILE__ ) . '/src/group/index.php';
		require_once plugin_dir_path( __FILE__ ) . '/src/heading/index.php';
		require_once plugin_dir_path( __FILE__ ) . '/src/home-link/index.php';
		require_once plugin_dir_path( __FILE__ ) . '/src/navigation-link/index.php';
		require_once plugin_dir_path( __FILE__ ) . '/src/navigation-submenu/index.php';
		require_once plugin_dir_path( __FILE__ ) . '/src/social-links/index.php';
		require_once plugin_dir_path( __FILE__ ) . '/src/table/index.php';

		$this->init_blocks();
	}

	public function init_blocks() {
		new Cover(true);
		new Group(true);
		new Heading(true);
		new Home_Link(true);
		new Navigation_Link(true);
		new Navigation_Submenu(true);
		new Social_Links(true);
		new Table(true);
	}

}

new PRC_Block_Library_Core_Blocks();
